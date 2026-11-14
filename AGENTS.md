# Blog — Project Context for AI Agents

This is the project guide for a personal, statically generated blog. Treat the current source and
configuration as authoritative; do not restore older layouts or dependency versions from historical
notes.

## Stack and Commands

- **Runtime / SSG:** Node.js 24 + pnpm + Lume **4.0.2** (`@lumeland/lume`), configured in
  `package.json`.
- **Templates:** build-time TSX using Lume's JSX engine, not React. `jsxImportSource` in
  `tsconfig.json` is `@lumeland/ssx` (`^0.1.16`).
- **Content:** Typst compiled to HTML by `_plugins/typst-plugin.ts`, using
  `@myriaddreamin/typst-ts-node-compiler` (`^0.8.0-rc3`).
- **Styles:** Tailwind CSS v4, DaisyUI 5, and `@tailwindcss/typography`.
- **Highlighting:** `@shikijs/rehype` (`^4.5.0`), with `one-light` / `one-dark-pro`.
- **Search:** `@lumeland/plugin-pagefind` with `@pagefind/component-ui` Web Components
  (`<pagefind-input>`, `<pagefind-summary>`, `<pagefind-results>`).
- **Environment / deployment:** devenv + direnv; GitHub Pages through GitHub Actions.

| Command              | Purpose                                 |
| -------------------- | --------------------------------------- |
| `pnpm run serve`     | Development server (`lume build -s`)    |
| `pnpm run build`     | Generate the site in `_site/`           |
| `pnpm run typecheck` | Type-check the project (`tsc --noEmit`) |
| `pnpm run check`     | Lint and format check (`biome check .`) |

Formatting uses Biome with a line width of 80 and single quotes (`biome.json`). When changing
TypeScript/TSX or build configuration, run `pnpm run check`, `pnpm run typecheck`, and
`pnpm run build` (via `devenv shell -- ...` if outside the active shell). The build does not run
Biome or `tsc`, so a successful build does not establish formatting or type correctness. Report
actual errors and distinguish dependency/environment failures from project errors. Do not skip
checks because a historical run failed. When changing Lume or its JSX runtime mapping, also verify
`pnpm run serve`; the development/HMR path can fail independently of production builds.
Documentation-only changes do not require rebuilding the site.

## Source Map

