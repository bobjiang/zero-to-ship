import { notFound } from 'next/navigation';
import { LessonContent } from '@/components/courses/LessonContent';
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
      title: 'Series Not Found - 02Ship',
    };
  }

  return {
    title: series.title,
    description: series.description,
    openGraph: {
      title: series.title,
      description: series.description,
      url: `/courses/${series.slug}`,
    },
    alternates: { canonical: `/courses/${series.slug}` },
  };
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { series: seriesSlug } = await params;
  const series = await getSeriesBySlug(seriesSlug);

  if (!series) {
    notFound();
  }

  const firstLesson = series.lessons[0];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.02ship.com';
  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: series.title,
    description: series.description,
    provider: { '@type': 'Organization', name: '02Ship', url: siteUrl },
    url: `${siteUrl}/courses/${series.slug}`,
    numberOfLessons: series.lessons.length,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: `${series.lessons.length} lessons`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      {firstLesson ? (
        <LessonContent series={series} lesson={firstLesson} />
      ) : (
        <div className="text-gray-600">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{series.title}</h1>
          <p className="mt-4">No lessons available yet. Check back soon!</p>
        </div>
      )}
    </>
  );
}
