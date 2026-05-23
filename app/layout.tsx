import type { Metadata } from 'next';
import './globals.css';
import { SITE } from '@/src/content/site';
import { MainNav } from '@/src/components/layout/MainNav';
import { SiteFooter } from '@/src/components/layout/SiteFooter';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`
  },
  description: SITE.description,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    url: SITE.url
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-ink antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-3">
          Skip to content
        </a>
        <MainNav />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
