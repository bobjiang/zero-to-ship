import fs from 'fs/promises';
import path from 'path';
import { Series, Lesson } from '@/types/course';
import { BlogPost } from '@/types/blog';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const COURSES_DIR = path.join(CONTENT_DIR, 'courses');
// const BLOG_DIR = path.join(CONTENT_DIR, 'blog'); // TODO: implement blog parsing

export async function getAllSeries(): Promise<Series[]> {
  try {
    const seriesDirs = await fs.readdir(COURSES_DIR);
    const seriesPromises = seriesDirs
      .filter(dir => !dir.startsWith('.'))
      .map(async (seriesSlug) => {
        const seriesPath = path.join(COURSES_DIR, seriesSlug, 'series.json');
        const content = await fs.readFile(seriesPath, 'utf-8');
        const series: Series = JSON.parse(content);

        // Load lessons for this series
        const lessonsDir = path.join(COURSES_DIR, seriesSlug);
        const files = await fs.readdir(lessonsDir);
        const lessonFiles = files.filter(f => f.startsWith('lesson-') && f.endsWith('.json'));

        const lessons = await Promise.all(
          lessonFiles.map(async (file) => {
            const lessonPath = path.join(lessonsDir, file);
            const lessonContent = await fs.readFile(lessonPath, 'utf-8');
            return JSON.parse(lessonContent) as Lesson;
          })
        );

        return { ...series, lessons: lessons.sort((a: Lesson, b: Lesson) => a.order - b.order) };
      });

    const series = await Promise.all(seriesPromises);
    return series.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error loading series:', error);
    return [];
  }
}

export async function getSeriesBySlug(slug: string): Promise<Series | null> {
  try {
    const allSeries = await getAllSeries();
    return allSeries.find(s => s.slug === slug) || null;
  } catch (error) {
    console.error(`Error loading series ${slug}:`, error);
    return null;
  }
}

export async function getLessonBySlug(
  seriesSlug: string,
  lessonSlug: string
): Promise<Lesson | null> {
  try {
    const series = await getSeriesBySlug(seriesSlug);
    if (!series) return null;
    return series.lessons.find((l: Lesson) => l.slug === lessonSlug) || null;
  } catch (error) {
    console.error(`Error loading lesson ${seriesSlug}/${lessonSlug}:`, error);
    return null;
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    // For now, return empty array - we'll implement MDX parsing later
    return [];
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}
