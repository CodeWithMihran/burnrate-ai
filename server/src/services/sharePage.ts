import type { IAuditResult } from "../models/Audit";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export const buildSharePageHtml = (input: {
  publicId: string;
  result: IAuditResult;
}) => {
  const appUrl = (process.env.APP_URL || "http://localhost:5000").replace(
    /\/$/,
    ""
  );
  const frontendAppUrl = (process.env.FRONTEND_APP_URL || process.env.APP_URL || appUrl).replace(
    /\/$/,
    ""
  );
  const canonicalShareUrl = `${appUrl}/share/${input.publicId}`;
  const frontendShareUrl = `${frontendAppUrl}/share/${input.publicId}`;
  const ogImageUrl = `${frontendAppUrl}/og-share-preview.png`;
  const title = `BurnRate.ai Audit - Save ${formatCurrency(
    input.result.totalAnnualSavings
  )}/year`;
  const description =
    input.result.summary ||
    `This AI spend audit found ${formatCurrency(
      input.result.totalMonthlySavings
    )} in monthly savings opportunities.`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonicalShareUrl)}" />
    <meta property="og:image" content="${escapeHtml(ogImageUrl)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(ogImageUrl)}" />
    <meta http-equiv="refresh" content="0; url=${escapeHtml(frontendShareUrl)}" />
    <style>
      body { font-family: Arial, sans-serif; background: #0b0f19; color: white; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 24px; }
      .card { max-width: 720px; padding: 32px; border: 1px solid rgba(255,255,255,.12); border-radius: 24px; background: rgba(255,255,255,.04); }
      a { color: #c4b5fd; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(description)}</p>
      <p>Redirecting to the interactive audit report. If nothing happens, <a href="${escapeHtml(
        frontendShareUrl
      )}">open the report manually</a>.</p>
    </div>
  </body>
</html>`;
};
