import type {
  IAuditResult,
  IToolInput,
  IToolRecommendation,
  UseCase,
} from "../../models/Audit";
import {
  findPlanDefinition,
  findToolDefinition,
  type PlanDefinition,
  type ToolDefinition,
} from "./pricing";

interface AuditInput {
  tools: IToolInput[];
  teamSize: number;
  useCase: UseCase;
}

const getCreditsDiscountRate = (teamSize: number) =>
  teamSize >= 20 ? 0.2 : teamSize >= 8 ? 0.15 : 0.1;

const buildRecommendation = (
  input: IToolRecommendation
): IToolRecommendation => ({
  ...input,
  currentSpend: Number(input.currentSpend.toFixed(2)),
  optimizedSpend: Number(input.optimizedSpend.toFixed(2)),
  savings: Number(input.savings.toFixed(2)),
});

const getFallbackRecommendation = (tool: IToolInput): IToolRecommendation =>
  buildRecommendation({
    toolName: tool.toolName,
    currentPlan: tool.plan,
    recommendedPlan: tool.plan,
    currentSpend: tool.monthlySpend,
    optimizedSpend: tool.monthlySpend,
    savings: 0,
    action: "stay",
    reason:
      "This tool is not in the pricing catalog yet, so the audit keeps your current setup unchanged rather than guessing.",
  });

export const runAuditEngine = ({
  tools,
  teamSize,
  useCase,
}: AuditInput): IAuditResult => {
  const recommendations = tools.map((tool) =>
    evaluateToolRecommendation(tool, teamSize, useCase)
  );

  const totalCurrentSpend = recommendations.reduce(
    (sum, recommendation) => sum + recommendation.currentSpend,
    0
  );
  const totalOptimizedSpend = recommendations.reduce(
    (sum, recommendation) => sum + recommendation.optimizedSpend,
    0
  );
  const totalMonthlySavings = recommendations.reduce(
    (sum, recommendation) => sum + recommendation.savings,
    0
  );

  return {
    totalCurrentSpend: Number(totalCurrentSpend.toFixed(2)),
    totalOptimizedSpend: Number(totalOptimizedSpend.toFixed(2)),
    totalMonthlySavings: Number(totalMonthlySavings.toFixed(2)),
    totalAnnualSavings: Number((totalMonthlySavings * 12).toFixed(2)),
    recommendations,
  };
};

const evaluateToolRecommendation = (
  tool: IToolInput,
  teamSize: number,
  useCase: UseCase
): IToolRecommendation => {
  const toolDefinition = findToolDefinition(tool.toolName);
  const currentPlan = findPlanDefinition(tool.toolName, tool.plan);

  if (!toolDefinition || !currentPlan) {
    return getFallbackRecommendation(tool);
  }

  if (currentPlan.kind === "seat") {
    return evaluateSeatPlan(tool, toolDefinition, currentPlan, teamSize, useCase);
  }

  if (currentPlan.kind === "usage") {
    return evaluateUsagePlan(tool, toolDefinition, currentPlan, teamSize, useCase);
  }

  return evaluateCustomPlan(tool, toolDefinition, currentPlan, teamSize);
};

