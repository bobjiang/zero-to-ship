import Link from 'next/link';
import { BookOpen, Clock } from '@phosphor-icons/react/dist/ssr';
import { Series } from '@/types/course';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface SeriesCardProps {
  series: Series;
}

export function SeriesCard({ series }: SeriesCardProps) {
  const lessonCount = series.lessons.length;

  return (
    <Link href={`/courses/${series.slug}`} className="group block h-full">
      <Card className={cn('flex h-full flex-col transition group-hover:-translate-y-0.5 group-hover:border-slate-300 group-hover:shadow-md group-hover:shadow-slate-950/10 dark:group-hover:border-slate-700')}>
        <CardHeader>
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-none bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">
            <BookOpen className="h-6 w-6" weight="duotone" />
          </div>
          <CardTitle>{series.title}</CardTitle>
          <CardDescription>{series.description}</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <p className="inline-flex items-center gap-2 rounded-none bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            <Clock className="h-3.5 w-3.5" weight="bold" />
            {lessonCount} {lessonCount === 1 ? 'lesson' : 'lessons'}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
