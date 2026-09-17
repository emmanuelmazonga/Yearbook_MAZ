# Yearbook_MAZ

A premium digital school yearbook prototype designed for Zambia.

The project demonstrates how multiple schools can preserve each graduating
class through professional photography, student stories, events, memories and
print-yearbook ordering—all within a growing digital archive.

## Live prototype

[Open Copperview Yearbook](https://copperview-yearbook.emmanuelmazonga.chatgpt.site)

The demonstration school, people and written content are fictional. The
photography was generated specifically for this prototype.

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
- Prototype school enquiry flow

## Technology

- React 19
- TypeScript
- Next.js 16 through Vinext
- Vite 8
- Tailwind CSS 4
- Radix UI / shadcn components
- Lucide React icons
- Cloudflare Workers-compatible output

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
form remains a demonstration and does not deliver messages; payments and student
self-submission are not implemented.

Run `npm run build` then `node --test tests/sanity-integration.test.mjs` for the CMS
route checks. These checks use isolated fixtures and never change production data.
Only publish information and photographs approved for public viewing: the Sanity
dataset and image URLs are public even while the Sites prototype is private.
