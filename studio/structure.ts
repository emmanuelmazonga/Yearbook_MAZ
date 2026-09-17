import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = S => S.list().title('Yearbook MAZ').items([
  S.documentTypeListItem('school').title('Schools'),
  S.documentTypeListItem('yearbook').title('Yearbooks'),
  S.divider(),
  S.documentTypeListItem('studentProfile').title('Student profiles'),
  S.documentTypeListItem('galleryPhoto').title('Gallery photos'),
  S.documentTypeListItem('memory').title('Memories and stories'),
  S.divider(),
  S.listItem().title('Site settings').id('siteSettings').child(
    S.document().schemaType('siteSettings').documentId('siteSettings').title('Site settings'),
  ),
])
