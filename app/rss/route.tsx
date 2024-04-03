import { BASE_URL, TITLE } from '@/libs/config';
import { renderToHtml } from '@/libs/markdown';
import { type Post, getPosts } from '@/libs/post';
import { NextResponse } from 'next/server';

export const GET = async () =>
  new NextResponse(await generateRss(), {
    headers: {
      'content-type': 'text/xml',
    },
  });

const generateRss = async () => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title><![CDATA[ ${TITLE} ]]></title>
      <link>${BASE_URL}</link>
      <description><![CDATA[ ${TITLE} ]]></description>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
      ${(await Promise.all((await getPosts()).map((post) => generateRssItem(post)))).join('')}
    </channel>
  </rss>
`;

const generateRssItem = async ({ slug, title, date, content }: Post) => `
  <item>
    <guid>${BASE_URL}/posts/${slug}</guid>
    <title><![CDATA[ ${title} ]]></title>
    <link>${BASE_URL}/posts/${slug}</link>
    <description><![CDATA[ ${await renderToHtml(content)} ]]></description>
    <pubDate>${new Date(date).toUTCString()}</pubDate>
  </item>
`;
