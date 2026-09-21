import type {MetadataRoute} from 'next';
import {content, type RecordData} from '@/lib/sanity';
import {SITE_URL} from '@/lib/site';

const staticRoutes = ['', '/schools', '/photography', '/for-schools', '/about', '/contact', '/privacy', '/terms'];

function latestUpdate(documents: RecordData[]): Date | undefined {
  const dates = documents
    .map(document => Date.parse(document._updatedAt ?? ''))
    .filter(Number.isFinite);

  return dates.length ? new Date(Math.max(...dates)) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = await content();
  const schools = docs.filter(document => document._type === 'school' && document.slug?.current);
  const yearbooks = docs.filter(document => document._type === 'yearbook' && document.slug?.current);

  return [
    ...staticRoutes.map(route => ({url: `${SITE_URL}${route}`})),
    ...schools.map(school => ({
      url: `${SITE_URL}/schools/${school.slug.current}`,
      lastModified: latestUpdate([
        school,
        ...yearbooks.filter(book => book.school?._ref === school._id),
      ]),
    })),
    ...yearbooks.map(book => ({
      url: `${SITE_URL}/yearbooks/${book.slug.current}`,
      lastModified: latestUpdate([
        book,
        ...schools.filter(school => school._id === book.school?._ref),
        ...docs.filter(document =>
          ['studentProfile', 'galleryPhoto', 'memory'].includes(document._type) &&
          document.yearbook?._ref === book._id,
        ),
      ]),
    })),
  ];
}
