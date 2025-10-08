# Frontend Security Model

This document outlines **defense-in-depth** measures applied at the app edge and within the UI:
- **CSP**: narrow outbound connections and mitigate XSS.
- **Headers**: sane defaults for modern browsers.
- **Session**: designed for httpOnly cookies (OIDC code flow with PKCE).
- **Data**: schema validation for untrusted payloads.

## Content Security Policy (CSP)
Applied via `next.config.ts`:
- `default-src 'self'`
- `connect-src 'self' <your-backend-hosts> ws: (dev only)`
- `script-src 'self'` (adds `'unsafe-eval'` in **dev** only)
- `style-src 'self' 'unsafe-inline'` (Next/Tailwind inline styles)
- `img-src 'self' data: blob:`
- `font-src 'self' data:`
- `frame-ancestors 'none'`
- `form-action 'self'`

> If you use external CDNs (images/analytics/monitoring), add their origins to the relevant directives.

## Other Security Headers
- **X-Content-Type-Options: nosniff** — prevent MIME sniffing
- **Referrer-Policy: no-referrer** — remove referer metadata
- **Cross-Origin-Opener-Policy: same-origin** — navigation isolation
- **Cross-Origin-Resource-Policy: same-origin** — restrict resource sharing
- **Permissions-Policy** — disable sensitive APIs by default
- **HSTS** — enable only when the app is 100% HTTPS on your domain

## Session & Auth (preview)
- Target: **OIDC Authorization Code + PKCE**.
- Access/refresh tokens are held on the **server/BFF**; the browser stores only **httpOnly cookies**.
- The UI queries `/api/session` for **session state only** (never exposes raw tokens to JS).

## Data Validation
- All backend responses pass through **Zod schemas**.
- Parse failures map to user-friendly domain errors (e.g., “pricing temporarily unavailable”).

## Validation Checklist
- [ ] App boots without CSP violations in the console.
- [ ] Only approved hosts appear in `connect-src` requests.
- [ ] No third-party `<iframe>` can embed the app (`frame-ancestors 'none'`).
- [ ] HSTS enabled in production behind HTTPS.
