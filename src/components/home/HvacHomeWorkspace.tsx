'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { ToolKind } from '@/src/content/pages';
import { ToolCalculator } from '@/src/components/calculators/ToolCalculator';

const modes: Array<{
  kind: ToolKind;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  resultHint: string;
  sample: string;
  href: string;
}> = [
  {
    kind: 'ac',
    label: 'AC BTU',
    eyebrow: 'Cooling load',
    title: 'Estimate room AC BTU from size and conditions',
    description: 'Use room dimensions, ceiling height, sun exposure, occupants, insulation and kitchen heat to get a preliminary room AC range.',
    resultHint: 'BTU/h range, common AC sizes and tonnage context',
    sample: '12 × 10 ft room · 8 ft ceiling · average sun',
    href: '/room-ac-btu-calculator/'
  },
  {
    kind: 'dehumidifier',
    label: 'Dehumidifier',
    eyebrow: 'Moisture control',
    title: 'Estimate dehumidifier pints/day by area and dampness',
    description: 'Compare pints/day classes for rooms or basements using area, dampness level, temperature, drainage and water-source cautions.',
    resultHint: 'Pints/day range, product class and drainage notes',
    sample: '1000 sq ft · damp · 70°F',
    href: '/dehumidifier-size-calculator/'
  },
  {
    kind: 'cfm-by-ach',
    label: 'CFM / ACH',
    eyebrow: 'Airflow math',
    title: 'Convert room volume and target ACH into CFM',
    description: 'Use length, width, ceiling height and a target air-change rate to estimate ideal airflow before duct, fan and code checks.',
    resultHint: 'Room volume, target ACH and required CFM',
    sample: '12 × 10 × 8 ft room · 6 ACH target',
    href: '/cfm-by-ach-calculator/'
  }
];

const secondaryLinks = [
  { href: '/bathroom-fan-cfm-calculator/', label: 'Bathroom fan CFM' },
  { href: '/portable-ac-size-calculator/', label: 'Portable AC sizing' },
  { href: '/ach-calculator/', label: 'ACH from CFM' },
  { href: '/templates/hvac-contractor-questions/', label: 'Contractor questions' }
];

export function HvacHomeWorkspace() {
  const [activeKind, setActiveKind] = useState<ToolKind>('ac');
  const activeMode = useMemo(() => modes.find((mode) => mode.kind === activeKind) ?? modes[0], [activeKind]);

  useEffect(() => {
    const tool = new URLSearchParams(window.location.search).get('tool') as ToolKind | null;
    if (tool && modes.some((mode) => mode.kind === tool)) setActiveKind(tool);
  }, []);

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 pb-5 pt-7 md:pt-9">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Preliminary HVAC planning calculators</p>
          <h1 className="mt-2 max-w-4xl text-3xl font-black leading-tight tracking-[-0.04em] md:text-5xl">
            HVAC calculators for AC BTU, dehumidifier size, and CFM / ACH
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            Enter room conditions, review the formula-backed estimate, then copy, share, print or export the result.
          </p>
          <p className="mt-3 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-950">
            Preliminary planning only — not Manual J/S/D, local code, mold remediation, combustion safety or final approval.
          </p>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3" aria-label="Choose calculator mode">
          {modes.map((mode) => (
            <button
              key={mode.kind}
              type="button"
              onClick={() => setActiveKind(mode.kind)}
              className={`rounded-3xl border p-5 text-left shadow-sm transition ${activeKind === mode.kind ? 'border-blue-500 bg-white ring-4 ring-blue-100' : 'border-line bg-white hover:border-blue-200 hover:bg-blue-50/40'}`}
              aria-pressed={activeKind === mode.kind}
            >
              <span className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">{mode.eyebrow}</span>
              <strong className="mt-2 block text-xl text-ink">{mode.label}</strong>
              <span className="mt-2 block text-sm leading-6 text-slate-600">{mode.sample}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10" aria-labelledby="home-workspace-title">
        <div className="mb-4 grid gap-3 rounded-3xl border border-line bg-white p-4 shadow-sm md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">{activeMode.eyebrow}</p>
            <h2 id="home-workspace-title" className="mt-2 text-2xl font-black tracking-tight md:text-3xl">{activeMode.title}</h2>
            <p className="mt-1 max-w-3xl text-sm text-slate-600">{activeMode.description}</p>
            <p className="mt-2 text-sm font-semibold text-slate-500">Expected output: {activeMode.resultHint}</p>
          </div>
          <Link className="rounded-full border border-line px-4 py-2 text-center font-bold no-underline" href={activeMode.href}>
            Open full page
          </Link>
        </div>
        <ToolCalculator kind={activeKind} />
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-8 md:grid-cols-4">
        {secondaryLinks.map((link) => (
          <Link key={link.href} className="rounded-3xl border border-line bg-white p-5 font-bold no-underline shadow-sm hover:border-blue-200" href={link.href}>
            {link.label}
          </Link>
        ))}
      </section>
    </>
  );
}
