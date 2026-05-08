# REFLECTION

## 1. The hardest bug I hit this week, and how I debugged it

The hardest bug was not a single syntax issue; it was a full integration mismatch between the frontend flow and the backend contract. The frontend was trying to navigate using response fields that did not match the backend shape, the app shell itself was incomplete, and the backend package structure caused npm commands to fail depending on which folder I ran them from. That made the project feel more broken than it really was because the issues were spread across routing, scripts, and data flow.

I debugged it by shrinking the problem. First I verified what actually existed: routes, page files, scripts, and package locations. Then I ran the client build, backend build, and tests separately instead of assuming “the stack is broken.” That gave me a concrete list of failures. From there I fixed the shell and routing first, then the API contract, then the backend dev/build scripts, and only after that touched product-level features. The main lesson was that debugging gets much faster when I stop treating the repo like one giant problem and start proving each layer independently.

## 2. A decision you reversed mid-week, and what made you reverse it

Early on I treated the app like a normal frontend-first assignment and spent time on layout and page polish before finishing the real user flow. Mid-week I reversed that and moved the center of gravity to the backend contract and audit pipeline. The assignment made it clear that this is not a landing-page challenge; it is a “ship a usable product” challenge, and the shareable audit output matters more than how fast I can make the hero section look good.

The reversal happened once I saw how much the scoring rubric emphasizes defensible logic, docs, tests, and entrepreneurial thinking. A beautiful page with weak audit reasoning would score badly. After that, I deliberately shifted toward rule-based recommendations, backend validation, lead capture, test coverage, and documentation. I still care about the UI, but the week became much more productive once I stopped optimizing for surface polish too early.

## 3. What I would build in week 2 if I had it

Week 2 would go into three areas: accuracy, trust, and distribution. On accuracy, I would improve API-direct modeling because usage-based products are harder to evaluate than flat seat plans. I would add explicit usage buckets or lightweight prompt inputs like “light / medium / heavy API usage” so the engine could reason more honestly about Anthropic API and OpenAI API spend. I would also version pricing snapshots and add more regression tests against real scenarios.

On trust, I would improve public share pages by server-rendering or pre-rendering them so Open Graph previews work reliably on X, Slack, and LinkedIn. I would also add better evidence inside the audit itself, such as “why this recommendation exists” toggles and links back to pricing references.

On distribution, I would add benchmark framing and sharing hooks. A founder is much more likely to post “we’re spending 42% above the benchmark for our team size” than just a generic savings screenshot. That turns the audit into a conversation starter, not only a calculator.

## 4. How I used AI tools

I used AI tools as a coding and writing assistant, not as an autopilot. I used Codex/ChatGPT-style help for integration debugging, scaffolding repetitive code, tightening copy, and pressure-testing how the user flow should feel end to end. I did not trust AI to invent pricing logic, fabricate user understanding, or make product claims that were not grounded in the assignment. The audit engine itself is intentionally rule-based because that is where precision matters more than fluency.

One specific time the AI was wrong was around backend structure. It pushed the project into a shape where the backend `package.json` lived under `server/src`, which made npm commands fail from the expected `server/` directory. That looked small at first, but it created real developer friction. I caught it because I tested the commands from the actual working directory instead of assuming the generated structure was fine. That reinforced the main rule I use with AI: it is helpful for acceleration, but it still needs an adult in the loop.

## 5. Self-rating

### Discipline — 7/10

I kept momentum and made real product progress, but the repo still needs stronger day-by-day consistency to fully satisfy the assignment’s git-history standard.

### Code quality — 7/10

The code is cleaner and more stable than it was at the start, with better contracts, tests, and fallback handling, but the audit engine still needs a second pass for deeper pricing fidelity.

### Design sense — 8/10

The product already feels more intentional than a default dashboard clone, especially on the landing and results pages, and it is moving in the right direction for a shareable B2B utility.

### Problem-solving — 8/10

The strongest part of the week was turning a partially broken repo into a working end-to-end flow by isolating failures and fixing them in the right order.

### Entrepreneurial thinking — 6/10

I understand the business shape of the opportunity, but the score stays moderate until the pricing proof, GTM framing, and real user interviews are all fully reflected in the product and docs.
