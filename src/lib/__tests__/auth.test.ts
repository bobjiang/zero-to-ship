import { describe, it, expect } from 'vitest';
import { isValidRedirect } from '@/lib/auth';

describe('isValidRedirect', () => {
  it('accepts valid relative paths', () => {
    expect(isValidRedirect('/dashboard')).toBe(true);
    expect(isValidRedirect('/courses/some-course')).toBe(true);
    expect(isValidRedirect('/blog/my-post')).toBe(true);
  });

  it('rejects empty strings', () => {
    expect(isValidRedirect('')).toBe(false);
  });

  it('rejects paths with protocols', () => {
    expect(isValidRedirect('https://evil.com')).toBe(false);
    expect(isValidRedirect('http://evil.com')).toBe(false);
    expect(isValidRedirect('javascript:alert(1)')).toBe(false);
  });

  it('rejects protocol-relative URLs', () => {
    expect(isValidRedirect('//evil.com')).toBe(false);
    expect(isValidRedirect('//evil.com/path')).toBe(false);
  });

  it('rejects paths not starting with /', () => {
    expect(isValidRedirect('dashboard')).toBe(false);
    expect(isValidRedirect('evil.com')).toBe(false);
  });
});
