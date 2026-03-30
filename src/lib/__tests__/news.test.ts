import { describe, it, expect } from 'vitest';
import { getAllNewsDates, getNewsByDate } from '@/lib/news';

describe('news loaders', () => {
  describe('getAllNewsDates', () => {
    it('returns an array of date strings', async () => {
      const dates = await getAllNewsDates();
      expect(Array.isArray(dates)).toBe(true);
    });

    it('dates are sorted descending', async () => {
      const dates = await getAllNewsDates();
      if (dates.length > 1) {
        for (let i = 1; i < dates.length; i++) {
          expect(dates[i - 1].localeCompare(dates[i])).toBeGreaterThanOrEqual(0);
        }
      }
    });

    it('dates match YYYY-MM-DD format', async () => {
      const dates = await getAllNewsDates();
      for (const date of dates) {
        expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    });
  });

  describe('getNewsByDate', () => {
    it('returns news for a valid date', async () => {
      const dates = await getAllNewsDates();
      if (dates.length > 0) {
        const news = await getNewsByDate(dates[0]);
        expect(news).not.toBeNull();
        expect(news?.date).toBe(dates[0]);
        expect(Array.isArray(news?.items)).toBe(true);
      }
    });

    it('each news item has required fields', async () => {
      const dates = await getAllNewsDates();
      if (dates.length > 0) {
        const news = await getNewsByDate(dates[0]);
        if (news && news.items.length > 0) {
          for (const item of news.items) {
            expect(item.title).toBeDefined();
            expect(item.summary).toBeDefined();
            expect(item.url).toBeDefined();
            expect(item.category).toBeDefined();
          }
        }
      }
    });

    it('returns null for an invalid date', async () => {
      const news = await getNewsByDate('1900-01-01');
      expect(news).toBeNull();
    });
  });
});
