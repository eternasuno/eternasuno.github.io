# Blog — Project Context for AI Agents

This file captures the essential project context for this Lume-based static blog site. It replaces
any bootstrap/onboarding guide — this is the authoritative reference for how the project works.

## Project Overview

Personal blog built with **Lume v3.2.6**, a Deno-powered static site generator.

**Tech Stack:**

- **Runtime:** Deno
- **SSG:** Lume v3.2.6 (pinned in `deno.json`)
- **Content:** Typst (`.typ` files) compiled to HTML via a custom plugin
- **Templates:** TSX (React-like JSX provided by Lume's JSX plugin)
- **Styling:** Tailwind CSS + DaisyUI
- **Code Highlighting:** Typst built-in (default raw theme, inline `color:` spans)
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

## Project Structure

```
src/
├── _components/          # Page-scoped UI components (see DESIGN.md — no cross-page reuse)
│   ├── article.tsx       # Article body + date meta (article page)
│   ├── footer.tsx        # Copyright + new-window RSS link (all pages)
│   ├── header.tsx        # Site title + search button + dialog modal (all pages)
│   └── post-item.tsx     # Date + title row (homepage only)
├── _data.yml             # Global site data (author, title, description, metas)
├── _includes/
│   ├── favicon.svg
│   ├── images/           # Copied to /img/ at build time (site.add)
│   ├── layouts/          # base.tsx, og_images.tsx
│   └── style.css         # Global CSS (Tailwind + DaisyUI)
├── _plugins/
│   └── typst-plugin.ts   # Custom Typst → HTML compiler plugin
├── index.page.tsx        # Homepage: Archive-style list of all posts
├── 404.page.tsx          # 404: minimal error message and home link
└── posts/
    ├── _data.yml         # Post defaults (layout, tags)
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

## Architecture Notes

- This is a **static site generator**, not a dynamic web application. The entire site is pre-built
  at compile time.
- Content is authored in **Typst** (not Markdown), then compiled to HTML via a custom Lume plugin.
- The Typst plugin (`src/_plugins/typst-plugin.ts`) handles:
  - Typst compilation (via `@myriaddreamin/typst-ts-node-compiler` — pinned `^0.8.0-rc3`, which
    outputs **MathML** by default)
  - Typst built-in code highlighting (default raw theme — Typst 0.15 has no named themes;
    `set raw(theme: none)` would disable it; a `.tmTheme` file path is supported if a custom scheme
    is ever needed)
  - Frontmatter extraction via **Typst metadata query** (`<frontmatter>` selector, set in
    `_config.ts`) — not YAML frontmatter. Post metadata (title, tags, description) is authored as
    `#metadata(...) <frontmatter>` inside the `.typ` file through `_template.typ`.
  - Image path rewriting
  - The `toSvg` frame-inlining logic in the plugin is **dead code** — the 0.8.x compiler emits
    MathML, not SVG frames. MathML uses browser-default math fonts; unify them via CSS
    (`math { font-family: ... }`) if needed.
- Layouts use **Lume's JSX engine** (`lume/jsx-runtime`), not React. Components are `.tsx` files
  rendered at build time.
- Posts follow the naming convention: `YYYY-MM-DD-title.page.typ`. Dates are extracted from
  filenames.
- **Do NOT unpin Lume** from `@v3.2.6` in `deno.json`: newer Lume's HMR hook rewrites every local
  URL with a `#0` suffix, and Deno 2.9+ applies `registerHooks` to CJS `require()` —
  `deno task serve` then crashes with "Cannot find module ...#0" on CJS npm packages.
- Typography is system fonts only (no bundled web fonts): use `system-ui`/`ui-sans-serif` for body,
  headings, and the Bear Blog-style list. The `font-title` utility class is NOT defined and must
  not be used. Do NOT re-add custom font files without also adding `@font-face` and an
  `@theme --font-*` variable.
- `picture()`/`transform_images()` plugins were removed (2026-08): they only act on images opted in
  via a `transform-images` HTML attribute (or `transformImages` file data), and the Typst template
  emits plain `<img>` tags. Images in `_includes/images` are copied verbatim to `/img/`.
- UI follows the Bear Blog redesign (see DESIGN.md): warm, narrow single-column layout, no sidebar,
  no card grid, and no standalone Archive or Search page. The homepage is the full date/title
  archive list. The article page contains title, date, and body; its old bottom social links are
  removed. The 404 page contains the minimal error message and home link.
- Header = site title on the left plus one Heroicons search button on the right. Clicking it opens
  a DaisyUI dialog modal. The modal uses `modal modal-bottom sm:modal-middle`, `modal-box`, and a
  `modal-backdrop` form with `method="dialog"`, so clicking outside closes it (mobile: bottom
  sheet; desktop: centered). Pagefind mounts into the modal's `<div id="search">`; no hand-written
  client search index or script is used.
- Theme uses DaisyUI's built-in `light` and `dark` themes only. `light` is the default and `dark`
  is marked `--prefersdark`, so the browser's `prefers-color-scheme` controls the theme. There is
  no theme toggle button and no localStorage theme override.
- Footer = copyright on the left and an RSS Heroicon link on the right. RSS opens `/rss.xml` in a
  new window with `target="_blank" rel="noopener noreferrer"`.
- Components are **page-scoped by design** (Lume convention — no cross-page component reuse):
  `post-item.tsx` is homepage-only; `header.tsx` owns the search modal; `article.tsx` owns the
  article body. Legacy `sidebar.tsx`, `title.tsx`, `timeline.tsx`, `archive.page.tsx`, and the
  article pagination/bottom-link design are not part of the target UI.

## References

- `DESIGN.md` — Site design spec: pages, layout grid, spacing rhythm, component breakdown, mobile behavior
- `.opencode/skills/frontend-design/SKILL.md` — Distinctive visual design guidance
- `.opencode/skills/web-design-guidelines/SKILL.md` — UI/UX compliance review
