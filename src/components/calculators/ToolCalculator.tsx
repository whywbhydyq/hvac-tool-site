'use client';

import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import type { DampnessLevel } from '@/src/lib/config/dehumidifier-assumptions';
import type { ToolKind } from '@/src/content/pages';
import { calculateAcBtu, type AcBtuInput } from '@/src/lib/calculators/ac-btu';
import { calculateDehumidifierSize } from '@/src/lib/calculators/dehumidifier-size';
import { calculateCfmByAch, calculateAch } from '@/src/lib/calculators/cfm-ach';
import { calculateBathroomFanCfm } from '@/src/lib/calculators/bathroom-fan';
import { calculateGarageVentilation } from '@/src/lib/calculators/garage-ventilation';
import { btuToThermalKw, btuToTons, litersToPints, pintsToLiters, thermalKwToBtu, tonsToBtu } from '@/src/lib/calculators/btu-conversions';
import { PROFESSIONAL_BOUNDARY } from '@/src/content/site';
import { formatNumber } from '@/src/lib/formatting/numbers';
import { encodeShareParams } from '@/src/lib/share/encode';
import { toCsv } from '@/src/lib/csv/export';
import { ExportButtons } from '@/src/components/export/ExportButtons';
import { validateCalculatorInput } from '@/src/lib/validation/schemas';

const defaults = {
  lengthFt: '12', widthFt: '10', areaSqft: '', ceilingHeightFt: '8', sunExposure: 'average', occupants: '2', insulation: 'average', kitchen: false,
  dampness: 'damp', basement: false, temperatureF: '70', waterIntrusion: false, continuousDrain: false,
  targetAch: '6', cfm: '100', toilet: '1', shower: '1', tub: '0', jettedTub: '0', ductLengthFt: '10', btu: '12000', tons: '1', kw: '3.5', pints: '50', liters: '24'
};

type Values = typeof defaults;

function defaultValuesForTool(kind: ToolKind): Values {
  const next: Values = { ...defaults };
  if (['dehumidifier', 'basement-dehumidifier'].includes(kind)) {
    next.areaSqft = '1000';
    next.basement = kind === 'basement-dehumidifier';
  }
  if (kind === 'bathroom-fan') {
    next.areaSqft = '80';
  }
  return next;
}
type CalculatorInput = {
  lengthFt: number; widthFt: number; areaSqft: number; ceilingHeightFt: number;
  sunExposure: 'average' | 'shaded' | 'sunny'; occupants: number; insulation: 'poor' | 'average' | 'good'; kitchen: boolean;
  dampness: DampnessLevel; basement: boolean; temperatureF: number; waterIntrusion: boolean; continuousDrain: boolean;
  targetAch: number; cfm: number; toilet: number; shower: number; tub: number; jettedTub: number; ductLengthFt: number;
  btu: number; tons: number; kw: number; pints: number; liters: number;
};

type RenderedResult = { summary: string; metrics: Array<{ label: string; value: string }>; formula: string; notes: string[]; warnings: string[] };
type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (command: 'event', eventName: string, params?: Record<string, unknown>) => void;
};

