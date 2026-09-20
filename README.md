# Yearbook_MAZ

A premium digital school yearbook prototype designed for Zambia.

The project demonstrates how multiple schools can preserve each graduating
class through professional photography, student stories, events, memories and
print-yearbook ordering—all within a growing digital archive.

## Live prototype

[Open the live demo](https://yearbook-zm.vercel.app/)

The sample yearbook profiles and stories are fictional. Kansenshi Secondary
School uses a supplied photograph of its real campus for a clearly labelled
demo preview; no official Kansenshi archive or yearbook is published. The
other demonstration imagery was generated for this prototype.

## Included experiences

- Editorial homepage centred on the Class of 2026 yearbook
- Searchable multi-school directory
- Dedicated Copperview Secondary School archive
- Immersive digital yearbook
- Filterable student profiles with expanded profile dialogs
- Categorised photography gallery with fullscreen viewing
- Headteacher message, clubs, sport, leadership, memories and awards
- Physical yearbook options
- Photography-services and school-partnership pages
- Responsive navigation and mobile layouts
- Secure school enquiry flow with validation, consent, honeypot and rate limiting

## Technology

- React 19
- TypeScript
- Next.js 16 through Vinext
- Vite 8
- Tailwind CSS 4
- Radix UI / shadcn components
- Lucide React icons
- Cloudflare Workers-compatible output
- Vercel-compatible Next.js build
- Mailjet transactional email delivery
- Upstash Redis rate limiting

## Run locally

Requires Node.js 22.13 or later.

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

Validate the standard Next.js build used by Vercel with:

```bash
npm run build:vercel
```

## Deploy to Vercel

Import this repository into Vercel and keep the detected framework as Next.js.
The included `vercel.json` selects the Vercel build command.

Create a free Upstash Redis database, then add the following values under
**Vercel project → Settings → Environment Variables** for Production, Preview
and Development:

```text
MAILJET_API_KEY
MAILJET_SECRET_KEY
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
ENQUIRY_TO_EMAIL
ENQUIRY_FROM_EMAIL
ENQUIRY_RATE_LIMIT_SALT
```

Use the verified Mailjet sender address for `ENQUIRY_FROM_EMAIL`. Generate a
long random value for `ENQUIRY_RATE_LIMIT_SALT`. All seven values are
server-only and must not use a `NEXT_PUBLIC_` prefix. A deploy or redeploy is
required after changing them.

## Current scope

The standalone [Sanity Studio foundation](studio/README.md) lives in `studio/`.
It has a separate installation and build and is configured for Sanity project
`3yrbpvzl`, dataset `production`. The public site reads published content from Sanity
at request time, via its CDN, without a token. No redeployment is needed for content
updates; allow a short CDN delay and refresh the page after publishing.

Edit content and upload photographs at https://yearbook-maz.sanity.studio/.
Publish the school first, then its yearbook, then related profiles, gallery photos
and memories. Choose the featured yearbook in Site settings. New school/yearbook
slugs automatically receive routes; changing a slug changes its URL. Drafts and
children of unpublished schools/yearbooks are not displayed. Existing dotted demo
IDs are excluded; keep the completed public-IDs migration in place.

CMS-controlled fields include school details, yearbook title/year/introduction,
headteacher message, school-life highlights, print options, student details and
portraits, gallery images/captions, memories, homepage introduction/hero/featured
edition, site title, tagline, footer and contact details. Marketing page layouts,
service descriptions and general headings remain code-controlled. The enquiry
form sends through a server-only Mailjet integration after its production secrets
are configured. Enquiry content is not stored; Upstash retains only short-lived,
salted rate-limit counters. Payments and student self-submission are not implemented.

Each published school automatically receives a page at `/schools/<school-slug>`.
Its primary, background and accent colours, logo, cover image, principal details,
school photographs, public links and yearbook shelf are managed from the School
record. Foreground colours are calculated automatically for readable contrast.
Yearbooks reference their School record, so there is no second yearbook list to
maintain on the school document.

The Kansenshi demo currently overrides its Sanity cover image with the supplied
local campus photograph. Its unapproved CMS history and headteacher message are
not displayed. Replace this preview treatment only after school approval.

Run `npm run build` then `node --test tests/sanity-integration.test.mjs` for the CMS
route checks. These checks use isolated fixtures and never change production data.
Only publish information and photographs approved for public viewing: the Sanity
dataset and image URLs are public even while the Sites prototype is private.
