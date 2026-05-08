import { runAuditEngine } from "../../services/audit/auditEngine";

describe("audit rule reasoning", () => {
  it("explains why a downgrade is recommended", () => {
    const result = runAuditEngine({
      teamSize: 2,
      useCase: "coding",
      tools: [
        {
          toolName: "Cursor",
          plan: "Business",
          monthlySpend: 80,
          seats: 2,
        },
      ],
    });

    expect(result.recommendations[0].reason).toContain("2 seat");
    expect(result.recommendations[0].recommendedPlan).toBe("Pro");
  });
});
