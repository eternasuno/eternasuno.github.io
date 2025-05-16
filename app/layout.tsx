import type { Metadata } from 'next';

import Container from '@/components/atoms/container';
import Footer from '@/components/organisms/footer';
import Header from '@/components/organisms/header';

import './globals.css';

import { AUTHOR } from '@/libs/config';

export const metadata: Metadata = {
  alternates: { canonical: '/', types: { 'application/rss+xml': '/rss' } },
  creator: AUTHOR,
  description: `${AUTHOR}'s blog`,
  title: { default: `${AUTHOR}::blog`, template: `%s::${AUTHOR}` },
};

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en">
    <body className="grid min-h-screen grid-rows-[auto_1fr_auto] space-y-12">
      <Header />
      <Container asChild>
        <main>{children}</main>
      </Container>
      <Footer />
    </body>
  </html>
);

export default Layout;
