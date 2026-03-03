import rehypeMathml from '@daiji256/rehype-mathml';
import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

export async function compileMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeMathml)
    .use(rehypeShiki, {
      theme: 'github-dark',
    })
    .use(rehypeStringify)
    .process(content);

  return String(result);
}
