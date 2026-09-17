# Yearbook MAZ Studio

Standalone Sanity Studio for the yearbook administrator. This is Step 2: the Studio foundation. Content schemas are added in Step 3; migration and the public website connection follow afterward. Until then the document list is empty and Studio edits do not affect the public website.

## Start locally

Use Node.js 22.12 or later. From this directory:

1. Run `npm ci`.
2. Copy `.env.example` to `.env.local`.
3. Set `SANITY_STUDIO_PROJECT_ID` to your existing project's ID from <https://www.sanity.io/manage>. Set the dataset to its actual name (default `production`). These identifiers are not secret tokens.
4. Run `npm run dev` and open the localhost URL printed by Sanity.
5. Sign in with the Sanity account that owns the project.

For local sign-in, add `http://localhost:3333` under the project's API CORS origins with credentials allowed if it is not already present. Membership and editing permissions are managed in Sanity; keep only your account as administrator if you want sole editing access.

## Verify and host

Run `npm run typecheck` and `npm run build`. After configuring the real project and signing in with `npx sanity login`, run `npm run deploy`. Choose `yearbook-maz` if that hostname is available. The deployment command reports the actual Studio address; no address has been reserved by this scaffold.

The Studio interface may be publicly reachable, but editing requires authenticated project membership. Do not put write tokens in any `SANITY_STUDIO_` variable: those variables are bundled into browser code.

Studio has its own dependencies and lockfile. Run its install/build commands in this directory, separately from the public website.

References: [installation](https://www.sanity.io/docs/studio/installation), [hosting](https://www.sanity.io/docs/studio/deployment).
