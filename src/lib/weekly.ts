import fs from 'fs/promises';
import path from 'path';
import { WeeklyDigest } from '@/types/weekly';

const WEEKLY_DIR = path.join(process.cwd(), 'content', 'weekly');

export async function getAllWeeks(): Promise<string[]> {
  try {
    const files = await fs.readdir(WEEKLY_DIR);
    const weeks = files
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''))
      .sort((a, b) => b.localeCompare(a));
    return weeks;
  } catch {
    return [];
  }
}

export async function getWeeklyDigest(week: string): Promise<WeeklyDigest | null> {
  try {
    const filePath = path.join(WEEKLY_DIR, `${week}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as WeeklyDigest;
  } catch {
    return null;
  }
}
