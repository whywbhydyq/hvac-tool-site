import Link from 'next/link';
import type { ContentPage, ContentSection, WorkedExample } from '@/src/content/pages';
import { allTools } from '@/src/content/pages';
import { SourceList } from '@/src/components/assumptions/SourceList';
import { ProfessionalBoundary } from '@/src/components/professional-boundary/ProfessionalBoundary';
import { ToolCalculator } from '@/src/components/calculators/ToolCalculator';

export function PageRenderer({ page }: { page: ContentPage }) {
  if (page.kind === 'tool' && page.toolKind) return <ToolPage page={page} />;
  return <ArticlePage page={page} />;
}

function ToolPage({ page }: { page: ContentPage }) {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-6 pt-10 md:pt-12">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Calculator</p>
        <h1 className="mt-3 text-4xl font-black leading-tight tracking-[-0.04em] md:text-6xl">{page.h1}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">{page.description}</p>
        <p className="mt-4 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-950">
          Preliminary planning only. Use formulas and notes as a starting point, then verify final decisions with local code, product manuals and qualified review.
        </p>
      </section>
      <section className="mx-auto max-w-6xl px-4"><ToolCalculator kind={page.toolKind!} /></section>
      <section className="mx-auto max-w-6xl px-4 py-8"><ResultUseCard /></section>
      <section className="mx-auto max-w-6xl px-4 py-8"><ProfessionalBoundary /></section>
      <section className="mx-auto max-w-6xl px-4 py-8"><ContentSections sections={page.sections} /></section>
      <section className="mx-auto max-w-6xl px-4 py-8"><WorkedExamples examples={page.examples} /></section>
      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-8 md:grid-cols-2">
        <InfoCard title="What is included" items={page.includes ?? []} />
        <InfoCard title="What is not included" items={page.excludes ?? []} />
      </section>
      <section className="mx-auto max-w-6xl px-4 py-8"><RelatedLinks page={page} /></section>
      <section className="mx-auto max-w-6xl px-4 py-8"><SourceList /></section>
      <section className="mx-auto max-w-6xl px-4 py-8"><Faq page={page} /></section>
      <section className="mx-auto max-w-6xl px-4 py-8"><RelatedTools current={page.path} /></section>
    </>
  );
}

function ArticlePage({ page }: { page: ContentPage }) {
  const showSources = page.kind !== 'support';
  const preset = presetForPage(page);
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">{page.kind}</p>
      <h1 className="mt-4 text-4xl font-black leading-tight tracking-[-0.04em] md:text-5xl">{page.h1}</h1>
      <p className="mt-5 text-lg text-slate-600">{page.description}</p>
      {page.directAnswer ? <article className="mt-8 rounded-3xl border border-line bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black tracking-tight">Quick answer</h2>
        <p className="mt-3 text-slate-700">{page.directAnswer}</p>
        {page.relatedToolPath ? <Link className="mt-5 inline-block rounded-full bg-blue-700 px-5 py-3 font-bold text-white no-underline" href={preset?.href ?? page.relatedToolPath}>Open related calculator</Link> : null}
      </article> : null}
      {preset ? <PresetCard preset={preset} /> : null}
      <div className="mt-8"><ContentSections sections={page.sections} /></div>
      <div className="mt-8"><WorkedExamples examples={page.examples} /></div>
      <div className="mt-8"><RelatedLinks page={page} /></div>
      {showSources ? <div className="mt-8"><SourceList /></div> : null}
      <div className="mt-8"><Faq page={page} /></div>
    </section>
  );
}

