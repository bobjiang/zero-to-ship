import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, verifySession } from '@/lib/admin';
import {
  getEventConfig,
  listBallots,
  listSubmissions,
  tallyVotes,
  voterCount,
} from '@/lib/voting';
import type { Submission } from '@/types/voting';

export const dynamic = 'force-dynamic';

function assignRanks(rows: Array<Submission & { voteCount: number }>): Array<Submission & { voteCount: number; rank: number }> {
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

export async function GET() {
  const session = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifySession(session, Date.now())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const event = await getEventConfig();
  const [subs, ballots, totalVoters] = await Promise.all([
    listSubmissions(event.slug),
    listBallots(event.slug),
    voterCount(event.slug),
  ]);
  const approvedIds = new Set(subs.filter((s) => s.status === 'approved').map((s) => s.id));
  const counts = tallyVotes(ballots, approvedIds);
  const totalVotes = ballots.reduce((n, b) => n + b.submissionIds.length, 0);

  const rows = subs.map((s) => ({ ...s, voteCount: counts.get(s.id) ?? 0 }));
  const ranked = assignRanks(rows).map((r) => ({
    id: r.id,
    title: r.title,
    speakerName: r.speakerName,
    handle: r.handle,
    contact: r.contact,
    tag: r.tag,
    status: r.status,
    voteCount: r.voteCount,
    rank: r.rank,
  }));

  return NextResponse.json({ totalVoters, totalVotes, results: ranked });
}
