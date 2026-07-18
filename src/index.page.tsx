export default ({ search, comp }: Lume.Data) => {
  const posts = search.pages('url^=/posts/', 'date=desc');

  return (
    <ol class='space-y-4 p-4'>
      {posts.map((post) => (
        <li class='flex items-baseline gap-4'>
          <comp.Time class='text-sm' date={post.date} />
          <a class='link link-hover link-primary' href={post.url}>
            {post.title}
          </a>
        </li>
      ))}
    </ol>
  );
};
