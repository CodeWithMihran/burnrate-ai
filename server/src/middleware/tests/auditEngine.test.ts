import { runAuditEngine } from "../../services/audit/auditEngine";

describe("runAuditEngine", () => {
  it("identifies downgrade savings on a small ChatGPT team subscription", () => {
    const result = runAuditEngine({
      teamSize: 2,
      useCase: "coding",
      tools: [
        {
          toolName: "ChatGPT",
          plan: "Team",
          monthlySpend: 60,
          seats: 2,
        },
      ],
    });

    expect(result.totalMonthlySavings).toBe(24);
    expect(result.recommendations[0].recommendedPlan).toBe("Plus");
    expect(result.recommendations[0].action).toBe("downgrade");
  });

  it("right-sizes an overpriced one-seat ChatGPT team subscription", () => {
    const result = runAuditEngine({
      teamSize: 1,
      useCase: "writing",
      tools: [
        {
          toolName: "ChatGPT",
          plan: "Team",
          monthlySpend: 35,
          seats: 1,
        },
      ],
    });

    expect(result.recommendations[0].recommendedPlan).toBe("Plus");
    expect(result.recommendations[0].action).toBe("downgrade");
    expect(result.totalMonthlySavings).toBe(17);
  });

  it("detects overpriced retail spend and recommends credits-backed procurement", () => {
    const result = runAuditEngine({
      teamSize: 10,
      useCase: "coding",
      tools: [
        {
          toolName: "Cursor",
          plan: "Pro",
          monthlySpend: 90,
          seats: 2,
        },
      ],
    });

    expect(result.recommendations[0].action).toBe("switch");
    expect(result.recommendations[0].optimizedSpend).toBe(34);
    expect(result.totalMonthlySavings).toBe(56);
  });

  it("keeps unknown tools unchanged", () => {
    const result = runAuditEngine({
      teamSize: 4,
      useCase: "mixed",
      tools: [
        {
          toolName: "Unknown Tool",
          plan: "Starter",
          monthlySpend: 42,
          seats: 2,
        },
      ],
    });

    expect(result.recommendations[0].action).toBe("stay");
    expect(result.totalMonthlySavings).toBe(0);
  });

  it("aggregates totals across multiple tools", () => {
    const result = runAuditEngine({
      teamSize: 3,
      useCase: "research",
      tools: [
        {
          toolName: "ChatGPT",
          plan: "Team",
          monthlySpend: 60,
          seats: 2,
        },
        {
          toolName: "GitHub Copilot",
          plan: "Business",
          monthlySpend: 38,
          seats: 2,
        },
      ],
    });

    expect(result.totalCurrentSpend).toBe(98);
    expect(result.totalOptimizedSpend).toBe(56);
    expect(result.totalMonthlySavings).toBe(42);
    expect(result.totalAnnualSavings).toBe(504);
  });
});
