import Link from 'next/link';
import { Lesson } from '@/types/course';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

interface LessonCardProps {
  lesson: Lesson;
  seriesSlug: string;
}

export function LessonCard({ lesson, seriesSlug }: LessonCardProps) {
  return (
    <Link href={`/courses/${seriesSlug}/${lesson.slug}`}>
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{lesson.title}</CardTitle>
              <CardDescription className="mt-1">{lesson.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{lesson.duration}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
