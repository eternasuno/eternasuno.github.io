export default () => (
  <dialog
    id="searchModal"
    class="bg-[#0f1722] border border-[#1e2a3a] rounded-2xl shadow-2xl p-6 w-[90vw] max-w-[640px] backdrop:bg-black/60"
  >
    <div class="flex items-center justify-between mb-4">
      <span class="text-xl text-white">Search</span>
      <button
        type="button"
        onclick="searchModal.close()"
        class="flex items-center justify-center w-8 h-8 bg-[#1a2332] rounded-md hover:bg-[#2a3a4a] transition-colors cursor-pointer border-0"
        aria-label="Close search"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#7aa2e7"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
    <div id="search" />
    <p class="mt-4 text-sm text-[#3a4a5c]">
      Type to search posts by title, tag, or content
    </p>
  </dialog>
);
