import type { IToolRecommendation, IToolInput, UseCase } from "../models/Audit";
import { generateSummary as generateAnthropicSummary } from "./anthropic.service";

interface SummaryInput {
  tools: IToolInput[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  recommendations: IToolRecommendation[];
  useCase: UseCase;
  teamSize: number;
}

export const buildAuditSummary = async (input: SummaryInput) => {
  try {
    return await generateAnthropicSummary(input);
  } catch (error) {
    console.error("AI Summary failed, using fallback:", error);
    return generateFallbackSummary(input);
  }
};

export const generateFallbackSummary = (data: {
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  recommendations: IToolRecommendation[];
  useCase: UseCase;
}): string => {
  const {
    totalMonthlySavings,
    totalAnnualSavings,
    recommendations,
    useCase,
  } = data;

  const recommendationCount = recommendations.filter(
    (recommendation) => recommendation.savings > 0
  ).length;

  if (totalMonthlySavings < 100) {
    return `Your current AI tool setup appears cost-efficient for a ${useCase} workflow. Savings opportunities are limited right now, so the best move is to keep the stack as-is and revisit pricing changes later.`;
  }

  return `Your audit found ${recommendationCount} meaningful optimization opportunity${recommendationCount === 1 ? "" : "ies"}. Based on your usage, you can save about $${totalMonthlySavings}/month (~$${totalAnnualSavings}/year) by right-sizing plans and moving away from avoidable retail pricing where appropriate.`;
};
