import fs from 'fs/promises';
import path from 'path';
import type { EventConfig } from '@/types/event';

export async function getEventConfig(slug = 'lightning-talk'): Promise<EventConfig> {
  const file = path.join(process.cwd(), 'content', 'events', `${slug}.json`);
  const raw = await fs.readFile(file, 'utf-8');
  return JSON.parse(raw) as EventConfig;
}

export function isWithinWindow(opens: string, closes: string, now: Date): boolean {
  const o = new Date(opens).getTime();
  const c = new Date(closes).getTime();
  const n = now.getTime();
  return n >= o && n < c;
}

export type BallotValidation =
  | { ok: true }
  | { ok: false; error: 'validation' | 'unknown-submission' };

export function validateBallot(
  submissionIds: unknown,
  voteLimit: number,
  approvedIds: Set<string>
): BallotValidation {
  if (!Array.isArray(submissionIds)) return { ok: false, error: 'validation' };
  if (submissionIds.length < 1 || submissionIds.length > voteLimit) {
    return { ok: false, error: 'validation' };
  }
  const seen = new Set<string>();
  for (const id of submissionIds) {
    if (typeof id !== 'string' || id.length === 0) return { ok: false, error: 'validation' };
    if (seen.has(id)) return { ok: false, error: 'validation' };
    seen.add(id);
  }
  for (const id of submissionIds as string[]) {
    if (!approvedIds.has(id)) return { ok: false, error: 'unknown-submission' };
  }
  return { ok: true };
}

export function sameCanonicalBallot(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const A = [...a].sort();
  const B = [...b].sort();
  for (let i = 0; i < A.length; i++) if (A[i] !== B[i]) return false;
  return true;
}

export function tallyVotes(
  ballots: Array<{ submissionIds: string[] }>,
  approvedIds: Set<string>
): Map<string, number> {
  const counts = new Map<string, number>();
  for (const b of ballots) {
    for (const id of b.submissionIds) {
      if (approvedIds.has(id)) counts.set(id, (counts.get(id) ?? 0) + 1);
    }
  }
  return counts;
}

function xmur3(str: string): () => number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

export function shuffleWithSeed<T>(items: T[], seed: string): T[] {
  const rand = xmur3(seed);
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
