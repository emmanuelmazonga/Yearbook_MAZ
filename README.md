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
It has a separate installation and build. Configure your Sanity Project ID to
connect it; content schemas, migration, and public-site integration are pending.

This repository contains a front-end product prototype. It does not yet include
a production content-management system, persistent database, authentication,
payments, image uploads or message delivery.
