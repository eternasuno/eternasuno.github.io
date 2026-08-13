export const layout = 'layouts/base.tsx';

export default ({ title, date, children }: Lume.Data) => (
  <article data-pagefind-body>
    <h1 class='mt-8 font-bold text-3xl'>{title || 'Untitled'}</h1>
    <p class='mt-3 text-sm italic opacity-60'>
      <time datetime={date?.toISOString()}>
        {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date)}
      </time>
    </p>
    <div class='prose mt-8 max-w-none prose-pre:overflow-x-auto prose-table:[&_img]:inline-block'>
      {children}
    </div>
  </article>
);
