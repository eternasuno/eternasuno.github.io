import type { MarkdownModule } from '../plugins/vite-plugin-markdown';
import { SHOW_DRAFTS } from '../site.config';

const Markdowns = import.meta.glob<MarkdownModule>('../posts/*.md', {
  eager: true,
  import: 'default',
});

export type Post = {
  content: string;
  excerpt: string;
  publishAt: Date;
  slug: string;
  title: string;
};

export const getSlugs = () =>
  Object.keys(Markdowns)
    .values()
    .map((path) => path.match(/posts[\\/](.+?)\.md$/)?.at(1))
    .filter((slug): slug is string => !!slug)
    .filter((slug) => SHOW_DRAFTS || !slug.endsWith('.draft'))
    .toArray()
    .sort((a, b) => b.localeCompare(a));

export const getPostBySlug = (slug: string) => {
  const filename = `../posts/${slug}.md`;
  const markdown = Markdowns[filename];
  if (!markdown) {
    throw new Error(`Post with slug "${slug}" not found.`);
  }

  const { content, metadata, excerpt } = markdown;
  return {
    ...metadata,
    content,
    excerpt,
    publishAt: new Date(slug.substring(0, 10)),
    slug,
  } as Post;
};

export const getPosts = () => getSlugs().map(getPostBySlug);
