import ArticleBody from '../../_components/article-body.tsx';
import TerminalHeading from '../../_components/terminal-heading.tsx';
import Terminal from '../../_components/terminal.tsx';
import TerminalFooter from '../../_components/terminal-footer.tsx';
import TerminalStatus from '../../_components/terminal-status.tsx';

export const layout = 'layouts/base.tsx';

export default (
  { title, date, tags, description, author, readingInfo, children, terminalHost, page }: Lume.Data,
) => {
  const formattedDate = date
    ? new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date))
    : '';

  const filename = page.sourcePath.split('/').pop();

  return (
    <Terminal user={author} host={terminalHost} path='~/posts' command={`cat ${filename}`}>
      <a
        href='/'
        class='mb-6 inline-flex min-h-11 items-center gap-2 text-sm text-info hover:underline'
      >
        <span aria-hidden='true'>←</span> cd .. / 全部文章
      </a>
      <header class='mb-8 border-b border-primary/30 pb-6' data-pagefind-body>
        <TerminalHeading id='article-title'>{title || 'Untitled'}</TerminalHeading>
        {description && <p class='mt-3 text-base-content/70'>{description}</p>}
        <div class='mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-base-content/65'>
          {formattedDate && <time datetime={new Date(date).toISOString()}>{formattedDate}</time>}
          {readingInfo && (
            <span data-pagefind-ignore>
              {readingInfo.words.toLocaleString('en-US')} words · {readingInfo.minutes} min read
            </span>
          )}
        </div>
        {Array.isArray(tags) && tags.length > 0 && (
          <div class='mt-3 flex flex-wrap gap-2'>
            {tags.map((tag: string) => (
              <span class='badge badge-soft badge-sm' key={tag}>#{tag}</span>
            ))}
          </div>
        )}
      </header>
      <ArticleBody>{children}</ArticleBody>
      <TerminalFooter host={terminalHost} author={author} path='~/posts' />
      <TerminalStatus>
        {readingInfo && `words: ${readingInfo.words.toLocaleString('en-US')}`}
      </TerminalStatus>
      <a
        id='back-to-top'
        href='#top'
        aria-label='Back to top'
        class='[&[hidden]]:hidden! btn btn-primary btn-outline btn-square btn-sm fixed bottom-5 right-5 z-40 text-xl shadow-md sm:btn-lg sm:text-2xl'
        hidden
      >
        ↑
      </a>
      <script
        dangerouslySetInnerHTML={{
          __html: `const articleTitle = document.getElementById('article-title');
const backToTop = document.getElementById('back-to-top');
const headerHeight = document.querySelector('body > header').getBoundingClientRect().height;
new IntersectionObserver(([entry]) => {
  backToTop.hidden = entry.isIntersecting || entry.boundingClientRect.bottom > (entry.rootBounds?.top ?? 0);
}, { rootMargin: '-' + headerHeight + 'px 0px 0px 0px' }).observe(articleTitle);`,
        }}
      />
    </Terminal>
  );
};