function ContentSections({ sections }: { sections?: ContentSection[] }) {
  if (!sections?.length) return null;
  return <div className="grid gap-5">{sections.map((section) => <section key={section.heading} className="rounded-3xl border border-line bg-white p-6 shadow-sm">
    <h2 className="text-2xl font-black tracking-tight">{section.heading}</h2>
    <div className="mt-4 space-y-3 text-slate-700">{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    {section.bullets?.length ? <ul className="mt-4 space-y-2 text-slate-700">{section.bullets.map((item) => <li key={item}>• {item}</li>)}</ul> : null}
    {section.table ? <div className="mt-5 overflow-x-auto"><table className="w-full border-collapse text-left text-sm"><thead><tr>{section.table.headers.map((header) => <th key={header} className="border-b border-line bg-slate-50 p-3 font-bold">{header}</th>)}</tr></thead><tbody>{section.table.rows.map((row) => <tr key={row.join('|')}>{row.map((cell, index) => <td key={`${row.join('|')}-${index}`} className="border-b border-line p-3 align-top text-slate-700">{cell}</td>)}</tr>)}</tbody></table></div> : null}
  </section>)}</div>;
}

function WorkedExamples({ examples }: { examples?: WorkedExample[] }) {
  if (!examples?.length) return null;
  return <div className="rounded-3xl border border-line bg-white p-6 shadow-sm"><h2 className="text-2xl font-black tracking-tight">Worked examples</h2><div className="mt-4 grid gap-4">{examples.map((example) => <article key={example.title} className="rounded-2xl bg-slate-50 p-4"><h3 className="font-black">{example.title}</h3><ul className="mt-3 space-y-1 text-sm text-slate-700">{example.inputs.map((input) => <li key={input}>• {input}</li>)}</ul><p className="mt-3 font-bold text-slate-900">{example.result}</p><p className="mt-2 text-sm text-slate-700">{example.explanation}</p></article>)}</div></div>;
}

function RelatedLinks({ page }: { page: ContentPage }) {
  if (!page.relatedLinks?.length) return null;
  return <div className="rounded-3xl border border-line bg-white p-6 shadow-sm"><h2 className="text-2xl font-black tracking-tight">Related reading and tools</h2><p className="mt-4 flex flex-wrap gap-3">{page.relatedLinks.map((link) => <Link key={link.path} href={link.path}>{link.label}</Link>)}</p></div>;
}

function ResultUseCard() {
  const items = ['Compare the range and formula before changing inputs.', 'Use the notes to understand which assumptions moved the result.', 'Copy, download or print the result for later review.'];
  return <div className="rounded-3xl border border-line bg-white p-6 shadow-sm"><h2 className="text-2xl font-black tracking-tight">How to use this result</h2><ul className="mt-4 grid gap-3 text-slate-700 md:grid-cols-3">{items.map((item) => <li key={item} className="rounded-2xl bg-slate-50 p-4">{item}</li>)}</ul></div>;
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-3xl border border-line bg-white p-6 shadow-sm"><h2 className="text-2xl font-black tracking-tight">{title}</h2><ul className="mt-4 space-y-2 text-slate-700">{items.map((item) => <li key={item}>• {item}</li>)}</ul></div>;
}

function Faq({ page }: { page: ContentPage }) {
  if (!page.faqs?.length) return null;
  return <div className="rounded-3xl border border-line bg-white p-6 shadow-sm"><h2 className="text-2xl font-black tracking-tight">FAQ</h2>{page.faqs.map((faq) => <details key={faq.question} className="mt-4 rounded-2xl bg-slate-50 p-4" open><summary className="font-bold">{faq.question}</summary><p className="mt-2 text-slate-700">{faq.answer}</p></details>)}</div>;
}

function RelatedTools({ current }: { current: string }) {
  return <div className="rounded-3xl border border-line bg-white p-6 shadow-sm"><h2 className="text-2xl font-black tracking-tight">Related calculators</h2><p className="mt-4 flex flex-wrap gap-3">{allTools.filter((tool) => tool.path !== current).slice(0, 5).map((tool) => <Link key={tool.path} href={tool.path}>{tool.h1}</Link>)}</p></div>;
}

type Preset = { title: string; href: string; inputs: string[]; output: string; note: string };

function PresetCard({ preset }: { preset: Preset }) {
  return (
    <aside className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">Preset calculator input</p>
      <h2 className="mt-2 text-2xl font-black tracking-tight">{preset.title}</h2>
      <ul className="mt-4 grid gap-2 text-sm text-blue-950 md:grid-cols-2">
        {preset.inputs.map((input) => <li key={input} className="rounded-2xl bg-white/80 p-3">{input}</li>)}
      </ul>
      <p className="mt-4 font-bold text-blue-950">Example output: {preset.output}</p>
      <p className="mt-2 text-sm text-blue-900">{preset.note}</p>
      <Link className="mt-5 inline-block rounded-full bg-blue-700 px-5 py-3 font-bold text-white no-underline" href={preset.href}>Open calculator with this preset</Link>
    </aside>
  );
}

function presetForPage(page: ContentPage): Preset | null {
  const presets: Record<string, Preset> = {
    '/room-size/what-size-ac-for-150-sq-ft/': {
      title: '150 sq ft room AC preset',
      href: '/room-ac-btu-calculator/?areaSqft=150&ceilingHeightFt=8&sunExposure=average&occupants=2&insulation=average',
      inputs: ['Area: 150 sq ft', 'Ceiling: 8 ft', 'Sun: average', 'Occupants: 2', 'Insulation: average'],
      output: 'About 3,000 BTU/h before adjustment range.',
      note: 'Change sun, kitchen heat or insulation on the calculator page before choosing a product size.'
    },
    '/room-size/what-size-ac-for-300-sq-ft/': {
      title: '300 sq ft room AC preset',
      href: '/room-ac-btu-calculator/?areaSqft=300&ceilingHeightFt=8&sunExposure=average&occupants=2&insulation=average',
      inputs: ['Area: 300 sq ft', 'Ceiling: 8 ft', 'Sun: average', 'Occupants: 2', 'Insulation: average'],
      output: 'About 6,000 BTU/h before adjustment range.',
      note: 'Use the preset as a starting point, then adjust for sunny windows, kitchen heat or poor insulation.'
    },
    '/room-size/what-size-ac-for-500-sq-ft/': {
      title: '500 sq ft room AC preset',
      href: '/room-ac-btu-calculator/?areaSqft=500&ceilingHeightFt=8&sunExposure=average&occupants=2&insulation=average',
      inputs: ['Area: 500 sq ft', 'Ceiling: 8 ft', 'Sun: average', 'Occupants: 2', 'Insulation: average'],
      output: 'About 10,000 BTU/h before adjustment range.',
      note: 'High sun, poor insulation or kitchen heat can push the range higher.'
    },
    '/portable-ac/14000-btu-portable-ac-room-size/': {
      title: 'Portable AC comparison preset',
      href: '/portable-ac-size-calculator/?areaSqft=450&ceilingHeightFt=8&sunExposure=average&occupants=2&insulation=average',
      inputs: ['Area: 450 sq ft', 'Ceiling: 8 ft', 'Sun: average', 'Occupants: 2', 'Check SACC separately'],
      output: 'Compare the room BTU range against the product SACC or current label.',
      note: 'A 14,000 BTU marketing label can overstate practical portable AC coverage.'
    },
    '/dehumidifier/what-size-dehumidifier-for-1000-sq-ft-basement/': {
      title: '1000 sq ft basement dehumidifier preset',
      href: '/basement-dehumidifier-size-calculator/?areaSqft=1000&dampness=damp&basement=true&temperatureF=70&continuousDrain=false',
      inputs: ['Area: 1000 sq ft', 'Dampness: damp', 'Basement: yes', 'Temperature: 70°F', 'Drain: bucket / not continuous'],
      output: 'Often around a mid-size to large pints/day class before water-source checks.',
      note: 'If there is seepage or visible water, fix the water source before relying on appliance capacity.'
    },
    '/bathroom-fan/what-size-fan-for-small-bathroom/': {
      title: 'Small bathroom fan CFM preset',
      href: '/bathroom-fan-cfm-calculator/?areaSqft=45&toilet=1&shower=1&tub=0&jettedTub=0&ductLengthFt=10',
      inputs: ['Area: 45 sq ft', 'Toilet: 1', 'Shower: 1', 'Tub: 0', 'Duct length: 10 ft'],
      output: 'Start near 50 CFM, then check fixtures, duct losses and local code.',
      note: 'Bathroom fan performance depends on delivered airflow, duct routing and installation details.'
    }
  };
  return presets[page.path] ?? null;
}
