import { getEventConfig, isWithinWindow } from '@/lib/voting';
import { Container } from '@/components/ui/Container';
import { SubmissionForm } from './SubmissionForm';

export const dynamic = 'force-dynamic';

export default async function SubmitPage() {
  const event = await getEventConfig();
  const open = isWithinWindow(event.submissionOpensAt, event.submissionClosesAt, new Date());
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Submit a lightning talk
          </h1>
          <div className="mt-10">
            <SubmissionForm disabled={!open} />
          </div>
        </div>
      </Container>
    </section>
  );
}
