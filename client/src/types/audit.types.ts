export interface ToolPayload {
  toolName: string;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditPayload {
  teamSize: number;
  useCase: "coding" | "writing" | "data" | "research" | "mixed";
  tools: ToolPayload[];
}

export interface AuditRecommendation {
  toolName: string;
  currentPlan: string;
  recommendedPlan: string;
  currentSpend: number;
  optimizedSpend: number;
  savings: number;
  action: "downgrade" | "upgrade" | "switch" | "stay";
  reason: string;
}

export interface AuditResult {
  totalCurrentSpend: number;
  totalOptimizedSpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  recommendations: AuditRecommendation[];
  summary?: string;
}

export interface CreateAuditResponse {
  success: boolean;
  auditId: string;
  publicId: string;
  result: AuditResult;
}

export interface PublicAuditResponse {
  success: boolean;
  audit: {
    auditId: string;
    publicId: string;
    tools: ToolPayload[];
    teamSize: number;
    useCase: AuditPayload["useCase"];
    result: AuditResult;
    createdAt?: string;
  };
}
