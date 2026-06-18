export default ({ author, search }: { author: string; search: Lume.Search }) => {
  const posts = search.pages('url^=/posts/');
  const tags = [...new Set(posts.flatMap((post: any) => post.tags || []))].sort();

  return (
    <footer class='space-y-2 py-2 text-base-content/75 text-xs'>
      {tags.length > 0 && (
        <p>
          {tags.map((tag, i) => (
            <>
              {i > 0 && ' '}
              <span>#{tag}</span>
            </>
          ))}
        </p>
      )}
      <p>
        Subscribe via{' '}
        <a class='link link-hover' href='/rss.xml' target='_blank' rel='noopener noreferrer'>
          rss
        </a>. © 2026 {author}.
      </p>
    </footer>
  );
};
