import type { Metadata } from 'next';

import Gutter from '@/components/atoms/gutter';
import Footer from '@/components/organisms/footer';
import Header from '@/components/organisms/header';
import { AUTHOR } from '@/libs/config';

import './globals.css';

export const metadata: Metadata = {
  alternates: { canonical: '/', types: { 'application/rss+xml': '/rss' } },
  creator: AUTHOR,
  description: `${AUTHOR}'s blog`,
  title: { default: AUTHOR, template: `%s | ${AUTHOR}` },
};

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en">
    <body className="grid grid-cols-[1rem_0_minmax(0,59rem)_0_1rem] grid-rows-[auto_1fr_auto] overflow-x-clip [grid-template-areas:'._gl_h_gr_.'_'._gl_m_gr_.'_'._gl_f_gr_.'] lg:grid-cols-[auto_2.5rem_minmax(0,60rem)_2.5rem_auto]">
      <Header className="[grid-area:h]" />
      <main className="[grid-area:m]">{children}</main>
      <Footer className="[grid-area:f]" />
      <Gutter className="hidden [grid-area:gl] lg:block" />
      <Gutter className="hidden [grid-area:gr] lg:block" />
    </body>
  </html>
);

export default Layout;
