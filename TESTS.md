# Tests

## Testing Philosophy

I treated this project as a product that needed to survive both code-level verification and real user-style flows. That meant testing in three layers:

- automated backend logic tests
- build and integration checks
- live end-to-end testing on the deployed Render URLs

The goal was not just "does it run locally," but "does the product still behave sensibly when optional infrastructure is missing or degraded."

## Automated Verification

### Backend

Run from the repository root:

```bash
cd server
npm run build
npm run test
```

Run directly from the backend source workspace:

```bash
cd server/src
npm run build
npm run test
```

### What the backend tests cover

`server/src/middleware/tests/auditEngine.test.ts`

- small-team downgrade logic for ChatGPT-style plans
- right-sizing logic for one-seat overpayment cases
- credits-backed procurement savings path
- fallback behavior for unknown tools
- aggregate savings calculations across multiple tools

`server/src/middleware/tests/rules.test.ts`

- recommendation reasoning remains tied to real input facts
- downgrade explanations remain human-readable and specific

### Frontend

Run:

```bash
cd client
npm run lint
npm run build
```

This verifies:

- TypeScript compile health
- route/module integrity
- deployable production bundle output

## CI

GitHub Actions CI runs on push and pull request via [`.github/workflows/ci.yml`](D:/Mihran/Git%20(Learning%20Phase)/burnrate-ai/.github/workflows/ci.yml).

Current CI jobs:

- client lint
- client build
- server build
- server tests

## Deployed Manual Testing

### Environment tested

- Frontend: [https://burnrate-ai-iwv3.onrender.com](https://burnrate-ai-iwv3.onrender.com)
- Backend: [https://burnrate-ai-2tsb.onrender.com](https://burnrate-ai-2tsb.onrender.com)
- Browser: Chrome
- Device modes: laptop and mobile Lighthouse runs, plus manual browser interaction

## End-to-End Scenarios

### 1. Landing page loads

Expected:

- homepage loads without crashing
- navigation links work
- CTA routes user into the audit flow

Observed:

- passed

### 2. Audit form retains state

Expected:

- partially filled form survives refresh
- multi-tool input remains intact

Observed:

- passed through browser storage persistence

### 3. Audit creation succeeds

Expected:

- clicking the main audit CTA submits successfully
- backend returns `201`
- result page loads with current spend, optimized spend, monthly savings, annual savings, recommendations, and summary

Observed:

- passed on deployed environment

### 4. Public share flow works

Expected:

- app generates a public share URL
- backend `/share/:publicId` resolves
- user is routed into the frontend shared result page
- shared result can be opened directly in a new tab

Observed:

- passed after correcting Render URL env variables and adding the frontend SPA rewrite rule

### 5. Lead capture works after value is shown

Expected:

- user can submit the lead/report form only after seeing the audit result
- backend returns `201`
- the app does not require authentication before the value is visible

Observed:

- passed

### 6. MongoDB production persistence works

Expected:

- audits remain available after creation
- public share results continue resolving

Observed:

- passed after Atlas network access was configured for Render outbound traffic

### 7. Optional-service degradation is graceful

Expected:

- if Anthropic is unavailable, audit still completes with fallback summary
- if Resend is not fully configured, product still works without crashing

Observed:

- passed
- Anthropic fallback path was exercised successfully when API credits were unavailable
- email was intentionally left disabled because no verified sending domain is configured

## Lighthouse Results

The attached Lighthouse reports were generated against the deployed frontend URL:

- [lighthouse-laptop.pdf](C:/Users/Lenovo/Downloads/lighthouse-laptop.pdf)
- [lighthouse-mobile.pdf](C:/Users/Lenovo/Downloads/lighthouse-mobile.pdf)

### Desktop

- Performance: 79
- Accessibility: 98
- Best Practices: 100
- SEO: 100

Key notes:

- First Contentful Paint: 0.5s
- Largest Contentful Paint: 0.6s
- Total Blocking Time: 10ms
- Cumulative Layout Shift: 0.5

### Mobile

- Performance: 76
- Accessibility: 98
- Best Practices: 100
- SEO: 100

Key notes:

- First Contentful Paint: 1.6s
- Largest Contentful Paint: 1.8s
- Total Blocking Time: 170ms
- Speed Index: 2.3s
- Cumulative Layout Shift: 0.5

### Lighthouse interpretation

The deployment is in a healthy range overall, especially for accessibility, best practices, and SEO. The main performance weakness is layout stability, with Lighthouse repeatedly identifying the footer region as a CLS culprit. There is also some avoidable main-thread and unused-JavaScript overhead on mobile.

One caveat from the PDF traces: both reports captured Chrome extension noise, including React DevTools-related extension activity. That means the reported performance score should be treated as directionally useful rather than perfectly clean-lab data.

## Known Production Notes

- `GET /` returning `404` on the backend is expected, because the backend is an API service and does not expose a homepage route
- the backend share route returning `200` is the correct public-share behavior
- email is intentionally not enabled in production yet because a verified sending domain is not available
- AI summary support exists, but live Anthropic output depends on API credit availability

## Remaining Follow-up Opportunities

- reduce cumulative layout shift, especially around footer movement
- trim main-thread work and unused JavaScript for better mobile performance
- add a verified email sender domain if transactional email becomes a requirement
- re-run Lighthouse in a cleaner browser profile without extensions for a purer benchmark
