export default ({ title }: { title: string }) => (
  <header class='my-4 space-y-4'>
    <a
      class="inline-block font-bold text-2xl tracking-tighter before:pr-2 before:content-['ヽ(゜∇゜)ノ']"
      href='/'
      rel='noopener noreferrer'
    >
      {title}
    </a>
    <nav class='flex gap-2 text-primary text-xl'>
      <button type='button' class='link link-hover' onclick='searchModal.showModal()'>
        search
      </button>
      <a href='/rss.xml' rel='noopener noreferrer' target='_blank' class='link link-hover'>rss</a>
      <dialog id='searchModal' class='modal modal-bottom sm:modal-middle'>
        <div class='modal-box min-h-50'>
          <div id='search' />
        </div>
        <form method='dialog' class='modal-backdrop'>
          <button type='submit'>close</button>
        </form>
      </dialog>
    </nav>
  </header>
);
