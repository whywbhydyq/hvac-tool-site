import { allTools, guidePages, longTailPages } from '@/src/content/pages';
import { SourceList } from '@/src/components/assumptions/SourceList';
import { ProfessionalBoundary } from '@/src/components/professional-boundary/ProfessionalBoundary';
import { CardGrid } from '@/src/components/ui/CardGrid';

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Free browser-side calculators</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-tight tracking-[-0.05em] md:text-7xl">
            HVAC, AC BTU, Dehumidifier, CFM and ACH Calculators
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-600">
            Estimate room AC size, portable AC capacity, dehumidifier pints/day, CFM by ACH, bathroom fan CFM, garage ventilation and HVAC unit conversions with visible formulas and source-backed assumptions.
          </p>
          <div className="mt-6">
            <ProfessionalBoundary variant="short" />
          </div>
        </div>
        <div className="rounded-3xl border border-line bg-white p-6 shadow-xl shadow-slate-900/10">
          <h2 className="text-2xl font-black tracking-tight">First-version coverage</h2>
          <ul className="mt-4 space-y-2 text-slate-700">
            <li>Room and window AC BTU ranges</li>
            <li>Portable AC SACC / label caveats</li>
            <li>Basement and room dehumidifier sizing</li>
            <li>CFM, ACH, bathroom fan and garage ventilation math</li>
            <li>Copy, share URL, CSV export and print/PDF workflow</li>
          </ul>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-3xl font-black tracking-tight">Calculators</h2>
        <CardGrid items={allTools.map((tool) => ({ href: tool.path, title: tool.h1, description: tool.description }))} />
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
