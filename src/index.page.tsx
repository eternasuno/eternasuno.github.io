import Terminal from './_components/terminal.tsx';
import TerminalFooter from './_components/terminal-footer.tsx';
import TerminalStatus from './_components/terminal-status.tsx';

export default ({ search, author, terminalHost }: Lume.Data) => {
  const posts = search.pages('url^=/posts/', 'date=desc');

  return (
    <Terminal user={author} host={terminalHost} path='~' command='ls -la ./posts/ | more'>
      <header class='terminal-output-header'>
        <p class='mb-3 text-xs tracking-widest text-info' aria-hidden='true'>~/posts/</p>
        <div class='flex flex-wrap items-end justify-between gap-3'>
          <h1 class='terminal-main-title'>文章</h1>
          <p class='text-sm text-base-content/75'>{posts.length} posts · newest first</p>
        </div>
      </header>
      <nav class='terminal-toc' aria-label='Listing'>
        <div class='terminal-dir-header' aria-hidden='true'>
          <span class='terminal-dir-perm'>mode</span>
          <span class='terminal-dir-size'>字数</span>
          <span class='terminal-dir-date'>published</span>
          <span>name</span>
        </div>
        <ul class='terminal-dir-listing'>
          {posts.map(({ date, url, title, wordCount }) => {
            const postDate = new Date(date);
            const formattedDate = new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            }).format(postDate).replace(',', '');

            return (
              <li key={url}>
                <a
                  class='terminal-dir-row'
                  href={url}
                  aria-label={`${
                    title || 'Untitled'
                  }, published ${formattedDate}, ${wordCount} 字`}
                >
                  <span class='terminal-dir-perm' aria-hidden='true'>-rw-r--r--</span>
                  <span class='terminal-dir-size' aria-hidden='true'>{wordCount}字</span>
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
      <TerminalFooter host={terminalHost} author={author} path='~' />
      <TerminalStatus>posts: {posts.length}</TerminalStatus>
    </Terminal>
  );
};
