# Blog — Project Context for AI Agents

This is the project guide for a personal, statically generated blog. Treat the current source and
configuration as authoritative; do not restore older layouts or dependency versions from historical
notes.

## Stack and Commands

- **Runtime / SSG:** Deno + Lume **3.3.3**, pinned in `deno.json` through jsDelivr.
- **Templates:** build-time TSX using Lume's JSX engine, not React. `jsxImportSource` is `lume`;
  `lume/jsx-runtime` maps separately to SSX **0.1.16**.
- **Content:** Typst compiled to HTML by `src/_plugins/typst-plugin.ts`, using
  `@myriaddreamin/typst-ts-node-compiler` (`^0.8.0-rc3`).
- **Styles:** Tailwind CSS v4, DaisyUI 5, and `@tailwindcss/typography`.
- **Highlighting:** `@shikijs/rehype` (`^4.5.0`), with `one-light` / `one-dark-pro`.
- **Search:** Lume's Pagefind plugin and generated UI.
- **Environment / deployment:** devenv + direnv; GitHub Pages through GitHub Actions.

| Command            | Purpose                                                   |
| ------------------ | --------------------------------------------------------- |
| `deno task serve`  | Development server with live reload (`deno task lume -s`) |
| `deno task build`  | Generate the site in `_site/`                             |
| `deno check`       | Type-check the project, as CI does                        |
| `deno fmt --check` | Check formatting configured in `deno.json`                |

Formatting uses a line width of 99 and single quotes. Lint plugins are configured in `deno.json`.
When changing TypeScript/TSX or build configuration, run both `deno check` and `deno task build`.
The build task runs without type checking, so a successful build does not establish type
correctness. Report actual errors and distinguish dependency/environment failures from project
errors. Do not skip checks because a historical run failed. When changing Lume or its JSX runtime
mapping, also verify `deno task serve`; the development/HMR path can fail independently of
production builds. Documentation-only changes do not require rebuilding the site.

## Source Map

```text
_config.ts                         Lume plugins, domain, assets, watchers, global terminalHost
deno.json                          Imports, tasks, permissions, formatting, lint configuration
src/
├── _components/
│   ├── header.tsx                 Sticky navigation, search dialog, theme toggle, RSS
│   ├── footer.tsx                 Copyright and CC BY-NC-SA 4.0 link
│   ├── terminal.tsx               Shared terminal window and title bar
│   ├── terminal-command.tsx       Shared user@host, path, command, optional cursor
│   ├── terminal-footer.tsx        Maintenance prompt and author link
│   └── terminal-status.tsx        NORMAL / page statistics / EOF status bar
├── _data.yml                      Global layout, author, title, description, metas
├── _includes/
│   ├── favicon.svg
│   ├── images/                    Copied verbatim to /img/
│   ├── layouts/
│   │   ├── base.tsx               HTML shell, Header, main, Footer
│   │   ├── post.tsx               Terminal article layout and back-to-top behavior
│   │   └── og_images.tsx          Black/white Satori OG image template
│   └── style.css                  Themes, terminal UI, Pagefind, prose, Shiki
├── _plugins/typst-plugin.ts        Typst loader, metadata, HTML rewriting, character count
├── index.page.tsx                 Terminal-style post directory listing
├── 404.page.tsx                   404, kaomoji, home link
└── posts/
    ├── _data.yml                  Post layout, Git Created dates, OG layout, tag metas
    ├── _template.typ              Shared Typst post template
    └── *.page.typ                 Posts (currently hello-world and typst-guide)
```

Other configuration:

- `devenv.nix` / `devenv.yaml` / `devenv.lock`: Nix development environment; enables Deno and Typst
  and provides Tailwind language server and nixfmt. The Deno wrapper supplies the native library
  path needed by native dependencies on Linux.
- `.envrc`: direnv activation.
- `.github/workflows/deploy-pages.yml`: full Git checkout → devenv setup/test → `deno check` →
  `deno task build` → upload `_site` → deploy to GitHub Pages. Full history supports Git-based
  dates.

## Build and Data Flow

