import matter from 'gray-matter';
import { readdir, readFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { compileMarkdown } from './markdown';

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description?: string;
}

export interface Post extends PostMeta {
  content: string;
}

const POSTS_DIR = join(process.cwd(), 'posts');

export async function getAllPosts(): Promise<PostMeta[]> {
  const files = await readdir(POSTS_DIR);
  const posts: PostMeta[] = [];

  for (const file of files) {
    if (!file.endsWith('.md')) continue;

    const slug = basename(file, '.md');
    const content = await readFile(join(POSTS_DIR, file), 'utf-8');
    const { data } = matter(content);

    posts.push({
      slug,
      title: data.title || slug,
      date: data.date || '',
      description: data.description,
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filePath = join(POSTS_DIR, `${slug}.md`);
    const fileContent = await readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    const html = await compileMarkdown(content);

    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      description: data.description,
      content: html,
    };
  } catch {
    return null;
  }
}
