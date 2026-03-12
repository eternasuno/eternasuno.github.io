export default () => (
  <header class='sticky top-0 z-30 border-b-2 border-base-content/80 bg-base-200/95 backdrop-blur'>
    <nav class='mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6'>
      <a class='news-title text-3xl leading-none md:text-4xl' href='/'>
        eternasuno
      </a>
      <div class='flex items-center gap-3 text-sm font-semibold uppercase tracking-wider'>
        <div class='join'>
          <label class='swap join-item cursor-pointer border border-base-content/60 bg-base-100 px-2 py-1 text-[11px] leading-none'>
            <input
              aria-label='Light'
              class='theme-controller sr-only'
              type='radio'
              name='theme-toggle'
              value='newsprint'
              checked
            />
            <span class='swap-off inline-flex items-center gap-1 text-base-content/55'>
              <span class='inline-block h-1.5 w-1.5 rounded-full border border-base-content/55'>
              </span>
              Light
            </span>
            <span class='swap-on inline-flex items-center gap-1 text-base-content'>
              <span class='inline-block h-1.5 w-1.5 rounded-full bg-base-content'></span>
              Light
            </span>
          </label>
          <label class='swap join-item cursor-pointer border border-base-content/60 bg-base-100 px-2 py-1 text-[11px] leading-none'>
            <input
              aria-label='Dark'
              class='theme-controller sr-only'
              type='radio'
              name='theme-toggle'
              value='newsprint-night'
            />
            <span class='swap-off inline-flex items-center gap-1 text-base-content/55'>
              <span class='inline-block h-1.5 w-1.5 rounded-full border border-base-content/55'>
              </span>
              Dark
            </span>
            <span class='swap-on inline-flex items-center gap-1 text-base-content'>
              <span class='inline-block h-1.5 w-1.5 rounded-full bg-base-content'></span>
              Dark
            </span>
          </label>
        </div>
        <a class='border-b border-base-content/60 pb-1 hover:text-base-content/80' href='/rss.xml'>
          RSS
        </a>
      </div>
    </nav>
  </header>
);
