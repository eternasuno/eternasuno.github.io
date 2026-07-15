export const layout = 'layouts/base.tsx';

export default ({ children, title, date, tags, comp }: Lume.Data) => (
  <div data-pagefind-body class="space-y-6">
    <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-[#6b6560]">
      <comp.Time date={date} />
      {tags && tags.length > 0 && (
        <>
          <span>&middot;</span>
          <span>{tags.join(" · ")}</span>
        </>
      )}
    </div>
    <hr class="border-[#b8b0a4]" />
    <article class="prose max-w-none">
      {children}
    </article>
  </div>
);
