# METRICS

The North Star metric is **qualified savings opportunities created per week**. I would define that as the number of completed audits that surface at least $500/month in plausible savings and include a captured email. This is a better metric than raw audit count because the product is not a consumer engagement app; it is a B2B lead-generation tool for Credex. A low-quality audit that never converts is less meaningful than a smaller number of high-intent, high-savings reports.

Three input metrics matter most:

1. **Audit completion rate** — if people click into the tool but do not finish, the funnel dies before value is shown.
2. **Report capture rate after value reveal** — this measures whether the product earns trust once the result is visible.
3. **Share rate on completed audits** — the assignment explicitly positions the public URL as a viral loop, so this is the most important early distribution amplifier.

The first events I would instrument are:

- landing page CTA click
- audit started
- audit completed
- savings bucket (`<$100`, `$100-$499`, `$500+`)
- report capture submitted
- share button clicked
- consultation CTA clicked

The pivot trigger would be clear if the product got usage but not qualified opportunities. For example, if 200 completed audits produce fewer than 10 captured reports or fewer than 3 high-savings cases, I would question either the target audience, the audit credibility, or the CTA framing. At that point the issue would not be “more traffic”; it would be that the product is not producing strong enough lead quality for Credex’s economics.
