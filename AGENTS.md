# Blog — Project Context for AI Agents

This file captures the essential project context for this Lume-based static blog site. It replaces any bootstrap/onboarding guide — this is the authoritative reference for how the project works.

## Project Overview

Personal blog built with **Lume v3.2.4**, a Deno-powered static site generator.

**Tech Stack:**
- **Runtime:** Deno
- **SSG:** Lume v3.2.4
- **Content:** Typst (`.typ` files) compiled to HTML via a custom plugin
- **Templates:** TSX (React-like JSX provided by Lume's JSX plugin)
- **Styling:** Tailwind CSS + DaisyUI
- **Code Highlighting:** Shiki (via `@shikijs/rehype`)
- **Search:** Pagefind
- **Deployment:** GitHub Pages via GitHub Actions
- **Dev Environment:** devenv (Nix-based) + direnv

## Commands

| Command | Description |
|---------|-------------|
| `deno task serve` | Start local dev server with live reload |
| `deno task build` | Production build |

## Project Structure

```
src/
├── _components/          # Reusable UI components
│   ├── footer.tsx
│   ├── header.tsx
│   ├── theme-controller.tsx
│   └── time.tsx
├── _data.yml             # Global site data (author, title, description)
├── _includes/
│   ├── favicon.svg
│   ├── fonts/            # Custom fonts (MapleMono)
│   ├── layouts/          # Base layout, post layout, OG image layout
│   └── style.css         # Global CSS (Tailwind + DaisyUI)
├── _plugins/
│   └── typst-plugin.ts   # Custom Typst → HTML compiler plugin
├── index.page.tsx        # Homepage
└── posts/
    ├── _data.yml         # Post defaults (layout, tags)
    ├── _template.typ     # Typst template shared by all posts
    └── *.page.typ        # Blog posts in Typst format
```

## Key Config Files

| File | Purpose |
|------|---------|
| `_config.ts` | Lume site configuration: plugins, domain, watchers, build pipeline |
| `deno.json` | Deno configuration: JSX runtime, import map, tasks, permissions |
| `devenv.nix` / `devenv.yaml` | Nix-based development environment |
| `.envrc` | direnv hook to activate the Nix environment automatically |

## Architecture Notes

- This is a **static site generator**, not a dynamic web application. The entire site is pre-built at compile time.
- Content is authored in **Typst** (not Markdown), then compiled to HTML via a custom Lume plugin.
- The Typst plugin (`src/_plugins/typst-plugin.ts`) handles:
  - Typst compilation (via `@myriaddreamin/typst-ts-node-compiler`)
  - Shiki syntax highlighting (via `@shikijs/rehype`)
  - Frontmatter extraction
  - SVG math rendering
  - Image path rewriting
- Layouts use **Lume's JSX engine** (`lume/jsx-runtime`), not React. Components are `.tsx` files rendered at build time.
- Posts follow the naming convention: `YYYY-MM-DD-title.page.typ`. Dates are extracted from filenames.
- Custom fonts (MapleMono) are bundled in `_includes/fonts/`.

## References

- `.agents/skills/clean-architecture/SKILL.md` — Architecture guidelines
- `.agents/skills/clean-code/SKILL.md` — Code conventions
- `.agents/skills/clean-code/typescript.md` — TypeScript-specific conventions
- `.agents/skills/coding-guidelines/SKILL.md` — Behavioral coding guidelines
