import Link from 'next/link';
import type { ContentPage } from '@/src/content/pages';
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
      <section className="mx-auto max-w-6xl px-4 py-14">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Calculator</p>
        <h1 className="mt-4 text-5xl font-black leading-tight tracking-[-0.05em] md:text-6xl">{page.h1}</h1>
        <p className="mt-5 max-w-3xl text-lg text-slate-600">{page.description}</p>
        <div className="mt-5"><ProfessionalBoundary /></div>
      </section>
      <section className="mx-auto max-w-6xl px-4"><ToolCalculator kind={page.toolKind!} /></section>
      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-8 md:grid-cols-2">
        <InfoCard title="What is included" items={page.includes ?? []} />
        <InfoCard title="What is not included" items={page.excludes ?? []} />
      </section>
      <section className="mx-auto max-w-6xl px-4 py-8"><SourceList /></section>
      <section className="mx-auto max-w-6xl px-4 py-8"><Faq page={page} /></section>
      <section className="mx-auto max-w-6xl px-4 py-8"><RelatedTools current={page.path} /></section>
      <div className="mx-auto max-w-6xl px-4"><div className="rounded-2xl border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500">AdSense-ready placement kept away from calculator controls.</div></div>
    </>
  );
}

function ArticlePage({ page }: { page: ContentPage }) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">{page.kind}</p>
      <h1 className="mt-4 text-5xl font-black leading-tight tracking-[-0.05em]">{page.h1}</h1>
      <p className="mt-5 text-lg text-slate-600">{page.description}</p>
      <article className="mt-8 rounded-3xl border border-line bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black tracking-tight">Direct answer</h2>
        <p className="mt-3 text-slate-700">{page.directAnswer}</p>
        {page.relatedToolPath ? <Link className="mt-5 inline-block rounded-full bg-blue-700 px-5 py-3 font-bold text-white no-underline" href={page.relatedToolPath}>Open related calculator</Link> : null}
      </article>
      <div className="mt-8"><SourceList /></div>
      <div className="mt-8"><Faq page={page} /></div>
    </section>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-3xl border border-line bg-white p-6 shadow-sm"><h2 className="text-2xl font-black tracking-tight">{title}</h2><ul className="mt-4 space-y-2 text-slate-700">{items.map((item) => <li key={item}>• {item}</li>)}</ul></div>;
}

function Faq({ page }: { page: ContentPage }) {
  if (!page.faqs?.length) return null;
  return <div className="rounded-3xl border border-line bg-white p-6 shadow-sm"><h2 className="text-2xl font-black tracking-tight">FAQ</h2>{page.faqs.map((faq) => <details key={faq.question} className="mt-4 rounded-2xl bg-slate-50 p-4" open><summary className="font-bold">{faq.question}</summary><p className="mt-2 text-slate-700">{faq.answer}</p></details>)}</div>;
}

function RelatedTools({ current }: { current: string }) {
  return <div className="rounded-3xl border border-line bg-white p-6 shadow-sm"><h2 className="text-2xl font-black tracking-tight">Related calculators</h2><p className="mt-4 flex flex-wrap gap-3">{allTools.filter((tool) => tool.path !== current).slice(0, 8).map((tool) => <Link key={tool.path} href={tool.path}>{tool.h1}</Link>)}</p></div>;
}
