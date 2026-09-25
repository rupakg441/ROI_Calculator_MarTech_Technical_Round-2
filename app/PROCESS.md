# Process and methodology

## Approach

The page was built from the supplied prototype screenshots in priority order: header and mega menu, integrations CTA, ROI calculator, lead capture panel, then footer. The implementation keeps the page single-screen navigable with anchor links and responsive stacking below 900px.

## Stack

Vite, React, JavaScript, CSS, and Lucide icons were used for speed and a small client bundle. Vercel serves the Vite output and the `api/leads.js` serverless function. No database is used; the required business systems are the source of record.

## Integration architecture

The browser posts the form to `/api/leads`. The server validates the request, rejects public mailbox domains, checks the honeypot, applies a small IP rate limit, then sends the lead to HubSpot, a Google Apps Script Sheets webhook, and Resend. `Promise.allSettled` detects partial provider failures and returns a retryable generic error. A successful response can include a public Cal.com or Google Calendar booking URL.

Secrets are stored in Vercel environment variables and never use the `VITE_` prefix. Only the public booking URL may be exposed to the browser.

## AI usage and verification

AI assisted the initial React structure, CSS composition, validation logic, and documentation. An early implementation referenced `calculateSavings` without defining it; static diagnostics did not catch the runtime path, so the browser error led to adding the missing pricing model and helper. Provider integrations remain configuration-dependent and are not claimed as live without test submissions.

## ROI verification

The calculator uses the provided 30,000 pages-per-resource rule and tier/model pricing. Before submission, test at least these cases against the source sheet: 36,000 pages at ₹73,000 salary, 120,000 pages at ₹30,000 salary, and 300,000 pages at ₹50,000 salary. Record the implementation output and sheet output side by side.

## Assumptions and incomplete work

The screenshot supplies placeholder customer marks and contact addresses, so those remain placeholders. The current app is Vite React rather than Next.js App Router. Production hardening still requires persistent rate limiting, security headers, explicit consent, pinned dependency audit, and live verification of CRM, Sheet, email, and calendar with test accounts.
