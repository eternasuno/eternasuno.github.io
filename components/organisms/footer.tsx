import type { ComponentProps } from 'react';

import Container from '../atoms/container';
import Link from '../atoms/link';

const Footer = (props: ComponentProps<'footer'>) => (
  <footer {...props}>
    <Container className="flex justify-between text-sm">
      <Link $external href="/rss.xml">
        RSS
      </Link>
      <span>Copyright © {new Date().getFullYear()} - All right reserved</span>
    </Container>
  </footer>
);

export default Footer;
