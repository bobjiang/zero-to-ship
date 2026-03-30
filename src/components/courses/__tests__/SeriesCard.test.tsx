import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SeriesCard } from '@/components/courses/SeriesCard';
import { Series } from '@/types/course';

const mockSeries: Series = {
  slug: 'test-series',
  title: 'Test Series Title',
  description: 'A test series description',
  thumbnail: '/test-thumbnail.jpg',
  order: 1,
  lessons: [
    { slug: 'lesson-1', title: 'Lesson 1', description: 'First lesson', duration: '10 min', order: 1 },
    { slug: 'lesson-2', title: 'Lesson 2', description: 'Second lesson', duration: '15 min', order: 2 },
  ],
};

describe('SeriesCard', () => {
  it('renders series title', () => {
    render(<SeriesCard series={mockSeries} />);
    expect(screen.getByRole('heading', { name: 'Test Series Title' })).toBeInTheDocument();
  });

  it('renders series description', () => {
    render(<SeriesCard series={mockSeries} />);
    expect(screen.getByText('A test series description')).toBeInTheDocument();
  });

  it('shows correct lesson count (plural)', () => {
    render(<SeriesCard series={mockSeries} />);
    expect(screen.getByText('2 lessons')).toBeInTheDocument();
  });

  it('shows correct lesson count (singular)', () => {
    const singleLessonSeries = { ...mockSeries, lessons: [mockSeries.lessons[0]] };
    render(<SeriesCard series={singleLessonSeries} />);
    expect(screen.getByText('1 lesson')).toBeInTheDocument();
  });

  it('links to the correct series page', () => {
    render(<SeriesCard series={mockSeries} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/courses/test-series');
  });
});
