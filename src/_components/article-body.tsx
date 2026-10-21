export default ({ children }: { children: Lume.Data['children'] }) => (
  <div
    class='prose mx-auto max-w-prose font-sans leading-loose wrap-anywhere prose-headings:scroll-mt-20 prose-h2:tracking-tight prose-h3:tracking-tight prose-pre:rounded-lg prose-pre:border prose-pre:border-primary/20 prose-figcaption:mt-4 prose-figcaption:text-center [&_[id]]:scroll-mt-20 [&_table]:block [&_table]:overflow-x-auto [&_table_img]:inline-block [&_figure]:grid [&_figure]:place-items-center [&_math_mtable]:border-spacing-4'
    data-pagefind-body
  >
    {children}
  </div>
);
