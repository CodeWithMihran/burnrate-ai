export interface Plan {
  name: string;
  pricePerSeat: number;
  features: string[];
}

export interface ToolPricing {
  toolName: string;
  plans: Plan[];
}

/**
 * NOTE:
 * Prices should reflect real-world (approx acceptable for assignment)
 */

export const pricingData: ToolPricing[] = [
  {
    toolName: "ChatGPT",
    plans: [
      {
        name: "Free",
        pricePerSeat: 0,
        features: ["basic usage"],
      },
      {
        name: "Plus",
        pricePerSeat: 20,
        features: ["GPT-4 access", "better speed"],
      },
      {
        name: "Team",
        pricePerSeat: 30,
        features: ["collaboration", "admin controls"],
      },
    ],
  },
  {
    toolName: "Claude",
    plans: [
      {
        name: "Free",
        pricePerSeat: 0,
        features: ["limited usage"],
      },
      {
        name: "Pro",
        pricePerSeat: 20,
        features: ["higher limits"],
      },
    ],
  },
];