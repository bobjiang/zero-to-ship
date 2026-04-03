import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';
import { getSeriesBySlug } from '@/lib/content';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: { series: string; lesson: string };
}) {
  const series = await getSeriesBySlug(params.series);
  const lesson = series?.lessons.find((l) => l.slug === params.lesson);

  return generateOgImage({
    title: lesson?.title || 'Lesson',
    subtitle: lesson?.description,
    tag: series?.title || 'Course',
  });
}
