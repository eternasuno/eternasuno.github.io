export const layout = 'layouts/base.tsx';

export default ({ children, title }: Lume.Data) => (
  <div class='m-4 space-y-10' data-pagefind-body>
    <h1 class='text-4xl leading-tight'>{title}</h1>
    <article class='prose max-w-none'>
      {children}
    </article>
  </div>
);
