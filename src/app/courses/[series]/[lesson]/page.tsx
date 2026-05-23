import { notFound } from 'next/navigation';
import { LessonContent } from '@/components/courses/LessonContent';
import { getLessonBySlug, getSeriesBySlug, getAllSeries } from '@/lib/content';

interface LessonPageProps {
  params: Promise<{
    series: string;
    lesson: string;
  }>;
}

export async function generateStaticParams() {
  const allSeries = await getAllSeries();
  const params: { series: string; lesson: string }[] = [];

  for (const series of allSeries) {
    for (const lesson of series.lessons) {
      params.push({
        series: series.slug,
        lesson: lesson.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { series: seriesSlug, lesson: lessonSlug } = await params;
  const series = await getSeriesBySlug(seriesSlug);
  const lesson = series?.lessons.find((l) => l.slug === lessonSlug);

  if (!series || !lesson) {
    return {
      title: 'Lesson Not Found - 02Ship',
    };
  }

  // The first lesson is canonical at the course root.
  const isFirst = series.lessons[0]?.slug === lessonSlug;
  const canonical = isFirst ? `/courses/${seriesSlug}` : `/courses/${seriesSlug}/${lessonSlug}`;

  return {
    title: lesson.title,
    description: lesson.description,
    openGraph: {
      title: lesson.title,
      description: lesson.description,
      url: canonical,
      type: 'article',
    },
    alternates: { canonical },
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { series: seriesSlug, lesson: lessonSlug } = await params;
  const lesson = await getLessonBySlug(seriesSlug, lessonSlug);
  const series = await getSeriesBySlug(seriesSlug);

  if (!lesson || !series) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.02ship.com';
  const lessonJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: lesson.title,
    description: lesson.description,
    provider: { '@type': 'Organization', name: '02Ship', url: siteUrl },
    url: `${siteUrl}/courses/${seriesSlug}/${lesson.slug}`,
    timeRequired: lesson.duration,
    isPartOf: {
      '@type': 'Course',
      name: series.title,
      url: `${siteUrl}/courses/${seriesSlug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lessonJsonLd) }}
      />
      <LessonContent series={series} lesson={lesson} />
    </>
  );
}
