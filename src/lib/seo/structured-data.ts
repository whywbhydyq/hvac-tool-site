import { SITE } from '@/src/content/site';
import type { ContentPage } from '@/src/content/pages';
import { allTools } from '@/src/content/pages';

function breadcrumbForPage(page: ContentPage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE.url
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: page.h1,
        item: `${SITE.url}${page.path}`
      }
    ]
  };
}

function faqForPage(page: ContentPage) {
  if (!page.faqs?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  };
}

export function structuredDataForHome() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
      description: SITE.description
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'HVAC calculator tools',
      itemListElement: allTools.slice(0, 8).map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: tool.h1,
        url: `${SITE.url}${tool.path}`
      }))
    }
  ];
}

export function structuredDataForPage(page: ContentPage) {
  const base = {
    '@context': 'https://schema.org',
    name: page.h1,
    headline: page.h1,
    description: page.description,
    url: `${SITE.url}${page.path}`
  };

  const primary =
    page.kind === 'tool'
      ? {
          ...base,
          '@type': 'SoftwareApplication',
          applicationCategory: 'UtilityApplication',
          operatingSystem: 'Any',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          }
        }
      : {
          ...base,
          '@type': 'Article'
        };

  return [primary, breadcrumbForPage(page), faqForPage(page)].filter(Boolean);
}