const evaluateSeatPlan = (
  tool: IToolInput,
  toolDefinition: ToolDefinition,
  currentPlan: PlanDefinition,
  teamSize: number,
  useCase: UseCase
) => {
  const currentSpend = tool.monthlySpend;
  const retailSpend = (currentPlan.monthlyPricePerSeat || 0) * tool.seats;

  let bestOption = {
    optimizedSpend: currentSpend,
    recommendedPlan: currentPlan.name,
    action: "stay" as IToolRecommendation["action"],
    reason: `Your current ${currentPlan.name} plan already looks reasonably aligned to the number of seats and the stated use case.`,
  };

  const useCaseMismatch =
    currentPlan.suitableUseCases &&
    !currentPlan.suitableUseCases.includes(useCase);

  if (useCaseMismatch) {
    bestOption = {
      ...bestOption,
      reason: `The current ${currentPlan.name} plan is usable, but it is not the most natural fit for a ${useCase} workflow based on how this tool is typically positioned.`,
    };
  }

  if (retailSpend > 0 && retailSpend < bestOption.optimizedSpend) {
    bestOption = {
      optimizedSpend: retailSpend,
      recommendedPlan: currentPlan.name,
      action: "stay",
      reason: `Your reported spend is above the published retail rate for ${currentPlan.name}. Standardizing purchasing at the listed price would lower cost without changing the tool.`,
    };
  }

  if (toolDefinition.supportsCredits && retailSpend > 0) {
    const creditsSpend = retailSpend * (1 - getCreditsDiscountRate(teamSize));

    if (creditsSpend < bestOption.optimizedSpend) {
      bestOption = {
        optimizedSpend: creditsSpend,
        recommendedPlan: currentPlan.name,
        action: "switch",
        reason: `This plan appears to fit the workflow, but the team is likely paying retail. Purchasing equivalent usage through discounted credits is the most defensible savings lever here.`,
      };
    }
  }

  const downgradePlan = getSeatPlanDowngrade(toolDefinition, currentPlan, tool.seats);

  if (downgradePlan?.monthlyPricePerSeat !== undefined) {
    const downgradeRetailSpend = downgradePlan.monthlyPricePerSeat * tool.seats;
    const downgradeSpend = toolDefinition.supportsCredits
      ? Math.min(
          downgradeRetailSpend,
          downgradeRetailSpend * (1 - getCreditsDiscountRate(teamSize))
        )
      : downgradeRetailSpend;

    if (downgradeSpend < bestOption.optimizedSpend) {
      bestOption = {
        optimizedSpend: downgradeSpend,
        recommendedPlan: downgradePlan.name,
        action: "downgrade",
        reason: `With ${tool.seats} seat(s), ${currentPlan.name} is heavier than needed. ${downgradePlan.name} preserves the core workflow while lowering the monthly cost.`,
      };
    }
  }

  const alternative = getAlternativeRecommendation(tool, toolDefinition, useCase);

  if (alternative && alternative.optimizedSpend < bestOption.optimizedSpend) {
    bestOption = alternative;
  }

  return buildRecommendation({
    toolName: tool.toolName,
    currentPlan: currentPlan.name,
    recommendedPlan: bestOption.recommendedPlan,
    currentSpend,
    optimizedSpend: bestOption.optimizedSpend,
    savings: Math.max(0, currentSpend - bestOption.optimizedSpend),
    action: bestOption.action,
    reason: bestOption.reason,
  });
};

const evaluateUsagePlan = (
  tool: IToolInput,
  toolDefinition: ToolDefinition,
  currentPlan: PlanDefinition,
  teamSize: number,
  useCase: UseCase
) => {
  const currentSpend = tool.monthlySpend;
  const seatFallback = getUsageFallbackSeatPlan(tool.toolName, useCase);
  const seatFallbackSpend =
    seatFallback?.monthlyPricePerSeat !== undefined
      ? seatFallback.monthlyPricePerSeat * Math.max(1, tool.seats)
      : null;

  if (!toolDefinition.supportsCredits) {
    if (seatFallback && seatFallbackSpend !== null && seatFallbackSpend < currentSpend) {
      return buildRecommendation({
        toolName: tool.toolName,
        currentPlan: currentPlan.name,
        recommendedPlan: seatFallback.name,
        currentSpend,
        optimizedSpend: seatFallbackSpend,
        savings: Math.max(0, currentSpend - seatFallbackSpend),
        action: "switch",
        reason: `This appears to be a relatively light usage-based workload. A seat-based ${seatFallback.name} plan is cheaper than the current reported API spend and is a more defensible recommendation than guessing at token-level changes.`,
      });
    }

    return buildRecommendation({
      toolName: tool.toolName,
      currentPlan: currentPlan.name,
      recommendedPlan: currentPlan.name,
      currentSpend,
      optimizedSpend: currentSpend,
      savings: 0,
      action: "stay",
      reason: `This is a usage-based plan. Without token-level or request-level telemetry, the audit keeps the recommendation conservative instead of fabricating a cheaper alternative.`,
    });
  }

  const creditsSpend = currentSpend * (1 - getCreditsDiscountRate(teamSize));
  const optimizedSpend =
    seatFallbackSpend !== null ? Math.min(creditsSpend, seatFallbackSpend) : creditsSpend;
  const recommendedPlan =
    seatFallbackSpend !== null && seatFallbackSpend < creditsSpend
      ? seatFallback?.name || `${tool.toolName} via discounted credits`
      : `${tool.toolName} via discounted credits`;
  const reason =
    seatFallbackSpend !== null && seatFallbackSpend < creditsSpend
      ? `This usage-based workload is light enough that a seat-based ${seatFallback?.name} plan is cheaper than the current reported spend. That is more defensible than assuming aggressive token optimization.`
      : `This is a usage-based ${useCase} workload. Without reliable token telemetry, the cleanest defensible recommendation is procurement savings rather than a fake plan switch.`;

  return buildRecommendation({
    toolName: tool.toolName,
    currentPlan: currentPlan.name,
    recommendedPlan,
    currentSpend,
    optimizedSpend,
    savings: Math.max(0, currentSpend - optimizedSpend),
    action: "switch",
    reason,
  });
};

