import fs from 'fs/promises';
import path from 'path';
import { DailyNews } from '@/types/news';

const NEWS_DIR = path.join(process.cwd(), 'content', 'news');

export async function getAllNewsDates(): Promise<string[]> {
  try {
    const files = await fs.readdir(NEWS_DIR);
    const dates = files
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''))
      .sort((a, b) => b.localeCompare(a));
    return dates;
  } catch {
    return [];
  }
}

export async function getNewsByDate(date: string): Promise<DailyNews | null> {
  try {
    const filePath = path.join(NEWS_DIR, `${date}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as DailyNews;
  } catch {
    return null;
  }
}