function num(value: string, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function trackToolEvent(eventName: string, params: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return;
  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.dataLayer?.push({ event: eventName, ...params });
  analyticsWindow.gtag?.('event', eventName, params);
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="grid gap-1 text-sm font-bold text-slate-700">{label}{children}</label>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-line bg-slate-50 p-4"><strong className="block text-lg">{value}</strong><span className="text-sm text-slate-500">{label}</span></div>;
}

export function ToolCalculator({ kind }: { kind: ToolKind }) {
  const [values, setValues] = useState<Values>(() => defaultValuesForTool(kind));
  const hasStartedInput = useRef(false);
  const trackedResultKinds = useRef<Set<ToolKind>>(new Set());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next = defaultValuesForTool(kind);
    for (const key of Object.keys(next) as Array<keyof Values>) {
      const value = params.get(key);
      if (value == null) continue;
      if (typeof next[key] === 'boolean') (next as Record<string, string | boolean>)[key] = value === 'true' || value === 'on';
      else (next as Record<string, string | boolean>)[key] = value;
    }
    if (kind === 'basement-dehumidifier') next.basement = true;
    hasStartedInput.current = false;
    setValues(next);
  }, [kind]);

  const input: CalculatorInput = useMemo(() => ({
    lengthFt: num(values.lengthFt, 12), widthFt: num(values.widthFt, 10), areaSqft: num(values.areaSqft, 0), ceilingHeightFt: num(values.ceilingHeightFt, 8),
    sunExposure: values.sunExposure as CalculatorInput['sunExposure'], occupants: num(values.occupants, 2), insulation: values.insulation as CalculatorInput['insulation'], kitchen: values.kitchen,
    dampness: values.dampness as DampnessLevel, basement: values.basement, temperatureF: num(values.temperatureF, 70), waterIntrusion: values.waterIntrusion, continuousDrain: values.continuousDrain,
    targetAch: num(values.targetAch, 6), cfm: num(values.cfm, 100), toilet: num(values.toilet, 1), shower: num(values.shower, 1), tub: num(values.tub, 0), jettedTub: num(values.jettedTub, 0), ductLengthFt: num(values.ductLengthFt, 10),
    btu: num(values.btu, 12000), tons: num(values.tons, 1), kw: num(values.kw, 3.5), pints: num(values.pints, 50), liters: num(values.liters, 24)
  }), [values]);

  const validation = useMemo(() => validateCalculatorInput(kind, input as unknown as Record<string, unknown>), [kind, input]);
  const result = useMemo(() => (validation.ok ? renderResult(kind, validation.data as CalculatorInput) : invalidResult(validation.errors)), [kind, validation]);

  useEffect(() => {
    if (!validation.ok || trackedResultKinds.current.has(kind)) return;
    trackedResultKinds.current.add(kind);
    trackToolEvent('result_shown', { tool_type: kind, result_bucket: result.summary, has_warning: result.warnings.length > 0 });
  }, [kind, result.summary, result.warnings.length, validation.ok]);

  function set(name: keyof Values, value: string | boolean) {
    if (!hasStartedInput.current) {
      trackToolEvent('tool_input_start', { tool_type: kind, input_name: String(name) });
      hasStartedInput.current = true;
    }
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackToolEvent('tool_submit', { tool_type: kind, result_bucket: result.summary, has_warning: result.warnings.length > 0 });
  }

  function shareUrl() {
    if (!validation.ok) return window.location.href;
    const params = encodeShareParams({ ...values, tool: kind } as unknown as Record<string, string | number | boolean | undefined>);
    return `${window.location.origin}${window.location.pathname}?${params}`;
  }

  function exportCsv() {
    if (!validation.ok) return;
    const csv = toCsv([['field', 'value'], ['tool', kind], ['result', result.summary], ['boundary', PROFESSIONAL_BOUNDARY], ...Object.entries(values)]);
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${kind}-result.csv`;
    a.click();
    URL.revokeObjectURL(url);
    trackToolEvent('download_csv', { tool_type: kind, result_bucket: result.summary });
  }

  async function copyResult() {
    if (!validation.ok) throw new Error('Invalid calculator input');
    await copy(result.summary);
    trackToolEvent('copy_result', { tool_type: kind, result_bucket: result.summary });
  }

  async function copyShareUrl() {
    if (!validation.ok) throw new Error('Invalid calculator input');
    await copy(shareUrl());
    trackToolEvent('copy_share_link', { tool_type: kind, result_bucket: result.summary });
  }

  async function copy(text: string) {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text);
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_.9fr]">
      <form className="rounded-3xl border border-line bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-black tracking-tight">Inputs</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">{renderInputs(kind, values, set)}</div>
        {!validation.ok ? <div className="mt-5 rounded-2xl border border-orange-200 bg-orange-50 p-4 text-sm font-semibold text-orange-900">{validation.errors.map((error) => <p key={error}>• {error}</p>)}</div> : null}
        <ExportButtons onCopyResult={copyResult} onCopyAssumptions={() => copy(PROFESSIONAL_BOUNDARY)} onShare={copyShareUrl} onCsv={exportCsv} canUseResult={validation.ok} />
      </form>
      <aside className="rounded-3xl border border-line bg-white p-6 shadow-sm" aria-live="polite">
        <h2 className="text-2xl font-black tracking-tight">Result</h2>
        <p className="mt-4 text-3xl font-black leading-tight tracking-tight">{result.summary}</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">{result.metrics.map((metric) => <Metric key={metric.label} {...metric} />)}</div>
        <pre className="mt-5 overflow-auto rounded-2xl bg-slate-950 p-4 text-sm text-slate-100">{result.formula}</pre>
        <ul className="mt-5 space-y-2 text-sm text-slate-700">{result.notes.map((note) => <li key={note}>• {note}</li>)}</ul>
        <div className="mt-5 space-y-2">{result.warnings.map((warning) => <div key={warning} className="rounded-2xl border border-orange-200 bg-orange-50 p-3 text-sm text-orange-900">{warning}</div>)}</div>
      </aside>
    </section>
  );
}

function renderInputs(kind: ToolKind, values: Values, set: (name: keyof Values, value: string | boolean) => void) {
  const inputClass = 'rounded-xl border border-line p-2';
  const room = <>
    <Field label="Length ft"><input className={inputClass} value={values.lengthFt} onChange={(e) => set('lengthFt', e.target.value)} type="number" min="1" step="0.1" /></Field>
    <Field label="Width ft"><input className={inputClass} value={values.widthFt} onChange={(e) => set('widthFt', e.target.value)} type="number" min="1" step="0.1" /></Field>
    <Field label="Area override sq ft"><input className={inputClass} value={values.areaSqft} onChange={(e) => set('areaSqft', e.target.value)} type="number" min="0" /></Field>
    <Field label="Ceiling height ft"><input className={inputClass} value={values.ceilingHeightFt} onChange={(e) => set('ceilingHeightFt', e.target.value)} type="number" min="1" step="0.1" /></Field>
  </>;

  if (['ac', 'window-ac', 'portable-ac'].includes(kind)) return <>
    {room}
    <Field label="Sun exposure"><select className={inputClass} value={values.sunExposure} onChange={(e) => set('sunExposure', e.target.value)}><option value="average">Average</option><option value="shaded">Heavily shaded</option><option value="sunny">Very sunny</option></select></Field>
    <Field label="Occupants"><input className={inputClass} value={values.occupants} onChange={(e) => set('occupants', e.target.value)} type="number" min="0" /></Field>
    <Field label="Insulation"><select className={inputClass} value={values.insulation} onChange={(e) => set('insulation', e.target.value)}><option value="average">Average</option><option value="poor">Poor</option><option value="good">Good</option></select></Field>
    <label className="flex items-center gap-2 text-sm font-bold text-slate-700"><input checked={values.kitchen} onChange={(e) => set('kitchen', e.target.checked)} type="checkbox" />Kitchen / heat source</label>
  </>;

  if (['dehumidifier', 'basement-dehumidifier'].includes(kind)) {
    const lockedBasement = kind === 'basement-dehumidifier';
    return <>
      <Field label="Area sq ft"><input className={inputClass} value={values.areaSqft} onChange={(e) => set('areaSqft', e.target.value)} type="number" min="1" /></Field>
      <Field label="Dampness"><select className={inputClass} value={values.dampness} onChange={(e) => set('dampness', e.target.value)}><option value="slightly-damp">Slightly damp</option><option value="damp">Damp</option><option value="very-damp">Very damp</option><option value="wet">Wet</option></select></Field>
      <Field label="Temperature F"><input className={inputClass} value={values.temperatureF} onChange={(e) => set('temperatureF', e.target.value)} type="number" min="40" max="100" /></Field>
      <label className="flex items-center gap-2 text-sm font-bold text-slate-700"><input checked={lockedBasement || values.basement} disabled={lockedBasement} onChange={(e) => set('basement', e.target.checked)} type="checkbox" />{lockedBasement ? 'Basement mode applied' : 'Basement'}</label>
      <label className="flex items-center gap-2 text-sm font-bold text-slate-700"><input checked={values.waterIntrusion} onChange={(e) => set('waterIntrusion', e.target.checked)} type="checkbox" />Water intrusion</label>
      <label className="flex items-center gap-2 text-sm font-bold text-slate-700"><input checked={values.continuousDrain} onChange={(e) => set('continuousDrain', e.target.checked)} type="checkbox" />Continuous drain</label>
    </>;
  }

  if (['cfm-by-ach', 'garage'].includes(kind)) return <>{room}<Field label="Target ACH"><input className={inputClass} value={values.targetAch} onChange={(e) => set('targetAch', e.target.value)} type="number" min="0.1" step="0.1" /></Field></>;
  if (kind === 'ach') return <>{room}<Field label="Fan CFM"><input className={inputClass} value={values.cfm} onChange={(e) => set('cfm', e.target.value)} type="number" min="1" /></Field></>;
  if (kind === 'bathroom-fan') return <>
    <Field label="Area sq ft"><input className={inputClass} value={values.areaSqft} onChange={(e) => set('areaSqft', e.target.value)} type="number" min="1" /></Field>
    <Field label="Toilets"><input className={inputClass} value={values.toilet} onChange={(e) => set('toilet', e.target.value)} type="number" min="0" /></Field>
    <Field label="Showers"><input className={inputClass} value={values.shower} onChange={(e) => set('shower', e.target.value)} type="number" min="0" /></Field>
    <Field label="Tubs"><input className={inputClass} value={values.tub} onChange={(e) => set('tub', e.target.value)} type="number" min="0" /></Field>
    <Field label="Jetted tubs"><input className={inputClass} value={values.jettedTub} onChange={(e) => set('jettedTub', e.target.value)} type="number" min="0" /></Field>
    <Field label="Duct length ft"><input className={inputClass} value={values.ductLengthFt} onChange={(e) => set('ductLengthFt', e.target.value)} type="number" min="0" /></Field>
  </>;
  if (kind === 'tonnage') return <><Field label="BTU/h"><input className={inputClass} value={values.btu} onChange={(e) => set('btu', e.target.value)} type="number" min="1" /></Field><Field label="Tons"><input className={inputClass} value={values.tons} onChange={(e) => set('tons', e.target.value)} type="number" min="0" step="0.1" /></Field></>;
  if (kind === 'btu-kw') return <><Field label="BTU/h"><input className={inputClass} value={values.btu} onChange={(e) => set('btu', e.target.value)} type="number" min="1" /></Field><Field label="Thermal kW"><input className={inputClass} value={values.kw} onChange={(e) => set('kw', e.target.value)} type="number" min="0" step="0.1" /></Field></>;
  return <><Field label="US pints"><input className={inputClass} value={values.pints} onChange={(e) => set('pints', e.target.value)} type="number" min="0" /></Field><Field label="Liters"><input className={inputClass} value={values.liters} onChange={(e) => set('liters', e.target.value)} type="number" min="0" /></Field></>;
}

function acInput(data: CalculatorInput): AcBtuInput {
  return { lengthFt: data.lengthFt, widthFt: data.widthFt, areaSqft: data.areaSqft, ceilingHeightFt: data.ceilingHeightFt, sunExposure: data.sunExposure, occupants: data.occupants, kitchen: data.kitchen, insulation: data.insulation };
}

function invalidResult(errors: string[]): RenderedResult {
  return {
    summary: 'Fix the highlighted inputs before using this estimate',
    metrics: [{ label: 'Validation', value: `${errors.length} issue${errors.length === 1 ? '' : 's'}` }],
    formula: 'No calculation is shown until the input range is valid.',
    notes: ['Calculator inputs are validated before copying, sharing, downloading or printing.'],
    warnings: errors
  };
}

function renderResult(kind: ToolKind, data: CalculatorInput): RenderedResult {
  if (['ac', 'window-ac', 'portable-ac'].includes(kind)) {
    const result = calculateAcBtu(acInput(data));
    return { summary: `${formatNumber(result.rangeLow)}-${formatNumber(result.rangeHigh)} BTU/h`, metrics: [{ label: 'Area', value: `${formatNumber(result.areaSqft)} sq ft` }, { label: 'Base estimate', value: `${formatNumber(result.baseBtu)} BTU/h` }, { label: 'Tons', value: `${formatNumber(result.tonsLow, 1)}-${formatNumber(result.tonsHigh, 1)}` }, { label: 'Common sizes', value: result.commonSizes.map((size) => formatNumber(size)).join(', ') }], formula: 'base_BTU = area × 20\nadjusted_BTU = base + sun/shade + occupants + kitchen + height + insulation\nrange = adjusted_BTU × 90%-110%', notes: result.adjustments.map((item) => `${item.label}: ${formatNumber(item.valueBtu)} BTU/h (${item.note})`), warnings: [...result.warnings, ...(kind === 'portable-ac' ? ['Check SACC, CEER, hose design, exhaust sealing and product label before buying.'] : [])] };
  }
  if (['dehumidifier', 'basement-dehumidifier'].includes(kind)) {
    const result = calculateDehumidifierSize({ areaSqft: data.areaSqft || 1000, dampness: data.dampness, basement: kind === 'basement-dehumidifier' || data.basement, temperatureF: data.temperatureF, waterIntrusion: data.waterIntrusion, continuousDrain: data.continuousDrain });
    return { summary: `${formatNumber(result.rangeLow)}-${formatNumber(result.rangeHigh)} pints/day`, metrics: [{ label: 'Area', value: `${formatNumber(result.areaSqft)} sq ft` }, { label: 'Product class', value: result.productClass }, { label: 'Drainage', value: result.drainageRecommendation }, { label: 'High range', value: `${formatNumber(result.rangeHigh)} pints/day` }], formula: 'base_pints_per_day = lookup(area, dampness)\nrange = base + basement / temperature / water-source cautions', notes: result.adjustments, warnings: result.warnings };
  }
  if (kind === 'cfm-by-ach') {
    const result = calculateCfmByAch({ lengthFt: data.lengthFt, widthFt: data.widthFt, ceilingHeightFt: data.ceilingHeightFt, areaSqft: data.areaSqft, targetAch: data.targetAch });
    return { summary: `${formatNumber(result.cfm)} CFM`, metrics: [{ label: 'Volume', value: `${formatNumber(result.volumeCuft)} cu ft` }, { label: 'Target ACH', value: `${formatNumber(result.targetAch, 1)}` }], formula: 'CFM = room_volume_cuft × target_ACH ÷ 60', notes: [], warnings: result.warnings };
  }
  if (kind === 'garage') {
    const result = calculateGarageVentilation({ lengthFt: data.lengthFt, widthFt: data.widthFt, ceilingHeightFt: data.ceilingHeightFt, targetAch: data.targetAch });
    return { summary: `${formatNumber(result.cfm)} CFM`, metrics: [{ label: 'Volume', value: `${formatNumber(result.volumeCuft)} cu ft` }, { label: 'Target ACH', value: `${formatNumber(result.targetAch, 1)}` }], formula: 'CFM = garage_volume_cuft × target_ACH ÷ 60', notes: ['Not for commercial garages, CO control or code compliance.'], warnings: result.warnings };
  }
  if (kind === 'ach') {
    const result = calculateAch({ lengthFt: data.lengthFt, widthFt: data.widthFt, ceilingHeightFt: data.ceilingHeightFt, areaSqft: data.areaSqft, cfm: data.cfm });
    return { summary: `${formatNumber(result.ach, 1)} ACH`, metrics: [{ label: 'Volume', value: `${formatNumber(result.volumeCuft)} cu ft` }, { label: 'CFM', value: `${formatNumber(result.cfm)} CFM` }], formula: 'ACH = CFM × 60 ÷ room_volume_cuft', notes: [], warnings: result.warnings };
  }
  if (kind === 'bathroom-fan') {
    const result = calculateBathroomFanCfm({ areaSqft: data.areaSqft || 80, toilet: data.toilet, shower: data.shower, tub: data.tub, jettedTub: data.jettedTub, ductLengthFt: data.ductLengthFt });
    return { summary: `${formatNumber(result.recommendedCfm)} CFM`, metrics: [{ label: 'Area rule', value: `${formatNumber(result.areaRuleCfm)} CFM` }, { label: 'Fixture rule', value: `${formatNumber(result.fixtureRuleCfm)} CFM` }], formula: 'CFM = max(area × 1, 50, fixture model)', notes: [], warnings: result.warnings };
  }
  if (kind === 'tonnage') {
    return { summary: `${formatNumber(data.btu)} BTU/h = ${formatNumber(btuToTons(data.btu), 2)} tons`, metrics: [{ label: 'BTU to tons', value: `${formatNumber(btuToTons(data.btu), 2)} tons` }, { label: 'Tons to BTU', value: `${formatNumber(tonsToBtu(data.tons))} BTU/h` }], formula: 'tons = BTU/h ÷ 12,000', notes: ['Cooling tonnage is a capacity unit, not a full central-system selection.'], warnings: [PROFESSIONAL_BOUNDARY] };
  }
  if (kind === 'btu-kw') {
    return { summary: `${formatNumber(data.btu)} BTU/h = ${formatNumber(btuToThermalKw(data.btu), 2)} thermal kW`, metrics: [{ label: 'BTU to thermal kW', value: `${formatNumber(btuToThermalKw(data.btu), 2)} kW` }, { label: 'Thermal kW to BTU', value: `${formatNumber(thermalKwToBtu(data.kw))} BTU/h` }], formula: 'thermal_kW = BTU/h × 0.000293071', notes: ['Thermal kW is not electrical input power; efficiency determines watts.'], warnings: [PROFESSIONAL_BOUNDARY] };
  }
  return { summary: `${formatNumber(data.pints)} pints/day = ${formatNumber(pintsToLiters(data.pints), 1)} L/day`, metrics: [{ label: 'Pints to liters', value: `${formatNumber(pintsToLiters(data.pints), 1)} L` }, { label: 'Liters to pints', value: `${formatNumber(litersToPints(data.liters), 1)} pints` }], formula: 'liters = pints × 0.473176473', notes: ['Dehumidifier capacity is not the same as bucket volume.'], warnings: [PROFESSIONAL_BOUNDARY] };
}
