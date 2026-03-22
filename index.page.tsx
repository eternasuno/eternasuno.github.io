export default ({ search, comp }: Lume.Data) => {
  const posts = search.pages('url^=/posts/', 'date=desc');

  return (
    <>
      <ol class='space-y-2'>
        {posts.map((post) => (
          <li class='items-center-safe flex gap-4'>
            <comp.Time class='font-mono tracking-wider' date={post.date} />
            <a class='link link-hover text-primary' href={post.url}>{post.title}</a>
          </li>
        ))}
      </ol>
    </>
  );
};