- This is a static site, not a dynamic application. TSX components render at build time; browser
  behavior is limited to the generated Pagefind UI and inline handlers/scripts in the templates.
- `_config.ts` uses `DOMAIN` from the environment, falling back to `http://localhost:3000`.
  `terminalHost` comes from the configured location's hostname. CI supplies `DOMAIN` from
  repository variables; do not hardcode a separate host in terminal components.
- `_includes/style.css` is published as `/style.css`; `_includes/images` is published as `/img`.
  The watcher maps `posts/*.page.typ` to `posts/_template.typ` so template edits rebuild posts.
- Plugins provide Tailwind, image sizing, base-path rewriting, OG images, favicon, metas, RSS,
  reading information, Pagefind, and URL checking. Robots configuration currently disallows all
  crawlers (`robots({ allow: [], disallow: '*' })`); do not assume the blog permits indexing.
- RSS is generated at `/rss.xml` from `url^=/posts/`. Its title is set separately in `_config.ts`.
- Global data defaults to `layouts/base.tsx`. Post data selects `layouts/post.tsx`, which itself
  uses the base layout; it also sets `openGraphLayout: layouts/og_images.tsx` and tag keywords.
- Posts use descriptive `*.page.typ` filenames, **not date-prefixed filenames**. Their default date
  is **`Git Created`**, configured in `src/posts/_data.yml`.
- The homepage queries `search.pages('url^=/posts/', 'date=desc')`, without pagination. When
  reading rendered HTML from Lume pages, use `page.text`; search-result `content` is not guaranteed
  to be a string.

## Typst Content Pipeline

- Author posts by importing `./_template.typ` and applying `#show: post.with(...)` with `title`,
  `description`, and `tags`. The template emits `#metadata(...) <frontmatter>`; metadata is queried
  with the `<frontmatter>` selector, not parsed from YAML frontmatter.
- `_config.ts` passes `target: 'html'`. The template defaults to PDF for standalone Typst use and
  only adds its own visible title outside the HTML target; the article layout supplies the HTML h1.
- The custom plugin compiles HTML, extracts metadata, rewrites the HAST, applies rehype plugins,
  and serializes the result. It returns only the compiled HTML body's children.
- **Code highlighting belongs to Shiki, not Typst.** The HTML template sets `raw(theme: none)`; the
  plugin rewrites `data-lang` into `language-*`. Shiki uses `defaultColor: false`, inline
  `tailing-curly-colon`, and a transformer adding `data-line`. The CSS `shiki` utility consumes
  `--shiki-*` variables and displays line numbers with CSS counters.
- **Two separate counts exist:** the Typst loader's `wordCount` counts non-whitespace Unicode code
  points in serialized HTML text nodes and is shown as `字` on the homepage. Lume's `reading_info`
  plugin supplies `readingInfo.words` and `readingInfo.minutes` for article metadata/status. Do not
  substitute one for the other or label the homepage count as file bytes.
- Math is exported as MathML; `.prose math mtable` spacing is adjusted in CSS.
- The template's HTML image rule maps the source basename to `/img/<filename>`, adds lazy loading,
  the `image-size` marker, and `typst-article-image`, and forwards `it.alt` or an empty string.
  Images are copied without a transform pipeline. Keep basenames unique and do not assume nested
  source paths survive this rewrite. Use string alt text, not Typst content blocks.
- **Vector inlining is live functionality.** The template wraps rect/circle/ellipse/line/polygon
  with `html.frame(box(...))` for HTML. The plugin converts `img.typst-frame` SVG data URLs into
  inline SVG, preserving original fill/stroke colors and dimensions. Do not remove `toSvg` or
  restore an unconditional `currentColor` conversion.
- Known Typst HTML constraints: `show path:` is not a valid element selector; `#quote` can render
  as a plain paragraph; footnotes render as superscript references and endnotes. Use
  `typst-guide.page.typ` as the existing coverage sample for code, math, images, tables, and
  vectors.

## UI and Browser Behavior

### Shared terminal design

- The current design is **terminal-style**, not the former Bear Blog layout. Homepage and articles
  reuse terminal components across pages; there is no sidebar, card grid, standalone archive page,
  or standalone search page.
