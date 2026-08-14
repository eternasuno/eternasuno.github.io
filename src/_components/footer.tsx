export default ({ author }: { author?: string }) => (
  <footer class='w-full'>
    <div class="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-10 font-mono text-base-content/60 text-xs lg:max-w-4xl lg:text-sm">
      <span>
        © {new Date().getFullYear()} {author}
      </span>
      <a
        href='/rss.xml'
        aria-label='RSS'
        target='_blank'
        rel='noopener noreferrer'
        class="uppercase tracking-wider transition-colors hover:text-base-content"
      >
        RSS
      </a>
    </div>
  </footer>
);
