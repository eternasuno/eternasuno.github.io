export default ({ search, comp }: Lume.Data) => {
  const posts = search.pages('url^=/posts/', 'date=desc');

  return (
    <div class="py-6">
      {posts.map((post, i) => {
        if (i === 0) {
          // Featured post
          return (
            <div class="py-3">
              <div class="text-sm text-[#7aa2e7] mb-1">
                <comp.Time date={post.date} />
              </div>
              <a
                href={post.url}
                class="text-4xl text-[#c8d6e5] hover:text-white transition-colors leading-tight"
              >
                {post.title}
              </a>
            </div>
          );
        }
        // Normal post
        return (
          <div class="flex items-center gap-4 py-1.5">
            <span class="text-sm text-[#7aa2e7] shrink-0">
              <comp.Time date={post.date} />
            </span>
            <a
              href={post.url}
              class="text-sm text-[#c8d6e5] hover:text-white transition-colors"
            >
              {post.title}
            </a>
          </div>
        );
      })}
      <hr class="border-[#1e2a3a] my-8" />
    </div>
  );
};
