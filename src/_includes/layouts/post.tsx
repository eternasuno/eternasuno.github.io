export const layout = 'layouts/base.tsx';

export default ({ title, date, tags, description, author, readingInfo, children }: Lume.Data) => {
  const formattedDate = date
    ? new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date))
    : '';

  return (
    <article class='terminal-window'>
      <header class='terminal-titlebar'>
        <div class='terminal-buttons' aria-hidden='true'>
          <span class='terminal-dot bg-error'></span>
          <span class='terminal-dot bg-warning'></span>
          <span class='terminal-dot bg-success'></span>
        </div>
        <p class='terminal-title' aria-label='Terminal command'>
          <span class='terminal-path'>~/blog</span>{' '}
          <span class='terminal-prompt'>$</span> <span class='terminal-cmd'>cd /posts</span>
          <span class='terminal-cursor' aria-hidden='true'></span>
        </p>
      </header>
      <div class='terminal-body'>
        <header class='terminal-output-header' data-pagefind-body>
          <h1 id='article-title' class='terminal-main-title'>{title || 'Untitled'}</h1>
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
        <div class='prose max-w-none font-sans wrap-anywhere' data-pagefind-body>{children}</div>
        <footer class='terminal-footer'>
          <div class='terminal-footer-line'>
            <span class='terminal-prompt'>$</span>{' '}
            <span>echo &quot;Maintained by {author}&quot;</span>
          </div>
          <div class='terminal-footer-output'>
            Maintained by <a class='link link-hover' href='/'>{author}</a>
          </div>
          <div class='terminal-status-bar'>
            <span class='terminal-status-item'>NORMAL</span>
            {readingInfo && (
              <span class='terminal-status-item'>
                words: {readingInfo.words.toLocaleString('en-US')}
              </span>
            )}
            <span class='terminal-status-item terminal-status-right'>EOF</span>
          </div>
        </footer>
      </div>
      <a
        id='back-to-top'
        href='#top'
        aria-label='Back to top'
        class='btn btn-primary btn-outline btn-square btn-sm fixed bottom-5 right-5 z-40 text-xl shadow-md sm:btn-lg sm:text-2xl'
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
    </article>
  );
};
