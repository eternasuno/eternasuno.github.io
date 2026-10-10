import Terminal from './_components/terminal.tsx';
import TerminalFooter from './_components/terminal-footer.tsx';
import TerminalStatus from './_components/terminal-status.tsx';
import TerminalCommand from './_components/terminal-command.tsx';

export default ({ search, author, terminalHost }: Lume.Data) => {
  const posts = search.pages('url^=/posts/', 'date=desc');

  return (
    <Terminal user={author} host={terminalHost} path='~' command='ls -la ./posts/ | more'>
      <header class='terminal-output-header'>
        <h1 class='terminal-main-title'>文章</h1>
      </header>
      <nav class='terminal-toc' aria-label='Listing'>
        <div class='terminal-toc-header'>
          <TerminalCommand
            user={author}
            host={terminalHost}
            path='~'
            command='ls -la ./posts/ | more'
          />
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
      <TerminalFooter host={terminalHost} author={author} path='~' />
      <TerminalStatus>posts: {posts.length}</TerminalStatus>
    </Terminal>
  );
};
