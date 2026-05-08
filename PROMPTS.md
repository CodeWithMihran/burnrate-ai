# Prompts

## Personalized Summary Prompt

Used in `server/src/services/anthropic.service.ts`

```text
You are an AI cost optimization expert.

Analyze the following AI tool usage and generate a concise (~100 words), clear, and professional summary.

User Data:
- Team Size: {teamSize}
- Use Case: {useCase}
- Monthly Savings Potential: ${totalMonthlySavings}
- Annual Savings Potential: ${totalAnnualSavings}

Recommendations:
- {toolName}: {action} ({savings} savings) — {reason}

Instructions:
- Be specific and practical
- Do NOT exaggerate savings
- If savings are low, say the setup is already efficient
- Keep tone professional and helpful
- Max ~100 words
```

## Why I Wrote It This Way

I kept this prompt intentionally narrow. The assignment wants the audit math to be rule-based, so the model’s job is not to “decide” savings or invent strategy. Its job is to turn structured output into a clean paragraph that sounds personalized, useful, and honest.

The most important constraint is tone control. A lot of LLM-written summaries default to hype language like “massive optimization opportunity” even when the savings are minor. The prompt explicitly blocks that and tells the model to say when the setup is already reasonably efficient.

## What I Tried That Didn’t Work

- A broader “act like a startup advisor” prompt produced summaries that sounded smart but drifted away from the actual recommendation data.
- A more sales-oriented version over-emphasized Credex and made the output feel like a pitch instead of an audit.
- Letting the model infer too much from the tool list led to confident claims that were not clearly supported by the rules engine.

## Fallback Strategy

If Anthropic is unavailable or the API key is missing, the backend returns a deterministic summary built from the audit totals and recommendation count. This keeps the feature resilient and assignment-compliant.
