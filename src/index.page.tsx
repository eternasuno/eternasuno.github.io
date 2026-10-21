import TerminalHeading from './_components/terminal-heading.tsx';
import Terminal from './_components/terminal.tsx';
import TerminalFooter from './_components/terminal-footer.tsx';
import TerminalStatus from './_components/terminal-status.tsx';

export default ({ search, author, terminalHost }: Lume.Data) => {
  const posts = search.pages('url^=/posts/', 'date=desc');

  return (
    <Terminal user={author} host={terminalHost} path='~' command='ls -la ./posts/ | more'>
      <header class='mb-8 border-b border-primary/30 pb-6'>
        <p class='mb-3 text-xs tracking-widest text-info' aria-hidden='true'>~/posts/</p>
        <div class='flex flex-wrap items-end justify-between gap-3'>
          <TerminalHeading>文章</TerminalHeading>
          <p class='text-sm text-base-content/75'>{posts.length} posts · newest first</p>
        </div>
      </header>
      <nav class='mb-8' aria-label='Listing'>
        <div
          class='mb-2 flex gap-4 border-b border-primary/30 px-3 pb-3 text-sm leading-relaxed text-info max-lg:hidden'
          aria-hidden='true'
        >
          <span class='w-24 shrink-0 text-base-content/75'>mode</span>
          <span class='w-20 shrink-0 text-right text-primary'>字数</span>
          <span class='w-28 shrink-0 text-base-content/75'>published</span>
          <span>name</span>
        </div>
        <ul class='m-0 list-none p-0 text-sm leading-relaxed'>
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
                  class='flex items-baseline gap-4 rounded-none border-b border-l-2 border-b-primary/12 border-l-transparent px-3 py-4 wrap-anywhere hover:border-l-primary hover:bg-primary/8 focus-visible:border-l-primary focus-visible:bg-primary/8 max-lg:grid max-lg:grid-cols-[auto_1fr] max-lg:gap-y-1.5'
                  href={url}
                  aria-label={`${
                    title || 'Untitled'
                  }, published ${formattedDate}, ${wordCount} 字`}
                >
                  <span
                    class='inline-block w-24 shrink-0 text-base-content/75 max-lg:hidden'
                    aria-hidden='true'
                  >
                    -rw-r--r--
                  </span>
                  <span
                    class='inline-block w-20 shrink-0 text-right text-primary max-lg:w-auto max-lg:text-left max-lg:text-base-content/75'
                    aria-hidden='true'
                  >
                    {wordCount}字
                  </span>
                  <time
                    class='inline-block w-28 shrink-0 text-base-content/75 max-lg:text-right'
                    datetime={postDate.toISOString()}
                  >
                    {formattedDate}
                  </time>
                  <span class='min-w-0 font-semibold text-primary max-lg:col-span-full max-lg:text-base'>
                    {title || 'Untitled'}
                    <span aria-hidden='true'>/</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        <div class='mt-6 flex flex-wrap justify-between gap-x-4 gap-y-2 border-t border-dashed border-primary/30 pt-3 text-xs leading-relaxed text-base-content/75'>
          <span class='flex items-center gap-1.5'>
            <span class='font-semibold text-primary'>--More--</span>
            <span class='text-success'>(100%)</span>
          </span>
          <span class='text-base-content/75'>end of listing</span>
        </div>
      </nav>
      <TerminalFooter host={terminalHost} author={author} path='~' />
      <TerminalStatus>posts: {posts.length}</TerminalStatus>
    </Terminal>
  );
};
