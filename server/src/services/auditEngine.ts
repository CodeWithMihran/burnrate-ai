import { pricingData } from "./pricingData";
import { ToolInput, Recommendation, AuditResult } from "./types";

interface AuditInput {
  tools: ToolInput[];
  teamSize: number;
  useCase: string;
}

export const runAuditEngine = ({
  tools,
  teamSize,
  useCase,
}: AuditInput): AuditResult => {
  const recommendations: Recommendation[] = [];
  let totalMonthlySavings = 0;

  for (const tool of tools) {
    const toolPricing = pricingData.find(
      (t) => t.toolName.toLowerCase() === tool.toolName.toLowerCase()
    );

    if (!toolPricing) continue;

    const currentPlan = toolPricing.plans.find(
      (p) => p.name.toLowerCase() === tool.plan.toLowerCase()
    );

    if (!currentPlan) continue;

    const currentCost = tool.monthlySpend;

    /**
     * ----------------------------------
     * RULE 1: TEAM SIZE LOGIC
     * ----------------------------------
     */
    let suggestedPlan = currentPlan;

    if (teamSize > 5) {
      const teamPlan = toolPricing.plans.find((p) =>
        p.name.toLowerCase().includes("team")
      );

      if (teamPlan) {
        suggestedPlan = teamPlan;
      }
    }

    /**
     * ----------------------------------
     * RULE 2: USE-CASE BASED SWITCHING
     * ----------------------------------
     */
    if (useCase === "writing" || useCase === "research") {
      if (tool.toolName.toLowerCase() === "chatgpt") {
        // Suggest Claude instead
        const claude = pricingData.find(
          (t) => t.toolName.toLowerCase() === "claude"
        );

        if (claude) {
          const bestClaudePlan = claude.plans[1]; // Pro

          const newCost = bestClaudePlan.pricePerSeat * tool.seats;
          const savings = currentCost - newCost;

          if (savings > 0) {
            totalMonthlySavings += savings;

            recommendations.push({
              toolName: tool.toolName,
              currentPlan: currentPlan.name,
              suggestedPlan: `Switch to Claude (${bestClaudePlan.name})`,
              monthlySavings: savings,
              reason: `For ${useCase} tasks, Claude typically performs better and can replace ChatGPT at a lower or similar cost.`,
            });

            continue;
          }
        }
      }
    }

    /**
     * ----------------------------------
     * RULE 3: OVERPAY DETECTION
     * ----------------------------------
     */
    const cheaperPlan = toolPricing.plans.reduce((best, plan) => {
      const cost = plan.pricePerSeat * tool.seats;
      if (cost < best.cost) {
        return { plan, cost };
      }
      return best;
    }, { plan: currentPlan, cost: currentCost });

    /**
     * ----------------------------------
     * RULE 4: FINAL DECISION
     * ----------------------------------
     */
    if (cheaperPlan.cost < currentCost) {
      const savings = currentCost - cheaperPlan.cost;

      totalMonthlySavings += savings;

      recommendations.push({
        toolName: tool.toolName,
        currentPlan: currentPlan.name,
        suggestedPlan: cheaperPlan.plan.name,
        monthlySavings: savings,
        reason: generateAdvancedReason({
          toolName: tool.toolName,
          currentPlan: currentPlan.name,
          suggestedPlan: cheaperPlan.plan.name,
          useCase,
          teamSize,
        }),
      });
    }
  }

  /**
   * ----------------------------------
   * RULE 5: DUPLICATE TOOL DETECTION
   * ----------------------------------
   */
  if (tools.length > 1) {
    const hasChatGPT = tools.some((t) =>
      t.toolName.toLowerCase().includes("chatgpt")
    );
    const hasClaude = tools.some((t) =>
      t.toolName.toLowerCase().includes("claude")
    );

    if (hasChatGPT && hasClaude) {
      recommendations.push({
        toolName: "General",
        currentPlan: "Multiple tools",
        suggestedPlan: "Use only one primary AI tool",
        monthlySavings: 20,
        reason:
          "You are paying for multiple AI tools with overlapping capabilities. Consolidating to one tool can reduce cost without major loss in functionality.",
      });

      totalMonthlySavings += 20;
    }
  }

  return {
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    recommendations,
  };
};

/**
 * ----------------------------------
 * ADVANCED REASON GENERATOR
 * ----------------------------------
 */
const generateAdvancedReason = ({
  toolName,
  currentPlan,
  suggestedPlan,
  useCase,
  teamSize,
}: any): string => {
  let reason = `You are currently using ${currentPlan} plan of ${toolName}. `;

  if (teamSize > 5) {
    reason += `Since your team size is ${teamSize}, a team-oriented plan would provide better collaboration features. `;
  }

  if (useCase === "coding") {
    reason += `For coding tasks, performance differences between plans are minimal, so a cheaper plan is sufficient. `;
  }

  if (useCase === "writing" || useCase === "research") {
    reason += `For ${useCase}, high-end plans may not provide proportional value for the cost. `;
  }

  reason += `Switching to ${suggestedPlan} reduces unnecessary spending while maintaining required functionality.`;

  return reason;
};