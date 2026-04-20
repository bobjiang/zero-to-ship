import { describe, it, expect } from 'vitest';
import {
  isWithinWindow,
  validateBallot,
  sameCanonicalBallot,
  tallyVotes,
  shuffleWithSeed,
} from '@/lib/voting';

describe('isWithinWindow', () => {
  const opens = '2026-04-20T00:00:00Z';
  const closes = '2026-04-27T00:00:00Z';

  it('is false before opens', () => {
    expect(isWithinWindow(opens, closes, new Date('2026-04-19T23:59:59Z'))).toBe(false);
  });
  it('is true at opens', () => {
    expect(isWithinWindow(opens, closes, new Date('2026-04-20T00:00:00Z'))).toBe(true);
  });
  it('is true mid-window', () => {
    expect(isWithinWindow(opens, closes, new Date('2026-04-23T12:00:00Z'))).toBe(true);
  });
  it('is false at closes (exclusive)', () => {
    expect(isWithinWindow(opens, closes, new Date('2026-04-27T00:00:00Z'))).toBe(false);
  });
});

describe('validateBallot', () => {
  const approved = new Set(['a', 'b', 'c', 'd']);

  it('rejects empty array', () => {
    expect(validateBallot([], 3, approved)).toEqual({ ok: false, error: 'validation' });
  });
  it('rejects over limit', () => {
    expect(validateBallot(['a', 'b', 'c', 'd'], 3, approved)).toEqual({ ok: false, error: 'validation' });
  });
  it('rejects duplicates', () => {
    expect(validateBallot(['a', 'a'], 3, approved)).toEqual({ ok: false, error: 'validation' });
  });
  it('rejects unknown id', () => {
    expect(validateBallot(['a', 'z'], 3, approved)).toEqual({ ok: false, error: 'unknown-submission' });
  });
  it('accepts a valid ballot', () => {
    expect(validateBallot(['a', 'b'], 3, approved)).toEqual({ ok: true });
  });
});

describe('sameCanonicalBallot', () => {
  it('is true for same ids in same order', () => {
    expect(sameCanonicalBallot(['a', 'b'], ['a', 'b'])).toBe(true);
  });
  it('is true for same ids different order', () => {
    expect(sameCanonicalBallot(['a', 'b', 'c'], ['c', 'a', 'b'])).toBe(true);
  });
  it('is false for different lengths', () => {
    expect(sameCanonicalBallot(['a'], ['a', 'b'])).toBe(false);
  });
  it('is false for different ids', () => {
    expect(sameCanonicalBallot(['a', 'b'], ['a', 'c'])).toBe(false);
  });
});

describe('tallyVotes', () => {
  const approved = new Set(['a', 'b', 'c']);

  it('counts approved ids only', () => {
    const ballots = [
      { submissionIds: ['a', 'b'] },
      { submissionIds: ['a', 'c'] },
      { submissionIds: ['a', 'd'] }, // d is not approved -> ignored
    ];
    const counts = tallyVotes(ballots, approved);
    expect(counts.get('a')).toBe(3);
    expect(counts.get('b')).toBe(1);
    expect(counts.get('c')).toBe(1);
    expect(counts.has('d')).toBe(false);
  });

  it('returns an empty map when no ballots', () => {
    expect(tallyVotes([], approved).size).toBe(0);
  });
});

describe('shuffleWithSeed', () => {
  it('is deterministic for the same seed', () => {
    const a = shuffleWithSeed(['x', 'y', 'z', 'w', 'v'], 'seed-1');
    const b = shuffleWithSeed(['x', 'y', 'z', 'w', 'v'], 'seed-1');
    expect(a).toEqual(b);
  });
  it('differs across seeds', () => {
    const a = shuffleWithSeed(['x', 'y', 'z', 'w', 'v'], 'seed-1');
    const b = shuffleWithSeed(['x', 'y', 'z', 'w', 'v'], 'seed-2');
    expect(a).not.toEqual(b);
  });
  it('preserves the multiset', () => {
    const input = ['x', 'y', 'z', 'w', 'v'];
    const out = shuffleWithSeed(input, 'seed-3');
    expect(out.sort()).toEqual([...input].sort());
  });
  it('does not mutate input', () => {
    const input = ['x', 'y', 'z'];
    shuffleWithSeed(input, 's');
    expect(input).toEqual(['x', 'y', 'z']);
  });
});
