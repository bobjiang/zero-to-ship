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

export function assignRanks<T extends { voteCount: number }>(
  rows: T[]
): Array<T & { rank: number }> {
  const sorted = [...rows].sort((a, b) => b.voteCount - a.voteCount);
  let rank = 0;
  let lastCount = -1;
  let seen = 0;
  return sorted.map((r) => {
    seen += 1;
    if (r.voteCount !== lastCount) {
      rank = seen;
      lastCount = r.voteCount;
    }
    return { ...r, rank };
  });
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

import { kv } from '@/lib/kv';
import type { Submission, SubmissionStatus, Ballot } from '@/types/voting';

const submissionKey = (id: string) => `submission:${id}`;
const submissionsSetKey = (event: string) => `submissions:set:${event}`;
const voteKey = (event: string, voter: string) => `vote:${event}:${voter}`;
const votersSetKey = (event: string) => `voters:set:${event}`;
const submitRateKey = (event: string, cookie: string) => `submit-rate:${event}:${cookie}`;

export async function createSubmission(input: Omit<Submission, 'id' | 'status' | 'createdAt'>): Promise<Submission> {
  const id = crypto.randomUUID();
  const submission: Submission = {
    ...input,
    id,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  await kv.set(submissionKey(id), submission);
  await kv.sadd(submissionsSetKey(input.event), id);
  return submission;
}

export async function getSubmission(id: string): Promise<Submission | null> {
  return (await kv.get<Submission>(submissionKey(id))) ?? null;
}

export async function listSubmissions(event: string): Promise<Submission[]> {
  const ids = (await kv.smembers(submissionsSetKey(event))) as string[];
  if (ids.length === 0) return [];
  const results = await Promise.all(ids.map((id) => kv.get<Submission>(submissionKey(id))));
  return results.filter((s): s is Submission => s !== null);
}

export async function setSubmissionStatus(id: string, status: SubmissionStatus): Promise<void> {
  const current = await getSubmission(id);
  if (!current) throw new Error(`submission ${id} not found`);
  await kv.set(submissionKey(id), { ...current, status });
}

export async function getBallot(event: string, voter: string): Promise<Ballot | null> {
  return (await kv.get<Ballot>(voteKey(event, voter))) ?? null;
}

export async function writeBallot(event: string, voter: string, ballot: Ballot): Promise<void> {
  await kv.set(voteKey(event, voter), ballot);
  await kv.sadd(votersSetKey(event), voter);
}

export async function voterCount(event: string): Promise<number> {
  return (await kv.scard(votersSetKey(event))) as number;
}

export async function listBallots(event: string): Promise<Ballot[]> {
  const voters = (await kv.smembers(votersSetKey(event))) as string[];
  if (voters.length === 0) return [];
  const results = await Promise.all(voters.map((v) => kv.get<Ballot>(voteKey(event, v))));
  return results.filter((b): b is Ballot => b !== null);
}

export async function getSubmitRate(event: string, cookie: string): Promise<number> {
  return (await kv.get<number>(submitRateKey(event, cookie))) ?? 0;
}

export async function incrSubmitRate(event: string, cookie: string): Promise<number> {
  const key = submitRateKey(event, cookie);
  const n = (await kv.incr(key)) as number;
  if (n === 1) await kv.expire(key, 86400);
  return n;
}
