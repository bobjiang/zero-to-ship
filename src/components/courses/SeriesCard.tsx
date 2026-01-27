import Link from 'next/link';
import { Series } from '@/types/course';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

interface SeriesCardProps {
  series: Series;
}

export function SeriesCard({ series }: SeriesCardProps) {
  const lessonCount = series.lessons.length;

  return (
    <Link href={`/courses/${series.slug}`}>
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle>{series.title}</CardTitle>
          <CardDescription>{series.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            {lessonCount} {lessonCount === 1 ? 'lesson' : 'lessons'}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
