import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">02Ship</h3>
              <p className="mt-4 text-sm text-gray-600">
                Learn to build and ship your ideas using AI coding tools.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Learn</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/courses" className="text-sm text-gray-600 hover:text-gray-900">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900">
                    Blog
                  </Link>
                </li>
                <li>
                  <a
                    href="https://luma.com/user/02ship"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Events
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Community</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="https://discord.gg/btqaA3hzKp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/bobjiang/zero-to-ship/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Forum
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">About</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
                    About Us
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
