import { getEventConfig, isWithinWindow } from '@/lib/voting';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { SubmissionForm } from './SubmissionForm';

export const dynamic = 'force-dynamic';

export default async function SubmitPage() {
  const event = await getEventConfig();
  const open = isWithinWindow(event.submissionOpensAt, event.submissionClosesAt, new Date());
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl">
          <PageHeader
            eyebrow="Lightning talks"
            title="Submit a lightning talk"
            description="Share a short idea, build story, demo, or lesson with the community."
          />
          <div className="mt-10 rounded-none border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
            <SubmissionForm disabled={!open} />
          </div>
        </div>
      </Container>
    </section>
  );
}
