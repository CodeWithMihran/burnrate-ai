# METRICS

## North Star Metric

The best North Star for BurnRate.ai is:

**Qualified savings opportunities created per week**

I define that as:

- completed audits
- that surface at least $500/month in plausible savings
- and include a captured report / follow-up submission

This is better than raw audit count because the product is not a consumer engagement app. It is a B2B lead-generation wedge. A low-quality audit with no trust and no follow-up is far less valuable than a smaller number of high-intent reports that point to real commercial opportunity.

## Why raw traffic is not enough

The app can look successful if people click around and generate one or two curiosity audits, but that does not tell Credex whether the product is useful.

The product only becomes strategically valuable if it can do all three of these:

- get users to finish the audit
- get them to believe the result
- get the best-fit teams to save, share, or follow up

That is why the metrics need to follow the product's actual business role.

## Three most important input metrics

### 1. Audit completion rate

This tells me whether the form and flow are understandable enough to get a user from interest to result.

If this is weak, nothing else matters because the value moment is never reached.

### 2. Report capture rate after value reveal

This is one of the strongest trust signals in the product. The app intentionally shows value before asking for an email or follow-up action. If users still do not save the report after seeing the result, then either:

- the output is not convincing
- the CTA is not well framed
- the user is not the right target

### 3. Share rate on completed audits

The public report URL is one of the most interesting parts of the wedge. If users are willing to share results internally or externally, the product becomes more than a calculator. It becomes a lightweight decision artifact and a distribution object.

## Core events I would instrument

The first events I would track are:

- landing page CTA click
- audit started
- audit completed
- savings bucket: `<$100`, `$100-$499`, `$500+`
- report capture submitted
- share button clicked
- consultation CTA clicked

These events map directly to the funnel and to the product's core hypotheses.

## Funnel interpretation

### Strong signs

I would consider the product healthy if I saw:

- strong audit completion
- a meaningful report-save rate after value reveal
- high-savings reports creating follow-up intent
- some real sharing behavior on completed audits

### Weak signs

I would worry if I saw:

- lots of audit starts but poor completion
- lots of completions but little report capture
- decent capture but very few high-savings cases
- lots of curiosity traffic with no believable business signal

In other words, usage without qualified opportunity would be a warning sign.

## Early dashboard I would want

If I had to build a minimal operating dashboard for Credex around this product, it would include:

- weekly completed audits
- weekly qualified savings opportunities
- average estimated monthly savings per completed audit
- report capture rate
- share rate
- consultation CTA click rate
- audit-to-qualified-opportunity conversion

That dashboard would tell a much more useful story than pageviews or total signups.

## Pivot trigger

The clearest pivot trigger would be:

- people are willing to use the tool
- but the product is not producing strong enough qualified opportunities

For example, if 200 completed audits produced:

- fewer than 10 captured reports
- or fewer than 3 meaningful high-savings cases

then I would question:

- whether the target audience is right
- whether the recommendations are trusted
- whether the value proposition is framed correctly

At that point the problem would not be "get more traffic." It would be "the product is not earning enough trust or surfacing enough real value."

## Why these metrics fit the current product

The deployed screenshots reinforce this metric model:

- the landing page is built to push users cleanly into the audit
- the form is structured enough to support completion
- the result page is designed to make sharing and saving feel natural
- the public report is a reusable artifact, not just a one-time calculation

That means the best metrics are the ones that measure whether users actually move through those value moments.
