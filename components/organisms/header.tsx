import type { ComponentProps } from 'react';

import { AUTHOR } from '@/libs/config';

import Container from '../atoms/container';
import Link from '../atoms/link';

const Header = (props: ComponentProps<'header'>) => (
  <header {...props}>
    <Container asChild>
      <h1 className="text-5xl font-bold text-balance">
        <Link className="no-underline" href="/">
          &lt;{AUTHOR}&gt;
        </Link>
      </h1>
    </Container>
  </header>
);

export default Header;
