# rjrthnm2.github.io

Personal site of **Robin Jephthah Rajarathinam** — researcher, designer, educator.
Live at <https://rjrthnm2.github.io>.

## What this is

A static, multi-page portfolio. No framework, no build step, no Jekyll —
just hand-written HTML, CSS, and JavaScript served directly by GitHub Pages.

| Page            | File                   | What's on it                                                  |
| --------------- | ---------------------- | ------------------------------------------------------------- |
| Home / About    | `index.html`           | Hero with portrait, intro, "where to next" cards              |
| Publications    | `publications.html`    | Filterable papers list (journal / conference / chapter)       |
| CV              | `cv.html`              | Education + appointments timeline, teaching/service grid, PDF |
| Contact         | `contact.html`         | Big mailto, affiliations, links                               |
| Privacy         | `privacy.html`         | "What this site collects: nothing"                            |
| Accessibility   | `accessibility.html`   | WCAG 2.2 AA statement, feature list                           |
| 404             | `404.html`             | Branded "wandered off" page with nav grid                     |

Shared chrome — top nav with live Central-Time clock, day/night theme
toggle, footer — is injected by `script.js`, so each page only contains
its own content.

## Repo layout

```
index.html    publications.html    cv.html    contact.html
styles.css    script.js
.nojekyll                      tells GitHub Pages to skip Jekyll
robots.txt   sitemap.xml       crawl directives
assets/
├── robin-portrait.{webp,jpg}  hero portrait, WebP w/ JPEG fallback
├── logo-{navy,white,tc}.png   signature mark variants
├── fonts/                     self-hosted woff2 (Philosopher, Mulish, JBM)
├── FullCV_Faculty_v2.pdf
└── favicon/                   ico, mstiles, safari-pinned-tab, manifest
.github/                       issue templates
LICENSE  README.md  CONTRIBUTING.md  .gitignore
```

## Running locally

Any static file server will do. From the repo root:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Brand system

- **Two-color accent system** — only one yellow and one red live across the
  whole site, swapping roles between modes:
  - `--brand-gold` — yellow `#FFC736` in day, red `#C4391D` in night
  - `--brand-tc`   — red    `#C4391D` in day, yellow `#FFC736` in night
- **Backgrounds:** white `#FFFFFF` in day, navy `#001B3D` in night.
  The navy `--brand-navy` is a constant on its own; all other tokens
  (`--ink`, `--bg`, grays) flip automatically via `[data-theme="night"]`.
- **Type:** Philosopher (display), Mulish (body), JetBrains Mono (meta) —
  all self-hosted in `assets/fonts/`.
- All design tokens live as CSS custom properties at the top of `styles.css`.

## Day / night theme

- Pill toggle in the top nav (sun ↔ moon) flips the whole site.
- First-time visitors get the OS preference (`prefers-color-scheme`) by
  default; subsequent visits restore the user's last choice from
  `localStorage`.
- An inline `<script>` in every page's `<head>` sets `data-theme` before
  the first paint to prevent a flash of the wrong theme.
- Mobile browser chrome follows the active mode via paired
  `<meta name="theme-color">` tags with `prefers-color-scheme` media
  queries.
- Honors `prefers-reduced-motion` — the 400 ms crossfade between modes is
  disabled when the user opts out of motion.

## License

Code in this repo is released under the MIT License (see `LICENSE`).
Content (text, photographs, signature mark) is © Robin Jephthah Rajarathinam.
