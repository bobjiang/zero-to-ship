import { Container } from '@/components/ui/Container';
import { SeriesCard } from '@/components/courses/SeriesCard';
import { getAllSeries } from '@/lib/content';

export const metadata = {
  title: 'Courses - 02Ship',
  description: 'Browse our courses and start learning to build with AI tools.',
};

export default async function CoursesPage() {
  const allSeries = await getAllSeries();

  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Courses
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Step-by-step video courses to help you build and ship your ideas
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allSeries.length > 0 ? (
            allSeries.map((series) => (
              <SeriesCard key={series.slug} series={series} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600">
              <p>No courses available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
