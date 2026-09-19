import type {Metadata} from 'next';

export const SITE_URL = 'https://copperview-yearbook.emmanuelmazonga.chatgpt.site';
export const SITE_NAME = 'Living Yearbooks';
export const DEFAULT_DESCRIPTION = 'Digital school yearbooks for Zambia—photography, student stories and graduating-class memories preserved in one living archive.';

export function pageMetadata({title, description, path, image='/og.png'}: {title: string; description: string; path: string; image?: string | null}): Metadata {
  const images=image ? [image==='/og.png' ? {url:image,width:1200,height:630,alt:`${title} — ${SITE_NAME}`} : {url:image,alt:`${title} — ${SITE_NAME}`}] : [];
  return {
    title,
    description,
    alternates:{canonical:path},
    openGraph:{title, description, url:path, siteName:SITE_NAME, locale:'en_ZM', type:'website', images},
    twitter:{card:'summary_large_image', title, description, images:image ? [image] : []},
  };
}
