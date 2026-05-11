# Reflection

## Question 1. What was the hardest problem you hit, and how did you work through it?

The hardest part of the project was that it kept changing category. At the beginning it looked like a normal full-stack assignment: define the models, wire the routes, build the pages, and connect the client to the server. The deeper challenge only became obvious later, when I realized the real question was not "can this app run?" but "does this behave like a believable product?"

The difficult part was not one dramatic bug. It was the chain of smaller mismatches that made the product feel unreliable:

- frontend and backend response-shape mismatches
- rough navigation and integration flow
- backend package and runtime structure issues
- deployment failures on Render
- MongoDB Atlas access problems
- frontend routing issues for public share URLs
- environment-variable mistakes that quietly broke sharing

I worked through this by shrinking the problem repeatedly. Instead of asking "why is the whole stack broken?" I forced the project into layers:

- Does the client build?
- Does the server build?
- Do the tests pass?
- Does the API respond locally?
- Does the deployed API respond?
- Does persistence work?
- Does the backend share route work?
- Does the frontend shared-result route work after redirect?

That approach made the project much less overwhelming. Once each layer became testable on its own, I could stop guessing and start isolating the real failure point.

## Question 2. What is one decision you reversed, and why?

The biggest decision I reversed was where to spend my attention. Early in the week I naturally drifted toward frontend polish because visible UI progress feels satisfying and immediate. But that was not actually the highest-leverage work for this assignment.

As the brief became clearer, I realized it rewards:

- defensible logic
- product judgment
- documentation quality
- testing
- consistency

more than surface-level polish by itself.

So I changed course and moved the center of gravity toward:

- rule-based audit logic
- backend validation
- shareable result flow
- persistence
- deployment
- tests
- documentation

That reversal improved the project a lot. The product started feeling stronger once I treated the result page, public share flow, and trust model as the real core, instead of treating the landing page as the main story.

## Question 3. If you had another week, what would you build next?

If I had another week, I would focus on accuracy, trust, and distribution.

### Accuracy

The current audit engine is strongest on flat seat-based plans. The next improvement would be more honest modeling for:

- OpenAI API spend
- Anthropic API spend
- custom enterprise plans
- annual-versus-monthly procurement differences

Right now the app is deliberately conservative in those cases, which is better than pretending precision. With more time, I would add one more layer of usage-shape inputs so API-direct and enterprise recommendations could become more defensible without becoming noisy.

### Trust

The next trust layer would be making every recommendation more inspectable. I would want each result to show:

- the current pricing benchmark
- the compared plan or procurement benchmark
- the assumption that triggered the recommendation
- the exact reason the recommendation fired

That would push the product closer to a mini finance memo instead of just a savings calculator.

### Distribution

The product already has the beginning of a sharing loop, but I would make the output more comparative and benchmark-driven. A founder is more likely to share:

- "we are overspending by 42%"

than:

- "here is a calculator result"

That kind of framing would make the product easier to discuss internally and more naturally shareable externally.

## Question 4. How did you use AI tools during the build?

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

One of the clearest lessons from the week is that AI becomes useful only when it is paired with proof. Suggestions mattered only after they were checked against:

- actual routes
- actual logs
- actual deployment behavior
- actual pricing sources

## Question 5. What are you most proud of, and what still feels incomplete?

I am most proud that the project now feels like a real shipped product rather than a rough assignment scaffold.

It now has:

- a deployed frontend and backend
- a working audit flow
- a working public share flow
- production persistence
- graceful fallback behavior
- a clearer product voice

I am also proud that the product became more honest as it improved. It would have been easy to overclaim savings, overuse AI, or fake certainty around enterprise and API-heavy cases. I think the current version is stronger because it stays conservative where it should.

What still feels incomplete is mostly external validation rather than core implementation. The biggest remaining gaps are:

- real user interviews
- final business-side evidence and polish
- optional email infrastructure
- even tighter pricing proof for the trickiest edge cases

That is actually a useful kind of unfinished. It means the remaining work is less about fixing the foundation and more about strengthening the proof around the product.

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
