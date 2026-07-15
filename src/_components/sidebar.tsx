export default ({ search, title, metas, url }: Lume.Data) => {
  const posts = search.pages('url^=/posts/', 'date=desc');
  const tags = [...new Set(posts.flatMap((post: any) => post.tags || []))].sort();

  const yearMap = new Map<number, number>();
  posts.forEach((post: any) => {
    const year = post.date.getFullYear();
    yearMap.set(year, (yearMap.get(year) || 0) + 1);
  });
  const yearArchives = [...yearMap.entries()].sort((a, b) => b[0] - a[0]);

  const siteTitle = metas?.site || title || "Blog";
  const isPost = url?.startsWith('/posts/');
  const pageTitle = isPost ? title : undefined;

  return (
    <div class="space-y-8">
      {/* Site title */}
      <a
        href="/"
        class={`block tracking-tight hover:opacity-60 transition-opacity ${pageTitle ? 'text-lg font-semibold' : 'text-3xl font-bold'}`}
      >
        {siteTitle}
      </a>

      {/* Post title (post mode only) */}
      {pageTitle && (
        <h1 class="text-3xl font-bold leading-tight tracking-tight">
          {pageTitle}
        </h1>
      )}

      {/* Navigation */}
      <nav class="flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <a href="/" class="hover:underline decoration-[#b8b0a4] hover:decoration-[#2a2a2a] underline-offset-[0.2em]">
          home
        </a>
        <button
          type="button"
          class="hover:underline decoration-[#b8b0a4] hover:decoration-[#2a2a2a] underline-offset-[0.2em] cursor-pointer bg-transparent border-0 p-0 text-inherit"
          onclick="searchModal.showModal()"
        >
          search
        </button>
        <a
          href="/rss.xml"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:underline decoration-[#b8b0a4] hover:decoration-[#2a2a2a] underline-offset-[0.2em]"
        >
          rss
        </a>
      </nav>

      {/* Tag cloud (homepage only) */}
      {!pageTitle && tags.length > 0 && (
        <div class="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span class="text-xs text-[#6b6560] bg-[#d0c8bc] px-2 py-0.5 rounded-sm">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Year archives (homepage only) */}
      {!pageTitle && yearArchives.length > 0 && (
        <div class="space-y-1">
          {yearArchives.map(([year, count]) => (
            <div class="text-sm text-[#6b6560]">
              {year} ({count})
            </div>
          ))}
        </div>
      )}

      {/* Search modal */}
      <dialog
        id="searchModal"
        class="bg-[#ddd5c8] border border-[#b8b0a4] shadow-2xl p-0 w-[90vw] max-w-2xl"
      >
        <div class="p-6">
          <div id="search" />
        </div>
        <div class="p-4 border-t border-[#b8b0a4] text-right">
          <button
            type="button"
            onclick="searchModal.close()"
            class="text-sm text-[#6b6560] hover:text-[#2a2a2a] cursor-pointer bg-transparent border-0"
          >
            close
          </button>
        </div>
      </dialog>
    </div>
  );
};
