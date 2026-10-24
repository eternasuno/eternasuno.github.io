export default ({ children }: { children?: Lume.Data['children'] }) => (
  <div
    class='flex flex-wrap overflow-hidden rounded-md border border-primary/30 bg-base-200 text-xs leading-relaxed'
    aria-label='Terminal status'
    data-pagefind-ignore
  >
    <span class="border-primary/30 border-r bg-primary px-3 py-1 font-semibold text-primary-content">
      NORMAL
    </span>
    {children && (
      <span class="border-primary/30 border-r px-3 py-1 text-base-content/75">
        {children}
      </span>
    )}
    <span class='ml-auto border-l border-primary/30 px-3 py-1 text-success max-lg:shrink-0 max-lg:px-2'>
      EOF
    </span>
  </div>
);
