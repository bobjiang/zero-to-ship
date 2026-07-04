import fs from 'fs/promises';
import path from 'path';
import { unstable_cache } from 'next/cache';
import { DailyNews } from '@/types/news';
import { dailyNewsSchema, formatZodError } from '@/lib/content-schemas';

const NEWS_DIR = path.join(process.cwd(), 'content', 'news');

function cacheContent<Args extends unknown[], Result>(
  fn: (...args: Args) => Promise<Result>,
  keyParts: string[],
  options: { tags: string[] }
): (...args: Args) => Promise<Result> {
  if (process.env.NODE_ENV === 'test' || process.env.VITEST) return fn;
  return unstable_cache(fn, keyParts, options);
}

export async function getAllNewsDates(): Promise<string[]> {
  return getAllNewsDatesCached();
}

export async function getNewsByDate(date: string): Promise<DailyNews | null> {
  return getNewsByDateCached(date);
}

const getAllNewsDatesCached = cacheContent(
  async (): Promise<string[]> => {
    try {
      const files = await fs.readdir(NEWS_DIR);
      const dates = files
        .filter((f) => f.endsWith('.json'))
        .map((f) => f.replace('.json', ''))
        .sort((a, b) => b.localeCompare(a));
      return dates;
    } catch (error) {
      if (!isNotFound(error)) throw error;
      return [];
    }
  },
  ['content:news:dates'],
  { tags: ['content', 'content:news'] }
);

const getNewsByDateCached = cacheContent(
  async (date: string): Promise<DailyNews | null> => {
    try {
      const filePath = path.join(NEWS_DIR, `${date}.json`);
      const content = await fs.readFile(filePath, 'utf-8');
      const parsed = dailyNewsSchema.safeParse(JSON.parse(content));
      if (!parsed.success) throw formatZodError(filePath, parsed.error);
      return parsed.data;
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 'ENOENT'
      ) {
        return null;
      }
      if (error instanceof SyntaxError) {
        throw new Error(`${date}.json is not valid JSON: ${error.message}`);
      }
      throw error;
    }
  },
  ['content:news:by-date'],
  { tags: ['content', 'content:news'] }
);

function isNotFound(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'ENOENT'
  );
}
