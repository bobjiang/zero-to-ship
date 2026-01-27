import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { VideoPlayer } from '@/components/courses/VideoPlayer';
import { Button } from '@/components/ui/Button';
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
  const lesson = await getLessonBySlug(seriesSlug, lessonSlug);

  if (!lesson) {
    return {
      title: 'Lesson Not Found - 02Ship',
    };
  }

  return {
    title: `${lesson.title} - 02Ship`,
    description: lesson.description,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { series: seriesSlug, lesson: lessonSlug } = await params;
  const lesson = await getLessonBySlug(seriesSlug, lessonSlug);
  const series = await getSeriesBySlug(seriesSlug);

  if (!lesson || !series) {
    notFound();
  }

  const currentIndex = series.lessons.findIndex((l) => l.slug === lessonSlug);
  const previousLesson = currentIndex > 0 ? series.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < series.lessons.length - 1 ? series.lessons[currentIndex + 1] : null;

  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <Link
              href={`/courses/${seriesSlug}`}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              ← Back to {series.title}
            </Link>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {lesson.title}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{lesson.description}</p>
          <p className="mt-2 text-sm text-gray-600">Duration: {lesson.duration}</p>

          <div className="mt-8">
            <VideoPlayer youtubeId={lesson.youtubeId} title={lesson.title} />
          </div>

          {lesson.transcript && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">Transcript</h2>
              <div className="mt-4 whitespace-pre-wrap text-gray-600">
                {lesson.transcript}
              </div>
            </div>
          )}

          <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-8">
            <div>
              {previousLesson ? (
                <Link href={`/courses/${seriesSlug}/${previousLesson.slug}`}>
                  <Button variant="outline">← Previous Lesson</Button>
                </Link>
              ) : (
                <div />
              )}
            </div>
            <div>
              {nextLesson ? (
                <Link href={`/courses/${seriesSlug}/${nextLesson.slug}`}>
                  <Button>Next Lesson →</Button>
                </Link>
              ) : (
                <Link href={`/courses/${seriesSlug}`}>
                  <Button variant="outline">Back to Course</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
