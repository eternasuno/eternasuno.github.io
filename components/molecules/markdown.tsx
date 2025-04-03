import type { ComponentProps } from 'react';

import Prose from '@/components/atoms/prose';
import { toHtml } from '@/libs/markdown';

type Props = Omit<ComponentProps<typeof Prose>, 'asChild' | 'children'> & {
  children: string;
};

const Markdown = async ({ children, ...rest }: Props) => {
  const html = await toHtml(children);

  return <Prose {...rest} dangerouslySetInnerHTML={{ __html: html }}></Prose>;
};

export default Markdown;
