import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { POST_CONTENT_PATH, SHOW_DRAFT } from '@/lib/config';
import { compile } from '@/lib/typst';

export type Post = {
  content: string;
  description: string;
  publishAt: Date;
  slug: string;
  tags: string[];
  title: string;
};

export const getSlugs = async () =>
  (await fs.readdir(POST_CONTENT_PATH))
    .values()
    .filter((filename) => SHOW_DRAFT || !filename.endsWith('.draft.typ'))
    .map((filename) => filename.replace('.typ', ''))
    .toArray()
    .sort((a, b) => (b > a ? 1 : -1));

export const getPostBySlug = async (slug: string) => {
  const path = join(POST_CONTENT_PATH, `${slug}.typ`);
  const fileContent = await fs.readFile(path, 'utf-8');
  const { metadata, content } = await compile(fileContent);

  return {
    ...metadata,
    content,
    publishAt: new Date(slug.substring(0, 10)),
    slug,
  } as unknown as Post;
};

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
