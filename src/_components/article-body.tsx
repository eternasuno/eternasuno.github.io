export default ({ children }: { children: Lume.Data['children'] }) => (
  <div
    class='prose wrap-anywhere mx-auto max-w-none font-sans leading-loose prose-figcaption:mt-4 [&_table]:block [&_table_img]:inline-block [&_figure]:grid [&_math_mtable]:border-spacing-4 [&_[id]]:scroll-mt-20 prose-headings:scroll-mt-20 [&_figure]:place-items-center [&_table]:overflow-x-auto prose-pre:rounded-lg prose-pre:border prose-pre:border-primary/20 prose-figcaption:text-center prose-h2:tracking-tight prose-h3:tracking-tight'
    data-pagefind-body
  >
    {children}
  </div>
);
