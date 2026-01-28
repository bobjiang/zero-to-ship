import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { Series, Lesson } from '@/types/course';
import { BlogPost } from '@/types/blog';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const COURSES_DIR = path.join(CONTENT_DIR, 'courses');
const BLOG_DIR = path.join(CONTENT_DIR, 'blog');

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
    const files = await fs.readdir(BLOG_DIR);
    const mdxFiles = files.filter(f => f.endsWith('.mdx'));

    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const filePath = path.join(BLOG_DIR, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data, content } = matter(fileContent);

        const slug = file.replace('.mdx', '');

        return {
          slug,
          title: data.title || '',
          excerpt: data.excerpt || '',
          date: data.date || '',
          author: data.author || '',
          content,
        } as BlogPost;
      })
    );

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title || '',
      excerpt: data.excerpt || '',
      date: data.date || '',
      author: data.author || '',
      content,
    } as BlogPost;
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}
