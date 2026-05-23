import Link from 'next/link';
import { SITE } from '@/src/content/site';
import { allTools } from '@/src/content/pages';

export function MainNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur no-print">
      <div className="mx-auto flex min-h-16 max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="text-lg font-black text-ink no-underline">
          {SITE.name}
        </Link>
        <nav className="flex flex-wrap gap-3 text-sm font-semibold">
          {allTools.slice(0, 7).map((tool) => (
            <Link key={tool.path} href={tool.path}>
              {tool.h1.replace(' Calculator', '')}
            </Link>
          ))}
          <Link href="/guides/cfm-vs-ach/">Guides</Link>
        </nav>
      </div>
    </header>
  );
}
