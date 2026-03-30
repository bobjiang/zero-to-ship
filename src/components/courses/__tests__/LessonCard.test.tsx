import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LessonCard } from '@/components/courses/LessonCard';
import { Lesson } from '@/types/course';

const mockLesson: Lesson = {
  slug: 'test-lesson',
  title: 'Test Lesson Title',
  description: 'A test lesson description',
  duration: '12 min',
  order: 1,
};

describe('LessonCard', () => {
  it('renders lesson title', () => {
    render(<LessonCard lesson={mockLesson} seriesSlug="test-series" />);
    expect(screen.getByRole('heading', { name: 'Test Lesson Title' })).toBeInTheDocument();
  });

  it('renders lesson description', () => {
    render(<LessonCard lesson={mockLesson} seriesSlug="test-series" />);
    expect(screen.getByText('A test lesson description')).toBeInTheDocument();
  });

  it('renders lesson duration', () => {
    render(<LessonCard lesson={mockLesson} seriesSlug="test-series" />);
    expect(screen.getByText('12 min')).toBeInTheDocument();
  });

  it('links to the correct lesson page', () => {
    render(<LessonCard lesson={mockLesson} seriesSlug="test-series" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/courses/test-series/test-lesson');
  });
});
