export const layout = 'layouts/base.tsx';

export default ({ children, title, date, tags, comp }: Lume.Data) => (
  <div data-pagefind-body>
    {/* Post title - 36px white, matching Penpot detail page */}
    <h1 class="text-4xl text-white leading-tight mt-10 mb-2">{title}</h1>

    {/* Date line - 14px muted */}
    <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-[#4a5568] mb-10">
      <comp.Time date={date} />
      {tags && tags.length > 0 && (
        <>
          <span>&middot;</span>
          <span>{tags.join(" · ")}</span>
        </>
      )}
    </div>

    {/* Divider matching the Penpot design */}
    <hr class="border-[#1e2a3a] mb-10" />

    {/* Article content with prose classes */}
    <article class="prose max-w-none pb-10">
      {children}
    </article>
  </div>
);
