export default ({ author, description, search, comp }: Lume.Data) => {
  const posts = search.pages('url^=/posts/', 'date=desc');

  return (
    <>
      <div class='grid-row-2 grid gap-8 bg-primary p-6 pb-8 text-primary-content sm:grid-cols-2'>
        <h1 class='font-black text-4xl tracking-tight sm:col-span-2 sm:text-6xl lg:text-8xl'>
          {author}
        </h1>
        <p class='hidden font-light italic leading-relaxed opacity-90 sm:block md:text-xl'>
          {description}
        </p>
        <a
          rel='noopener noreferrer'
          target='_blank'
          href={`https://github.com/${author}`}
          class='justify-self-end-safe cursor-pointer border p-2 font-bold text-sm uppercase tracking-widest hover:bg-base-100 hover:text-base-content'
        >
          Github
        </a>
      </div>

      <ol class='grid grid-flow-row divide-y sm:grid-cols-[minmax(auto,12rem)_1fr]'>
        {posts.map((post) => (
          <li class='row-span-4 grid grid-cols-subgrid grid-rows-subgrid gap-y-2 py-4 sm:col-span-2 sm:row-span-3 sm:gap-y-4 sm:py-8'>
            <comp.Time
              class='self-center font-mono text-sm tracking-widest opacity-60'
              date={post.date}
            />
            <h2 class='peer font-bold text-3xl tracking-tight sm:text-4xl'>
              <a rel='noopener noreferrer' href={post.url}>
                {post.title}
              </a>
            </h2>
            <p class='font-mono sm:col-start-2'>{post.description}</p>
            <a
              rel='noopener noreferrer'
              class="justify-self-start font-bold text-md tracking-wide after:inline-block after:translate-x-1 after:content-['→'] hover:after:translate-x-4 peer-hover:after:translate-x-4 motion-safe:after:transition-transform sm:col-start-2"
              href={post.url}
            >
              Read more
            </a>
          </li>
        ))}
      </ol>
    </>
  );
};
