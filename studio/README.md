# Yearbook MAZ Studio

Standalone Sanity Studio for the yearbook administrator. Steps 2 and 3 are implemented: the Studio foundation and content schemas. Migration and the public website connection follow afterward. Studio edits do not yet affect the public website.

## Start locally

Use Node.js 22.12 or later. From this directory:

1. Run `npm ci`.
2. The Studio is configured for project `3yrbpvzl`, dataset `production`.
3. Optionally copy `.env.example` to `.env.local` to override these identifiers for another environment. These identifiers are not secret tokens.
4. Run `npm run dev` and open the localhost URL printed by Sanity.
5. Sign in with the Sanity account that owns the project.

For local sign-in, add `http://localhost:3333` under the project's API CORS origins with credentials allowed if it is not already present. Membership and editing permissions are managed in Sanity; keep only your account as administrator if you want sole editing access.

## Verify and host

Run `npm run typecheck` and `npm run build`. After configuring the real project and signing in with `npx sanity login`, run `npm run deploy`. Choose `yearbook-maz` if that hostname is available. The deployment command reports the actual Studio address; no address has been reserved by this scaffold.

The Studio interface may be publicly reachable, but editing requires authenticated project membership. Do not put write tokens in any `SANITY_STUDIO_` variable: those variables are bundled into browser code.

Studio has its own dependencies and lockfile. Run its install/build commands in this directory, separately from the public website.

References: [installation](https://www.sanity.io/docs/studio/installation), [hosting](https://www.sanity.io/docs/studio/deployment).

## Content editing order

1. Create and publish a **School** with its name, URL slug and location.
2. Create and publish a **Yearbook**, choosing its school and graduation year. Add its cover, introduction, headteacher message, school-life highlights and print options.
3. Add **Student profiles**, **Gallery photos** and **Memories and stories**, choosing the appropriate yearbook for each entry.
4. Open **Site settings** to set the site title, featured yearbook and public business contact details. This is one shared settings document.

Images support crop/hotspot controls, required alt text, captions and photographer credits. Lower display-order numbers appear first once the frontend integration implements ordering. Featured flags likewise become active during frontend integration. Use Sanity's built-in drafts, Publish and Unpublish actions; no separate publication checkbox is needed.

Required fields and image assets are validated before publishing in Studio. References are strong: publish a school before its yearbook, and a yearbook before its student/photo/story entries. These Studio rules are not server-side API validation; migration code must validate imported records separately. Site settings is a Studio singleton, not a server-side uniqueness constraint.

Student fields map to the current prototype (name, nickname, class, activity, quote, memory and ambition), with biography, achievements and approved public social links available. The dataset is public: keep student private contact details and consent records outside it.

To verify schema compilation without writing content: `npx sanity schema extract --path .sanity/schema.json`.
