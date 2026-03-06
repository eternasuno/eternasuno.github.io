import rehypeMathml from '@daiji256/rehype-mathml';
import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

export const toHtml = async (content: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm, { singleTilde: false })
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeMathml, { displayMode: true })
    .use(rehypeShiki, {
      inline: 'tailing-curly-colon',
      themes: {
        dark: 'one-dark-pro',
        light: 'one-light',
      },
    })
    .use(rehypeStringify)
    .process(content);

  return String(result);
};
