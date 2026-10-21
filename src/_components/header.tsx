export default ({ site }: { site: string }) => (
  <>
    <header class='sticky top-0 z-50 w-full border-b border-primary/30 bg-base-100/90 backdrop-blur-[0.5rem]'>
      <a
        class='absolute top-2 left-2 z-[60] -translate-y-24 rounded-md bg-base-100 px-3 py-2 focus:translate-y-0'
        href='#main-content'
      >
        Skip to content
      </a>
      <div class='mx-auto flex h-14 max-w-[62.5rem] items-center gap-4 px-4'>
        <a
          class='flex min-w-0 items-center gap-2 text-sm font-semibold hover:text-primary'
          href='/'
        >
          <span class='text-primary' aria-hidden='true'>~/</span>
          <span class='truncate'>{site}</span>
        </a>
        <nav class='ml-auto flex items-center gap-2' aria-label='Main navigation'>
          <button
            type='button'
            class='btn btn-ghost btn-square size-11 border-0 text-base-content/75 hover:bg-primary/10 hover:text-primary'
            aria-label='Search'
            aria-haspopup='dialog'
            aria-controls='search_modal'
            onclick="const dialog = document.getElementById('search_modal'); dialog.showModal(); dialog.querySelector('input')?.focus()"
          >
            <svg
              class='size-[1.125rem]'
              aria-hidden='true'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='1.5'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
              />
            </svg>
          </button>
          <button
            type='button'
            class='btn btn-ghost btn-square size-11 border-0 text-base-content/75 hover:bg-primary/10 hover:text-primary'
            aria-label='Toggle light and dark mode'
            onclick="const root = document.documentElement; const current = root.getAttribute('data-theme'); const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'halloween' : 'light'; const theme = current || systemTheme; root.setAttribute('data-theme', theme === 'halloween' ? 'light' : 'halloween')"
          >
            <svg
              class='size-[1.125rem]'
              aria-hidden='true'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='1.5'
            >
              <circle cx='12' cy='12' r='4' />
              <path
                stroke-linecap='round'
                d='M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42'
              />
            </svg>
          </button>
          <a
            class='btn btn-ghost btn-square size-11 border-0 text-base-content/75 hover:bg-primary/10 hover:text-primary'
            href='/rss.xml'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='RSS feed'
          >
            <svg
              class='size-[1.125rem]'
              aria-hidden='true'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='1.5'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M5 19a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z'
              />
              <path stroke-linecap='round' stroke-linejoin='round' d='M4 11a9 9 0 0 1 9 9' />
              <path stroke-linecap='round' stroke-linejoin='round' d='M4 4a16 16 0 0 1 16 16' />
            </svg>
          </a>
        </nav>
      </div>
    </header>
    <dialog
      id='search_modal'
      class='modal'
      aria-labelledby='search-title'
    >
      <div class='modal-box terminal-search-dialog'>
        <h2 class='sr-only' id='search-title'>Search</h2>
        <div class='flex items-center justify-between border-b border-primary/25 px-4 py-2'>
          <span class='text-xs text-base-content/75' aria-hidden='true'>SEARCH / posts</span>
          <form method='dialog'>
            <button class='btn btn-ghost btn-sm min-h-11 gap-2' aria-label='Close search'>
              <span class='text-xs'>Esc</span>
              <span aria-hidden='true'>×</span>
            </button>
          </form>
        </div>
        <div class='relative'>
          <span class='terminal-search-prefix' aria-hidden='true'>
            <span class='terminal-prompt'>$</span>{' '}
            <span class='terminal-search-command'>find . -name</span>
          </span>
          <div id='search'></div>
        </div>
        <p class='terminal-search-empty'>输入关键词，搜索文章内容。</p>
      </div>
      <form method='dialog' class='modal-backdrop'>
        <button type='submit'>Close search</button>
      </form>
    </dialog>
  </>
);
