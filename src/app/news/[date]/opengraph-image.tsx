import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: { date: string } }) {
  const formatted = new Date(params.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return generateOgImage({
    title: `AI News — ${formatted}`,
    subtitle: 'Curated daily digest of the most important AI developments.',
    tag: 'Daily AI News',
    date: params.date,
  });
}
