import matter, { type GrayMatterFile } from 'gray-matter';
import type { Plugin } from 'vite';
import { toHtml } from '../lib/markdown';

export type MarkdownModule = {
  content: string;
  excerpt: string;
  metadata: Record<string, unknown>;
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

export const markdownPlugin = () => {
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
  } as Plugin;
};

export default markdownPlugin;
