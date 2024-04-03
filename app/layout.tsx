import Container from '@/components/atoms/container';
import Footer from '@/components/organisms/footer';
import Header from '@/components/organisms/header';
import { BASE_URL, CREATOR, DESCRIPTION, TITLE } from '@/libs/config';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

import './global.css';

const Layout = async ({ children }: { children: ReactNode }) => (
  <html lang="en" suppressHydrationWarning>
    <head />
    <body className="flex min-h-screen flex-col">
      <ThemeProvider>
        <Header />
        <Container asChild className="flex-grow">
          <main>{children}</main>
        </Container>
        <Footer />
      </ThemeProvider>
    </body>
  </html>
);

export const metadata: Metadata = {
  alternates: { canonical: '/', types: { 'application/rss+xml': '/rss' } },
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: TITLE },
  creator: CREATOR,
  description: DESCRIPTION,
  metadataBase: new URL(BASE_URL),
  title: { default: TITLE, template: `%s | ${CREATOR}` },
};

export const viewport: Viewport = { themeColor: 'oklch(28.8229% 0.022103 277.508664/1)' };

export default Layout;
