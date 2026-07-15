export default ({ search, comp }: Lume.Data) => {
  const posts = search.pages('url^=/posts/', 'date=desc');

  return (
    <ul>
      {posts.map((post) => (
        <li class="py-4 border-b border-[#b8b0a4]">
          <div class="flex items-baseline gap-4">
            <span class="text-sm text-[#6b6560] shrink-0 w-14">
              <comp.Time date={post.date} />
            </span>
            <a
              href={post.url}
              class="font-medium hover:underline decoration-[#b8b0a4] hover:decoration-[#2a2a2a] underline-offset-[0.2em] flex-1"
            >
              {post.title}
            </a>
            {post.tags && post.tags.length > 0 && (
              <span class="text-sm text-[#6b6560] shrink-0 hidden sm:inline">
                {post.tags.join(" · ")}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
