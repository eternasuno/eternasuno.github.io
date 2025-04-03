import type { TwcComponentProps } from 'react-twc';

import { twc } from '@/libs/twc';
import NextLink from 'next/link';

type Props = Omit<TwcComponentProps<typeof NextLink>, 'asChild'> & {
  $external?: boolean;
};

const Link = twc(NextLink).attrs<Props>(
  ({ $external }) => $external && { prefetch: false, rel: 'noopener noreferrer', target: '_blank' }
)`link`;

export default Link;
