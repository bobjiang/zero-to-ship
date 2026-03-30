import { describe, it, expect } from 'vitest';
import { getAllSeries, getSeriesBySlug, getLessonBySlug, getAllBlogPosts, getBlogPostBySlug, getAllShips, getShipBySlug } from '@/lib/content';

describe('content loaders', () => {
  describe('getAllSeries', () => {
    it('returns an array of series', async () => {
      const series = await getAllSeries();
      expect(Array.isArray(series)).toBe(true);
    });

    it('series are sorted by order', async () => {
      const series = await getAllSeries();
      if (series.length > 1) {
        for (let i = 1; i < series.length; i++) {
          expect(series[i].order).toBeGreaterThanOrEqual(series[i - 1].order);
        }
      }
    });

    it('each series has required fields', async () => {
      const series = await getAllSeries();
      for (const s of series) {
        expect(s.slug).toBeDefined();
        expect(s.title).toBeDefined();
        expect(s.description).toBeDefined();
        expect(Array.isArray(s.lessons)).toBe(true);
      }
    });

    it('lessons within series are sorted by order', async () => {
      const series = await getAllSeries();
      for (const s of series) {
        if (s.lessons.length > 1) {
          for (let i = 1; i < s.lessons.length; i++) {
            expect(s.lessons[i].order).toBeGreaterThanOrEqual(s.lessons[i - 1].order);
          }
        }
      }
    });
  });

  describe('getSeriesBySlug', () => {
    it('returns a series for a valid slug', async () => {
      const allSeries = await getAllSeries();
      if (allSeries.length > 0) {
        const series = await getSeriesBySlug(allSeries[0].slug);
        expect(series).not.toBeNull();
        expect(series?.slug).toBe(allSeries[0].slug);
      }
    });

    it('returns null for an invalid slug', async () => {
      const series = await getSeriesBySlug('nonexistent-series-slug');
      expect(series).toBeNull();
    });
  });

  describe('getLessonBySlug', () => {
    it('returns a lesson for valid slugs', async () => {
      const allSeries = await getAllSeries();
      if (allSeries.length > 0 && allSeries[0].lessons.length > 0) {
        const lesson = await getLessonBySlug(allSeries[0].slug, allSeries[0].lessons[0].slug);
        expect(lesson).not.toBeNull();
        expect(lesson?.slug).toBe(allSeries[0].lessons[0].slug);
      }
    });

    it('returns null for invalid series slug', async () => {
      const lesson = await getLessonBySlug('nonexistent', 'also-nonexistent');
      expect(lesson).toBeNull();
    });

    it('returns null for invalid lesson slug', async () => {
      const allSeries = await getAllSeries();
      if (allSeries.length > 0) {
        const lesson = await getLessonBySlug(allSeries[0].slug, 'nonexistent-lesson');
        expect(lesson).toBeNull();
      }
    });
  });

  describe('getAllBlogPosts', () => {
    it('returns an array of blog posts', async () => {
      const posts = await getAllBlogPosts();
      expect(Array.isArray(posts)).toBe(true);
    });

    it('posts are sorted by date descending', async () => {
      const posts = await getAllBlogPosts();
      if (posts.length > 1) {
        for (let i = 1; i < posts.length; i++) {
          expect(new Date(posts[i - 1].date).getTime()).toBeGreaterThanOrEqual(
            new Date(posts[i].date).getTime()
          );
        }
      }
    });

    it('each post has required fields', async () => {
      const posts = await getAllBlogPosts();
      for (const post of posts) {
        expect(post.slug).toBeDefined();
        expect(post.title).toBeDefined();
        expect(typeof post.content).toBe('string');
      }
    });
  });

  describe('getBlogPostBySlug', () => {
    it('returns a post for a valid slug', async () => {
      const posts = await getAllBlogPosts();
      if (posts.length > 0) {
        const post = await getBlogPostBySlug(posts[0].slug);
        expect(post).not.toBeNull();
        expect(post?.slug).toBe(posts[0].slug);
      }
    });

    it('returns null for an invalid slug', async () => {
      const post = await getBlogPostBySlug('nonexistent-blog-post');
      expect(post).toBeNull();
    });
  });

  describe('getAllShips', () => {
    it('returns an array of ships', async () => {
      const ships = await getAllShips();
      expect(Array.isArray(ships)).toBe(true);
    });

    it('ships are sorted by date descending', async () => {
      const ships = await getAllShips();
      if (ships.length > 1) {
        for (let i = 1; i < ships.length; i++) {
          expect(new Date(ships[i - 1].date).getTime()).toBeGreaterThanOrEqual(
            new Date(ships[i].date).getTime()
          );
        }
      }
    });

    it('each ship has required fields', async () => {
      const ships = await getAllShips();
      for (const ship of ships) {
        expect(ship.slug).toBeDefined();
        expect(ship.title).toBeDefined();
        expect(ship.builder).toBeDefined();
        expect(Array.isArray(ship.tags)).toBe(true);
      }
    });
  });

  describe('getShipBySlug', () => {
    it('returns a ship for a valid slug', async () => {
      const ships = await getAllShips();
      if (ships.length > 0) {
        const ship = await getShipBySlug(ships[0].slug);
        expect(ship).not.toBeNull();
        expect(ship?.slug).toBe(ships[0].slug);
      }
    });

    it('returns null for an invalid slug', async () => {
      const ship = await getShipBySlug('nonexistent-ship');
      expect(ship).toBeNull();
    });
  });
});
