# Prompts

## Prompt Philosophy

The assignment rewards judgment, not just model usage. Because of that, BurnRate.ai uses AI only in a narrow, well-contained part of the product: converting a structured audit result into a readable summary.

The model does not decide:

- how much a team can save
- which plan is a better fit
- whether a recommendation should be downgrade, switch, stay, or consult

Those decisions all come from the rule-based audit engine. The prompt exists only to summarize already-computed facts in plain language.

## Primary Summary Prompt

Used in [server/src/services/anthropic.service.ts](D:/Mihran/Git%20(Learning%20Phase)/burnrate-ai/server/src/services/anthropic.service.ts)

```text
You are an AI cost optimization expert.

Analyze the following AI tool usage and generate a concise (~100 words), clear, and professional summary.

User Data:
- Team Size: {teamSize}
- Use Case: {useCase}
- Monthly Savings Potential: ${totalMonthlySavings}
- Annual Savings Potential: ${totalAnnualSavings}

Recommendations:
- {toolName}: {action} ({savings} savings) - {reason}

Instructions:
- Be specific and practical
- Do NOT exaggerate savings
- If savings are low, say the setup is already efficient
- Keep tone professional and helpful
- Max ~100 words
```

## Why This Prompt Works For The Product

### 1. It keeps the model in a low-risk role

The model is downstream of the rules engine, not upstream of it. That means the expensive and credibility-sensitive part of the product remains deterministic. This is important because a cost audit loses trust quickly if the explanation sounds intelligent but is not clearly anchored to the underlying recommendation logic.

### 2. It explicitly blocks exaggerated language

A common failure mode for LLM-generated summaries is over-selling the result. A user with small savings should not receive a dramatic "massive optimization opportunity" paragraph. The prompt therefore explicitly tells the model:

- do not exaggerate savings
- say when the stack already looks efficient

This helps the product stay honest in low-savings and medium-savings cases.

### 3. It is short enough for the actual UI

The results page already contains:

- topline savings metrics
- tool-by-tool recommendations
- share controls
- lead/report capture

The summary should support that surface, not overwhelm it. Roughly 100 words is enough to make the report feel more human without turning it into a long wall of copy.

## Prompt Variants I Tried And Rejected

### Startup-advisor framing

I tried broader prompts that asked the model to sound like a startup advisor or operator. They produced summaries that sounded polished but drifted away from the actual audit output. The language got stronger while the grounding got weaker.

### Sales-oriented framing

I also explored a version that made the model sound more like a Credex-oriented assistant. That version weakened trust because it felt too eager to pitch instead of simply explaining the result.

### Freeform recommendation prompting

Any version that asked the model to "analyze the stack and recommend actions" was too risky. It encouraged inference beyond the rule engine and created a chance that the summary would contradict the actual audit.

## Fallback Strategy

The summary layer is intentionally non-critical. If Anthropic is unavailable, invalid, or underfunded, the audit should still complete.

Fallback is handled in [server/src/services/auditSummary.ts](D:/Mihran/Git%20(Learning%20Phase)/burnrate-ai/server/src/services/auditSummary.ts).

Fallback behavior:

- audit still completes successfully
- user still receives totals and recommendations
- product still renders a readable summary
- only the stylistic polish of the summary is reduced

This was not just a theoretical safeguard. During deployed testing, the production app exercised the fallback path when Anthropic credits were insufficient, and the core user flow continued working.

## Why I Kept The Prompt Simple

The temptation in an assignment like this is to show off by making the prompt complex. I think that would have made the product worse. The simpler prompt is better because:

- it is easier to reason about
- it is easier to document
- it is easier to keep aligned with the rules engine
- it reduces the odds of confident but unsupported claims

## If I Extended This Further

If I kept iterating, I would likely add:

1. slightly different summary styles for high-savings, medium-savings, and low-savings outcomes
2. stronger caution language for enterprise and API-direct cases
3. versioned prompt records so summary behavior can be tracked over time
