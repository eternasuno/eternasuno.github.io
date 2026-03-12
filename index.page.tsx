const formatDate = (value: unknown) => {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

export default (data: Lume.Data) => {
  const pages = data.search.pages('url^=/posts/') as Lume.Data[];
  const posts = [...pages].sort((a, b) => {
    const aTime = a.date ? new Date(String(a.date)).getTime() : 0;
    const bTime = b.date ? new Date(String(b.date)).getTime() : 0;
    return bTime - aTime;
  });

  return (
    <div class='space-y-8 md:space-y-10'>
      <section class='news-surface rounded-none px-5 py-8 md:px-10 md:py-12'>
        <p class='news-kicker mb-5'>Independent Type Journal</p>
        <h1 class='news-title text-5xl leading-[0.95] md:text-7xl'>
          ETERNASUNO
          <br />
          CHRONICLE
        </h1>
        <p class='mt-4 max-w-3xl text-base text-base-content/75 md:text-lg'>
          一个使用 Typst 写作、由 Lume 构建的技术写作站点。这里是按时间线整理的文章清单。
        </p>
        <div class='mt-6 flex items-center gap-4 text-sm uppercase tracking-wider text-base-content/70'>
          <span>{posts.length} Articles</span>
          <span>•</span>
          <a class='border-b border-base-content/50 hover:text-base-content' href='/rss.xml'>
            RSS Feed
          </a>
        </div>
      </section>

      <section class='news-surface rounded-none p-0'>
        <ol class='divide-y divide-base-content/30'>
          {posts.map((post, index) => (
            <li key={post.url}>
              <article class='grid gap-3 px-5 py-5 md:grid-cols-[110px_1fr_auto] md:items-baseline md:px-8'>
                <p class='text-xs uppercase tracking-[0.2em] text-base-content/55'>
                  #{String(index + 1).padStart(2, '0')}
                </p>
                <h2 class='text-xl font-semibold leading-snug md:text-2xl'>
                  <a class='hover:underline' href={post.url}>
                    {post.title}
                  </a>
                </h2>
                <p class='text-sm uppercase tracking-wider text-base-content/60'>
                  {formatDate(post.date)}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};
