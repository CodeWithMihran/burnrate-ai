import { Resend } from "resend";

interface SendAuditEmailInput {
  to: string;
  audit: {
    publicId: string;
    result: {
      totalMonthlySavings: number;
      totalAnnualSavings: number;
    };
  };
  isHighValue: boolean;
}

export const sendAuditEmail = async ({
  to,
  audit,
  isHighValue,
}: SendAuditEmailInput) => {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    console.warn("Email provider not configured. Skipping transactional email.");
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const consultationLine = isHighValue
    ? "Your savings potential is high enough that Credex should follow up with a consultation."
    : "We will keep you posted when new optimizations apply to your stack.";

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Your BurnRate.ai audit is ready",
    text: [
      `Monthly savings estimate: $${audit.result.totalMonthlySavings}`,
      `Annual savings estimate: $${audit.result.totalAnnualSavings}`,
      `Public report: ${process.env.APP_URL || "http://localhost:5173"}/share/${audit.publicId}`,
      consultationLine,
    ].join("\n"),
  });
};
