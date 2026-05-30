import type { Metadata } from 'next';
import Link from 'next/link';
import { HvacHomeWorkspace } from '@/src/components/home/HvacHomeWorkspace';
import { SourceList } from '@/src/components/assumptions/SourceList';
import { CardGrid } from '@/src/components/ui/CardGrid';
import { allTools, guidePages, longTailPages } from '@/src/content/pages';
import { structuredDataForHome } from '@/src/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'HVAC Calculators: AC BTU, Dehumidifier Size & CFM / ACH',
  description:
    'Use HVAC calculators for preliminary room AC BTU, dehumidifier pints/day, CFM by ACH, bathroom fan CFM and HVAC unit conversions with visible formulas and copyable results.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'HVAC Calculators: AC BTU, Dehumidifier Size & CFM / ACH',
    description:
      'Estimate room AC BTU, dehumidifier size and CFM / ACH values from simple inputs, then copy, share, print or export the result.',
    url: '/'
  }
};

const primaryTools = allTools.slice(0, 6);

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataForHome()) }} />
      <HvacHomeWorkspace />
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Core HVAC calculators</h2>
            <p className="mt-2 max-w-2xl text-slate-600">Open a dedicated calculator page when you want the same workflow with full guide sections, FAQ and source notes.</p>
          </div>
          <Link className="font-bold" href="/templates/hvac-contractor-questions/">Open planning questions</Link>
        </div>
        <CardGrid items={primaryTools.map((tool) => ({ href: tool.path, title: tool.h1, description: tool.description }))} />
      </section>
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-3xl font-black tracking-tight">Guides and worked examples</h2>
        <CardGrid items={[...guidePages.slice(0, 4), ...longTailPages.slice(0, 4)].map((page) => ({ href: page.path, title: page.h1, description: page.description }))} />
      </section>
      <section className="mx-auto max-w-6xl px-4 py-8">
        <SourceList />
      </section>
    </>
  );
}
