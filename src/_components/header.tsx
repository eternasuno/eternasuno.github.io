export default ({ site }: { site: string }) => (
  <header class='navbar'>
    <div class='flex-1'>
      <a href='/' class='link text-2xl no-underline'>{site}</a>
    </div>
    <div class='space-x-4'>
      <button
        type='button'
        class='btn btn-ghost btn-primary btn-square'
        onclick='search_modal.showModal()'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          class='size-6'
        >
          <path
            fill-rule='evenodd'
            d='M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z'
            clip-rule='evenodd'
          />
        </svg>
      </button>
      <dialog id='search_modal' class='modal modal-bottom sm:modal-middle'>
        <div class='modal-box min-h-64 sm:min-h-auto'>
          <div id='search' />
        </div>
        <form method='dialog' class='modal-backdrop'>
          <button type='submit'>close</button>
        </form>
      </dialog>
      <a target='_blank' class='btn btn-ghost btn-primary btn-square' href='/rss.xml'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          class='size-6'
        >
          <path
            fill-rule='evenodd'
            d='M3.75 4.5a.75.75 0 0 1 .75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 0 1-.75-.75V4.5Zm0 6.75a.75.75 0 0 1 .75-.75h.75a8.25 8.25 0 0 1 8.25 8.25v.75a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75v-.75a6 6 0 0 0-6-6H4.5a.75.75 0 0 1-.75-.75v-.75Zm0 7.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z'
            clip-rule='evenodd'
          />
        </svg>
      </a>
    </div>
  </header>
);
