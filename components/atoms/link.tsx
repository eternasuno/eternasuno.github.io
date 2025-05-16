import type { TwcComponentProps } from 'react-twc';

import NextLink from 'next/link';

import { twc } from '@/libs/twc';

type Props = Omit<TwcComponentProps<typeof NextLink>, 'asChild'> & {
  $external?: boolean;
};

const Link = twc(NextLink).attrs<Props>(
  ({ $external }) =>
    $external && {
      prefetch: false,
      rel: 'noopener noreferrer',
      target: '_blank',
    }
)`cursor-pointer`;

export default Link;
