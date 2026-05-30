import Link from 'next/link';
import type { ContentPage, ContentSection, ToolKind, WorkedExample } from '@/src/content/pages';
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
      <section className="mx-auto max-w-6xl px-4 py-8"><ToolEvidenceCard kind={page.toolKind!} /></section>
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
        {page.relatedToolPath ? <Link className="mt-5 inline-block rounded-full bg-blue-700 px-5 py-3 font-bold text-white no-underline" href={preset?.href ?? page.relatedToolPath}>{articleCtaLabel(page, Boolean(preset))}</Link> : null}
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


function articleCtaLabel(page: ContentPage, hasPreset: boolean) {
  if (hasPreset) return 'Open calculator with this preset';
  const labels: Record<string, string> = {
    '/guides/how-many-btu-per-square-foot/': 'Estimate AC BTU with room inputs',
    '/guides/why-oversized-ac-does-not-dehumidify/': 'Check the AC BTU range',
    '/guides/portable-ac-sacc-vs-btu/': 'Compare portable AC room size',
    '/guides/30-pint-vs-50-pint-dehumidifier/': 'Estimate dehumidifier pints/day',
    '/guides/what-size-dehumidifier-for-basement/': 'Estimate basement dehumidifier size',
    '/guides/cfm-vs-ach/': 'Convert CFM and ACH',
    '/guides/bathroom-fan-cfm-guide/': 'Calculate bathroom fan CFM',
    '/guides/what-is-ac-tonnage/': 'Convert BTU to tons',
    '/guides/dehumidifier-pints-explained/': 'Estimate dehumidifier pints/day',
    '/templates/room-ac-sizing-worksheet/': 'Estimate AC BTU with the worksheet inputs',
    '/templates/basement-humidity-checklist/': 'Estimate basement dehumidifier size',
    '/templates/hvac-contractor-questions/': 'Review HVAC calculator boundaries'
  };
  if (labels[page.path]) return labels[page.path];
  if (page.relatedToolPath?.includes('bathroom-fan')) return 'Calculate bathroom fan CFM';
  if (page.relatedToolPath?.includes('dehumidifier')) return 'Estimate dehumidifier pints/day';
  if (page.relatedToolPath?.includes('portable-ac')) return 'Compare portable AC room size';
  if (page.relatedToolPath?.includes('cfm') || page.relatedToolPath?.includes('ach')) return 'Convert CFM and ACH';
  if (page.relatedToolPath?.includes('tonnage') || page.relatedToolPath?.includes('btu-to-tons')) return 'Convert BTU to tons';
  if (page.relatedToolPath?.includes('room-ac') || page.relatedToolPath?.includes('window-ac')) return 'Estimate AC BTU with room inputs';
  return 'Open the related calculator';
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


function ToolEvidenceCard({ kind }: { kind: ToolKind }) {
  const evidence = evidenceForTool(kind);
  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">Source-backed inputs</p>
      <h2 className="mt-2 text-2xl font-black tracking-tight">Why these fields are in the calculator</h2>
      <p className="mt-3 text-slate-700">{evidence.summary}</p>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {evidence.items.map((item) => (
          <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
            <h3 className="font-black text-slate-900">{item.label}</h3>
            <p className="mt-2 text-sm text-slate-700">{item.detail}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-600">{evidence.boundary}</p>
    </div>
  );
}

function evidenceForTool(kind: ToolKind) {
  if (['ac', 'window-ac', 'portable-ac'].includes(kind)) {
    return {
      summary: 'Room AC sizing starts from room area and then checks the same practical factors users compare on product pages: ceiling height, sun exposure, occupancy, kitchen heat and insulation. The estimate is intentionally a range, not a professional load calculation.',
      items: [
        { label: 'Area and height', detail: 'The base estimate uses room area and exposes ceiling height so tall rooms do not look identical to standard rooms.' },
        { label: 'Sun and occupancy', detail: 'Heavy shade, very sunny exposure and extra regular occupants are visible inputs because common room-AC guidance treats them as adjustment factors.' },
        { label: 'Kitchen and insulation', detail: 'Internal heat and weak envelope conditions can move comfort expectations, so they are included as planning cautions.' }
      ],
      boundary: 'Use this for room/window/portable AC comparison only. It is not Manual J, duct design, electrical review or final equipment approval.'
    };
  }
  if (['dehumidifier', 'basement-dehumidifier', 'pints-liters'].includes(kind)) {
    return {
      summary: 'Dehumidifier capacity is treated as moisture removal per day, so the calculator separates area, dampness, basement condition, low temperature, water-source risk and drainage planning.',
      items: [
        { label: 'Area and dampness', detail: 'Space size and the condition of the space are the primary planning inputs for a portable dehumidifier class.' },
        { label: 'Basement and temperature', detail: 'Below-grade and cool spaces can behave differently from warm living areas, so the output warns about low-temperature performance.' },
        { label: 'Drain and water source', detail: 'Continuous drain and water intrusion checks prevent the result from pretending appliance capacity is waterproofing.' }
      ],
      boundary: 'The pints/day lookup is an internal planning table. It is not an official ENERGY STAR sizing table, mold remediation plan or waterproofing recommendation.'
    };
  }
  if (kind === 'bathroom-fan') {
    return {
      summary: 'Bathroom fan sizing combines the common area rule with fixture-based checks, then warns about delivered airflow losses from ducts and installation details.',
      items: [
        { label: 'Area rule', detail: 'Small-bathroom ventilation guidance commonly starts with floor area and a minimum fan class.' },
        { label: 'Fixture rule', detail: 'Toilets, showers, tubs and jetted tubs can raise the recommended CFM beyond a simple square-foot estimate.' },
        { label: 'Duct conditions', detail: 'Long runs, bends, caps and fan curves can reduce delivered airflow even when the labeled CFM looks adequate.' }
      ],
      boundary: 'Use the result as early planning. Local code, product instructions, duct design and installation quality still control the final decision.'
    };
  }
  if (['cfm-by-ach', 'ach', 'garage'].includes(kind)) {
    return {
      summary: 'CFM and ACH are math conversions based on room volume. They help compare airflow targets but do not prove indoor air quality or code compliance.',
      items: [
        { label: 'Room volume', detail: 'Length, width and ceiling height determine how much air the calculation is trying to exchange.' },
        { label: 'Target ACH', detail: 'ACH expresses theoretical room-volume exchanges per hour, so the same CFM can mean different ACH in different rooms.' },
        { label: 'Delivered airflow', detail: 'Fans, filters, grilles, ducts and pressure differences can reduce actual airflow from the simple ideal calculation.' }
      ],
      boundary: 'Do not use ACH math alone for combustion safety, garages with vehicle exhaust, laboratories, code compliance or health claims.'
    };
  }
  return {
    summary: 'This page is a unit-conversion helper. The conversion is useful for comparison, but it does not choose equipment or prove real-world performance.',
    items: [
      { label: 'Capacity unit', detail: 'BTU/h, tons, thermal kW, pints/day and liters/day describe different measurement contexts.' },
      { label: 'Label check', detail: 'Always compare the converted value against the product label and the current tool result.' },
      { label: 'No design approval', detail: 'A conversion does not replace load calculation, moisture-source review or installation requirements.' }
    ],
    boundary: 'Use conversions as supporting context only.'
  };
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

type Preset = { title: string; href: string; inputs: string[]; output: string; note: string; sourceNote: string; mistakes: string[]; related: Array<{ href: string; label: string }> };

function PresetCard({ preset }: { preset: Preset }) {
  return (
    <aside className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">Preset calculator input</p>
      <h2 className="mt-2 text-2xl font-black tracking-tight">{preset.title}</h2>
      <ul className="mt-4 grid gap-2 text-sm text-blue-950 md:grid-cols-2">
        {preset.inputs.map((input) => <li key={input} className="rounded-2xl bg-white/80 p-3">{input}</li>)}
      </ul>
      <p className="mt-4 font-bold text-blue-950">Example output from current assumptions: {preset.output}</p>
      <p className="mt-2 text-sm text-blue-900">{preset.note}</p>
      <p className="mt-3 rounded-2xl bg-white/80 p-3 text-sm font-semibold text-blue-950">Source boundary: {preset.sourceNote}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white/80 p-4">
          <h3 className="font-black text-blue-950">Common mistakes to check</h3>
          <ul className="mt-3 space-y-2 text-sm text-blue-950">{preset.mistakes.map((mistake) => <li key={mistake}>• {mistake}</li>)}</ul>
        </div>
        <div className="rounded-2xl bg-white/80 p-4">
          <h3 className="font-black text-blue-950">Related presets and tools</h3>
          <p className="mt-3 flex flex-wrap gap-2 text-sm">{preset.related.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</p>
        </div>
      </div>
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
      note: 'Change sun, kitchen heat or insulation on the calculator page before choosing a product size.',
      sourceNote: 'Uses the room AC 20 BTU/sq ft starting point and exposes DOE / ENERGY STAR-style adjustment factors as editable inputs.',
      mistakes: ['Ignoring strong afternoon sun or poor insulation.', 'Using floor area alone when ceiling height is unusual.', 'Treating this estimate as Manual J load sizing.'],
      related: [{ href: '/room-size/what-size-ac-for-300-sq-ft/', label: '300 sq ft AC preset' }, { href: '/room-size/what-size-ac-for-500-sq-ft/', label: '500 sq ft AC preset' }, { href: '/guides/how-many-btu-per-square-foot/', label: 'BTU per sq ft guide' }, { href: '/room-ac-btu-calculator/', label: 'Main AC BTU calculator' }]
    },
    '/room-size/what-size-ac-for-300-sq-ft/': {
      title: '300 sq ft room AC preset',
      href: '/room-ac-btu-calculator/?areaSqft=300&ceilingHeightFt=8&sunExposure=average&occupants=2&insulation=average',
      inputs: ['Area: 300 sq ft', 'Ceiling: 8 ft', 'Sun: average', 'Occupants: 2', 'Insulation: average'],
      output: 'About 6,000 BTU/h before adjustment range.',
      note: 'Use the preset as a starting point, then adjust for sunny windows, kitchen heat or poor insulation.',
      sourceNote: 'Uses the room AC 20 BTU/sq ft starting point before sun, occupancy, kitchen, height and insulation adjustments.',
      mistakes: ['Forgetting kitchen or heat-source adjustment.', 'Choosing a unit only from marketing room-size claims.', 'Ignoring ceiling height or insulation quality.'],
      related: [{ href: '/room-size/what-size-ac-for-150-sq-ft/', label: '150 sq ft AC preset' }, { href: '/room-size/what-size-ac-for-500-sq-ft/', label: '500 sq ft AC preset' }, { href: '/guides/why-oversized-ac-does-not-dehumidify/', label: 'Oversizing guide' }, { href: '/room-ac-btu-calculator/', label: 'Main AC BTU calculator' }]
    },
    '/room-size/what-size-ac-for-500-sq-ft/': {
      title: '500 sq ft room AC preset',
      href: '/room-ac-btu-calculator/?areaSqft=500&ceilingHeightFt=8&sunExposure=average&occupants=2&insulation=average',
      inputs: ['Area: 500 sq ft', 'Ceiling: 8 ft', 'Sun: average', 'Occupants: 2', 'Insulation: average'],
      output: 'About 10,000 BTU/h before adjustment range.',
      note: 'High sun, poor insulation or kitchen heat can push the range higher.',
      sourceNote: 'Uses the room AC area rule as a starting point and treats high-load conditions as planning adjustments, not Manual J.',
      mistakes: ['Assuming every 500 sq ft room has the same load.', 'Ignoring west-facing glass or high ceilings.', 'Skipping product manual and electrical checks.'],
      related: [{ href: '/room-size/what-size-ac-for-300-sq-ft/', label: '300 sq ft AC preset' }, { href: '/room-size/what-size-ac-for-150-sq-ft/', label: '150 sq ft AC preset' }, { href: '/portable-ac/14000-btu-portable-ac-room-size/', label: 'Portable AC comparison' }, { href: '/room-ac-btu-calculator/', label: 'Main AC BTU calculator' }]
    },
    '/portable-ac/14000-btu-portable-ac-room-size/': {
      title: 'Portable AC comparison preset',
      href: '/portable-ac-size-calculator/?areaSqft=450&ceilingHeightFt=8&sunExposure=average&occupants=2&insulation=average',
      inputs: ['Area: 450 sq ft', 'Ceiling: 8 ft', 'Sun: average', 'Occupants: 2', 'Check SACC separately'],
      output: 'Compare the room BTU range against the product SACC or current label.',
      note: 'A 14,000 BTU marketing label can overstate practical portable AC coverage.',
      sourceNote: 'Portable AC pages should compare the room estimate with current product-label and adjusted-capacity context instead of relying only on the largest BTU number.',
      mistakes: ['Comparing old ASHRAE BTU to room load without checking SACC.', 'Ignoring hose sealing and window-kit leakage.', 'Assuming portable AC coverage matches window AC coverage.'],
      related: [{ href: '/portable-ac-size-calculator/', label: 'Portable AC calculator' }, { href: '/guides/portable-ac-sacc-vs-btu/', label: 'SACC vs BTU guide' }, { href: '/room-size/what-size-ac-for-500-sq-ft/', label: '500 sq ft AC preset' }, { href: '/room-ac-btu-calculator/', label: 'Room AC BTU calculator' }]
    },
    '/dehumidifier/what-size-dehumidifier-for-1000-sq-ft-basement/': {
      title: '1000 sq ft basement dehumidifier preset',
      href: '/basement-dehumidifier-size-calculator/?areaSqft=1000&dampness=damp&basement=true&temperatureF=70&continuousDrain=false',
      inputs: ['Area: 1000 sq ft', 'Dampness: damp', 'Basement: yes', 'Temperature: 70°F', 'Drain: bucket / not continuous'],
      output: 'Often around a mid-size to large pints/day class before water-source checks.',
      note: 'If there is seepage or visible water, fix the water source before relying on appliance capacity.',
      sourceNote: 'ENERGY STAR describes dehumidifier capacity in pints per 24 hours and tied to both space size and conditions; this site uses an internal planning table, not an official sizing table.',
      mistakes: ['Trying to solve leaks with a larger dehumidifier.', 'Ignoring low-temperature performance in basements.', 'Skipping continuous drain planning for high moisture loads.'],
      related: [{ href: '/dehumidifier-size-calculator/', label: 'Room dehumidifier calculator' }, { href: '/basement-dehumidifier-size-calculator/', label: 'Basement calculator' }, { href: '/guides/30-pint-vs-50-pint-dehumidifier/', label: '30 vs 50 pint guide' }, { href: '/guides/dehumidifier-pints-explained/', label: 'Pints/day explained' }, { href: '/templates/basement-humidity-checklist/', label: 'Basement checklist' }]
    },
    '/bathroom-fan/what-size-fan-for-small-bathroom/': {
      title: 'Small bathroom fan CFM preset',
      href: '/bathroom-fan-cfm-calculator/?areaSqft=45&toilet=1&shower=1&tub=0&jettedTub=0&ductLengthFt=10',
      inputs: ['Area: 45 sq ft', 'Toilet: 1', 'Shower: 1', 'Tub: 0', 'Duct length: 10 ft'],
      output: 'Start near 50 CFM, then check fixtures, duct losses and local code.',
      note: 'Bathroom fan performance depends on delivered airflow, duct routing and installation details.',
      sourceNote: 'Uses HVI-style small-bath area and fixture rules as planning context; delivered airflow, ducting and local code still control final selection.',
      mistakes: ['Choosing fan size from floor area only when fixtures increase need.', 'Ignoring long or restrictive duct runs.', 'Treating rated CFM as delivered airflow.'],
      related: [{ href: '/bathroom-fan-cfm-calculator/', label: 'Bathroom fan calculator' }, { href: '/guides/bathroom-fan-cfm-guide/', label: 'Bathroom fan guide' }, { href: '/cfm-by-ach-calculator/', label: 'CFM by ACH calculator' }, { href: '/room-ventilation-calculator/', label: 'Room ventilation calculator' }]
    }
  };
  return presets[page.path] ?? null;
}
