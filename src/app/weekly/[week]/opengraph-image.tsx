import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';
import { getWeeklyDigest } from '@/lib/weekly';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: { week: string } }) {
  const digest = await getWeeklyDigest(params.week);

  const dateRange = digest
    ? `${new Date(digest.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — ${new Date(digest.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
    : params.week;

  return generateOgImage({
    title: `Anthropic & Claude Updates`,
    subtitle: digest?.summary || `Weekly digest for ${params.week}`,
    tag: 'Weekly Update',
    date: dateRange,
  });
}
