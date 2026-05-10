# Pricing Data

## Verification Standard

This file documents the public pricing references used to support BurnRate.ai's audit logic. The goal is not to pretend every AI vendor exposes perfectly clean pricing for every use case. The goal is to be explicit about:

- what is directly traceable to an official pricing page
- what is usage-based rather than seat-based
- what is enterprise/custom and therefore modeled conservatively
- where the application normalizes plan names for a cleaner user experience

**Verification date:** 2026-05-10  
**Pricing basis:** public US-facing pricing pages unless otherwise noted  
**Important constraint:** enterprise/custom plans are not assigned fake exact prices when the vendor does not publish them

## How the App Uses This Data

BurnRate.ai currently supports a mix of:

- flat self-serve seat plans
- custom enterprise plans
- API-direct usage models

The rule engine is strongest when public seat pricing is available. For API-direct and enterprise cases, the system uses more conservative logic because:

- the form collects monthly spend, not token logs or contract schedules
- many vendors do not publish a single enterprise list price
- some tools now mix seat pricing with usage credits or premium request allowances

## Tool Catalog Mapping Notes

- The product label `ChatGPT Team` maps to OpenAI's currently published `Business` self-serve workspace pricing.
- The product label `GitHub Copilot Individual` maps to GitHub's public individual plan pricing.
- The product label `Gemini Pro` maps to Google's current `Google AI Pro` consumer subscription naming.
- The product label `Windsurf Teams` follows Windsurf's team-tier pricing references.
- `API Direct` labels are intentionally modeled as usage-based, not fake per-seat prices.

## Pricing Sources By Tool

### Cursor

