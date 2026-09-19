import test from 'node:test'
import assert from 'node:assert/strict'
import {legacyIds, publicId, rewriteReferences} from './public-ids.mjs'

test('maps only the 18 known migration IDs to unique public IDs', () => {
  assert.equal(legacyIds.length, 18)
  assert.equal(new Set(legacyIds.map(publicId)).size, 18)
  assert(legacyIds.map(publicId).every(id => !id.includes('.')))
})
test('rewrites nested references while preserving assets, prose and original input', () => {
  const input = {yearbook: {_type: 'reference', _ref: 'demo.yearbook.copperview-2026'}, images: [{asset: {_ref: 'image-abc'}}], body: 'demo.yearbook.copperview-2026', other: {_ref: 'custom.id'}}
  const output = rewriteReferences(input)
  assert.equal(output.yearbook._ref, 'demo-yearbook-copperview-2026')
  assert.equal(output.images[0].asset._ref, 'image-abc')
  assert.equal(output.other._ref, 'custom.id')
  assert.equal(output.body, input.body)
  assert.equal(input.yearbook._ref, 'demo.yearbook.copperview-2026')
})
