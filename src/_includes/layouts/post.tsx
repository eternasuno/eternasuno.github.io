export const layout = 'layouts/base.tsx';

const BackBtn = () => (
  <a
    href='/'
    class='group inline-flex shrink-0 items-center gap-1.5 font-mono text-base-content/60 text-xs transition-colors hover:text-base-content lg:text-sm'
  >
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      class='mb-1 size-3.5 shrink-0 transition-transform group-hover:-translate-x-0.5 lg:size-4'
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18'
      />
    </svg>
    <span>Back to Posts</span>
  </a>
);

const TopBtn = () => (
  <a
    href='#top'
    class='group inline-flex items-center gap-1.5 transition-colors hover:text-base-content'
  >
    <span>Back to Top</span>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      class='mb-1 size-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 lg:size-4'
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18'
      />
    </svg>
  </a>
);

export default ({ title, date, tags, description, children }: Lume.Data) => {
  const formattedDate = date
    ? new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date))
    : '';

  return (
    <article data-pagefind-body class='space-y-8 lg:space-y-10'>
      <header class='space-y-4 lg:space-y-5'>
        <BackBtn />

        <h1 class='font-bold text-2xl text-base-content leading-tight tracking-tight sm:text-3xl lg:text-4xl'>
          {title || 'Untitled'}
        </h1>

        {description && (
          <p class='max-w-2xl text-base-content/70 text-sm leading-relaxed sm:text-base lg:text-lg'>
            {description}
          </p>
        )}

        <div class='flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 font-mono text-base-content/60 text-xs lg:text-sm'>
          {formattedDate && (
            <time datetime={date ? new Date(date).toISOString() : undefined}>
              {formattedDate}
            </time>
          )}
          {tags && Array.isArray(tags) && tags.length > 0 && (
            <div class='flex flex-wrap gap-1.5 font-sans sm:ml-auto'>
              {tags.map((tag: string) => (
                <span key={tag} class='badge badge-soft badge-xs font-normal'>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <hr class='border-base-content/20 border-dashed pt-2' />
      </header>

      <div class='prose max-w-none text-base text-base-content/90 leading-[1.8] lg:text-lg lg:leading-[1.85]'>
        {children}
      </div>

      <footer class='mt-16 flex items-center justify-between border-base-content/20 border-dashed border-t pt-8 font-mono text-base-content/50 text-xs lg:mt-20 lg:text-sm'>
        <BackBtn />
        <TopBtn />
      </footer>
    </article>
  );
};
