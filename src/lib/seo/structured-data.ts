import { SITE } from '@/src/content/site';
import type { ContentPage } from '@/src/content/pages';

export function structuredDataForPage(page: ContentPage) {
  const base = {
    '@context': 'https://schema.org',
    name: page.h1,
    headline: page.h1,
    description: page.description,
    url: `${SITE.url}${page.path}`
  };
  if (page.kind === 'tool') {
    return { ...base, '@type': 'WebApplication', applicationCategory: 'UtilityApplication', operatingSystem: 'Any' };
  }
  if (page.faqs?.length) {
    return {
      ...base,
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer }
      }))
    };
  }
  return { ...base, '@type': 'Article' };
}
