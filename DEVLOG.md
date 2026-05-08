## Day 1 -- 2026-05-06
**Hours worked:** 2
**What I did:** Started the assignment by rereading the Credex brief carefully and treating it as a product problem rather than a normal coding challenge. I chose a MERN-style split with TypeScript, set up the client and server folders, installed the initial dependencies, and created the first versions of the Audit and Lead models. I also spent time deciding what belongs on the backend versus the frontend, especially around audit logic and persistence.
**What I learned:** The project is really testing product judgment and shipping discipline, not just whether I can scaffold a web app quickly. The audit logic is going to be the most important part of the product because that is where trust is won or lost.
**Blockers / what I'm stuck on:** I was not blocked yet, but I was still uncertain about how detailed the audit logic should be and how to make the recommendations feel financially defensible instead of generic.
**Plan for tomorrow:** Start building the audit engine, define the first pricing data structure, and connect the initial backend routes.

## Day 2 -- 2026-05-07
**Hours worked:** 6
**What I did:** Built most of the initial backend structure including controllers, routes, validators, and the first version of the audit engine. After that I moved into the frontend, created the shared app structure, and designed the landing page, audit page, and results page. I also started wiring the frontend to the backend through service files so the UI could move away from static mock data.
**What I learned:** UI polish matters a lot more in product work than it does in isolated coding exercises. I also got a better feel for keeping API logic separated from components so the frontend remains easier to reason about during integration.
**Blockers / what I'm stuck on:** The frontend-backend contract was still rough, especially around matching backend response shapes to frontend state and navigation flow.
**Plan for tomorrow:** Finish the integration, harden the runtime scripts, and close the biggest gaps between the current repo and the actual Credex submission requirements.

## Day 3 -- 2026-05-08
**Hours worked:** 7
**What I did:** Today was about turning the project from “mostly built” into something closer to submission shape. I started with a repo audit against the PDF, which showed that the biggest risks were not just bugs but missing requirements. I fixed the backend so it can run from `server/` instead of only `server/src`, then improved the audit flow with richer tool coverage, AI summary generation at audit creation time, better share-page behavior, and a real lead-capture form after the user sees value. I also added CI and wrote the required markdown files including README, ARCHITECTURE, TESTS, PRICING_DATA, PROMPTS, GTM, ECONOMICS, LANDING_COPY, METRICS, and REFLECTION. I intentionally did not fake `USER_INTERVIEWS.md`; I left a real structure for actual conversations instead.
**What I learned:** This assignment rewards honesty and product clarity as much as raw code output. It is safer to say “this still needs real interviews and deployment” than to submit something that sounds polished but is easy to disprove.
**Blockers / what I'm stuck on:** The remaining blockers are mostly production-readiness tasks: real deployment, screenshots or a demo video, a tighter pricing-validation pass, and three actual user interviews.
**Plan for tomorrow:** Tighten the pricing and recommendation logic further, prepare deployment, gather screenshots, and start the real interviews so the remaining docs can be grounded in actual feedback.
