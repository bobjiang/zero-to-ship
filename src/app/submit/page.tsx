import { getEventConfig, isWithinWindow } from '@/lib/voting';
import { SubmissionForm } from './SubmissionForm';

export const dynamic = 'force-dynamic';

export default async function SubmitPage() {
  const event = await getEventConfig();
  const open = isWithinWindow(event.submissionOpensAt, event.submissionClosesAt, new Date());
  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <h1 className="mb-2 text-2xl font-semibold">Submit a 5-minute talk</h1>
      <p className="mb-6 text-sm text-neutral-600">
        Share something useful, fun, or inspiring with the community.
      </p>
      <SubmissionForm
        disabled={!open}
        submissionClosesAt={event.submissionClosesAt}
        eventName={event.name}
      />
    </div>
  );
}
