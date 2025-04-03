import type { GrayMatterFile } from 'gray-matter';

import { promises as fs } from 'fs';
import matter from 'gray-matter';
import { unstable_cache } from 'next/cache';
import { join } from 'path';
import { cache } from 'react';

import { POST_PATH, SHOW_DRAFT } from './config';

export type Post = {
  content: string;
  excerpt: string;
  publishAt: Date;
  slug: string;
  tags: string[];
  title: string;
};

export const getSlugs = async () =>
  (await fs.readdir(POST_PATH))
    .filter((filename) => SHOW_DRAFT || !filename.endsWith('.draft.md'))
    .map((filename) => filename.replace('.md', ''))
    .sort((a, b) => (b > a ? 1 : -1));

export const getPostBySlug = unstable_cache(
  cache(async (slug: string) => {
    const path = join(POST_PATH, `${slug}.md`);
    const fileContent = await fs.readFile(path, 'utf-8');
    const { content, data, excerpt } = matter(fileContent, {
      // @ts-expect-error bug of gray-matter
      excerpt: (file: GrayMatterFile<typeof fileContent>) => {
        const [excerpt, rest] = file.content.split('<!-- excerpt -->', 2);
        if (rest) {
          file.excerpt = excerpt;
          file.content = excerpt + rest;
        } else {
          file.excerpt = file.content.split('\n').find((line) => line) || file.content;
        }
      },
    });

    return {
      ...data,
      content,
      excerpt,
      publishAt: new Date(slug.substring(0, 10)),
      slug,
    } as unknown as Post;
  }),
  ['posts']
);

export const getPosts = async () => Promise.all((await getSlugs()).map(getPostBySlug));

export const groupByTag = async () =>
  (await getPosts()).reduce((tags, post) => {
    for (const tag of post.tags) {
      if (tags.has(tag)) {
        tags.get(tag)?.push(post);
      } else {
        tags.set(tag, [post]);
      }
    }

    return tags;
  }, new Map<string, Post[]>());
