import {cache} from 'react';
// Tokenless server-side reads: never expose drafts or grant the website write access.
export type Photo = {asset?: {_ref: string}; alt?: string; caption?: string; crop?: {left: number; right: number; top: number; bottom: number}};
export type RecordData = { _id: string; _type: string; [key: string]: any };
export const content = cache(async (): Promise<RecordData[]> => {
  const url = new URL('https://3yrbpvzl.apicdn.sanity.io/v2026-09-17/data/query/production');
  url.searchParams.set('perspective', 'published');
  url.searchParams.set('query', '*[_type in ["school","yearbook","studentProfile","galleryPhoto","memory","siteSettings"] && !(_id in path("demo.**"))] | order(displayOrder asc, _id asc)');
  const response = await fetch(url, {cache: 'no-store', signal: AbortSignal.timeout(15000)});
  if (!response.ok) throw new Error('Yearbook content is temporarily unavailable');
  const body = await response.json();
  if (!Array.isArray(body.result)) throw new Error('Invalid yearbook response');
  const records: RecordData[] = body.result;
  const schools = new Set(records.filter(d => d._type === 'school').map(d => d._id));
  const books = new Set(records.filter(d => d._type === 'yearbook' && schools.has(d.school?._ref)).map(d => d._id));
  return records.filter(d => d._type === 'yearbook' ? books.has(d._id) : ['studentProfile','galleryPhoto','memory'].includes(d._type) ? books.has(d.yearbook?._ref) : true);
});
export function imageUrl(photo?: Photo, width = 1200): string | undefined {
  const match = photo?.asset?._ref.match(/^image-([a-f0-9]+)-(\d+)x(\d+)-(\w+)$/);
  if (!match) return undefined;
  const [,hash,w,h,format] = match;
  const url = new URL(`https://cdn.sanity.io/images/3yrbpvzl/production/${hash}-${w}x${h}.${format}`);
  url.searchParams.set('w', String(width)); url.searchParams.set('auto', 'format'); url.searchParams.set('fit', 'max');
  if (photo?.crop) {
    const c = photo.crop, x = Math.round(c.left * +w), y = Math.round(c.top * +h);
    url.searchParams.set('rect', [x,y,Math.max(1,Math.floor(+w*(1-c.right))-x),Math.max(1,Math.floor(+h*(1-c.bottom))-y)].join(','));
  }
  return url.toString();
}
