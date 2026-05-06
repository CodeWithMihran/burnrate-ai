import { z } from "zod";

export const toolSchema = z.object({
  toolName: z.string(),
  plan: z.string(),
  monthlySpend: z.number().min(0),
  seats: z.number().min(1),
});

export const auditInputSchema = z.object({
  tools: z.array(toolSchema).min(1),
  teamSize: z.number().min(1),
  useCase: z.enum(["coding", "writing", "data", "research", "mixed"]),
});