import { describe, it, expect } from 'vitest';
import { resolveContentUrl } from '@/lib/content-resolver';

describe('resolveContentUrl', () => {
  it('resolves series URLs', () => {
    expect(resolveContentUrl('series', 'claude-basics', '')).toBe('/courses/claude-basics');
  });

  it('resolves lesson URLs with parent slug', () => {
    expect(resolveContentUrl('lesson', 'intro', 'claude-basics')).toBe('/courses/claude-basics/intro');
  });

  it('resolves blog URLs', () => {
    expect(resolveContentUrl('blog', 'my-post', '')).toBe('/blog/my-post');
  });

  it('resolves news URLs', () => {
    expect(resolveContentUrl('news', '2026-04-10', '')).toBe('/news/2026-04-10');
  });

  it('returns root for unknown content types', () => {
    expect(resolveContentUrl('unknown', 'slug', '')).toBe('/');
  });
});
