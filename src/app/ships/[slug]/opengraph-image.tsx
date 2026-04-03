import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';
import { getAllShips } from '@/lib/content';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: { slug: string } }) {
  const ships = await getAllShips();
  const ship = ships.find((s) => s.slug === params.slug);

  return generateOgImage({
    title: ship?.title || 'Ship',
    subtitle: ship?.description,
    tag: `Built by ${ship?.builder || 'Community'}`,
  });
}
