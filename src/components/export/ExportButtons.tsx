'use client';

import { useState } from 'react';

type Props = {
  onCopyResult: () => Promise<void> | void;
  onCopyAssumptions: () => Promise<void> | void;
  onShare: () => Promise<void> | void;
  onCsv: () => Promise<void> | void;
  canUseResult?: boolean;
};

type ActionKey = 'result' | 'share' | 'csv' | 'assumptions' | 'print';

type Status = { key: ActionKey; label: string; tone: 'ok' | 'error' } | null;

const secondaryButton = 'rounded-full bg-blue-50 px-4 py-2 font-bold text-blue-700 disabled:cursor-not-allowed disabled:opacity-50';

export function ExportButtons({ onCopyResult, onCopyAssumptions, onShare, onCsv, canUseResult = true }: Props) {
  const [status, setStatus] = useState<Status>(null);

  async function run(key: ActionKey, label: string, action: () => Promise<void> | void) {
    try {
      await action();
      setStatus({ key, label, tone: 'ok' });
    } catch {
      setStatus({ key, label: 'Action failed. Try again or copy manually.', tone: 'error' });
    }
    window.setTimeout(() => setStatus(null), 2400);
  }

  return (
    <div className="mt-5 no-print" aria-label="Result actions">
      <div className="flex flex-wrap gap-2">
        <button className="rounded-full bg-blue-700 px-4 py-2 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50" type="submit" aria-label="Review the current calculator estimate" disabled={!canUseResult}>
          Review estimate
        </button>
        <button className={secondaryButton} type="button" onClick={() => run('result', 'Copied result.', onCopyResult)} aria-label="Copy the result summary" disabled={!canUseResult}>
          {status?.key === 'result' && status.tone === 'ok' ? 'Copied' : 'Copy result'}
        </button>
        <button className={secondaryButton} type="button" onClick={() => run('share', 'Copied share link.', onShare)} aria-label="Copy a shareable link with the current inputs" disabled={!canUseResult}>
          {status?.key === 'share' && status.tone === 'ok' ? 'Copied' : 'Copy share link'}
        </button>
        <button className={secondaryButton} type="button" onClick={() => run('csv', 'CSV downloaded.', onCsv)} aria-label="Download the current result as a CSV file" disabled={!canUseResult}>
          Download CSV
        </button>
        <button className={secondaryButton} type="button" onClick={() => run('assumptions', 'Copied assumptions.', onCopyAssumptions)} aria-label="Copy the professional boundary note">
          {status?.key === 'assumptions' && status.tone === 'ok' ? 'Copied' : 'Copy assumptions'}
        </button>
        <button className="rounded-full border border-line px-4 py-2 font-bold" type="button" onClick={() => run('print', 'Print dialog opened.', () => window.print())} aria-label="Print this calculator result or save as PDF" disabled={!canUseResult}>
          Print / PDF
        </button>
      </div>
      {status ? <p className={`mt-3 text-sm font-semibold ${status.tone === 'ok' ? 'text-emerald-700' : 'text-red-700'}`} role="status">{status.label}</p> : null}
      {!canUseResult ? <p className="mt-3 text-sm font-semibold text-orange-800" role="status">Fix the highlighted input before copying, sharing, downloading or printing.</p> : null}
    </div>
  );
}
