import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">02Ship</h3>
              <p className="mt-4 text-sm text-gray-600">
                Sydney&apos;s community for Claude practitioners building real projects with AI.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Build</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/ships" className="text-sm text-gray-600 hover:text-gray-900">
                    Project Hub
                  </Link>
                </li>
                <li>
                  <Link href="/ship-weeks" className="text-sm text-gray-600 hover:text-gray-900">
                    Cohort
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="text-sm text-gray-600 hover:text-gray-900">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-sm text-gray-600 hover:text-gray-900">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-sm text-gray-600 hover:text-gray-900">
                    Events
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">About</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="text-sm text-gray-600 hover:text-gray-900">
                    Daily News
                  </Link>
                </li>
                <li>
                  <Link href="/weekly" className="text-sm text-gray-600 hover:text-gray-900">
                    Weekly Updates
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="text-sm text-gray-600 hover:text-gray-900">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-600">
              © {currentYear} 02Ship. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
