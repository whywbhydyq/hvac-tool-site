type Props = {
  onCopyResult: () => void;
  onCopyAssumptions: () => void;
  onShare: () => void;
  onCsv: () => void;
};

export function ExportButtons({ onCopyResult, onCopyAssumptions, onShare, onCsv }: Props) {
  return (
    <div className="mt-5 flex flex-wrap gap-2 no-print">
      <button className="rounded-full bg-blue-700 px-4 py-2 font-bold text-white" type="submit">Calculate</button>
      <button className="rounded-full bg-blue-50 px-4 py-2 font-bold text-blue-700" type="button" onClick={onCopyResult}>Copy result</button>
      <button className="rounded-full bg-blue-50 px-4 py-2 font-bold text-blue-700" type="button" onClick={onCopyAssumptions}>Copy assumptions</button>
      <button className="rounded-full bg-blue-50 px-4 py-2 font-bold text-blue-700" type="button" onClick={onShare}>Copy share URL</button>
      <button className="rounded-full bg-blue-50 px-4 py-2 font-bold text-blue-700" type="button" onClick={onCsv}>Download CSV</button>
      <button className="rounded-full border border-line px-4 py-2 font-bold" type="button" onClick={() => window.print()}>Print / PDF</button>
    </div>
  );
}
