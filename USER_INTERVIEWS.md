# User Interviews

## Research Goal

The goal of these interviews was not to collect polite praise. I wanted to learn whether BurnRate.ai feels understandable, trustworthy, and practically useful to people who already live with AI-tool sprawl, messy billing, or team-software decisions.

More specifically, I wanted to validate five things:

- whether the product idea is immediately clear
- whether the audit input flow feels realistic
- whether the savings output feels believable
- whether the report feels shareable inside a real team
- what kinds of trust gaps still remain

## Interview Format

- Format: lightweight product walkthrough + follow-up conversation
- Length: 10 to 15 minutes each
- Method: participant was shown the deployed product and asked to react to a realistic AI spend audit scenario
- Focus: clarity, trust, usefulness, and willingness to act on the output

These were not formal recorded research sessions. They were fast, practical validation conversations with people relevant to the product.

## Interview 1 - The "Jugaad" Tech Lead

**Participant profile:**  
Rishabh Mallick, Senior Developer / Team Lead at an early-stage FinTech startup with 12 employees.

**Location:**  
Bengaluru (remote)

**Duration:**  
15 minutes

**How I found them:**  
College senior

**Why they were relevant:**  
Rishabh sits close to the exact kind of operator pain this product is trying to address. He leads technical work, touches real tool purchases, and sees the messy overlap between engineering usage, personal cards, shared accounts, and informal team processes.

**What they were asked to do:**  
React to the product as if he were auditing a small engineering-heavy startup stack with multiple paid AI tools, overlapping subscriptions, and shared API access.

**What they understood quickly:**  
He immediately understood the value of a single place to review tool plans, seats, and monthly spend. He did not need a long explanation of the product concept. The "audit" framing made sense right away because he already thinks about tool costs as something operational rather than purely financial.

**What felt strongest to them:**  
The strongest part for him was the idea of surfacing wasted seats and duplicate subscriptions in a way that could be shared internally. He liked the report-oriented framing more than a generic dashboard framing because it felt closer to something he could actually use with a founder or finance person.

**What felt weakest or incomplete:**  
His biggest pushback was that spend visibility alone is not enough for a technical lead. He wanted stronger accountability around who is actually driving usage, especially in API-heavy setups. He also implicitly raised a limitation of the current MVP: it can estimate savings, but it cannot identify which individual user or workflow is responsible for the waste.

**Did they trust the output?**  
He trusted the logic around seats, duplicate spend, and forgotten subscriptions more than the logic around raw API consumption. In other words, he believed the product most when it stayed close to things teams can count directly: licenses, plans, and obviously duplicated spend.

**Would they act on or share it?**  
Yes, especially if the report gave him a faster way to challenge unused licenses and duplicate subscriptions. He said the product felt more useful as an internal conversation starter than as a passive expense dashboard.

**Direct quotes:**

> "Bro, my biggest headache is the credit card limits. I'm using my personal ICICI card for half the API credits because the company's corporate card keeps getting declined on international gateways."

> "I realized last week we have three different 'Pro' subscriptions for Claude under three different personal Gmails. It's $60 a month just vanishing because nobody wanted to wait for an official 'Team' invite."

> "Don't just show me the spend. Show me who to yell at. I need to know which dev is running heavy 'O1-preview' queries on the company API key for their personal hobby projects."

**Most surprising moment:**  
Rishabh admitted that a GitHub Copilot subscription for a developer who left two months earlier was still active simply because nobody could remember which email address was originally used to sign up.

**What this changed in my thinking:**  
This conversation reinforced that seat-count logic matters only if it reflects reality rather than headcount alone. It pushed me to take seat-right-sizing more seriously and to treat "paid seats versus actual users" as a real trust signal in the audit. It also clarified that technical users will want more accountability around API spend than the current MVP can honestly provide.

---

## Interview 2 - The Overwhelmed Agency Owner

**Participant profile:**  
Ananya Iyer, Founder / Creative Director of a bootstrapped content agency.

**Location:**  
Mumbai

**Duration:**  
12 minutes

**How I found them:**  
LinkedIn outreach

**Why they were relevant:**  
Ananya represents a very different buyer profile from an engineering lead. Her pain is less about API complexity and more about subscription clutter, duplicate creative tools, and constant low-grade anxiety around whether she is paying for things she no longer needs.

**What they were asked to do:**  
React to the product as if she were auditing a small creative-team stack made up of design, writing, and media-generation tools with overlapping use cases.

**What they understood quickly:**  
She quickly understood the value of a yes-or-no style audit for subscription cleanup. She was much less interested in abstract analytics and much more interested in whether the tool could help her decide what to keep, cancel, or consolidate.

**What felt strongest to them:**  
The strongest part for her was the promise of simplifying a messy billing environment into something actionable. She liked the idea of grouping tools by what they are actually used for because that is how she thinks about duplication in practice.

**What felt weakest or incomplete:**  
She had little patience for anything that felt too dashboard-like or overly analytical. Her reaction made it clear that this type of user wants fast operational clarity, not a heavy layer of reporting theater. She also raised a more subtle issue: sometimes the paid plan decision is driven by fear around data privacy, not just features or price.

**Did they trust the output?**  
She said she would trust the output more if the product was very direct about overlap and redundancy. In her mind, the product becomes more believable when it behaves like an opinionated spending checklist rather than a generic savings visualizer.

**Would they act on or share it?**  
She said she would use it if it reduced Sunday-morning finance cleanup and helped her quickly validate whether multiple tools in the same category were truly necessary.

**Direct quotes:**

> "I am paying for Midjourney, Canva Pro, and some random AI video tool I saw on Instagram. I feel like an idiot because my designers just end up using the free version of Leonardo anyway."

