import { describe, it, expect } from 'vitest';
import { getAllWeeks, getWeeklyDigest } from '@/lib/weekly';

describe('weekly loaders', () => {
  describe('getAllWeeks', () => {
    it('returns an array of week strings', async () => {
      const weeks = await getAllWeeks();
      expect(Array.isArray(weeks)).toBe(true);
    });

    it('weeks are sorted descending', async () => {
      const weeks = await getAllWeeks();
      if (weeks.length > 1) {
        for (let i = 1; i < weeks.length; i++) {
          expect(weeks[i - 1].localeCompare(weeks[i])).toBeGreaterThanOrEqual(0);
        }
      }
    });

    it('weeks match YYYY-WNN format', async () => {
      const weeks = await getAllWeeks();
      for (const week of weeks) {
        expect(week).toMatch(/^\d{4}-W\d{2}$/);
      }
    });
  });

  describe('getWeeklyDigest', () => {
    it('returns digest for a valid week', async () => {
      const weeks = await getAllWeeks();
      if (weeks.length > 0) {
        const digest = await getWeeklyDigest(weeks[0]);
        expect(digest).not.toBeNull();
        expect(digest?.week).toBe(weeks[0]);
        expect(Array.isArray(digest?.sections)).toBe(true);
      }
    });

    it('each item has required fields', async () => {
      const weeks = await getAllWeeks();
      if (weeks.length > 0) {
        const digest = await getWeeklyDigest(weeks[0]);
        if (digest) {
          for (const section of digest.sections) {
            expect(section.id).toBeDefined();
            expect(section.title).toBeDefined();
            for (const item of section.items) {
              expect(item.title).toBeDefined();
              expect(item.summary).toBeDefined();
              expect(item.url).toBeDefined();
              expect(item.impact).toBeDefined();
              expect(Array.isArray(item.tags)).toBe(true);
            }
          }
        }
      }
    });

    it('returns null for an invalid week', async () => {
      const digest = await getWeeklyDigest('1900-W01');
      expect(digest).toBeNull();
    });
  });
});
