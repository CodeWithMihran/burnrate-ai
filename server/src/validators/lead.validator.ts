import { z } from "zod";

export const leadInputSchema = z.object({
  email: z.string().email(),
  companyName: z.string().optional(),
  role: z.string().optional(),
  teamSize: z.number().min(1).optional(),
  auditId: z.string(),
  intent: z.enum(["report", "notify", "consult"]).optional(),
  consultationNotes: z.string().max(500).optional(),
  preferredContactWindow: z.string().max(120).optional(),
});
