export const layout = 'layouts/base.tsx';

export default ({ children, title, date, comp }: Lume.Data) => (
  <div data-pagefind-body class='space-y-4'>
    <h1 class='font-bold text-4xl'>{title}</h1>
    <comp.Time date={date} class='text-gray-500 text-sm' />
    <article class='prose max-w-none'>{children}</article>
  </div>
);
