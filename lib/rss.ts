import type { Post } from './post';

const escapeXml = (str: string) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

const toRfc822 = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    hour: '2-digit',
    hourCycle: 'h23',
    minute: '2-digit',
    month: 'short',
    second: '2-digit',
    timeZone: 'UTC',
    weekday: 'short',
    year: 'numeric',
  });

  const parts = formatter.formatToParts(date);
  const partMap: Record<string, string> = {};
  parts.forEach((part) => {
    partMap[part.type] = part.value;
  });

  return `${partMap.weekday}, ${partMap.day} ${partMap.month} ${partMap.year} ${partMap.hour}:${partMap.minute}:${partMap.second} GMT`;
};

const generateRssItem = (post: Post, siteUrl: string) => {
  return `<item>
    <title>${escapeXml(post.title)}</title>
    <link>${escapeXml(`${siteUrl}/posts/${post.slug}`)}</link>
    <guid isPermaLink="true">${escapeXml(`${siteUrl}/posts/${post.slug}`)}</guid>
    <pubDate>${toRfc822(post.publishAt)}</pubDate>
    <description><![CDATA[${post.content}]]></description>
  </item>`;
};

export const generateRssXml = (
  siteUrl: string,
  siteTitle: string,
  siteDescription: string,
  posts: Post[]
) => {
  const items = posts.map((post) => generateRssItem(post, siteUrl)).join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>${escapeXml(siteDescription)}</description>
    <language>zh-cn</language>
    <lastBuildDate>${toRfc822(new Date())}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return rssXml;
};
