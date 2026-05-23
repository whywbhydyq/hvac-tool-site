import { describe, expect, it } from 'vitest';
import { allContentPages, allPagePaths, allTools } from '@/src/content/pages';

describe('content registry', () => {
  it('contains required first-version pages', () => {
    expect(allTools.length).toBeGreaterThanOrEqual(10);
    expect(allPagePaths).toContain('/room-ac-btu-calculator/');
    expect(allPagePaths).toContain('/dehumidifier-size-calculator/');
    expect(allPagePaths).toContain('/bathroom-fan-cfm-calculator/');
    expect(allPagePaths).toContain('/guides/cfm-vs-ach/');
    expect(allContentPages.length).toBeGreaterThanOrEqual(35);
  });

  it('each page has SEO basics', () => {
    for (const page of allContentPages) {
      expect(page.h1.length).toBeGreaterThan(5);
      expect(page.title.length).toBeGreaterThan(5);
      expect(page.description.length).toBeGreaterThan(40);
      expect(page.path.endsWith('/')).toBe(true);
    }
  });
});
