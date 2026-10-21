export default () => (
  <dialog
    id='search_modal'
    class='group fixed inset-0 m-0 h-full max-h-none w-full max-w-none grid-cols-1 grid-rows-[100%] justify-items-center overflow-hidden overscroll-contain border-0 bg-transparent p-0 text-inherit backdrop:bg-neutral/72 open:grid'
    aria-labelledby='search-title'
  >
    <div class='z-1 col-start-1 row-start-1 mt-[12vh] max-h-[76vh] w-[min(40rem,92vw)] max-w-none self-start overflow-hidden rounded-xl border border-primary/40 bg-base-100 p-0 shadow-2xl shadow-primary/40'>
      <h2 class='sr-only' id='search-title'>Search</h2>
      <div class='border-b border-primary/25 px-4 py-3'>
        <span class='text-base-content/75 text-xs' aria-hidden='true'>SEARCH / posts</span>
      </div>
      <div class='relative'>
        <span
          class='pointer-events-none absolute top-3 left-4 z-1 font-mono text-base/7 text-base-content/75'
          aria-hidden='true'
        >
          <span class='text-success'>$</span> <span class='max-sm:hidden'>find . -name</span>
        </span>
        <div id='search' class='relative'></div>
      </div>
      <p class='m-0 px-4 py-6 text-center font-mono text-sm text-base-content/75 leading-normal group-has-[input:not(:placeholder-shown)]:hidden'>
        输入关键词，搜索文章内容。
      </p>
    </div>
    <form method='dialog' class='absolute inset-0 col-start-1 row-start-1 h-full w-full'>
      <button type='submit' class='h-full w-full cursor-pointer'>
        <span class='sr-only'>Close search</span>
      </button>
    </form>
  </dialog>
);
