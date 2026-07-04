import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { unstable_cache } from 'next/cache';
import { Series, Lesson } from '@/types/course';
import { BlogPost } from '@/types/blog';
import { Ship } from '@/types/ship';
import {
  blogFrontmatterSchema,
  formatZodError,
  lessonSchema,
  seriesFileSchema,
  shipSchema,
} from '@/lib/content-schemas';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const COURSES_DIR = path.join(CONTENT_DIR, 'courses');
const BLOG_DIR = path.join(CONTENT_DIR, 'blog');
const SHIPS_DIR = path.join(CONTENT_DIR, 'ships');

function isNotFound(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'ENOENT'
  );
}

function parseJsonFile<T>(
  raw: string,
  filePath: string,
  parse: (value: unknown) => T
): T {
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch (error) {
    throw new Error(
      `${filePath} is not valid JSON: ${(error as Error).message}`
    );
  }
  return parse(json);
}

function cacheContent<Args extends unknown[], Result>(
  fn: (...args: Args) => Promise<Result>,
  keyParts: string[],
  options: { tags: string[] }
): (...args: Args) => Promise<Result> {
  if (process.env.NODE_ENV === 'test' || process.env.VITEST) return fn;
  return unstable_cache(fn, keyParts, options);
}

export async function getAllSeries(): Promise<Series[]> {
  return getAllSeriesCached();
}

export async function getSeriesBySlug(slug: string): Promise<Series | null> {
  return getSeriesBySlugCached(slug);
}

export async function getLessonBySlug(
  seriesSlug: string,
  lessonSlug: string
): Promise<Lesson | null> {
  return getLessonBySlugCached(seriesSlug, lessonSlug);
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return getAllBlogPostsCached();
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  return getBlogPostBySlugCached(slug);
}

export async function getAllShips(): Promise<Ship[]> {
  return getAllShipsCached();
}

export async function getShipBySlug(slug: string): Promise<Ship | null> {
  return getShipBySlugCached(slug);
}

const getAllSeriesCached = cacheContent(
  async (): Promise<Series[]> => {
    const seriesDirs = await fs.readdir(COURSES_DIR);
    const series = await Promise.all(
      seriesDirs
        .filter((dir) => !dir.startsWith('.'))
        .map((seriesSlug) => readSeries(seriesSlug))
    );
    return series.sort((a, b) => a.order - b.order);
  },
  ['content:series:all'],
  { tags: ['content', 'content:series'] }
);

const getSeriesBySlugCached = cacheContent(
  async (slug: string): Promise<Series | null> => {
    try {
      return await readSeries(slug);
    } catch (error) {
      if (!isNotFound(error)) throw error;
      return null;
    }
  },
  ['content:series:by-slug'],
  { tags: ['content', 'content:series'] }
);

const getLessonBySlugCached = cacheContent(
  async (seriesSlug: string, lessonSlug: string): Promise<Lesson | null> => {
    try {
      const seriesDir = path.join(COURSES_DIR, seriesSlug);
      const files = await fs.readdir(seriesDir);
      const lessonFiles = files.filter(
        (file) => file.startsWith('lesson-') && file.endsWith('.json')
      );
      for (const file of lessonFiles) {
        const lesson = await readLesson(path.join(seriesDir, file));
        if (lesson.slug === lessonSlug) return lesson;
      }
      return null;
    } catch (error) {
      if (!isNotFound(error)) throw error;
      return null;
    }
  },
  ['content:lesson:by-slug'],
  { tags: ['content', 'content:series'] }
);

const getAllBlogPostsCached = cacheContent(
  async (): Promise<BlogPost[]> => {
    const files = await fs.readdir(BLOG_DIR);
    const posts = await Promise.all(
      files.filter((f) => f.endsWith('.mdx')).map(readBlogPost)
    );
    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  },
  ['content:blog:all'],
  { tags: ['content', 'content:blog'] }
);

const getBlogPostBySlugCached = cacheContent(
  async (slug: string): Promise<BlogPost | null> => {
    try {
      return await readBlogPost(`${slug}.mdx`);
    } catch (error) {
      if (!isNotFound(error)) throw error;
      return null;
    }
  },
  ['content:blog:by-slug'],
  { tags: ['content', 'content:blog'] }
);

const getAllShipsCached = cacheContent(
  async (): Promise<Ship[]> => {
    const files = await fs.readdir(SHIPS_DIR);
    const ships = await Promise.all(
      files.filter((f) => f.endsWith('.json')).map(readShip)
    );
    return ships.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  },
  ['content:ships:all'],
  { tags: ['content', 'content:ships'] }
);

const getShipBySlugCached = cacheContent(
  async (slug: string): Promise<Ship | null> => {
    try {
      return await readShip(`${slug}.json`);
    } catch (error) {
      if (!isNotFound(error)) throw error;
      return null;
    }
  },
  ['content:ships:by-slug'],
  { tags: ['content', 'content:ships'] }
);

async function readSeries(seriesSlug: string): Promise<Series> {
  const seriesDir = path.join(COURSES_DIR, seriesSlug);
  const seriesPath = path.join(seriesDir, 'series.json');
  const content = await fs.readFile(seriesPath, 'utf-8');
  const parsed = parseJsonFile(content, seriesPath, (value) => {
    const result = seriesFileSchema.safeParse(value);
    if (!result.success) throw formatZodError(seriesPath, result.error);
    return result.data;
  });
  const files = await fs.readdir(seriesDir);
  const lessonFiles = files.filter(
    (f) => f.startsWith('lesson-') && f.endsWith('.json')
  );
  const lessons = await Promise.all(
    lessonFiles.map((file) => readLesson(path.join(seriesDir, file)))
  );
  return { ...parsed, lessons: lessons.sort((a, b) => a.order - b.order) };
}

async function readLesson(lessonPath: string): Promise<Lesson> {
  const lessonContent = await fs.readFile(lessonPath, 'utf-8');
  return parseJsonFile(lessonContent, lessonPath, (value) => {
    const result = lessonSchema.safeParse(value);
    if (!result.success) throw formatZodError(lessonPath, result.error);
    return result.data;
  });
}

async function readBlogPost(file: string): Promise<BlogPost> {
  const filePath = path.join(BLOG_DIR, file);
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const parsed = blogFrontmatterSchema.safeParse(data);
  if (!parsed.success) throw formatZodError(filePath, parsed.error);
  return {
    slug: file.replace('.mdx', ''),
    title: parsed.data.title,
    excerpt: parsed.data.excerpt,
    date: parsed.data.date,
    author: parsed.data.author,
    content,
    keywords: parsed.data.keywords,
  };
}

async function readShip(file: string): Promise<Ship> {
  const filePath = path.join(SHIPS_DIR, file);
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return parseJsonFile(fileContent, filePath, (value) => {
    const result = shipSchema.safeParse(value);
    if (!result.success) throw formatZodError(filePath, result.error);
    return result.data;
  });
}
