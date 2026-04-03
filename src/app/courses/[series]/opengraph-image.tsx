import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';
import { getAllSeries } from '@/lib/content';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: { series: string } }) {
  const allSeries = await getAllSeries();
  const series = allSeries.find((s) => s.slug === params.series);

  return generateOgImage({
    title: series?.title || 'Course',
    subtitle: series?.description,
    tag: `${series?.lessons.length || 0} Lessons`,
  });
}
