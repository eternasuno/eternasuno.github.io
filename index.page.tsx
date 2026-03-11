export default (data: Lume.Data) => {
  const posts = data.search.pages('url^=/posts/');

  return (
    <ol class='prose mx-auto'>
      {posts.map((page) => (
        <li key={page.url}>
          <a href={page.url}>{page.title}</a>
        </li>
      ))}
    </ol>
  );
};
