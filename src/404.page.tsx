export default () => (
  <div class='flex flex-col items-center justify-center gap-6 py-20 text-center'>
    <div class='space-y-2'>
      <p class='font-bold font-mono text-6xl text-base-content/20 tracking-tighter sm:text-7xl'>
        404
      </p>
      <p class='font-mono text-2xl text-base-content/80'>ʕノ•ᴥ•ʔノ ︵ ┻━┻</p>
    </div>
    <p class='max-w-sm text-base-content/60 text-sm sm:text-base'>
      Page not found. It may have been moved or deleted.
    </p>
    <a
      href='/'
      class='btn btn-ghost btn-sm mt-2 font-mono text-xs'
    >
      Back to Home
    </a>
  </div>
);
