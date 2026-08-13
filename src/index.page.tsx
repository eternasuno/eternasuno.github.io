export default ({ search }: Lume.Data) => {
  const posts = search.pages('url^=/posts/', 'date=desc');
  const format = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format;

  return (
    <div class='space-y-4'>
      {posts.map(({ date, url, title }) => (
        <div class='flex items-baseline gap-3'>
          <time class='shrink-0 italic opacity-60' datetime={date.toISOString()}>
            {format(date)}
          </time>
          <a href={url} class='hover:opacity-70'>
            {title}
          </a>
        </div>
      ))}
    </div>
  );
};
