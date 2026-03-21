export default ({ author }: { author: string }) => (
  <header class='flex min-h-16 items-stretch justify-between border-b'>
    <a
      href='/'
      rel='noopener noreferrer'
      class='center cursor-pointer border-r px-6 font-bold text-lg italic'
    >
      {author}
    </a>

    <nav class='hidden divide-x border-l sm:inline-flex'>
      <button
        type='button'
        onclick='searchModal.showModal()'
        class='btn-negative center px-6'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          class='size-6'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
          />
        </svg>
      </button>
      <a
        href='/rss.xml'
        rel='noopener noreferrer'
        target='_blank'
        class='btn-negative center px-6'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          class='size-6'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M12.75 19.5v-.75a7.5 7.5 0 0 0-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
          />
        </svg>
      </a>
    </nav>

    <span class='dropdown dropdown-end border-l sm:hidden'>
      <span
        tabindex='0'
        role='button'
        class='btn-negative center h-full px-6'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          class='size-6'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25'
          />
        </svg>
      </span>
      <ul
        tabindex='-1'
        class='dropdown-content w-max min-w-50 divide-y border bg-base-100 text-center'
      >
        <li class='grid'>
          <button type='button' class='btn-negative px-6 py-4' onclick='searchModal.showModal()'>
            Search
          </button>
        </li>
        <li class='grid'>
          <a
            role='link'
            href='/rss.xml'
            rel='noopener noreferrer'
            target='_blank'
            class='btn-negative px-6 py-4'
          >
            Rss
          </a>
        </li>
      </ul>
    </span>

    <dialog id='searchModal' class='modal modal-bottom sm:modal-middle'>
      <div class='modal-box min-h-50 border'>
        <div id='search' />
      </div>
      <form method='dialog' class='modal-backdrop'>
        <button type='submit'>close</button>
      </form>
    </dialog>
  </header>
);
