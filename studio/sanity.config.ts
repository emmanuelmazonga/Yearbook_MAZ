import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {projectId, dataset} from './project'
import {structure} from './structure'

export default defineConfig({
  name: 'yearbook-maz',
  title: 'Yearbook MAZ',
  projectId,
  dataset,
  plugins: [structureTool({structure})],
  schema: {
    types: schemaTypes,
    templates: templates => templates.filter(template => template.schemaType !== 'siteSettings'),
  },
  document: {
    actions: (actions, context) => context.schemaType === 'siteSettings'
      ? actions.filter(action => action.action !== 'duplicate' && action.action !== 'delete')
      : actions,
  },
})
