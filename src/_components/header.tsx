export default ({ site }: { site: string }) => (
  <header>
    <div class='mx-auto flex w-full max-w-160 items-center justify-between p-6'>
      <a href='/' class='font-bold text-xl hover:opacity-80'>
        {site}
      </a>
      <button
        type='button'
        class='btn btn-ghost btn-square'
        aria-label='search'
        onclick='search_modal.showModal()'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          class='size-5'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
          />
        </svg>
      </button>
    </div>

    <dialog id='search_modal' class='modal modal-bottom sm:modal-middle'>
      <div class='modal-box h-2/3 overflow-y-auto'>
        <div id='search' />
      </div>
      <form method='dialog' class='modal-backdrop'>
        <button type='submit'>close</button>
      </form>
    </dialog>
  </header>
);
