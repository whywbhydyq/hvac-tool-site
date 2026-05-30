import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageRenderer } from '@/src/components/pages/PageRenderer';
import { allContentPages, findPageBySlug } from '@/src/content/pages';
import { SITE } from '@/src/content/site';
import { structuredDataForPage } from '@/src/lib/seo/structured-data';

type Params = { slug: string[] };
type DynamicPageProps = { params: Promise<Params> };

export function generateStaticParams(): Params[] {
  return allContentPages.map((page) => ({
    slug: page.path.replace(/^\//, '').replace(/\/$/, '').split('/').filter(Boolean)
  }));
}

export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findPageBySlug(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${SITE.url}${page.path}`
    }
  };
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params;
  const page = findPageBySlug(slug);
  if (!page) notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataForPage(page)) }} />
      <PageRenderer page={page} />
    </>
  );
}

export const dynamicParams = false;
export const revalidate = false;
