import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

if (!projectId) {
  throw new Error('Set SANITY_STUDIO_PROJECT_ID in studio/.env.local before starting Studio.')
}

export default defineConfig({
  name: 'yearbook-maz',
  title: 'Yearbook MAZ',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {types: schemaTypes},
})
