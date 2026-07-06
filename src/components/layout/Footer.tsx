import Link from 'next/link';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { Container } from '@/components/ui/Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-100/70 dark:border-slate-800 dark:bg-slate-950">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <BrandLogo markClassName="h-8 w-8" wordmarkClassName="text-base" />
              <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
                Sydney&apos;s community for Claude practitioners building real projects with AI.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-950 dark:text-white">Build</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/ships" className="text-sm text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                    Project Hub
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="text-sm text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-sm text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                    Events
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-950 dark:text-white">About</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="text-sm text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                    Daily News
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="text-sm text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-800">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {currentYear} 02Ship. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
