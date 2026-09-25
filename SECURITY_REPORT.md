# Security Assessment Report

**Project:** KlearStack Intelligent Document Processing Marketing Page & MarTech System  
**Organization:** Hexanovate Private Limited  
**Author:** Technical Lead - Full Stack & MarTech Engineering  
**Date:** September 25, 2026  
**Evaluated URL:** `https://roi-by-anit.vercel.app`

---

## Executive Summary & Scorecard

This security report evaluates the architecture, serverless API endpoints, data handling, third-party integrations, and dependency footprint of the deployed KlearStack application. Every finding has been verified against empirical code analysis.

| # | Security Domain | Score (0–5) | Status | Key Observation & Justification | Remediation / Action Taken |
|---|---|:---:|:---:|---|---|
| 1 | **Secrets Management** | `5 / 5` | ✅ Pass | All integration secrets (`RESEND_API_KEY`, `CRM_WEBHOOK_URL`, `GOOGLE_SHEET_WEBHOOK_URL`) execute inside server-side Node.js API routes (`/api/lead`, `/api/booking`). Zero keys exposed in client JavaScript bundles or git commit history. | Enforced environment variables in Vercel. Added `.env*.local` to `.gitignore`. |
| 2 | **Input Validation & Sanitization** | `5 / 5` | ✅ Pass | Full server-side validation enforced on `/api/lead` and `/api/booking`. Rejects empty fields, invalid email syntax, non-numeric phone chars, and enforces strict business domain validation. | Server-side validation mirrored with client-side UI error reporting. |
| 3 | **Injection & XSS Exposure** | `5 / 5` | ✅ Pass | React 19 JSX auto-escaping prevents Reflected and Stored XSS. No usage of `dangerouslySetInnerHTML`, `eval()`, or raw string DOM injection. | All lead inputs rendered safely as text nodes. |
| 4 | **API Route Protection** | `4 / 5` | ✅ Pass | Method restriction (POST only), IP-based rate limiting (1 request per 5 seconds per IP), and silent honeypot trap (`website_url_hp`) deployed. | In-memory IP rate limiter active; recommend Redis token bucket (Upstash) for multi-region serverless scaling. |
| 5 | **Third-Party Integration Security** | `4 / 5` | ✅ Pass | All third-party CRM, Resend, and Google Sheets calls execute via HTTPS server-side. Scope of API keys restricted to scoped lead-creation actions. | Principle of least privilege applied to webhook tokens. |
| 6 | **Transport & Security Headers** | `4 / 5` | ✅ Pass | Transport encrypted over TLS 1.3 on Vercel edge network with strict HTTPS redirection. | Configured security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`). |
| 7 | **Dependency Vulnerabilities** | `5 / 5` | ✅ Pass | `npm audit` returned **0 vulnerabilities** across 371 audited packages. React 19 and Next.js 16 dependencies up to date. | Audited with `npm audit`. Zero vulnerabilities present. |
| 8 | **PII Handling & Data Privacy** | `4 / 5` | ✅ Pass | Form collects business contact PII (Name, Work Email, Phone, Company). Explicit consent note displayed under form. PII transmitted over HTTPS directly to CRM/Sheets. | Form includes privacy note. Added PII retention schedule recommendation. |
| 9 | **Error Handling & Information Leakage** | `5 / 5` | ✅ Pass | Catch blocks return sanitized human messages without exposing stack traces, DB connection strings, or internal file paths to the browser. | Generic 500 error responses returned on unexpected exceptions. |

### **Overall Security Score: `41 / 45` (91.1%)**

---

## Detailed Category Assessments

### 1. Secrets Management (Score: 5/5)
- **Finding:** Client-side JavaScript bundles (`.next/static/chunks/`) were inspected. No secret keys or environment variables prefixed without `NEXT_PUBLIC_` were present in the client payload.
- **Verification:** Searched compiled bundles for string patterns (`Bearer`, `sk_`, `key-`). All secret environment variables are isolated inside `src/app/api/lead/route.ts` and `src/app/api/booking/route.ts`.

### 2. Input Validation & Mandatory Business Email Filter (Score: 5/5)
- **Finding:** Both client and server layers enforce strict business email filtering:
  ```ts
  const DISALLOWED_FREE_DOMAINS = new Set(['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', ...]);
  ```
  Submissions with public mailbox domains are blocked on the server with HTTP 400 and an explicit human message: *"Please use your official company/work email address. Free domains (gmail.com) are not accepted."*

### 3. API Route Protection & Honeypot Spam Prevention (Score: 4/5)
- **Finding:** The lead form includes a hidden honeypot field (`website_url_hp`). Bots attempting to fill hidden inputs receive a decoy success response (`HTTP 200`) without triggering downstream CRM or email webhooks. Rate limiting blocks burst attacks from single IPs within 5,000ms windows.

### 4. Dependency Security Audit
```bash
npm audit
# Output: found 0 vulnerabilities in 371 packages
```

---

## Top 3 Security Fixes to Implement First

1. **Persistent Distributed Rate Limiting (Upstash Redis)**: Replace the current single-instance in-memory `Map` rate limiter with a distributed Redis sliding-window algorithm to protect against distributed botnet attacks across Vercel edge regions.
2. **Strict Content Security Policy (CSP) Header**: Add nonce-based CSP headers in `next.config.ts` restricting script execution to self and trusted analytics origins.
3. **Turnstile / reCAPTCHA v3 Bot Verification**: Complement the honeypot field with Cloudflare Turnstile for invisible risk-based scoring on high-volume endpoints.
