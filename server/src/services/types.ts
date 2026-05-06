export interface ToolInput {
  toolName: string;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface Recommendation {
  toolName: string;
  currentPlan: string;
  suggestedPlan: string;
  monthlySavings: number;
  reason: string;
}

export interface AuditResult {
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  recommendations: Recommendation[];
  summary?: string;
}