- `Terminal` renders an article window, decorative traffic-light dots, a command title bar with
  cursor, and the body. `TerminalCommand` owns prompt formatting; user/host is hidden below `sm`.
  `TerminalFooter` shows an `echo` command plus the maintenance link; `TerminalStatus` shows
  NORMAL, optional page statistics, and EOF. Decorative command/status text is excluded from
  Pagefind.
- The terminal window is capped at `62.5rem`. CSS reduces spacing on smaller screens and hides
  directory permissions below `51.25rem`. Cursor animation respects reduced-motion preferences.
- Fonts are system fonts only. The body uses a monospace stack with CJK fallbacks; article prose
  explicitly uses `font-sans`. Do not introduce font assets or undefined utilities such as
  `font-title` without the corresponding font configuration.
- Preserve semantic navigation, visible focus styles, skip-to-content behavior, and accessible
  labels. UI copy is currently mixed: Chinese homepage heading `文章` and `字` counts, English
  navigation/status/article metadata, and Chinese post content. Do not enforce an English-only UI.

### Themes

- DaisyUI themes are **`light --default` / `halloween --prefersdark`** in `style.css`.
- The header toggle sets the root `data-theme` between `light` and `halloween`. Without an explicit
  attribute, the system color scheme selects the theme. There is no localStorage persistence.
- The custom Tailwind `dark` variant honors explicit `data-theme='halloween'`, or the system dark
  preference only when no `data-theme` exists. Keep this aligned with the toggle and Shiki colors.

### Pages and shared chrome

- **Homepage:** command `ls -la ./posts/ | more`, heading `文章`, total posts count, then linked
  rows with decorative permissions, `wordCount` in 字, short en-US date, title, and trailing slash.
  Ends with a static `--More-- (100%)` indicator, maintenance footer, and post-count status bar;
  this is presentation, not an interactive pager. Descriptions/tags are not listed here.
- **Article:** command `cat <source filename>` under `~/posts`; title, optional description, long
  en-US date, reading information, optional hashtag badges, then
  `.prose max-w-none font-sans
  wrap-anywhere` body, maintenance footer, and word-count status.
  Both the article header and prose have `data-pagefind-body`; reading statistics are ignored by
  search.
- Article back-to-top links target `#top` on the root HTML element. The fixed button starts hidden;
  an `IntersectionObserver` shows it after the article title passes the sticky header. Preserve the
  `article-title` / `back-to-top` IDs and header-height relationship when changing this behavior.
- **Header:** sticky site link from `metas.site`, skip link to `#main-content`, search button,
  theme toggle, and RSS icon. RSS opens a new tab with `noopener noreferrer`.
- **Search:** `header.tsx` owns the native `#search_modal` dialog. Pagefind mounts into `#search`;
  CSS supplies the terminal `find . -name` prompt, empty hint, input, results, and backdrop
  styling. A `method='dialog'` backdrop form closes it. Do not replace this with a custom
  browser-side index. It is not the former mobile bottom sheet: the dialog is capped at `40rem` /
  `92vw` and positioned below the top of the viewport, with scrollable results.
- `base.tsx` uses `<html lang='zh-CN'>`, so Pagefind builds a Chinese index and derives UI labels
  from that language despite English search chrome.
- **Footer:** copyright year/author and a CC BY-NC-SA 4.0 license link; RSS is in the header.
- **404:** large 404, kaomoji, English not-found explanation, and Back to Home button; it uses the
  base shell rather than a terminal window.

## Where to Look Before Changes

- For layout/theme/search work, read the relevant TSX and `src/_includes/style.css` together.
- For content compilation, read `_config.ts`, `src/_plugins/typst-plugin.ts`, and
  `src/posts/_template.typ`; verify against `src/posts/typst-guide.page.typ` when applicable.
- For deployment, permissions, or dependency updates, read `deno.json`, the lockfile, devenv
  configuration, and `.github/workflows/deploy-pages.yml`. Do not infer current behavior from old
  blog prose or historical dependency failures.
