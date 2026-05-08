# Automated Tests

## Backend Audit Engine Tests

### `server/src/middleware/tests/auditEngine.test.ts`

- Covers downgrade logic for small teams on ChatGPT
- Covers right-sizing logic for one-seat plans
- Covers credits-backed procurement savings
- Covers fallback behavior for unknown tools
- Covers aggregate total calculations across multiple tools

Run:

```bash
cd server
npm run test
```

### `server/src/middleware/tests/rules.test.ts`

- Covers the recommendation-reasoning layer to ensure downgrade guidance remains human-readable and tied to the input facts

Run:

```bash
cd server
npm run test
```

## Frontend Verification

Current automated verification is build/lint based:

- `client` lint
- `client` production build

Run:

```bash
cd client
npm run lint
npm run build
```
