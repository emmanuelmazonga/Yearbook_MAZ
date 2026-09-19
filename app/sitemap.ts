import type {MetadataRoute} from 'next';
import {content} from '@/lib/sanity';
import {SITE_URL} from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs=await content();
  const routes=['','/schools','/photography','/for-schools','/about','/contact','/privacy','/terms'];
  const dynamic=[
    ...docs.filter(d=>d._type==='school' && d.slug?.current).map(d=>`/schools/${d.slug.current}`),
    ...docs.filter(d=>d._type==='yearbook' && d.slug?.current).map(d=>`/yearbooks/${d.slug.current}`),
  ];
  return [...routes,...dynamic].map((route,index)=>({
    url:`${SITE_URL}${route}`,
    lastModified:new Date(),
    changeFrequency:index===0 ? 'weekly' : 'monthly',
    priority:index===0 ? 1 : route.startsWith('/schools/') || route.startsWith('/yearbooks/') ? .8 : .6,
  }));
}