const evaluateCustomPlan = (
  tool: IToolInput,
  toolDefinition: ToolDefinition,
  currentPlan: PlanDefinition,
  teamSize: number
) => {
  const currentSpend = tool.monthlySpend;
  const enterpriseFallback = getEnterpriseFallbackPlan(toolDefinition.toolName, teamSize);

  if (
    enterpriseFallback?.monthlyPricePerSeat !== undefined &&
    tool.seats >= (enterpriseFallback.minSeats || 1)
  ) {
    const fallbackRetailSpend =
      enterpriseFallback.monthlyPricePerSeat * Math.max(enterpriseFallback.minSeats || 1, tool.seats);
    const fallbackSpend = toolDefinition.supportsCredits
      ? Math.min(
          fallbackRetailSpend,
          fallbackRetailSpend * (1 - getCreditsDiscountRate(teamSize))
        )
      : fallbackRetailSpend;

    if (fallbackSpend < currentSpend) {
      return buildRecommendation({
        toolName: tool.toolName,
        currentPlan: currentPlan.name,
        recommendedPlan: enterpriseFallback.name,
        currentSpend,
        optimizedSpend: fallbackSpend,
        savings: Math.max(0, currentSpend - fallbackSpend),
        action: "downgrade",
        reason: `This looks like an enterprise or contract-priced plan, but the team size still fits a public lower-tier plan. Moving down to ${enterpriseFallback.name} is a more defensible savings recommendation than assuming enterprise-only needs.`,
      });
    }
  }

  if (!toolDefinition.supportsCredits) {
    return buildRecommendation({
      toolName: tool.toolName,
      currentPlan: currentPlan.name,
      recommendedPlan: currentPlan.name,
      currentSpend,
      optimizedSpend: currentSpend,
      savings: 0,
      action: "stay",
      reason:
        currentPlan.notes ||
        "This plan is enterprise-priced and contract-specific, so the audit avoids pretending there is a public list-price downgrade.",
    });
  }

  const optimizedSpend = currentSpend * (1 - getCreditsDiscountRate(teamSize));

  return buildRecommendation({
    toolName: tool.toolName,
    currentPlan: currentPlan.name,
    recommendedPlan: `${tool.toolName} enterprise via discounted credits`,
    currentSpend,
    optimizedSpend,
    savings: Math.max(0, currentSpend - optimizedSpend),
    action: "switch",
    reason: `This looks like a contract-priced plan. The safest savings recommendation is credits-backed procurement rather than inventing a public enterprise alternative.`,
  });
};

