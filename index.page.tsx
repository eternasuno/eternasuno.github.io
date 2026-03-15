export default (data: Lume.Data) => {
  const posts = data.search.pages('url^=/posts/');

  return (
    <ol>
      {posts.map((post) => (
        <li key={post.url}>
          <a href={post.url}>{post.title}</a>
        </li>
      ))}
    </ol>
  );
};
