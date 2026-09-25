# KlearStack marketing page

A Vite + React implementation of the supplied KlearStack / Hexanovate round-two page.

## Run locally

```powershell
cd app
npm install
npm run dev
```

The npm scripts live in `app/package.json` because the workspace folder name contains uppercase characters and is not a valid npm package name.

## Delivered in this pass

- Responsive single-page layout with hero, trust marquee, lead form, ROI calculator, and footer.
- Navigation dropdowns with keyboard Escape, outside-click, and scroll dismissal.
- Work-email rejection for common public mailbox domains, phone validation, required fields, loading and success states.
- ROI formulas based on the supplied logic sheet: 30,000 pages/resource, tier fixed cost, cumulative volume slabs, and monthly/annual outputs.

## Integration note

The form currently demonstrates the complete client-side contract but does not make external CRM, Google Sheets, email, or calendar calls because no test credentials or deployment environment were supplied. Those calls should be added behind a server-side endpoint before production, with provider failures recorded and surfaced as a retryable state. The honeypot and rate limiter belong in that endpoint as well.
