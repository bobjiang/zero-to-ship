import Link from 'next/link';
import { Clock } from '@phosphor-icons/react/dist/ssr';
import { Lesson } from '@/types/course';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

interface LessonCardProps {
  lesson: Lesson;
  seriesSlug: string;
}

export function LessonCard({ lesson, seriesSlug }: LessonCardProps) {
  return (
    <Link href={`/courses/${seriesSlug}/${lesson.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col transition group-hover:-translate-y-0.5 group-hover:border-slate-300 group-hover:shadow-md group-hover:shadow-slate-950/10 dark:group-hover:border-slate-700">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{lesson.title}</CardTitle>
              <CardDescription className="mt-1">{lesson.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-auto">
          <p className="inline-flex items-center gap-2 rounded-none bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            <Clock className="h-3.5 w-3.5" weight="bold" />
            {lesson.duration}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
