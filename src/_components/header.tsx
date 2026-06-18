export default ({ title }: { title: string }) => (
  <header class='my-4 space-y-2'>
    <a href='/' rel='noopener noreferrer'>
      <h2 class='font-bold text-2xl tracking-tighter'>{title}</h2>
    </a>
    <nav class='text-primary'>
      <p class='flex gap-2'>
        <a href='/' class='link link-hover'>home</a>
        <button type='button' class='link link-hover' onclick='searchModal.showModal()'>
          search
        </button>
        <a href='/rss.xml' rel='noopener noreferrer' target='_blank' class='link link-hover'>
          rss
        </a>
      </p>
    </nav>
    <dialog id='searchModal' class='modal modal-bottom sm:modal-middle'>
      <div class='modal-box min-h-50'>
        <div id='search' />
      </div>
      <form method='dialog' class='modal-backdrop'>
        <button type='submit'>close</button>
      </form>
    </dialog>
  </header>
);
