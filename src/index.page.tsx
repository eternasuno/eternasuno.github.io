export default ({ search, description }: Lume.Data) => {
  const posts = search.pages('url^=/posts/', 'date=desc');

  return (
    <div class='space-y-12 lg:space-y-16'>
      {description && (
        <p class='max-w-2xl text-base-content/75 text-sm leading-relaxed sm:text-base lg:text-lg'>
          {description}
        </p>
      )}

      <section class='space-y-6 lg:space-y-8'>
        <div class='flex items-center justify-between border-b border-base-content/20 border-dashed pb-2.5'>
          <h2 class='font-bold text-base text-base-content tracking-tight sm:text-lg lg:text-xl'>
            All Posts
          </h2>
          <span class='font-mono text-base-content/50 text-xs lg:text-sm'>
            {posts.length} posts
          </span>
        </div>

        <ul class='space-y-6 sm:space-y-8 lg:space-y-10'>
          {posts.map(({ date, url, title, description: postDesc, tags }) => {
            const d = date ? new Date(date) : new Date();
            const formattedDate = new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(d);

            return (
              <li key={url} class='group space-y-2'>
                <a
                  href={url}
                  class='block font-semibold text-base text-primary leading-snug decoration-dashed underline-offset-4 transition-all group-hover:underline sm:text-lg lg:text-xl'
                >
                  {title || 'Untitled'}
                </a>

                <div class='flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-base-content/60 text-xs lg:text-sm'>
                  <time datetime={d.toISOString()} class='inline-flex items-center gap-1.5'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      class='size-3.5 opacity-70 lg:size-4'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z'
                        clip-rule='evenodd'
                      />
                    </svg>
                    <span>{formattedDate}</span>
                  </time>
                  {tags && Array.isArray(tags) && tags.length > 0 && (
                    <div class='flex flex-wrap gap-1.5 font-sans sm:ml-auto'>
                      {tags.map((tag: string) => (
                        <span
                          key={tag}
                          class='text-base-content/60 text-xs underline decoration-dashed transition-colors hover:text-base-content'
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {postDesc && (
                  <p class='line-clamp-2 pt-0.5 text-base-content/70 text-sm leading-relaxed lg:text-base'>
                    {postDesc}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};
