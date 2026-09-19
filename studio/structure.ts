import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = S => S.list().title('Yearbook MAZ').items([
  S.listItem().title('Schools').child(S.documentTypeList('school').filter('_type == "school" && !(_id in path("demo.**"))')),
  S.listItem().title('Yearbooks').child(S.documentTypeList('yearbook').filter('_type == "yearbook" && !(_id in path("demo.**"))')),
  S.divider(),
  S.listItem().title('Student profiles').child(S.documentTypeList('studentProfile').filter('_type == "studentProfile" && !(_id in path("demo.**"))')),
  S.listItem().title('Gallery photos').child(S.documentTypeList('galleryPhoto').filter('_type == "galleryPhoto" && !(_id in path("demo.**"))')),
  S.listItem().title('Memories and stories').child(S.documentTypeList('memory').filter('_type == "memory" && !(_id in path("demo.**"))')),
  S.divider(),
  S.listItem().title('Site settings').id('siteSettings').child(
    S.document().schemaType('siteSettings').documentId('siteSettings').title('Site settings'),
  ),
])
