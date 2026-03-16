export default ({ search, comp }: Lume.Data) => {
  const posts = search.pages('url^=/posts/', 'date=desc');

  return (
    <>
      <ol class='font-mono text-lg'>
        {posts.map((post) => (
          <li key={post.url} class='flex gap-4'>
            <comp.Time date={post.date} />
            <a href={post.url} class='hover:underline'>{post.title}</a>
          </li>
        ))}
      </ol>
    </>
  );
};
