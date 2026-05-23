import type { MetadataRoute } from 'next';
import { SITE } from '@/src/content/site';
import { allPagePaths } from '@/src/content/pages';

export default function sitemap(): MetadataRoute.Sitemap {
  return allPagePaths.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date('2026-05-22'),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.includes('calculator') ? 0.9 : 0.7
  }));
}
