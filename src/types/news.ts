export type NewsCategory = 'research' | 'product' | 'open-source' | 'industry';

export interface NewsItem {
  title: string;
  summary: string;
  source: string;
  url: string;
  score: number;
  category: NewsCategory;
}

export interface DailyNews {
  date: string;
  items: NewsItem[];
}
