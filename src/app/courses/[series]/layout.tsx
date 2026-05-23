import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { getSeriesBySlug } from '@/lib/content';

interface CourseLayoutProps {
  children: React.ReactNode;
  params: Promise<{ series: string }>;
}

export default async function CourseLayout({ children, params }: CourseLayoutProps) {
  const { series: seriesSlug } = await params;
  const series = await getSeriesBySlug(seriesSlug);

  if (!series) {
    notFound();
  }

  return (
    <div className="py-12">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <main className="min-w-0">{children}</main>
          <CourseSidebar
            seriesSlug={series.slug}
            seriesTitle={series.title}
            lessons={series.lessons.map((l) => ({ slug: l.slug, title: l.title }))}
          />
        </div>
      </Container>
    </div>
  );
}
