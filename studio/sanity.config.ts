import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {projectId, dataset} from './project'

export default defineConfig({
  name: 'yearbook-maz',
  title: 'Yearbook MAZ',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {types: schemaTypes},
})
