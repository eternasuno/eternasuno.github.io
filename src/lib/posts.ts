import fs from 'node:fs/promises';
import { basename, join } from 'node:path';
import matter, { type GrayMatterFile } from 'gray-matter';
import { toHtml } from './markdown';

export type Post = {
  content: string;
  excerpt: string;
  publishAt: Date;
  slug: string;
  tags: string[];
  title: string;
};

const POST_DIR = join(process.cwd(), 'posts');

const SHOW_DRAFT = process.env.NODE_ENV === 'development';

export const getSlugs = async () =>
  (await fs.readdir(POST_DIR))
    .filter((filename) => SHOW_DRAFT || !filename.endsWith('.draft.md'))
    .map((filename) => basename(filename, '.md'))
    .sort((a, b) => (b > a ? 1 : -1));

export const getPostBySlug = async (slug: string) => {
  const path = join(POST_DIR, `${slug}.md`);
  const fileContent = await fs.readFile(path, 'utf-8');
  const { content, data, excerpt } = matter(fileContent, {
    // @ts-expect-error bug of gray-matter
    excerpt: (file: GrayMatterFile<string>) => {
      const [excerpt, rest] = file.content.split('<!-- excerpt -->', 2);
      if (rest) {
        file.excerpt = excerpt;
        file.content = excerpt + rest;
      } else {
        file.excerpt = file.content.split('\n').find((line) => line) || file.content;
      }
    },
  });

  const contentHtml = await toHtml(content);
  const excerptHtml = await toHtml(excerpt || '');

  return {
    ...data,
    content: contentHtml,
    excerpt: excerptHtml,
    publishAt: new Date(slug.substring(0, 10)),
    slug,
  } as unknown as Post;
};

export const getPosts = async () => Promise.all((await getSlugs()).map(getPostBySlug));
