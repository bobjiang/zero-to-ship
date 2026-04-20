export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface Submission {
  id: string;
  event: string;
  speakerName: string;
  handle?: string;
  contact?: string;
  title: string;
  intro: string;
  tag?: string;
  status: SubmissionStatus;
  createdAt: string;
}

export interface Ballot {
  submissionIds: string[];
  submittedAt: string;
}

export interface AdminSession {
  expMs: number;
}
