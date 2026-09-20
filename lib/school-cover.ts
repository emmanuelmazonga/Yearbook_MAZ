import {imageUrl, type RecordData} from '@/lib/sanity';

export const KANSENSHI_SLUG = 'kansenshi-secondary-school';
export const KANSENSHI_COVER = '/images/kansenshi-secondary-school.jpg';

export function isKansenshiPreview(school: RecordData): boolean {
  return school.slug?.current === KANSENSHI_SLUG;
}

export function schoolCover(school: RecordData, width = 1200) {
  if (isKansenshiPreview(school)) {
    return {
      src: KANSENSHI_COVER,
      alt: 'Kansenshi Secondary School campus building',
      local: true,
    };
  }

  return {
    src: imageUrl(school.coverImage, width),
    alt: school.coverImage?.alt || `${school.name} school community`,
    local: false,
  };
}
