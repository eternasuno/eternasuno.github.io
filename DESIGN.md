# DESIGN.md — Site Design Specification

The current target design is Bear Blog style, modeled after https://herman.bearblog.dev/. The
wireframe is on Excalidraw (http://127.0.0.1:3001 — when the Lume dev server is running on port
3000, start Excalidraw with `EXPRESS_SERVER_URL=http://127.0.0.1:3001`); this file records the
specs the implementation must follow.

## Design Direction

- Bear Blog-style minimalist personal blog: narrow content column, whitespace, plain-text lists, no
  sidebar, no cards.
- The homepage serves as the Archive; there is no separate archive page anymore.
- Use DaisyUI 5 themes `nord` (default) and `dracula` (dark), declared in style.css via
  `@plugin "daisyui" { themes: nord --default, dracula --prefersdark; }`. Do not define new
  themes.
- The theme follows the browser `prefers-color-scheme`; there is no theme toggle button and no
  localStorage theme script.
- System fonts only (`system-ui`, `ui-sans-serif`, `font-mono`); no web fonts.
- All UI copy is **English** (converted from Chinese, 2026-08): homepage "All Posts" heading with
  a "{n} posts" counter, article "Back to Posts"/"Back to Top", 404 message. Post dates render in
  US format via `Intl.DateTimeFormat('en-US', ...)` (e.g. "August 14, 2026"). The `.typ` post
  content itself stays Chinese.
- Main layout is a centered `max-w-3xl` (768px) column, widening to `lg:max-w-4xl` (896px) on
  large screens; horizontal padding is `px-6` (24px on each side).

## Page Structure

### Home `/` (Archive list)

- Header has only the site name on the left and the search button on the right; no Home, Now,
  Projects, Blog or other links.
- Optional site description paragraph from `_data.yml` (`description`) sits at the top of the
  content.
- Then an "All Posts" heading with a "{n} posts" mono counter on the right, separated by a dashed
  bottom border.
- The post list below: each item is a title link (primary, bold) on top, then a mono row with a
  calendar icon + long-form date, `#tag` links, and a line-clamped description. Newest first, no
  pagination.
- Footer on the left has `© {year} {author}` and the "RSS" text link on the right.

### Article `/posts/<slug>/`

- Header is the same as the homepage: site name + search button.
- Content order: Back to Posts link → article title → description → mono date row with tag badges
  (`badge badge-soft badge-xs`) → dashed `hr` → body.
- The body is wrapped in `.prose max-w-none` and keeps the Typst-generated headings, paragraphs,
  images, Shiki-highlighted code blocks, blockquotes, and MathML.
- Bottom row (dashed top border): Back to Posts on the left, Back to Top on the right. The article
  wrapper carries `data-pagefind-body` for search indexing.
- No social links, no pagination; the shared Footer stays at the bottom.

### 404

- Header is the same as the homepage.
- Content: giant mono "404", the kaomoji `ʕノ•ᴥ•ʔノ ︵ ┻━┻`, the message "Page not found. It may
  have been moved or deleted.", and a `btn btn-ghost btn-sm` "Back to Home" link.
- Footer is the same as the homepage.

## Search Modal (global interaction state, not a standalone page)

- The Heroicons `magnifying-glass` button on the right of the Header opens the modal:
  `btn btn-ghost btn-sm px-2.5`, `font-mono text-xs`, `onclick="search_modal.showModal()"`,
  `aria-label="Search"`.
- Uses the DaisyUI dialog modal structure, following the official example:
  https://daisyui.com/components/modal/#dialog-modal-closes-when-clicked-outside
- Target structure:

```html
<dialog id="search_modal" class="modal modal-bottom sm:modal-middle backdrop-blur-xs">
  <div class="modal-box h-[80vh] max-h-[85vh] max-w-xl overflow-y-auto rounded-t-2xl
    border border-base-content/10 shadow-2xl sm:h-auto sm:rounded-2xl lg:max-w-2xl">
    <div id="search"></div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button type="submit">close</button>
  </form>
</dialog>
```

- Clicking the backdrop outside the modal closes it; there is no close button.
- Responsive: `modal modal-bottom sm:modal-middle` — on mobile (<640px) it slides up from the
  bottom as a ~80vh bottom sheet (`rounded-t-2xl`); on desktop (≥sm) it is centered and
  `sm:h-auto` (`max-w-xl`, `lg:max-w-2xl`, `rounded-2xl`).
- The Lume Pagefind plugin automatically looks for `id="search"` and injects the search input,
  results, count, and highlight; no hand-written JSON index or client search script.
