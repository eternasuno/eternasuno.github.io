export default ({ author }: { author?: string }) => (
  <footer class='mt-auto w-full border-t border-primary/20 bg-base-100'>
    <div class='mx-auto flex max-w-[62.5rem] flex-wrap items-center justify-between gap-2 px-4 py-3 text-xs text-base-content/60'>
      <span>© {new Date().getFullYear()} {author}</span>
      <a
        class='hover:text-primary'
        href='https://creativecommons.org/licenses/by-nc-sa/4.0/'
        rel='license'
        title='Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International'
      >
        CC BY-NC-SA 4.0
      </a>
    </div>
  </footer>
);
