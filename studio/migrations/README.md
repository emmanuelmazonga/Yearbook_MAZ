# Demo migration

## Public-read correction after the original import

The original `demo.*` document IDs are non-root paths and are not readable by anonymous visitors. After the original import, run this authenticated correction before connecting the public site:

```sh
npx sanity exec migrations/public-ids.mjs --with-user-token -- --apply
```

It copies the 18 existing records to hyphenated IDs, preserves their current content, rewrites their references, and updates the featured-yearbook reference with a revision check. It leaves originals intact as backups, skips any public copies that already exist, and verifies all 19 content records through an unauthenticated API request. Existing drafts must be resolved first. The Studio sidebar and reference pickers exclude the old `demo.*` copies; global search may still find them. Edit the hyphenated records going forward.

Then deploy Studio with `npm run deploy` from `studio/`. Select an available hostname such as `yearbook-maz` and retain the actual URL reported by the CLI. The public website connection is not deployed yet.

Run from `studio/` on branch `feat/sanity-studio-setup`:

```sh
node migrations/demo.mjs
node --test migrations/demo.test.mjs
npx sanity login
npx sanity exec migrations/demo.mjs --with-user-token -- --apply
```

The default is a local dry run. Applying through `sanity exec --with-user-token` passes the current CLI session to `getCliClient()`; running the apply command through plain `node` does not. The script refuses any target other than `3yrbpvzl/production`. Do not paste credentials into source or chat.

The import uploads/reuses the three existing WebP images and creates 19 published fictional demo documents: three schools, the Copperview 2026 yearbook, four student profiles, six gallery photographs, four memories and site settings. Student images reuse the existing composite with per-profile Sanity crops; replace them with individual approved portraits later. These are fictional demo assignments, not verified identities.

Stable IDs and `createIfNotExists` preserve existing documents, including site settings and later editor changes. Documents commit together in one transaction. Assets upload first and are reused by content hash on reruns; if the transaction fails, uploaded assets may remain for the next run. No records or assets are deleted. Record presence is checked after the commit.

`demo-source.json` snapshots the existing student and gallery arrays. The other seed values come from the prototype's school, yearbook, home and footer pages. The static demo directory advertises other years without actual yearbook pages; this migration does not invent those editions. Marketing-page text, school-history timeline, and gallery CSS layout remain in the website code for now. The public website still reads its local content until the frontend integration is completed.

Local tests validate references, assets, alt text and duplicate IDs and exercise two migration runs with a simulated client to ensure edited content survives. They do not substitute for a real authenticated import. Sanity schema validations run in Studio; the importer performs its own preflight checks.