const getSeatPlanDowngrade = (
  toolDefinition: ToolDefinition,
  currentPlan: PlanDefinition,
  seats: number
) => {
  if (toolDefinition.toolName === "ChatGPT" && currentPlan.name === "Business" && seats <= 2) {
    return findPlanDefinition("ChatGPT", "Plus");
  }

  if (toolDefinition.toolName === "ChatGPT" && currentPlan.name === "Team" && seats <= 2) {
    return findPlanDefinition("ChatGPT", "Plus");
  }

  if (toolDefinition.toolName === "Claude" && currentPlan.name === "Team" && seats <= 2) {
    return findPlanDefinition("Claude", "Pro");
  }

  if (toolDefinition.toolName === "Cursor" && currentPlan.name === "Business" && seats <= 3) {
    return findPlanDefinition("Cursor", "Pro");
  }

  if (
    toolDefinition.toolName === "GitHub Copilot" &&
    currentPlan.name === "Business" &&
    seats <= 3
  ) {
    return findPlanDefinition("GitHub Copilot", "Individual");
  }

  if (toolDefinition.toolName === "Windsurf" && currentPlan.name === "Teams" && seats <= 3) {
    return findPlanDefinition("Windsurf", "Pro");
  }

  return undefined;
};

const getAlternativeRecommendation = (
  tool: IToolInput,
  toolDefinition: ToolDefinition,
  useCase: UseCase
) => {
  if (
    toolDefinition.toolName === "ChatGPT" &&
    (useCase === "writing" || useCase === "research")
  ) {
    const claudePro = findPlanDefinition("Claude", "Pro");

    if (claudePro?.monthlyPricePerSeat !== undefined) {
      const optimizedSpend = claudePro.monthlyPricePerSeat * tool.seats;

      return {
        optimizedSpend,
        recommendedPlan: "Claude Pro",
        action: "switch" as IToolRecommendation["action"],
        reason: `For ${useCase}-heavy work, Claude Pro is a plausible lower-cost alternative that still preserves strong general-purpose assistant capability.`,
      };
    }
  }

  if (toolDefinition.toolName === "Claude" && useCase === "coding") {
    const cursorPro = findPlanDefinition("Cursor", "Pro");

    if (cursorPro?.monthlyPricePerSeat !== undefined && tool.seats <= 3) {
      const optimizedSpend = cursorPro.monthlyPricePerSeat * tool.seats;

      return {
        optimizedSpend,
        recommendedPlan: "Cursor Pro",
        action: "switch" as IToolRecommendation["action"],
        reason: "For a small coding-heavy team, a dedicated coding tool can be a better fit than keeping everyone on a premium assistant plan.",
      };
    }
  }

  return null;
};

const getUsageFallbackSeatPlan = (toolName: string, useCase: UseCase) => {
  if (toolName === "OpenAI API") {
    return useCase === "coding"
      ? findPlanDefinition("ChatGPT", "Team")
      : findPlanDefinition("ChatGPT", "Plus");
  }

  if (toolName === "Anthropic API") {
    return findPlanDefinition("Claude", useCase === "research" ? "Max" : "Pro");
  }

  if (toolName === "Gemini") {
    return findPlanDefinition("Gemini", "Pro");
  }

  return null;
};

const getEnterpriseFallbackPlan = (toolName: string, teamSize: number) => {
  if (toolName === "ChatGPT") {
    return teamSize <= 10
      ? findPlanDefinition("ChatGPT", "Team")
      : null;
  }

  if (toolName === "Claude") {
    return teamSize <= 10
      ? findPlanDefinition("Claude", "Team")
      : null;
  }

  if (toolName === "Cursor") {
    return teamSize <= 20
      ? findPlanDefinition("Cursor", "Business")
      : null;
  }

  if (toolName === "GitHub Copilot") {
    return teamSize <= 20
      ? findPlanDefinition("GitHub Copilot", "Business")
      : null;
  }

  if (toolName === "Windsurf") {
    return teamSize <= 20
      ? findPlanDefinition("Windsurf", "Teams")
      : null;
  }

  return null;
};
