export default ({ title, metas, url }: Lume.Data) => {
  const siteTitle = metas?.site || title || "Blog";

  return (
    <div class="flex items-center justify-between py-6">
      {/* Left: Blog title */}
      <a
        href="/"
        class="text-white text-3xl no-underline hover:opacity-60 transition-opacity"
        style="font-family: 'Noto Sans Mono', monospace;"
      >
        {siteTitle}
      </a>

      {/* Right: RSS + Search */}
      <div class="flex items-center gap-4">
        {/* RSS icon */}
        <a
          href="/rss.xml"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:opacity-60 transition-opacity"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="10"
              cy="10"
              r="8"
              stroke="#7aa2e7"
              stroke-width="2"
            />
            <circle cx="6.5" cy="13.5" r="1.5" fill="#7aa2e7" />
            <path
              d="M6.5 10a4.5 4.5 0 0 1 4.5 4.5"
              stroke="#7aa2e7"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M6.5 6.5a8 8 0 0 1 8 8"
              stroke="#7aa2e7"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </a>

        {/* Search icon */}
        <button
          type="button"
          onclick="searchModal.showModal()"
          class="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-0 p-0"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="8.5"
              cy="8.5"
              r="5.5"
              stroke="#7aa2e7"
              stroke-width="2"
            />
            <line
              x1="12.5"
              y1="12.5"
              x2="17"
              y2="17"
              stroke="#7aa2e7"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
