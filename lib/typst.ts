import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import { makeTypstRehypePlugin } from '@/lib/typst-rehype';
import { POST_PATH } from './config';

const processor = unified()
  .use(
    makeTypstRehypePlugin({
      inputs: { target: 'html' },
      selector: '<frontmatter>',
      workspace: POST_PATH,
    })
  )
  .use(rehypeShiki, {
    inline: 'tailing-curly-colon',
    themes: {
      dark: 'one-dark-pro',
      light: 'one-light',
    },
  })
  .use(rehypeStringify);

export const compile = async (body: string) => {
  const file = await processor.process(body);
  const metadata = file.data.metadata as Record<string, unknown>;
  const content = String(file);

  return { content, ...metadata } as { content: string } & Record<string, unknown>;
};
