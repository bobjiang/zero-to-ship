import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-gray-900">
              02Ship
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/courses" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Courses
              </Link>
              <Link href="/blog" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Blog
              </Link>
              <a
                href="https://luma.com/user/02ship"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Events
              </a>
              <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                About
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://discord.gg/btqaA3hzKp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Discord
            </a>
            <a
              href="https://github.com/bobjiang/zero-to-ship/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Forum
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
}