The Lume source root is the project root (Lume's default `src: './'`; `_config.ts` sets no `src`).
Lume already ignores `node_modules`, `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`,
`tsconfig.json`, `_cache`, dot files, and `_`-prefixed names. Root files that a default loader
would turn into pages must be listed in `site.ignore(...)` in `_config.ts`: currently `AGENTS.md`
(Markdown) and `devenv.yaml` (YAML). Add new root `.md`/`.yml`/`.yaml`/`.vto` files there too (for
example `README.md` or a local `devenv.local.yaml`), and confirm `_site` gains no extra pages.

```text
_config.ts                         Lume plugins, domain, ignores, assets, watchers, terminalHost
package.json                       Dependencies, scripts, pnpm/Node 24 engines
pnpm-lock.yaml                     Locked dependency graph
tsconfig.json                      TypeScript + `@lumeland/ssx` JSX configuration
biome.json                         Formatting (Biome default 80 columns, single quotes) and lint rules
_components/
├── article-body.tsx               Article prose container and typography rules
├── header.tsx                     Sticky navigation, search trigger, theme toggle, RSS
├── search-dialog.tsx              Native #search_modal dialog and Pagefind components
├── footer.tsx                     Copyright and CC BY-NC-SA 4.0 link
├── terminal.tsx                   Shared terminal window and title bar
├── terminal-command.tsx           Shared user@host, path, command, optional cursor
├── terminal-footer.tsx            Maintenance prompt and author link
├── terminal-heading.tsx           Shared terminal h1 heading
└── terminal-status.tsx            NORMAL / page statistics / EOF status bar
_data.yml                          Global layout, author, title, description, metas
_includes/
├── favicon.svg
├── images/                        Copied verbatim to /img/
├── layouts/
│   ├── base.tsx                   HTML shell, theme restore script, Header, main, Footer
│   ├── post.tsx                   Terminal article layout and back-to-top behavior
│   └── og_images.tsx              Black/white Satori OG image template
└── style.css                      Themes, terminal UI, Pagefind, prose, Shiki
_plugins/typst-plugin.ts           Typst loader, metadata, HTML rewriting, character count
index.page.tsx                     Terminal-style post directory listing
404.page.tsx                       Terminal-style 404 (cd error, banner, suggestions)
posts/
├── _data.yml                      Post layout, Git Created dates, OG layout, tag metas
├── _template.typ                  Shared Typst post template
└── *.page.typ                     Posts (currently hello-world and typst-guide)
```

Other configuration:

- `devenv.nix` / `devenv.yaml` / `devenv.lock`: Nix development environment; enables JavaScript
  (Node.js + pnpm) and provides Tinymist, Tailwind language server, and nixfmt. Biome and
  TypeScript are installed as project `devDependencies` in `package.json`.
- `.envrc`: direnv activation.
- `.github/workflows/deploy-pages.yml`: full Git checkout → devenv setup + pnpm store cache →
  `pnpm run check` → `pnpm run typecheck` → `pnpm run build` → upload `_site` → deploy to GitHub
  Pages. Full history supports Git-based dates.

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
  is **`Git Created`**, configured in `posts/_data.yml`. Lume resolves it with
  `git log --diff-filter=A --follow`, so renamed/moved posts keep their original date once the move
  is committed (deletion and addition in the same commit); until then a local build falls back to
  the file's birthtime.
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
  plugin rewrites `data-lang` into `language-*`. Shiki uses `defaultColor: 'light-dark()'` with
  `colorsRendering: 'none'`, inline `tailing-curly-colon`, `defaultLanguage: 'text'` (so
  language-less blocks get the same styling and line numbers), and a transformer adding
  `data-line`. Token colors are inline `light-dark(light, dark)` values that follow DaisyUI's
  `color-scheme`, so no CSS theme switch is needed (one-dark-pro's dark-only italics are not
  rendered; browsers without `light-dark()` fall back to unhighlighted prose `pre` colors). The CSS
  `shiki` utility only lays out lines and displays numbers via `content: attr(data-line)` on
  `.line::before`.
- **Two separate counts exist:** the Typst loader's `wordCount` counts non-whitespace Unicode code
  points in serialized HTML text nodes and is shown as `字` on the homepage. Lume's `reading_info`
  plugin supplies `readingInfo.words` and `readingInfo.minutes` for article metadata/status. Do not
  substitute one for the other or label the homepage count as file bytes.
- Math is exported as MathML; `.prose math mtable` spacing is adjusted in CSS.
- The template's HTML image rule maps the source basename to `/img/<filename>`, adds lazy loading
  and the `image-size` marker, and forwards `it.alt` or an empty string. Typst `width` is not
  forwarded; images inside tables are capped by `[&_table_img]:max-w-48` in `article-body.tsx` so
  they do not squeeze other columns. Images are copied without a transform pipeline. Keep basenames unique and do not assume nested
  source paths survive this rewrite. Use string alt text, not Typst content blocks.
- **Vector inlining is live functionality.** The template provides `#drawing(body)`, which wraps
  vector drawings with `html.frame(box(body))` for HTML. The plugin converts `img.typst-frame` SVG
  data URLs into inline SVG, preserving original fill/stroke colors and dimensions. Do not remove
  `toSvg` or restore an unconditional `currentColor` conversion.
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
  `TerminalFooter` shows a `whoami` command plus the maintenance link; `TerminalStatus` shows
  NORMAL, optional page statistics, and EOF. Decorative command/status text is excluded from
  Pagefind.
- The terminal window is capped at `62.5rem`. Directory permissions on the homepage are hidden
  below `lg` (`64rem`, `max-lg:hidden`). Cursor animation respects reduced-motion preferences.
- Fonts are system fonts only. The body uses Tailwind's default monospace stack and article prose
  explicitly uses `font-sans`; neither names a CJK font, so CJK glyphs come from the OS fallback. Do not introduce font assets or undefined utilities such as
  `font-title` without the corresponding font configuration.
- Preserve semantic navigation, visible focus styles, skip-to-content behavior, and accessible
  labels. UI copy is currently mixed: Chinese homepage heading `文章` and `字` counts, English
  navigation/status/article metadata, and Chinese post content. Do not enforce an English-only UI.

### Themes

- DaisyUI themes are built-in **`light` (default) / `halloween` (prefersdark)**, declared in
  `style.css` as `@plugin "daisyui/theme"` blocks (main plugin `themes: false`) that override only
  `info`/`success` tokens; DaisyUI merges the rest from the built-in theme.
- The header toggle sets the root `data-theme` between `light` and `halloween` and saves it to
  `localStorage.theme`. A blocking inline script in `base.tsx` `<head>` (before the stylesheet)
  restores it on every page load, so the choice survives navigation without a flash. Without a
  saved value, no `data-theme` attribute is set and the system color scheme selects the theme.
- Do not use Tailwind `dark:` variants; theme-specific colors come from DaisyUI semantic tokens.
- Text contrast: built-in light `info`/`success` (~2:1) and halloween `info` (3.4:1) fail WCAG AA as
  text, so the overrides lower/raise only their lightness (with gamut-fit chroma) and flip the
  matching `*-content`. Measured: `text-info` 4.68/4.70, `text-success` 4.67/5.36
  (light/halloween). Re-measure both themes when changing these tokens.

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
- **Search:** `header.tsx` renders `SearchDialog` (`search-dialog.tsx`), which owns the native
  `#search_modal` dialog and mounts `<pagefind-input>`, `<pagefind-summary>`, and
  `<pagefind-results>` inside `#search`, with `/script.js` loaded as a module in `base.tsx`. The
  Web Components are themed through the `pagefind-search` utility (DaisyUI `--color-*` variables
  driving the `--pf-*` properties) applied at `#search#search#search#search`, which outranks the
  component's own `:is(*, #\#)` selectors without `!important`. CSS supplies the terminal
  `find . -name` prompt, empty hint, input, results, and backdrop styling. A `method='dialog'`
  backdrop form closes it. Do not replace this with a custom browser-side index. It is not the
  former mobile bottom sheet: the dialog is capped at `40rem` / `92vw` and positioned below the top
  of the viewport, with scrollable results.
- `base.tsx` uses `<html lang='zh-CN'>`, so Pagefind builds a Chinese index and derives UI labels
  from that language despite English search chrome.
- **Footer:** copyright year/author and a CC BY-NC-SA 4.0 license link; RSS is in the header.
- **404:** terminal window whose command is `cd <path>`; an inline script fills every
  `[data-request-path]` with `location.pathname` (fallback `this-page`). Body: bash `No such file or
  directory` line, decorative figlet 404 banner, h1 `Page not found`, suggestion rows
  (`cd ~` home link and a `find . -name` button opening `#search_modal`, with decorative prompts
  `aria-hidden`), and a `E404: Not Found` status bar. `TerminalCommand`'s `command` accepts JSX for
  the path span.

## Where to Look Before Changes

- For layout/theme/search work, read the relevant TSX and `_includes/style.css` together.
- For content compilation, read `_config.ts`, `_plugins/typst-plugin.ts`, and
  `posts/_template.typ`; verify against `posts/typst-guide.page.typ` when applicable.
- For deployment, permissions, or dependency updates, read `package.json`, `pnpm-lock.yaml`,
  `tsconfig.json`, `biome.json`, devenv configuration, and `.github/workflows/deploy-pages.yml`.
  Do not infer current behavior from old blog prose or historical dependency failures.
