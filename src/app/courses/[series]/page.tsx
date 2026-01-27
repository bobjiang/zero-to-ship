import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { LessonCard } from '@/components/courses/LessonCard';
import { getSeriesBySlug, getAllSeries } from '@/lib/content';

interface SeriesPageProps {
  params: Promise<{
    series: string;
  }>;
}

export async function generateStaticParams() {
  const allSeries = await getAllSeries();
  return allSeries.map((series) => ({
    series: series.slug,
  }));
}

export async function generateMetadata({ params }: SeriesPageProps) {
  const { series: seriesSlug } = await params;
  const series = await getSeriesBySlug(seriesSlug);

  if (!series) {
    return {
      title: 'Series Not Found - Zero to Ship',
    };
  }

  return {
    title: `${series.title} - Zero to Ship`,
    description: series.description,
  };
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { series: seriesSlug } = await params;
  const series = await getSeriesBySlug(seriesSlug);

  if (!series) {
    notFound();
  }

  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {series.title}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{series.description}</p>
          <p className="mt-2 text-sm text-gray-600">
            {series.lessons.length} {series.lessons.length === 1 ? 'lesson' : 'lessons'}
          </p>
        </div>

        <div className="mt-16 space-y-4">
          {series.lessons.length > 0 ? (
            series.lessons.map((lesson) => (
              <LessonCard key={lesson.slug} lesson={lesson} seriesSlug={series.slug} />
            ))
          ) : (
            <div className="text-center text-gray-600">
              <p>No lessons available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
