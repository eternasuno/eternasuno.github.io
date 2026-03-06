import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import type { Plugin } from 'vite';
import { toHtml } from '../lib/markdown';
import type { Post } from '../lib/post';
import { generateRssXml } from '../lib/rss';
import { SHOW_DRAFTS, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '../site.config';

const readPosts = async (postsDir: string) => {
  const files = readdirSync(postsDir)
    .filter((file) => file.endsWith('.md'))
    .filter((file) => SHOW_DRAFTS || !file.endsWith('.draft.md'))
    .sort((a, b) => b.localeCompare(a));

  const posts: Post[] = [];

  for (const file of files) {
    const filePath = join(postsDir, file);
    const fileContent = readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const slug = file.replace(/\.md$/, '').replace(/\.draft$/, '');

    const compiledContent = await toHtml(content);

    posts.push({
      content: compiledContent,
      excerpt: '',
      publishAt: new Date(slug.substring(0, 10)),
      slug,
      title: data.title || '',
    } as Post);
  }

  return posts;
};

export const rssPlugin = () => {
  let outDir: string;
  let root: string;

  return {
    configResolved: (config) => {
      outDir = config.build.outDir;
      root = config.root;
    },

    configureServer: (server) => {
      return () => {
        server.middlewares.use('/rss.xml', async (_, res) => {
          try {
            const postsDir = join(root, 'posts');
            const posts = await readPosts(postsDir);
            const port = server.config.server?.port || 3000;
            const devUrl = `http://localhost:${port}`;
            const rss = generateRssXml(devUrl, SITE_TITLE, SITE_DESCRIPTION, posts);

            res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
            res.end(rss);
          } catch (error) {
            console.error('Error generating RSS feed:', error);
            res.statusCode = 500;
            res.end('Error generating RSS feed');
          }
        });
      };
    },
    name: 'vite-plugin-rss',

    writeBundle: async () => {
      try {
        const postsDir = join(root, 'posts');
        const posts = await readPosts(postsDir);
        const rss = generateRssXml(SITE_URL, SITE_TITLE, SITE_DESCRIPTION, posts);

        const rssPath = join(outDir, 'rss.xml');
        writeFileSync(rssPath, rss, 'utf-8');

        console.log(`✓ Generated RSS feed: ${rssPath}`);
      } catch (error) {
        console.error('Error generating RSS feed during build:', error);
        throw error;
      }
    },
  } as Plugin;
};
