import { BookmarkSimple, CheckCircle, RocketLaunch } from '@phosphor-icons/react/dist/ssr';
import { Container } from '@/components/ui/Container';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-50 py-10 dark:bg-slate-950 sm:py-14 lg:py-16">
      <Container>
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-none border border-slate-200 bg-white shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[minmax(0,0.96fr)_minmax(360px,0.74fr)]">
          <div className="p-6 sm:p-8 lg:p-10">
            {children}
          </div>

          <aside className="hidden border-l border-slate-200 bg-slate-950 p-10 text-white dark:border-slate-800 lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-none bg-blue-500 text-white shadow-sm shadow-blue-950/40">
                <RocketLaunch className="h-6 w-6" weight="fill" />
              </div>
              <h2 className="mt-8 max-w-sm text-3xl font-black tracking-tight">
                Pick up where your build left off.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
                Your account keeps course progress, saved resources, and community activity tied to one workspace.
              </p>
            </div>

            <div className="mt-12 space-y-4">
              <div className="flex gap-3 rounded-none border border-white/10 bg-white/[0.04] p-4">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" weight="fill" />
                <div>
                  <p className="text-sm font-black">Password-free access</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Magic links and connected accounts keep sign-in fast.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 rounded-none border border-white/10 bg-white/[0.04] p-4">
                <BookmarkSimple className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" weight="fill" />
                <div>
                  <p className="text-sm font-black">Saved for later</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Bookmarked lessons, posts, and news stay available from your dashboard.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