> "The invoices are a mess. They hit my account at 3 AM because of the time difference, and I spend my Sunday mornings trying to figure out which 'AI Wrapper' is charging me $29."

> "I don't want a graph. I want a 'Yes/No' list. Should I keep this? Yes. Is this a duplicate? Yes. That's it."

**Most surprising moment:**  
Ananya said that in some cases she pays for higher tiers not because the features are clearly worth it, but because she assumes the free versions might be riskier with client data. In her words, some of her spend behaves more like a "privacy tax" than a feature decision.

**What this changed in my thinking:**  
This interview sharpened how I think about category overlap and decision simplicity. It pushed me away from overcomplicating the product with reporting polish and back toward practical decision support. It also made me more aware that people do not always buy plans for feature reasons alone; perceived safety and client risk can distort spending behavior in ways a pricing-only engine may miss.

---

## Interview 3 - The Indie Hacker Student

**Participant profile:**  
Md. Sahil, Full-Stack Intern / Freelancer working on a pre-revenue side-project startup.

**Location:**  
New Delhi

**Duration:**  
10 minutes

**How I found them:**  
Peer network

**Why they were relevant:**  
Sahil is not a classic startup buyer, but he is useful because he represents a cost-sensitive technical user who thinks in terms of APIs, token pricing, and hacky cost workarounds instead of official team procurement.

**What they were asked to do:**  
React to the product from the perspective of a developer trying to minimize AI spend aggressively while still shipping fast.

**What they understood quickly:**  
He immediately understood the idea of comparing tool spend and hunting for cheaper alternatives. Unlike the agency owner, he naturally framed the product as a technical cost-optimization tool rather than a subscription-cleanup tool.

**What felt strongest to them:**  
He responded most strongly to the possibility of comparing variable-cost usage paths rather than just comparing flat subscriptions. For him, the interesting question is not "what am I paying per seat?" but "what is the cheapest path to the same output?"

**What felt weakest or incomplete:**  
His biggest skepticism was around the limits of a high-level dashboard. He wanted more explicit economics around API cost, token efficiency, and alternative providers. That is fair criticism, and it maps to one of the known current boundaries of the MVP.

**Did they trust the output?**  
He trusted the product least in areas where pricing is highly usage-dependent and provider-specific. He would trust it more if it exposed clearer assumptions for API-direct recommendations.

**Would they act on or share it?**  
He said he would use the product if it became a sharper decision aid for choosing lower-cost API paths or avoiding unnecessary paid subscriptions. He was less excited by the report-sharing angle than the other two participants.

**Direct quotes:**

> "I'm on the 'Free Tier' for everything. I spend more time rotating my API keys to stay under the limit than I do actually coding."

> "The problem with these 'Audit' tools is they assume I have money to waste. I want to know how to get the same results using the cheapest possible API-like switching from GPT-4 to Groq or DeepSeek."

> "If your tool can't show me the 'Price per 1k Tokens' comparison, it's just another dashboard I'll check once and delete."

**Most surprising moment:**  
Sahil explained that he and two friends were informally sharing one Cursor Pro account to split the cost, but because their time zones overlapped, they kept hitting the usage limit in ways that made the subscription less efficient than expected.

**What this changed in my thinking:**  
This interview reinforced that fixed subscription logic is not enough for every user segment. It pushed me to keep the audit flexible around API-direct pricing and to be more explicit about where the product is strongest today versus where it is still conservative. It also reminded me that some users will judge the product on whether it helps them find the cheapest viable path, not just whether it finds waste inside an existing stack.

---

## Cross-Interview Patterns

### What worked consistently

- All three participants understood the product concept quickly once they saw it framed as an AI spend audit rather than a general AI tool.
- The result-page/report framing felt stronger than a raw dashboard framing.
- People responded well to the idea of cleaning up duplicate subscriptions, unnecessary paid seats, or overlapping tools.

### What people questioned

- The more technical the participant, the more they wanted explicit logic around API spend instead of high-level estimates.
- Participants were cautious about any recommendation that looked too abstract or too generalized.
- Different user types want different kinds of simplification: some want team accountability, others want binary keep/cancel guidance, and others want price-efficiency comparisons.

### What increased trust

- Recommendations tied to visible facts such as plan names, seats, and obvious overlap
- Clear savings framing instead of vague "optimization" language
- A report output that could plausibly be shared with someone else

### What reduced trust

- Anything that felt too generic
- Any recommendation that implied precision in API-heavy cases without showing assumptions
- Cases where real-world messiness, like shared accounts or privacy-driven plan choices, sits outside the clean pricing model

## Product Changes and Product Thinking That Came Out Of These Interviews

1. I became more confident that seat-right-sizing and duplicate-subscription logic are among the strongest trust builders in the product.
2. I narrowed the product voice further toward practical decision support instead of dashboard-style reporting.
3. I became more careful about claiming too much precision in API-direct and enterprise-heavy cases.
4. I clarified for myself that the product is strongest today for structured subscription and seat-spend review, and more conservative for messy usage-based economics.

## Overall Reflection

These interviews were useful because they did not all ask for the same thing. The engineering lead cared about accountability and unused seats. The agency owner cared about simplification and overlap. The indie hacker cared about the cheapest technical path possible. That spread was valuable because it showed that the core product idea is solid, but the reasons people would trust or adopt it vary a lot by user type.

The biggest takeaway is that BurnRate.ai becomes more believable when it stays grounded in countable facts and honest reasoning. When the product says "this seat looks wasted" or "these plans overlap," people lean in. When it starts drifting toward implied certainty in API-heavy cases, trust drops. That is a helpful boundary for the product, and it is one I would rather understand now than hide behind more polished copy.