Official source: [Cursor Pricing](https://cursor.com/pricing)

- Hobby: $0/month
- Pro: $20/month
- Pro+: $60/month
- Ultra: $200/month
- Teams: $40/user/month
- Enterprise: custom / contact sales

Audit-engine use:

- app currently uses `Hobby`, `Pro`, `Business`, and `Enterprise`
- `Business` in the app maps to Cursor's current `Teams` price point of $40/user/month
- enterprise is treated as custom

### GitHub Copilot

Official sources:

- [GitHub Copilot plans](https://github.com/features/copilot/plans)
- [GitHub Docs pricing comparison](https://docs.github.com/en/copilot/get-started/plans)
- [Organization and enterprise billing](https://docs.github.com/copilot/concepts/billing/billing-for-enterprises)

Published pricing:

- Free: $0/month
- Pro: $10/user/month
- Pro+: $39/user/month
- Business: $19/user/month
- Enterprise: $39/user/month

Audit-engine use:

- app currently uses `Individual`, `Business`, and `Enterprise`
- `Individual` maps to the public individual paid plan price of $10/user/month
- `Business` maps to $19/user/month
- `Enterprise` maps to $39/user/month

### ChatGPT

Official source: [OpenAI ChatGPT Pricing](https://openai.com/chatgpt/pricing)

Published pricing:

- Free: $0/month
- Plus: $20/month
- Pro: $200/month
- Business: $25/user/month billed annually or $30/user/month billed monthly
- Enterprise: contact sales / custom

Audit-engine use:

- app currently uses `Plus`, `Team`, `Enterprise`, and `API Direct`
- `Team` in the app maps to OpenAI's current `Business` workspace tier
- for conservative rule logic, the effective self-serve workspace benchmark is:
  - $25/user/month annual
  - $30/user/month monthly
- current engine uses a simplified seat benchmark rather than modeling annual-vs-monthly procurement paths separately

### OpenAI API

Official source: [OpenAI API Pricing](https://openai.com/api/pricing/)

Representative published pricing on verification date:

- GPT-5.5 input: $5.00 / 1M tokens
- GPT-5.5 cached input: $0.50 / 1M tokens
- GPT-5.5 output: $30.00 / 1M tokens
- GPT-5.4 input: $2.50 / 1M tokens
- GPT-5.4 output: $15.00 / 1M tokens
- GPT-5.4 mini input: $0.75 / 1M tokens
- GPT-5.4 mini output: $4.50 / 1M tokens

Audit-engine use:

- the app does not try to infer token-level costs from raw prompt volume
- instead, it treats OpenAI API entries as usage-based current spend inputs and looks for conservative optimization or procurement opportunities

### Claude

Official sources:

- [Claude Pro pricing](https://support.anthropic.com/en/articles/8325610-how-much-does-claude-pro-cost)
- [Claude Max pricing](https://support.anthropic.com/en/articles/11049744-how-much-does-the-max-plan-cost)
- [Claude Team pricing](https://support.anthropic.com/en/articles/9267305-what-is-the-pricing-for-the-team-plan)
- [Anthropic pricing docs](https://www.anthropic.com/pricing)

Published pricing:

- Free: $0/month
- Pro: $20/month
- Max 5x: $100/month
- Max 20x: $200/month
- Team: $25/user/month billed annually or $30/user/month billed monthly
- Enterprise: contact sales / custom

Audit-engine use:

- app currently uses `Free`, `Pro`, `Max`, `Team`, `Enterprise`, and `API Direct`
- `Max` in the app is treated as a high-usage premium tier
- `Team` follows Anthropic's published team pricing
- `Enterprise` is treated conservatively as custom

### Anthropic API

Official source: [Anthropic API pricing](https://docs.anthropic.com/en/docs/about-claude/pricing)

Representative published pricing on verification date:

- Claude Sonnet 4 input: $3 / 1M tokens
- Claude Sonnet 4 output: $15 / 1M tokens
- Claude Opus 4 input: $15 / 1M tokens
- Claude Opus 4 output: $75 / 1M tokens
- Claude Haiku 3.5 input: $0.80 / 1M tokens
- Claude Haiku 3.5 output: $4 / 1M tokens

Audit-engine use:

- app treats Anthropic API as usage-based spend
- no fake per-seat assumptions are imposed on API workloads

### Gemini

Official source: [Google Gemini / Google AI subscriptions](https://gemini.google/subscriptions/)

Published pricing visible on the US-facing subscription page:

- Free: $0/month
- Google AI Plus: $7.99/month
- Google AI Pro: $19.99/month
- Google AI Ultra: $249.99/month

Audit-engine use:

- app currently uses `Pro`, `Ultra`, and `API`
- `Pro` maps to Google's current `Google AI Pro` pricing
- `Ultra` maps to Google AI Ultra
- API is treated as usage-based rather than seat-based

### Windsurf

Official sources:

- [Windsurf pricing](https://windsurf.com/pricing)
- [Windsurf plans and usage docs](https://docs.windsurf.com/windsurf/accounts/usage)

Published pricing:

- Free: $0/month
- Pro: $20/month
- Max: $200/month
- Teams: $40/user/month
- Enterprise: contact sales / custom

Audit-engine use:

- app currently uses `Free`, `Pro`, `Teams`, and `Enterprise`
- teams maps to $40/user/month
- enterprise is treated as custom

## Recommendation Logic Boundaries

### Strongest cases

The current engine is most defensible when all of the following are true:

- the tool has a public flat monthly price
- seat count is known
- the current plan is clearly mismatched for team size
- the lower or alternative plan has a straightforward public benchmark

### More conservative cases

The engine becomes intentionally more cautious when:

- the vendor has custom enterprise pricing
- the plan is API-direct and usage-based
- the tool mixes request credits, premium request allowances, or pooled quotas into the plan structure

In those cases, the app is designed to avoid fake precision.

## Final Notes

- This file is meant to make the pricing logic auditable, not to imply that every vendor pricing surface is stable
- The verification date matters; these pages evolve often
- If this product were extended further, the next improvement would be versioning the pricing catalog and attaching regression tests to every vendor-plan mapping
