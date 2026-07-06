import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SeriesCard } from '@/components/courses/SeriesCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { getAllSeries } from '@/lib/content';

export const metadata: Metadata = {
  title: 'AI Coding Courses for Beginners',
  description:
    'Free step-by-step video courses to build and ship real projects with Claude Code and AI tools. No coding experience needed.',
  alternates: { canonical: '/courses' },
};

export default async function CoursesPage() {
  const allSeries = await getAllSeries();

  return (
    <div className="py-16 sm:py-24">
      <Container>
        <PageHeader
          eyebrow="Learning paths"
          title="Courses"
          description="Step-by-step video courses to help you build and ship your ideas."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allSeries.length > 0 ? (
            allSeries.map((series) => (
              <SeriesCard key={series.slug} series={series} />
            ))
          ) : (
            <EmptyState
              className="col-span-full"
              title="No courses available yet."
              description="Check back soon for new learning paths."
            />
          )}
        </div>
      </Container>
    </div>
  );
}
