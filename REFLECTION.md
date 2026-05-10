# Reflection

## The hardest problem I hit, and how I worked through it

The hardest part of the project was that it kept changing category. At the beginning it looked like a typical full-stack build problem: define the models, wire the routes, build the pages, and connect the client to the server. But the deeper challenge showed up later, when I realized the assignment is not really grading "can you make a web app run?" It is grading whether the whole thing behaves like a believable product.

That meant the real difficulty was not a single bug. It was the chain of smaller mismatches that made the product feel unreliable:

- frontend and backend response-shape mismatches
- rough navigation and integration flow
- backend package/runtime structure issues
- deployment failures on Render
- MongoDB Atlas access problems
- frontend routing issues for shared URLs
- environment-variable mistakes that quietly broke sharing

I debugged all of this by forcing myself to shrink the problem repeatedly. Instead of asking "why is the stack broken?" I started asking:

- Does the client build?
- Does the server build?
- Do the tests pass?
- Does the API respond locally?
- Does the deployed API respond?
- Does persistence work?
- Does the public share route work?
- Does the frontend shared route work after redirect?

That changed everything. Once the system was split into verifiable layers, the project became much less overwhelming.

## A decision I reversed, and why I reversed it

The most important decision I reversed was where to spend my attention. Early on I drifted toward frontend polish because visible UI progress feels satisfying and fast. But that was not actually the highest-leverage work.

Mid-week, I recognized that the assignment values:

- defensible logic
- product judgment
- documentation quality
- testing
- consistency

more than surface-level visual flourish alone.

So I changed course. I moved the center of gravity toward:

- rule-based audit logic
- backend validation
- shareable result flow
- persistence
- deployment
- tests
- documentation

That was the right reversal. The project improved more once I treated the result page, public share flow, and trust model as the core product, instead of treating the landing page as the main story.

## What I would build next if I had another week

If I had a second week, I would focus on three things: accuracy, trust, and distribution.

### Accuracy

The current audit engine is strongest on flat seat-based plans. The next improvement would be more honest modeling for:

- OpenAI API spend
- Anthropic API spend
- custom enterprise plans
- annual-vs-monthly procurement differences

Right now the app is conservative in those cases, which is better than pretending precision. But I would still want to make them more explicit, possibly by adding usage buckets or one more field about workload shape.

### Trust

The next trust layer would be making every recommendation more inspectable. I would want each result to show:

- the current pricing benchmark
- the compared plan benchmark
- the assumption used
- the exact reason the recommendation fired

That would turn the audit from "helpful result" into something closer to a mini decision memo.

### Distribution

The product already has the beginnings of a sharing loop, but I would make it stronger by framing the output more comparatively. A founder is more likely to share:

- "we are overspending by 42%"

than:

- "here is a calculator result"

That benchmark-style framing would make the product more conversational and more naturally viral.

## How I used AI tools

I used AI tools as accelerators, not as decision-makers.

They were most useful for:

- speeding up repetitive code work
- helping reason through integration bugs
- tightening wording and UI copy
- surfacing debugging hypotheses faster
- restructuring rough documentation into clearer writing

Where I did not trust them was in the parts that affect product credibility:

- pricing logic
- user interviews
- business claims
- anything that needed to be financially defensible

That is the main reason the audit engine is rule-based. It would have been easy to let the model improvise a "smart" audit, but that would have made the product feel less trustworthy, not more.

One useful lesson from the week is that AI is best when paired with proof. Suggestions become useful only after they are checked against:

- actual routes
- actual logs
- actual deployment behavior
- actual pricing sources

## What I am proud of

I am most proud that the project now feels like a real shipped product rather than a rough assignment scaffold.

It now has:

- a deployed frontend and backend
- a working audit flow
- a working public share flow
- production persistence
- graceful fallback behavior
- a clearer product voice

I am also proud that the product became more honest as it improved. It would have been easy to overclaim savings, overuse AI, or fake certainty around enterprise/API cases. I think the current version is stronger because it is willing to stay conservative where it should.

## What still feels incomplete

The project is in a good technical state, but the submission is not finished until the external validation work is done. The biggest remaining gaps are:

- real user interviews
- final business-side docs polish
- optional email infrastructure
- even tighter pricing proof for the trickiest cases

That is actually a useful kind of unfinished. It means the remaining work is less about fixing core product failures and more about strengthening the evidence around the product.

## Self-rating

### Discipline - 8/10

I kept strong momentum, especially once the project shifted from local implementation into deployment and finalization. The score is not higher only because the remaining research and documentation still need to be fully closed out.

### Code quality - 8/10

The codebase is far healthier than where it started. It builds, tests, deploys, persists, and handles degraded optional services gracefully. The main reason I am not rating this higher is that API-direct and enterprise recommendation fidelity can still improve.

### Design sense - 8/10

The interface became much more intentional over the week. It is not just more polished than before; it is clearer and more product-shaped. There is still room to improve layout stability and fine-grained performance, but the overall direction is strong.

### Problem-solving - 9/10

This was the strongest part of the project. The repo had several moments where it could have stayed in a half-working state, especially around deployment and sharing. I think the biggest win was continuing until the product actually worked end to end in production.

### Entrepreneurial thinking - 7/10

The product concept, GTM direction, and audit positioning are moving in the right direction. I am deliberately keeping this rating below the technical ones because entrepreneurial thinking becomes more real once it is backed by outside user feedback, not just internal reasoning.