- `#search` must be a `<div>` container, not an `<input>`: PagefindUI mounts its whole UI inside
  the container, and a void `input` element does not render children.
- Because the modal lives in the global Header/Base layout, search can be opened from every page.
- `#search` styling comes from Pagefind CSS vars (`--pagefind-ui-*`) defined in style.css,
  mapped to DaisyUI theme colors.

## Header and Footer

### Header

- Inside the content column (`max-w-3xl lg:max-w-4xl`, `px-6`, `py-8 lg:py-10`): site-name link on
  the left, search button on the right.
- No theme button, archive button, or other navigation links.
- The search icon uses the Heroicons outline `magnifying-glass` (`size-4 lg:size-5`).

### Footer

- Inside the content column (`max-w-3xl lg:max-w-4xl`, `px-6`, `py-10`): `© {year} {author}` on
  the left; on the right an "RSS" text link (`font-mono` uppercase) to `/rss.xml`.
- The RSS link must open in a new window: `target="_blank" rel="noopener noreferrer"`.
- The Footer is shared by the home page, articles, and the 404 page.

## DaisyUI Components

Only use components that actually provide value:

| Component                  | Purpose                                               |
| -------------------------- | ----------------------------------------------------- |
| `modal`                    | Search dialog                                         |
| `modal-box`                | Search modal content area                             |
| `modal-backdrop`           | Close the modal on outside click                      |
| `btn btn-ghost btn-sm`     | Header search button, 404 "Back to Home" link         |
| `badge badge-soft badge-xs`| Article tag badges                                    |
| `input`                    | Base style for the search input generated by Pagefind |

Do not use `navbar`, `drawer`, `card`, `timeline`, a standalone `pagination`, or a theme toggle
component.

## Layout Rhythm (1440×900 wireframe)

| Element          | Spec                                                               |
| ---------------- | ------------------------------------------------------------------ |
| Content column   | `max-w-3xl` (768px) centered; `lg:max-w-4xl` (896px); `px-6` sides |
| Header           | `py-8` (`lg:py-10`), site name left, search button right           |
| Main             | `py-8`, `sm:py-12`, `lg:py-16`                                     |
| Home list        | Items `space-y-6` (`sm:space-y-8`, `lg:space-y-10`)                |
| Article body     | Sections `space-y-8` (`lg:space-y-10`); prose body after meta      |
| Search modal     | Mobile ~80vh bottom sheet; desktop `max-w-xl lg:max-w-2xl` centered|
| Footer           | `py-10`, `© {year} {author}` left, RSS right                       |

## Component Breakdown (page-scoped)

| Component       | Page          | Content                                                                         |
| --------------- | ------------- | ------------------------------------------------------------------------------- |
| `header.tsx`    | All           | Site name + search button + DaisyUI dialog modal + Pagefind `#search` container |
| `footer.tsx`    | All           | `© {year} {author}` + new-window "RSS" text link                                |
| `layouts/post.tsx` | Articles  | Back link, title, description, date + tag badges, prose body, bottom links      |
| `index.page.tsx`   | Home      | Inline archive list (works as the page component; no separate `post-item.tsx`)  |

The search modal is an interaction state of the Header; there is no new search page or search
component. No pagination or social-link components are split out at the bottom of articles.
`article.tsx` and `post-item.tsx` were removed (2026-08) — the article page and homepage list are
assembled directly in `layouts/post.tsx` / `index.page.tsx`. `timeline.tsx`,
`archive.page.tsx`, the old `search.page.tsx`, `sidebar.tsx`, and `title.tsx` are not part of the
target design.

## Mobile Behavior

- The content column keeps `px-6` (24px on each side); the header and main vertical padding
  shrinks (`py-8`).
- The Header keeps only the site name and the search icon on the same row; shrink the site name if
  necessary.
- The search modal becomes a ~80vh bottom sheet, `rounded-t-2xl`, near full width.
- On narrow screens date, tags, and description may wrap naturally below the title.

## Pre-implementation Checklist

- DaisyUI outputs only the `nord` and `dracula` themes, following the browser via
  `--prefersdark`.
- The Pagefind plugin stays; the only search mount point is the `<div id="search">` inside the
  modal, styled via `--pagefind-ui-*` CSS vars.
- The modal uses a `method="dialog"` backdrop; clicking outside must close it.
- RSS opens in a new window with `noopener noreferrer`.
- No theme toggle button, standalone Archive/Search page, or article social links in this phase.