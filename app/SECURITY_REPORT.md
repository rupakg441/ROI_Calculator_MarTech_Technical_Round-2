# Security report

## Scope

This report describes the current Vercel function and browser form. Provider calls are made from `api/leads.js`; no provider secret is read by React.

| Area | Score | Status and remediation |
|---|---:|---|
| Secrets management | 4/5 | Secrets are environment variables and are not prefixed `VITE_`. Keep `.env*` out of Git and rotate test credentials before production. |
| Server validation | 3/5 | The endpoint validates name, phone, email, public domains, required selections, and message length. Add a schema library and persistent audit logging for production. |
| Injection/XSS | 4/5 | React escapes rendered values and email text is plain text. Keep provider templates text-only or escape HTML if templates are added. |
| API protection | 3/5 | POST-only endpoint, honeypot, and five requests per ten minutes per in-memory IP. Replace the in-memory limiter with Redis before scaling across Vercel instances. |
| Third-party security | 3/5 | HubSpot, Resend, and Sheets calls stay server-side. Use least-privilege provider scopes and rotate test tokens. |
| Transport/headers | 2/5 | Vercel supplies HTTPS. Add CSP, HSTS, X-Frame-Options, Referrer-Policy, and X-Content-Type-Options headers before production. |
| Dependencies | 3/5 | Dependencies are small. Run `npm audit` and pin versions before submission. |
| PII handling | 3/5 | Name, phone, email, company context, and enquiry data are sent to configured providers. The form includes a security note; add an explicit consent checkbox and privacy URL. |
| Error handling | 4/5 | The browser receives generic retryable errors, not provider responses or stack traces. Failed provider names are currently returned for operational debugging and should be logged server-side instead. |

## Overall score

29/45 before production hardening. The first three fixes are persistent rate limiting, security headers, and explicit consent/privacy handling.

## Accepted gaps

Live provider testing requires test credentials controlled by the submitter. No credentials are committed in this repository.
