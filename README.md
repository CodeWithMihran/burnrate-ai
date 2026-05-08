# BurnRate.ai

BurnRate.ai is a free AI spend audit tool for startup founders and engineering managers who want a fast second opinion on their ChatGPT, Claude, Cursor, Copilot, and adjacent AI-tool spend. It turns a simple spend input into a recommendation-backed audit, an AI-generated summary, a shareable public report, and an optional lead-capture flow for high-savings teams.

## Screenshots / Demo

Add these before submission:

1. Landing page hero + value proposition
2. Audit form filled with a multi-tool example
3. Shared audit results page showing savings and recommendations
4. Optional: 30-second Loom walking through create audit -> save report -> share URL

## Deployed URL

Add production URL before submission.

## Quick Start

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server/src
npm install
npm run dev
```

### Backend from `server/`

```bash
cd server
npm run dev
```

### Build / Test

```bash
cd client
npm run lint
npm run build

cd ../server
npm run build
npm run test
```

## Environment Variables

Create `.env` values for production use:

```bash
PORT=5000
MONGO_URI=...
ANTHROPIC_API_KEY=...
RESEND_API_KEY=...
EMAIL_FROM=...
APP_URL=...
VITE_API_BASE_URL=http://localhost:5000/api
```

The backend currently falls back to in-memory storage if `MONGO_URI` is not set so local development still works.

## Decisions

1. I kept the audit math rule-based instead of LLM-driven because the assignment explicitly rewards knowing when not to use AI. The recommendations need to be inspectable, stable, and finance-friendly.
2. I used a split React + Express architecture instead of Next.js because I wanted a fast frontend iteration loop and a clean backend boundary for audit logic, storage, and summary generation.
3. I added an in-memory backend fallback for local development even though production should use MongoDB. This reduced friction while integrating the full flow before env setup was finalized.
4. I generated the AI summary at audit creation time, not only on demand, so the public share page can load with a complete result instead of a half-finished report.
5. I prioritized a clear, screenshot-friendly results page over adding many edge-case features. For this assignment, the shareable output is the product surface most likely to influence both users and evaluators.

## Current Scope

Implemented today:

- multi-tool audit form with persisted state
- rule-based audit engine
- AI summary with fallback
- lead capture endpoint and frontend form
- shareable public results page
- backend tests and CI workflow

Still required before a final submission:

- production deployment
- Lighthouse verification
- final pricing validation sweep
- real user interviews
- final screenshots / demo recording
