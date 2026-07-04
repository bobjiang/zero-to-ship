import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VOTER_COOKIE } from '@/lib/voter-cookie';
import { ADMIN_SESSION_COOKIE } from '@/lib/admin';

const cookiesMock = vi.hoisted(() => ({
  get: vi.fn(),
  set: vi.fn(),
  delete: vi.fn(),
}));

vi.mock('next/headers', () => ({
  cookies: vi.fn(async () => cookiesMock),
}));

const votingMock = vi.hoisted(() => ({
  createSubmission: vi.fn(),
  getBallot: vi.fn(),
  getEventConfig: vi.fn(),
  incrSubmitRate: vi.fn(),
  isWithinWindow: vi.fn(),
  listSubmissions: vi.fn(),
  sameCanonicalBallot: vi.fn((a: string[], b: string[]) => {
    if (a.length !== b.length) return false;
    return [...a].sort().every((id, i) => id === [...b].sort()[i]);
  }),
  validateBallot: vi.fn(() => ({ ok: true })),
  writeBallotOnce: vi.fn(),
}));

vi.mock('@/lib/voting', () => votingMock);

function jsonRequest(body: unknown): Request {
  return new Request('http://localhost/api/test', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function readJson(res: Response) {
  return (await res.json()) as Record<string, unknown>;
}

describe('voting API routes', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    cookiesMock.get.mockReset();
    votingMock.getEventConfig.mockResolvedValue({
      slug: 'lightning-talk',
      name: 'Lightning Talks',
      submissionOpensAt: '2000-01-01T00:00:00Z',
      submissionClosesAt: '2999-01-01T00:00:00Z',
      votingClosesAt: '2999-01-01T00:00:00Z',
      voteLimit: 3,
      submissionRateLimitPerCookie24h: 3,
      contactRule: 'handle-or-contact',
    });
  });

  it('rejects vote requests without the anonymous voter cookie', async () => {
    cookiesMock.get.mockReturnValue(undefined);
    const { POST } = await import('@/app/api/votes/route');

    const res = await POST(jsonRequest({ submissionIds: ['talk-1'] }));

    expect(res.status).toBe(400);
    expect(await readJson(res)).toMatchObject({
      ok: false,
      error: 'cookies-required',
    });
  });

  it('records a first vote with an atomic create', async () => {
    cookiesMock.get.mockImplementation((name: string) =>
      name === VOTER_COOKIE ? { value: 'voter-1' } : undefined
    );
    votingMock.listSubmissions.mockResolvedValue([
      { id: 'talk-1', status: 'approved' },
    ]);
    votingMock.getBallot.mockResolvedValue(null);
    votingMock.writeBallotOnce.mockResolvedValue('created');
    const { POST } = await import('@/app/api/votes/route');

    const res = await POST(jsonRequest({ submissionIds: ['talk-1'] }));

    expect(res.status).toBe(200);
    expect(votingMock.writeBallotOnce).toHaveBeenCalledWith(
      'lightning-talk',
      'voter-1',
      expect.objectContaining({ submissionIds: ['talk-1'] })
    );
    expect(await readJson(res)).toMatchObject({ ok: true, recorded: 1 });
  });

  it('returns already-voted when a concurrent vote creates the ballot first', async () => {
    cookiesMock.get.mockImplementation((name: string) =>
      name === VOTER_COOKIE ? { value: 'voter-1' } : undefined
    );
    votingMock.listSubmissions.mockResolvedValue([
      { id: 'talk-1', status: 'approved' },
    ]);
    votingMock.getBallot.mockResolvedValueOnce(null).mockResolvedValueOnce({
      submissionIds: ['talk-2'],
      submittedAt: '2026-01-01T00:00:00Z',
    });
    votingMock.writeBallotOnce.mockResolvedValue('exists');
    const { POST } = await import('@/app/api/votes/route');

    const res = await POST(jsonRequest({ submissionIds: ['talk-1'] }));

    expect(res.status).toBe(409);
    expect(await readJson(res)).toMatchObject({
      ok: false,
      error: 'already-voted',
    });
  });
});

describe('submission API route', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    cookiesMock.get.mockImplementation((name: string) =>
      name === VOTER_COOKIE ? { value: 'voter-1' } : undefined
    );
    votingMock.getEventConfig.mockResolvedValue({
      slug: 'lightning-talk',
      name: 'Lightning Talks',
      submissionOpensAt: '2000-01-01T00:00:00Z',
      submissionClosesAt: '2999-01-01T00:00:00Z',
      votingClosesAt: '2999-01-01T00:00:00Z',
      voteLimit: 3,
      submissionRateLimitPerCookie24h: 3,
      contactRule: 'handle-or-contact',
    });
    votingMock.isWithinWindow.mockReturnValue(true);
    votingMock.incrSubmitRate.mockResolvedValue(1);
    votingMock.createSubmission.mockResolvedValue({ id: 'submission-1' });
  });

  it('validates and creates a submission during the open window', async () => {
    const { POST } = await import('@/app/api/submissions/route');

    const res = await POST(
      jsonRequest({
        speakerName: 'Ada',
        title: 'Shipping with agents',
        intro: 'A short talk about shipping.',
        consent: true,
      })
    );

    expect(res.status).toBe(200);
    expect(votingMock.createSubmission).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'lightning-talk',
        speakerName: 'Ada',
        title: 'Shipping with agents',
      })
    );
    expect(await readJson(res)).toMatchObject({ ok: true, id: 'submission-1' });
  });
});

describe('admin session API route', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    process.env.ADMIN_TOKEN = 'a'.repeat(48);
  });

  it('sets an http-only admin session cookie for a valid token', async () => {
    const { POST } = await import('@/app/api/admin/session/route');

    const res = await POST(jsonRequest({ token: process.env.ADMIN_TOKEN }));

    expect(res.status).toBe(204);
    expect(cookiesMock.set).toHaveBeenCalledWith(
      expect.objectContaining({
        name: ADMIN_SESSION_COOKIE,
        httpOnly: true,
        sameSite: 'lax',
      })
    );
  });

  it('rejects an invalid admin token without setting a cookie', async () => {
    const { POST } = await import('@/app/api/admin/session/route');

    const res = await POST(jsonRequest({ token: 'wrong' }));

    expect(res.status).toBe(401);
    expect(cookiesMock.set).not.toHaveBeenCalled();
  });
});
