import type { Post } from '@/libs/post';

import { AUTHOR, DOMAIN } from '@/libs/config';
import { toHtml } from '@/libs/markdown';
import { getPosts } from '@/libs/post';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export const GET = async () =>
  new NextResponse(await generateRss(), {
    headers: {
      'content-type': 'text/xml',
    },
  });

const generateRss = async () =>
  `<?xml version="1.0" encoding="UTF-8" ?>
<?xml-stylesheet type="text/xsl" href="/rss.xsl.xml"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title><![CDATA[ ${AUTHOR} ]]></title>
      <link>${DOMAIN}</link>
      <description><![CDATA[ ${AUTHOR}'s blog ]]></description>
      <lastBuildDate>${new Date().toISOString()}</lastBuildDate>
      <atom:link href="${DOMAIN}/rss.xml" rel="self" type="application/rss+xml"/>
      ${(await Promise.all((await getPosts()).map((post) => generateRssItem(post)))).join('')}
    </channel>
  </rss>
`;

const generateRssItem = async ({ content, publishAt, slug, title }: Post) => `
  <item>
    <guid>${DOMAIN}/posts/${slug}</guid>
    <title><![CDATA[ ${title} ]]></title>
    <link>${DOMAIN}/posts/${slug}</link>
    <description><![CDATA[ ${await toHtml(content)} ]]></description>
    <pubDate>${new Date(publishAt).toISOString()}</pubDate>
  </item>
`;
