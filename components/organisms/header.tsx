import type { ComponentProps } from 'react';

import { AUTHOR } from '@/libs/config';

import Container from '../atoms/container';
import Gutter from '../atoms/gutter';
import Link from '../atoms/link';

const Header = (props: ComponentProps<'header'>) => (
  <header {...props}>
    <Container className="flex py-4">
      <Link className="bg-primary p-2 font-mono text-primary-content" href="/">
        {AUTHOR}::blog
      </Link>
      <Gutter className="flex-1" />
    </Container>
  </header>
);

export default Header;
