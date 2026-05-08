export type PlanKind = "seat" | "usage" | "custom";

export interface PlanDefinition {
  name: string;
  kind: PlanKind;
  monthlyPricePerSeat?: number;
  minSeats?: number;
  suitableUseCases?: string[];
  notes?: string;
}

export interface ToolDefinition {
  toolName: string;
  category: "assistant" | "coding" | "api";
  supportsCredits: boolean;
  plans: PlanDefinition[];
}

const normalize = (value: string) => value.trim().toLowerCase();

export const pricingCatalog: ToolDefinition[] = [
  {
    toolName: "Cursor",
    category: "coding",
    supportsCredits: true,
    plans: [
      { name: "Hobby", kind: "seat", monthlyPricePerSeat: 0 },
      {
        name: "Pro",
        kind: "seat",
        monthlyPricePerSeat: 20,
        suitableUseCases: ["coding", "mixed"],
      },
      {
        name: "Business",
        kind: "seat",
        monthlyPricePerSeat: 40,
        minSeats: 3,
        suitableUseCases: ["coding", "mixed"],
      },
      {
        name: "Enterprise",
        kind: "custom",
        notes: "Enterprise pricing is custom and not publicly listed as a flat seat fee.",
      },
    ],
  },
  {
    toolName: "GitHub Copilot",
    category: "coding",
    supportsCredits: false,
    plans: [
      {
        name: "Individual",
        kind: "seat",
        monthlyPricePerSeat: 10,
        suitableUseCases: ["coding", "mixed"],
      },
      {
        name: "Business",
        kind: "seat",
        monthlyPricePerSeat: 19,
        minSeats: 3,
        suitableUseCases: ["coding", "mixed"],
      },
      {
        name: "Enterprise",
        kind: "custom",
        notes: "Enterprise pricing typically depends on contract terms and bundled governance features.",
      },
    ],
  },
  {
    toolName: "ChatGPT",
    category: "assistant",
    supportsCredits: true,
    plans: [
      {
        name: "Plus",
        kind: "seat",
        monthlyPricePerSeat: 20,
        suitableUseCases: ["writing", "research", "mixed", "data"],
      },
      {
        name: "Team",
        kind: "seat",
        monthlyPricePerSeat: 25,
        minSeats: 2,
        suitableUseCases: ["writing", "research", "mixed", "data"],
      },
      {
        name: "Enterprise",
        kind: "custom",
        notes: "Enterprise pricing is sales-led and should not be reduced to a fake public seat number.",
      },
      {
        name: "API Direct",
        kind: "usage",
        notes: "Usage-based pricing depends on token volume and model mix.",
      },
    ],
  },
  {
    toolName: "Claude",
    category: "assistant",
    supportsCredits: true,
    plans: [
      { name: "Free", kind: "seat", monthlyPricePerSeat: 0 },
      {
        name: "Pro",
        kind: "seat",
        monthlyPricePerSeat: 20,
        suitableUseCases: ["writing", "research", "mixed", "data"],
      },
      {
        name: "Max",
        kind: "seat",
        monthlyPricePerSeat: 100,
        suitableUseCases: ["research", "data"],
      },
      {
        name: "Team",
        kind: "seat",
        monthlyPricePerSeat: 30,
        minSeats: 2,
        suitableUseCases: ["writing", "research", "mixed", "data"],
      },
      {
        name: "Enterprise",
        kind: "custom",
        notes: "Enterprise pricing is custom and should be modeled conservatively.",
      },
      {
        name: "API Direct",
        kind: "usage",
        notes: "Usage-based pricing depends on model, token mix, and caching behavior.",
      },
    ],
  },
  {
    toolName: "Anthropic API",
    category: "api",
    supportsCredits: true,
    plans: [
      {
        name: "API Direct",
        kind: "usage",
        notes: "Usage-based spend should be optimized via procurement or model mix, not fake seat pricing.",
      },
    ],
  },
  {
    toolName: "OpenAI API",
    category: "api",
    supportsCredits: true,
    plans: [
      {
        name: "API Direct",
        kind: "usage",
        notes: "Usage-based spend should be optimized via procurement or model mix, not fake seat pricing.",
      },
    ],
  },
  {
    toolName: "Gemini",
    category: "assistant",
    supportsCredits: false,
    plans: [
      {
        name: "Pro",
        kind: "seat",
        monthlyPricePerSeat: 19.99,
        suitableUseCases: ["writing", "research", "mixed", "data"],
      },
      {
        name: "Ultra",
        kind: "seat",
        monthlyPricePerSeat: 249.99,
        suitableUseCases: ["research", "data"],
      },
      {
        name: "API",
        kind: "usage",
        notes: "Gemini API pricing is usage-based rather than a flat per-seat subscription.",
      },
    ],
  },
  {
    toolName: "Windsurf",
    category: "coding",
    supportsCredits: false,
    plans: [
      { name: "Free", kind: "seat", monthlyPricePerSeat: 0 },
      {
        name: "Pro",
        kind: "seat",
        monthlyPricePerSeat: 20,
        suitableUseCases: ["coding", "mixed"],
      },
      {
        name: "Teams",
        kind: "seat",
        monthlyPricePerSeat: 30,
        minSeats: 3,
        suitableUseCases: ["coding", "mixed"],
      },
      {
        name: "Enterprise",
        kind: "custom",
        notes: "Enterprise pricing is not published as a standard list price.",
      },
    ],
  },
];

export const findToolDefinition = (toolName: string) =>
  pricingCatalog.find((tool) => normalize(tool.toolName) === normalize(toolName));

export const normalizePlanName = (toolName: string, planName: string) => {
  const normalizedTool = normalize(toolName);
  const normalizedPlan = normalize(planName);

  if (normalizedPlan === "api direct") {
    return "API Direct";
  }

  if (normalizedPlan === "api") {
    return "API";
  }

  if (normalizedTool === "github copilot" && normalizedPlan === "pro") {
    return "Individual";
  }

  if (normalizedTool === "chatgpt" && normalizedPlan === "business") {
    return "Team";
  }

  return planName.trim();
};

export const findPlanDefinition = (toolName: string, planName: string) =>
  findToolDefinition(toolName)?.plans.find(
    (plan) =>
      normalize(plan.name) === normalize(normalizePlanName(toolName, planName))
  );
