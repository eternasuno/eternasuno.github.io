/** biome-ignore-all lint/correctness/useQwikValidLexicalScope: not use in qwik */

import rehypeMathml from '@daiji256/rehype-mathml';
import rehypeShiki from '@shikijs/rehype';
import matter, { type GrayMatterFile } from 'gray-matter';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import type { Plugin } from 'vite';

type MarkdownModule = {
  content: string;
  excerpt: string;
  metadata: Record<string, unknown>;
};

const toHtml = async (content: string) => {
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

const extractExcerpt = (file: GrayMatterFile<string>) => {
  const [excerpt, rest] = file.content.split('<!-- excerpt -->', 2);

  if (rest) {
    file.excerpt = excerpt;
    file.content = excerpt + rest;
  } else {
    file.excerpt = file.content.split('\n').find((line) => line.trim()) || file.content;
  }
};

export const markdownPlugin = (): Plugin => {
  return {
    enforce: 'pre',
    name: 'vite-plugin-markdown',
    transform: async (code, id) => {
      if (!id.endsWith('.md')) {
        return null;
      }

      const { content, data, excerpt } = matter(code, {
        // @ts-expect-error type error of gray-matter lib
        excerpt: extractExcerpt,
      });

      const contentHtml = await toHtml(content);
      const excerptHtml = await toHtml(excerpt || '');

      const module: MarkdownModule = {
        content: contentHtml,
        excerpt: excerptHtml,
        metadata: data,
      };

      return {
        code: `export default ${JSON.stringify(module)};
export const content = ${JSON.stringify(module.content)};
export const excerpt = ${JSON.stringify(module.excerpt)};
export const metadata = ${JSON.stringify(module.metadata)};`,
        map: null,
      };
    },
  };
};

export default markdownPlugin;
