export default ({ search, comp }: Lume.Data) => {
  const posts = search.pages('url^=/posts/', 'date=desc');

  return (
    <>
      <ul class='space-y-2'>
        {posts.map((post) => (
          <li>
            <span>
              <i>
                <comp.Time date={post.date} />
              </i>
            </span>{' '}
            <a class='link link-hover' href={post.url}>{post.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
};
