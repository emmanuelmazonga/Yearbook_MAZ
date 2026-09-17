import {defineArrayMember, defineField, defineType} from 'sanity'

const order = defineField({name: 'displayOrder', title: 'Display order', type: 'number', initialValue: 0, validation: r => r.integer().min(0)})
const featured = defineField({name: 'featured', type: 'boolean', initialValue: false})
const yearbookRef = defineField({name: 'yearbook', type: 'reference', to: [{type: 'yearbook'}], options: {filter: '!(_id in path("demo.**"))'}, validation: r => r.required()})
const slug = (source: string) => defineField({name: 'slug', type: 'slug', options: {source, maxLength: 96}, validation: r => r.required()})
const text = (name: string, title: string, required = false) => defineField({name, title, type: 'string', validation: r => required ? r.required() : r})
const ordered = [{title: 'Display order', name: 'displayOrder', by: [{field: 'displayOrder', direction: 'asc' as const}]}]

const editorialImage = defineType({
  name: 'editorialImage', title: 'Photograph', type: 'image',
  options: {hotspot: true},
  validation: r => r.assetRequired(),
  fields: [
    defineField({name: 'alt', title: 'Image description (alt text)', type: 'string', description: 'Describe the image for people using a screen reader.', validation: r => r.required()}),
    text('caption', 'Caption'), text('photographer', 'Photographer / credit'),
  ],
})

const school = defineType({
  name: 'school', title: 'Schools', type: 'document',
  fields: [
    text('name', 'School name', true), slug('name'), text('city', 'City', true),
    defineField({name: 'country', type: 'string', initialValue: 'Zambia', validation: r => r.required()}),
    text('motto', 'Motto'),
    defineField({name: 'description', type: 'text', rows: 4}),
    defineField({name: 'logo', type: 'editorialImage'}),
    defineField({name: 'coverImage', type: 'editorialImage'}),
    defineField({name: 'website', type: 'url', validation: r => r.uri({scheme: ['https', 'http']})}),
    order, featured,
  ],
  orderings: ordered,
  preview: {select: {title: 'name', subtitle: 'city', media: 'coverImage'}},
})

const yearbook = defineType({
  name: 'yearbook', title: 'Yearbooks', type: 'document',
  fields: [
    text('title', 'Yearbook title', true), slug('title'),
    defineField({name: 'school', type: 'reference', to: [{type: 'school'}], options: {filter: '!(_id in path("demo.**"))'}, validation: r => r.required()}),
    defineField({name: 'graduationYear', title: 'Graduation year', type: 'number', validation: r => r.required().integer().min(1900).max(2200)}),
    text('volume', 'Volume / edition'),
    defineField({name: 'introduction', type: 'text', rows: 4}),
    defineField({name: 'heroImage', type: 'editorialImage', validation: r => r.required()}),
    defineField({name: 'studentCount', title: 'Graduating class size', type: 'number', description: 'Total class size, which may differ from the number of published profiles.', validation: r => r.integer().min(0)}),
    defineField({name: 'headteacherMessage', type: 'object', fields: [text('name', 'Headteacher name', true), text('quote', 'Featured quote'), defineField({name: 'message', type: 'text', rows: 6}), defineField({name: 'portrait', type: 'editorialImage'})]}),
    defineField({name: 'schoolLife', title: 'Clubs, sport, leadership and awards', type: 'array', of: [defineArrayMember({type: 'object', name: 'highlight', fields: [text('title', 'Title', true), defineField({name: 'description', type: 'text', rows: 3})]})]}),
    defineField({name: 'printOptions', type: 'array', of: [defineArrayMember({type: 'object', name: 'printOption', fields: [text('title', 'Edition name', true), text('description', 'Description'), text('priceLabel', 'Price or enquiry wording', true)]})]}),
    order, featured,
  ],
  preview: {select: {title: 'title', subtitle: 'school.name', media: 'heroImage'}},
})

const studentProfile = defineType({
  name: 'studentProfile', title: 'Student profiles', type: 'document',
  fields: [
    text('fullName', 'Full name', true), yearbookRef,
    text('classGroup', 'Class / form', true), text('nickname', 'Nickname'),
    defineField({name: 'portrait', type: 'editorialImage', validation: r => r.required()}),
    defineField({name: 'quote', type: 'text', rows: 3}),
    defineField({name: 'biography', type: 'text', rows: 5}),
    text('activity', 'Club, sport or activity'),
    defineField({name: 'favouriteMemory', type: 'text', rows: 3}),
    text('ambition', 'Future ambition'),
    defineField({name: 'achievements', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'socialLinks', title: 'Approved public social links', type: 'array', of: [defineArrayMember({type: 'object', name: 'socialLink', fields: [text('label', 'Platform', true), defineField({name: 'url', type: 'url', validation: r => r.required().uri({scheme: ['https']})})]})]}),
    order, featured,
  ],
  orderings: [...ordered, {title: 'Name', name: 'name', by: [{field: 'fullName', direction: 'asc'}]}],
  preview: {select: {title: 'fullName', subtitle: 'yearbook.title', media: 'portrait'}},
})

const galleryPhoto = defineType({
  name: 'galleryPhoto', title: 'Gallery photos', type: 'document',
  fields: [
    text('title', 'Title', true), yearbookRef,
    defineField({name: 'image', type: 'editorialImage', validation: r => r.required()}),
    defineField({name: 'category', type: 'string', options: {list: ['Portraits', 'Sports', 'Clubs', 'Events', 'Friends', 'Behind the scenes']}, validation: r => r.required()}),
    text('event', 'Event name'), defineField({name: 'date', type: 'date'}),
    order, featured,
  ],
  orderings: ordered,
  preview: {select: {title: 'title', subtitle: 'category', media: 'image'}},
})

const memory = defineType({
  name: 'memory', title: 'Memories and stories', type: 'document',
  fields: [
    text('title', 'Title', true), yearbookRef, text('author', 'Public author name'),
    defineField({name: 'body', title: 'Memory / story', type: 'text', rows: 8, validation: r => r.required()}),
    defineField({name: 'photos', type: 'array', of: [defineArrayMember({type: 'editorialImage'})]}),
    order, featured,
  ],
  orderings: ordered,
  preview: {select: {title: 'title', subtitle: 'yearbook.title'}},
})

const siteSettings = defineType({
  name: 'siteSettings', title: 'Site settings', type: 'document',
  fields: [
    text('siteTitle', 'Site title', true), text('tagline', 'Tagline'),
    defineField({name: 'introduction', type: 'text', rows: 4}),
    defineField({name: 'heroImage', type: 'editorialImage'}),
    defineField({name: 'featuredYearbook', type: 'reference', to: [{type: 'yearbook'}], options: {filter: '!(_id in path("demo.**"))'}}),
    defineField({name: 'contactEmail', title: 'Public contact email', type: 'string', validation: r => r.email()}),
    text('contactPhone', 'Public business phone'),
    defineField({name: 'footerText', type: 'text', rows: 3}),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})

export const schemaTypes = [editorialImage, school, yearbook, studentProfile, galleryPhoto, memory, siteSettings]
