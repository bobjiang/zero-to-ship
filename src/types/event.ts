export type ContactRule = 'handle-or-contact';

export interface EventConfig {
  slug: string;
  name: string;
  submissionOpensAt: string;
  submissionClosesAt: string;
  votingOpensAt: string;
  votingClosesAt: string;
  voteLimit: number;
  submissionRateLimitPerCookie24h: number;
  contactRule: ContactRule;
}
