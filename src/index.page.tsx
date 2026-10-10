export default ({ search, author }: Lume.Data) => {
  const posts = search.pages('url^=/posts/', 'date=desc');
  return (
    <article class='terminal-window'>
      <header class='terminal-titlebar'>
        <div class='terminal-buttons' aria-hidden='true'>
          <span class='terminal-dot bg-error'></span>
          <span class='terminal-dot bg-warning'></span>
          <span class='terminal-dot bg-success'></span>
        </div>
        <p class='terminal-title' aria-label='Terminal command'>
          <span class='hidden sm:inline'>
            <span class='terminal-prompt'>{author}@localhost</span>
            <span class='terminal-prompt'>:</span>
          </span>
          <span class='terminal-path'>~/blog</span>{' '}
          <span class='terminal-prompt'>$</span> <span class='terminal-cmd'>cd /posts</span>
          <span class='terminal-cursor' aria-hidden='true'></span>
        </p>
      </header>
      <div class='terminal-body'>
        <header class='terminal-output-header'>
          <h1 class='terminal-main-title'>文章</h1>
        </header>
        <nav class='terminal-toc' aria-label='Listing'>
          <div class='terminal-toc-header'>
            <span class='terminal-prompt'>$</span>{' '}
            <span class='terminal-cmd'>ls -la ./posts/ | more</span>
          </div>
          <p class='terminal-dir-header'>total {posts.length} posts</p>
          <ul class='terminal-dir-listing'>
            {posts.map(({ date, url, title, content }) => {
              const postDate = new Date(date);
              const formattedDate = new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              }).format(postDate).replace(',', '');
              const size = new TextEncoder().encode(content ?? '').length;
              const formattedSize = size >= 1000 ? `${(size / 1000).toFixed(1)}K` : `${size}B`;

              return (
                <li key={url}>
                  <a
                    class='terminal-dir-row'
                    href={url}
                    aria-label={`${
                      title || 'Untitled'
                    }, published ${formattedDate}, article HTML size ${size} bytes`}
                  >
                    <span class='terminal-dir-perm' aria-hidden='true'>-rw-r--r--</span>
                    <span class='terminal-dir-size' aria-hidden='true'>{formattedSize}</span>
                    <time class='terminal-dir-date' datetime={postDate.toISOString()}>
                      {formattedDate}
                    </time>
                    <span class='terminal-dir-name'>
                      {title || 'Untitled'}
                      <span aria-hidden='true'>/</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          <div class='terminal-more'>
            <span class='terminal-more__status'>
              <span class='terminal-more__label'>--More--</span>
              <span class='terminal-more__pct'>(100%)</span>
            </span>
            <span class='terminal-more__hint'>end of listing</span>
          </div>
        </nav>
        <footer class='terminal-footer'>
          <p class='terminal-footer-line'>$ echo "Maintained by {author}"</p>
          <p class='terminal-footer-output'>
            Maintained by <a href='/'>{author}</a>
          </p>
        </footer>
        <div class='terminal-status-bar' aria-label='Terminal status'>
          <span class='terminal-status-item'>NORMAL</span>
          <span class='terminal-status-item'>posts: {posts.length}</span>
          <span class='terminal-status-item terminal-status-right'>EOF</span>
        </div>
      </div>
    </article>
  );
};
