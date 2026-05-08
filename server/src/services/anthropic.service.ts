import Anthropic from "@anthropic-ai/sdk";

interface SummaryInput {
  tools: any[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  recommendations: any[];
  useCase: string;
  teamSize: number;
}

export const generateSummary = async (data: SummaryInput): Promise<string> => {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const prompt = buildPrompt(data);

  const response = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 200,
    temperature: 0.4,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const text = response.content[0];

  if (text.type === "text") {
    return text.text.trim();
  }

  throw new Error("Invalid AI response format");
};

/**
 * Prompt Builder
 * IMPORTANT: You will copy this to PROMPTS.md later
 */
const buildPrompt = (data: SummaryInput): string => {
  return `
You are an AI cost optimization expert.

Analyze the following AI tool usage and generate a concise (~100 words), clear, and professional summary.

User Data:
- Team Size: ${data.teamSize}
- Use Case: ${data.useCase}
- Monthly Savings Potential: $${data.totalMonthlySavings}
- Annual Savings Potential: $${data.totalAnnualSavings}

Recommendations:
${data.recommendations
  .map(
    (rec: any) =>
      `- ${rec.toolName}: ${rec.action} (${rec.savings} savings) — ${rec.reason}`
  )
  .join("\n")}

Instructions:
- Be specific and practical
- Do NOT exaggerate savings
- If savings are low, say the setup is already efficient
- Keep tone professional and helpful
- Max ~100 words
`;
};
