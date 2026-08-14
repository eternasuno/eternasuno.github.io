export default ({ site }: { site: string }) => (
  <header class='w-full'>
    <div class='mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-8 lg:max-w-4xl lg:py-10'>
      <a
        href='/'
        class='flex items-center gap-2 font-bold text-base-content text-lg tracking-tight transition-colors hover:text-primary sm:text-xl lg:text-2xl'
      >
        <span>{site}</span>
      </a>
      <button
        type='button'
        class='btn btn-ghost btn-sm px-2.5 font-mono text-base-content/70 text-xs hover:text-base-content lg:text-sm'
        aria-label='Search'
        onclick='search_modal.showModal()'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          class='size-4 lg:size-5'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
          />
        </svg>
      </button>
    </div>

    <dialog id='search_modal' class='modal modal-bottom sm:modal-middle backdrop-blur-xs'>
      <div class='modal-box h-[80vh] max-h-[85vh] max-w-xl overflow-y-auto rounded-t-2xl border border-base-content/10 shadow-2xl sm:h-auto sm:rounded-2xl lg:max-w-2xl'>
        <div id='search' />
      </div>
      <form method='dialog' class='modal-backdrop'>
        <button type='submit'>close</button>
      </form>
    </dialog>
  </header>
);
