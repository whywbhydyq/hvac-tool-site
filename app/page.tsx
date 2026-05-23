import type { Metadata } from 'next';
import Link from 'next/link';
import { allTools, guidePages, longTailPages } from '@/src/content/pages';
import { SourceList } from '@/src/components/assumptions/SourceList';
import { CardGrid } from '@/src/components/ui/CardGrid';

export const metadata: Metadata = {
  title: 'HVAC Calculators for AC BTU, Dehumidifier Size, CFM & ACH',
  description:
    'Free browser-side HVAC calculators for room AC BTU, portable AC size, dehumidifier pints/day, CFM, ACH, bathroom fan CFM and unit conversions.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'HVAC Calculators for AC BTU, Dehumidifier Size, CFM & ACH',
    description:
      'Estimate room-level HVAC numbers with visible formulas, assumptions and copyable results.',
    url: '/'
  }
};

const primaryTools = allTools.slice(0, 6);

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Free browser-side HVAC calculators</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-tight tracking-[-0.05em] md:text-7xl">
            Free HVAC Calculators for AC Size, Dehumidifiers, CFM and ACH
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-600">
            Estimate room-level cooling, dehumidifier and ventilation numbers from simple inputs like room size, ceiling height, dampness level, target ACH and fixtures. Results show the formula, assumptions, common size ranges and next checks.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-full bg-blue-700 px-5 py-3 font-bold text-white no-underline" href="/room-ac-btu-calculator/">
              Start with AC BTU calculator
            </Link>
            <Link className="rounded-full border border-line bg-white px-5 py-3 font-bold no-underline" href="/dehumidifier-size-calculator/">
              Estimate dehumidifier size
            </Link>
          </div>
          <p className="mt-5 max-w-2xl text-sm text-slate-500">
            Built for quick room-by-room planning: visible math, source notes, shareable inputs and copyable results.
          </p>
        </div>
        <div className="rounded-3xl border border-line bg-white p-6 shadow-xl shadow-slate-900/10">
          <h2 className="text-2xl font-black tracking-tight">Choose the right starting point</h2>
          <ul className="mt-4 space-y-3 text-slate-700">
            <li><strong>Cooling:</strong> compare room AC, window AC, portable AC and tonnage estimates.</li>
            <li><strong>Moisture:</strong> estimate room or basement dehumidifier pints/day.</li>
            <li><strong>Ventilation:</strong> convert room volume, CFM and target ACH.</li>
            <li><strong>Planning:</strong> copy results, save CSVs and record follow-up questions.</li>
          </ul>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Core calculators</h2>
            <p className="mt-2 max-w-2xl text-slate-600">Start with the tool closest to your room problem, then use related pages to compare assumptions.</p>
          </div>
          <Link className="font-bold" href="/templates/hvac-contractor-questions/">Open planning questions</Link>
        </div>
        <CardGrid items={primaryTools.map((tool) => ({ href: tool.path, title: tool.h1, description: tool.description }))} />
      </section>
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-3xl font-black tracking-tight">All HVAC calculators</h2>
        <CardGrid items={allTools.slice(6).map((tool) => ({ href: tool.path, title: tool.h1, description: tool.description }))} />
      </section>
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-3xl font-black tracking-tight">Guides and worked examples</h2>
        <CardGrid items={[...guidePages, ...longTailPages].map((page) => ({ href: page.path, title: page.h1, description: page.description }))} />
      </section>
      <section className="mx-auto max-w-6xl px-4 py-8">
        <SourceList />
      </section>
    </>
  );
}
