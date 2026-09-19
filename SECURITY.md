# Security and privacy

## Current architecture

- The public website reads only published Sanity content through the tokenless CDN API.
- Sanity write tokens must never be committed or exposed through browser-prefixed environment variables.
- Sanity Studio editing is protected by authenticated Sanity project membership.
- Enquiries pass through a same-origin server endpoint with body limits, independent validation, consent enforcement, a honeypot and durable rate limiting.
- Enquiry contents are delivered by email and are not persisted in D1. D1 stores only short-lived salted rate-limit hashes and counters.
- Hosted responses add HTTPS enforcement and browser security headers in `worker/index.ts`.

## Secrets

Root `.env*` files are ignored. The committed Studio environment example contains only the public Sanity project ID and dataset name. Never place passwords, write tokens, private keys, service-account files, or email-provider credentials in committed files.

Future server credentials must be configured through the hosting environment and accessed only by server-side code. They must not use a `NEXT_PUBLIC_`, `VITE_`, or `SANITY_STUDIO_` prefix.

The enquiry endpoint remains unavailable until `MAILJET_API_KEY`, `MAILJET_SECRET_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`, and `ENQUIRY_RATE_LIMIT_SALT` are configured server-side. CAPTCHA and persistent lead storage are intentionally not enabled.

## Reporting a concern

Use the website contact page and provide the affected URL and a concise description. Do not include passwords, identity documents, student records, or other sensitive material in the first report.
