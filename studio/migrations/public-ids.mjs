import assert from 'node:assert/strict'
import {fileURLToPath} from 'node:url'
import {documents} from './demo.mjs'

const placeholderAssets = Object.fromEntries(['hero-class-2026.webp', 'students-camera-football.webp', 'cultural-day.webp'].map((name, i) => [name, `asset-${i}`]))
export const legacyIds = documents(placeholderAssets).map(d => d._id).filter(id => id.startsWith('demo.'))
export const publicId = id => id.replaceAll('.', '-')
export function rewriteReferences(value) {
  if (Array.isArray(value)) return value.map(rewriteReferences)
  if (!value || typeof value !== 'object') return value
  return Object.fromEntries(Object.entries(value).map(([key, child]) => [key,
    key === '_ref' && legacyIds.includes(child) ? publicId(child) : rewriteReferences(child),
  ]))
}

async function main() {
  const apply = process.argv.includes('--apply')
  assert(process.argv.slice(2).every(arg => arg === '--apply'), 'Only --apply is supported')
  const {getCliClient} = await import('sanity/cli')
  const client = getCliClient({apiVersion: '2026-09-17'}).withConfig({useCdn: false, perspective: 'raw'})
  assert.equal(client.config().projectId, '3yrbpvzl')
  assert.equal(client.config().dataset, 'production')
  const originals = await client.fetch('*[_id in $ids]', {ids: legacyIds})
  assert.equal(originals.length, 18, 'Expected all 18 original demo records. No changes made.')
  const drafts = await client.fetch('*[_id in $ids]._id', {ids: legacyIds.map(id => `drafts.${id}`)})
  assert.equal(drafts.length, 0, 'Publish or discard existing demo drafts before this correction.')
  const settings = await client.fetch('*[_id == "siteSettings"][0]')
  assert(settings, 'Missing site settings')
  const copies = originals.map(original => {
    const {_rev, _createdAt, _updatedAt, ...content} = original
    return {...rewriteReferences(content), _id: publicId(original._id)}
  })
  console.log(`${apply ? 'Applying' : 'Previewing'}: 18 public copies; original records retained; featured yearbook reference updated if needed.`)
  if (!apply) return
  let tx = client.transaction()
  for (const copy of copies) tx = tx.createIfNotExists(copy)
  const featuredRef = settings.featuredYearbook?._ref
  if (legacyIds.includes(featuredRef)) {
    tx = tx.patch('siteSettings', patch => patch.ifRevisionId(settings._rev).set({featuredYearbook: {...settings.featuredYearbook, _ref: publicId(featuredRef)}}))
  }
  await tx.commit({visibility: 'sync'})
  const url = new URL('https://3yrbpvzl.api.sanity.io/v2026-09-17/data/query/production')
  url.searchParams.set('query', '*[_id in $ids]{_id}')
  url.searchParams.set('$ids', JSON.stringify([...legacyIds.map(publicId), 'siteSettings']))
  url.searchParams.set('perspective', 'published')
  const response = await fetch(url)
  assert(response.ok, `Public verification failed: HTTP ${response.status}`)
  const data = await response.json()
  assert.equal(data.result?.length, 19, 'Public verification did not find all 19 content documents')
  console.log('Verified 19 publicly readable content documents. Original demo.* records retained as backups.')
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try { await main() } catch (error) { console.error(error.stack || error.message); process.exitCode = 1 }
}
