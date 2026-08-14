# Blog — Project Context for AI Agents

This file captures the essential project context for this Lume-based static blog site. It replaces
any bootstrap/onboarding guide — this is the authoritative reference for how the project works.

## Project Overview

Personal blog built with **Lume v3.3.1**, a Deno-powered static site generator.

**Tech Stack:**

- **Runtime:** Deno
- **SSG:** Lume v3.3.1 (pinned in `deno.json` via cdn.jsdelivr.net gh URL)
- **Content:** Typst (`.typ` files) compiled to HTML via a custom plugin
- **Templates:** TSX (React-like JSX provided by Lume's JSX plugin)
- **Styling:** Tailwind CSS v4 + DaisyUI 5 + `@tailwindcss/typography` (prose)
- **Code Highlighting:** Shiki (`@shikijs/rehype`), dual themes `one-dark-pro`/`one-light`, line numbers
- **Math:** MathML (browser-native math fonts, styled via CSS)
- **Search:** Pagefind (Lume pagefind plugin; UI auto-mounts into the modal's `<div id="search">`)
- **Deployment:** GitHub Pages via GitHub Actions
- **Dev Environment:** devenv (Nix-based) + direnv

## Commands

| Command           | Description                                                   |
| ----------------- | ------------------------------------------------------------- |
| `deno task serve` | Start local dev server with live reload (`deno task lume -s`) |
| `deno task build` | Production build (`deno task lume`)                           |

Formatting/lint are configured in `deno.json` (non-default: line width 99, single quotes).
**`deno check` FAILS in this repo** (see Architecture Notes) — use `deno task build` to verify.

## Project Structure

```
src/
├── _components/
│   ├── footer.tsx        # © {year} {author} + "RSS" text link (all pages)
│   └── header.tsx        # Site title + search button + dialog modal (all pages)
├── _data.yml             # Global site data (author, title, description, metas)
├── _includes/
│   ├── favicon.svg
│   ├── images/           # Copied to /img/ at build time (site.add)
│   ├── layouts/
│   │   ├── base.tsx      # HTML shell: header + main + footer
│   │   ├── og_images.tsx # Satori OG image template (posts)
│   │   └── post.tsx      # Article page layout (back link, meta, prose body, bottom links)
│   └── style.css         # Global CSS (Tailwind + DaisyUI + prose/shiki overrides)
├── _plugins/
│   └── typst-plugin.ts   # Custom Typst → HTML compiler plugin
├── index.page.tsx        # Homepage: Archive-style list of all posts (inline markup)
├── 404.page.tsx          # 404: kaomoji error graphic + home link
└── posts/
    ├── _data.yml         # Post defaults (layout: post.tsx, OG layout)
    ├── _template.typ     # Typst template shared by all posts
    └── *.page.typ        # Blog posts in Typst format
```

## Key Config Files

| File                         | Purpose                                                                   |
| ---------------------------- | ------------------------------------------------------------------------- |
| `_config.ts`                 | Lume site configuration: plugins, domain, watchers, build pipeline        |
| `deno.json`                  | Deno configuration: JSX runtime, import map, tasks, permissions, fmt/lint |
| `devenv.nix` / `devenv.yaml` | Nix-based development environment                                         |
| `.envrc`                     | direnv hook to activate the Nix environment automatically                 |
| `.github/workflows/deploy-pages.yml` | CI: devenv test → `deno check` → `deno task build` → GitHub Pages |

## Architecture Notes

- This is a **static site generator**, not a dynamic web application. The entire site is pre-built
  at compile time.
- Content is authored in **Typst** (not Markdown), then compiled to HTML via a custom Lume plugin.
- The Typst plugin (`src/_plugins/typst-plugin.ts`) handles:
  - Typst compilation via `@myriaddreamin/typst-ts-node-compiler` — pinned `^0.8.0-rc3`, which
    outputs **MathML** by default. MathML uses browser-default math fonts; `.prose` CSS tweaks
    `math mtable` spacing (see style.css).
  - **Code highlighting via Shiki, not Typst**: `_config.ts` pipes the rehype output through
    `rehypeShiki` (`@shikijs/rehype` v4) with `one-dark-pro`/`one-light`, `defaultColor: false`
    (emits `--shiki-*` CSS vars consumed by the `shiki` @utility in style.css), inline
    tailing-curly-colon, and a line-number transformer (`data-line`). `_template.typ` sets
    `set raw(theme: none)` for the html target so Typst's own highlighting never runs. The
    plugin's `rewrite()` also converts `data-lang` → `language-*` class.
  - Frontmatter extraction via **Typst metadata query** (`<frontmatter>` selector, set in
    `_config.ts`) — not YAML frontmatter. Post metadata (title, tags, description) is authored as
    `#metadata(...) <frontmatter>` inside the `.typ` file through `_template.typ`.
  - Image path rewriting: `show image:` in `_template.typ` rewrites `image()` calls to
    `/img/<filename>` with `loading="lazy"` and class `typst-article-image`. Images in
    `_includes/images` are copied verbatim (no transform pipeline).
  - **Vector graphics — the `toSvg` code in the plugin is LIVE, not dead**: Typst 0.15's HTML
    export drops vector drawings (rect/circle/... → empty spans), so `_template.typ` wraps them
    with `show rect/circle/ellipse/line/polygon: it => html.frame(box(it))`. That emits
    `<img class="typst-frame" src="data:image/svg+xml;base64,...">`, which the plugin's `toSvg`
    decodes and inlines as a real `<svg>` — preserving the **original fill/stroke colors and
    width/height attrs** (user-modified 2026-08; the old currentColor conversion is gone).
    Caveats: `show path:` is INVALID in Typst 0.15 ("only element functions can be used as
    selectors"); `image(..., alt: [...])` crashes the build (never pass alt); `#quote` renders as
    a plain `<p>`, `#footnote` works (sup + doc-endnotes).
- Layouts use **Lume's JSX engine** (`lume/jsx-runtime`), not React. Components are `.tsx` files
  rendered at build time.
- Posts follow the naming convention: `YYYY-MM-DD-title.page.typ`. Dates are extracted from
  filenames.
- **Lume is pinned to `@3.3.1`** in `deno.json` (cdn.jsdelivr.net gh URL). Both `deno task build`
  and `deno task serve` are verified working on it (2026-08). Do not bump Lume without re-testing
  both: older Lume (master / v3.3.0) crashed `serve` via an HMR hook rewriting local URLs with a
  `#0` suffix + Deno 2.9 applying `registerHooks` to CJS `require()` ("Cannot find module ...#0").
  That bug does NOT reproduce on 3.3.1.
- **`deno check` FAILS** (pre-existing, unfixed): `@jridgewell/remapping@2.3.5` (via
  `@tailwindcss/node`) ships `build-source-map-tree.d.cts` with syntax Deno 2.9.4 cannot parse
  ("Unexpected token <eof>", line 14). CI (`deploy-pages.yml`) runs `deno check` then
  `deno task build` — the check step would fail on push. Possible fixes: pin remapping <2.3.5,
  exclude the bad types, or drop `deno check` from CI.
- Themes are DaisyUI 5 **`nord` (--default) / `dracula` (--prefersdark)**, declared in style.css:
  `@plugin "daisyui" { themes: nord --default, dracula --prefersdark; }`. The browser's
  `prefers-color-scheme` controls the theme. There is no theme toggle button and no localStorage
  theme override.
- Typography is system fonts only (no bundled web fonts). Article bodies use
  `@tailwindcss/typography` (`.prose max-w-none` in `layouts/post.tsx`); `.prose` overrides
  (figure centering, table img, math mtable) and the `shiki` line-number utility live in
  style.css. The `font-title` utility class is NOT defined and must not be used. Do NOT re-add
  custom font files without also adding `@font-face` and an `@theme --font-*` variable.
- UI follows the Bear Blog redesign (see DESIGN.md): warm, narrow single-column layout, no
  sidebar, no card grid, no standalone Archive or Search page.
- **Homepage** (`index.page.tsx`): optional site description from `_data.yml`, then an "All
  Posts" heading with a "{n} posts" mono counter (dashed bottom border), then the archive list.
  Each item = title link (primary, bold) on top, then a mono row with a calendar icon + en-US
  long date, `#tag` links, and a line-clamped description. Newest first, no pagination.
- **Article page** (`layouts/post.tsx`, wrapper has `data-pagefind-body`): Back to Posts link →
  h1 title → description → date + `badge badge-soft badge-xs` tags → dashed `hr` → prose body →
  bottom row with Back to Posts / Back to Top links.
- **404 page**: giant mono "404" + kaomoji `ʕノ•ᴥ•ʔノ ︵ ┻━┻` + "Page not found. It may have been
  moved or deleted." + a `btn btn-ghost btn-sm` Back to Home link.
- Header = site title on the left plus one search button on the right (`btn btn-ghost btn-sm`,
  Heroicons magnifying-glass, `onclick='search_modal.showModal()'`). Clicking it opens a DaisyUI
  dialog modal: `modal modal-bottom sm:modal-middle backdrop-blur-xs`, `modal-box` (mobile: 80vh
  bottom sheet, `rounded-t-2xl`; desktop: centered `max-w-xl lg:max-w-2xl`, `sm:h-auto
  sm:rounded-2xl`), and a `modal-backdrop` form with `method="dialog"` so clicking outside closes
  it. Pagefind mounts into the modal's `<div id="search">`; no hand-written client search index
  or script is used. `#search` styling uses Pagefind CSS vars defined in style.css.
- Pagefind index language follows the `<html lang>` attribute — `lang='zh-CN'` in base.tsx
  produces a `zh-cn` index (note: UI chrome is English; the Pagefind UI labels come from the
  index language).
- Footer = `© {year} {author}` on the left and an "RSS" text link on the right. RSS opens
  `/rss.xml` in a new window with `target="_blank" rel="noopener noreferrer"`.
- All UI copy is **English** (converted from Chinese, 2026-08): homepage "All Posts" heading with
  "{n} posts" counter, article "Back to Posts"/"Back to Top" links, 404 message. Dates are
  rendered with `Intl.DateTimeFormat('en-US', ...)` in `index.page.tsx` and
  `src/_includes/layouts/post.tsx`. The `.typ` post content itself remains in Chinese.
- Components are **page-scoped by design** (Lume convention — no cross-page component reuse):
  `header.tsx` owns the search modal; `footer.tsx` is the shared footer. The article page is
  assembled in `layouts/post.tsx`; the homepage list markup is inline in `index.page.tsx` (there
  is no `post-item.tsx` or `article.tsx` anymore). Legacy `sidebar.tsx`, `title.tsx`,
  `timeline.tsx`, `archive.page.tsx`, `search.page.tsx` do not exist.
- `og_images` (satori) generates a black/white OG PNG per post via `layouts/og_images.tsx`
  (`openGraphLayout` set in `posts/_data.yml`).

## References

- `DESIGN.md` — Site design spec: pages, layout grid, spacing rhythm, component breakdown, mobile
  behavior
- `.opencode/skills/frontend-design/SKILL.md` — Distinctive visual design guidance
- `.opencode/skills/web-design-guidelines/SKILL.md` — UI/UX compliance review
