import {imageUrl, type RecordData} from '@/lib/sanity';

// The four fictional profiles share one 1536×1024 demo photograph. Their
// original full-height strips lose the faces when fitted into portrait cards.
const demoPortraitLeft: Record<string, number> = {
  'Chanda Mwansa': 90,
  'Mutinta Chileshe': 505,
  'Bwalya Musonda': 770,
  'Thandiwe Phiri': 1055,
};

export function studentPortraitUrl(student: RecordData, width = 600): string | undefined {
  const portrait = student.portrait;
  const left = demoPortraitLeft[student.fullName];
  if (
    student._id.startsWith('demo-student-') &&
    left !== undefined &&
    /-1536x1024-webp$/.test(portrait?.asset?._ref || '')
  ) {
    return imageUrl({
      ...portrait,
      crop: {
        left: left / 1536,
        right: (1536 - left - 430) / 1536,
        top: 20 / 1024,
        bottom: (1024 - 20 - 550) / 1024,
      },
    }, width);
  }
  return imageUrl(portrait, width);
}
