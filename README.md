# rjrthnm2.github.io

Personal site of **Robin Jephthah Rajarathinam** — researcher, designer, educator.
Live at <https://rjrthnm2.github.io>.

## What this is

A static, multi-page portfolio. No framework, no build step, no Jekyll —
just hand-written HTML, CSS, and JavaScript served directly by GitHub Pages.

| Page            | File            | What's on it                                                  |
| --------------- | --------------- | ------------------------------------------------------------- |
| Home / About    | `index.html`    | Hero with portrait, intro, "where to next" cards              |
| Selected work   | `work.html`     | Horizontally-draggable rail of five projects                  |
| Writing         | `writing.html`  | Filterable publications list (journal / conference / chapter) |
| CV              | `cv.html`       | Education + appointments timeline, teaching/service grid, PDF |
| Contact         | `contact.html`  | Big mailto, affiliations, links                               |

Shared chrome — top nav with live Central-Time clock, footer, animated
cursor — is injected by `script.js`, so each page only contains its own
content.

## Repo layout

```
index.html    work.html    writing.html    cv.html    contact.html
styles.css    script.js
.nojekyll                      tells GitHub Pages to skip Jekyll
assets/
├── robin-portrait.png
├── logo-{navy,white,gold}.png
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

- **Colors:** navy `#001B3D`, gold `#FFC736`, terracotta `#C4391D`, cream `#FAF8F4`
- **Type:** Philosopher (display), Mulish (body), JetBrains Mono (meta)
- All design tokens live as CSS custom properties at the top of `styles.css`

## License

Code in this repo is released under the MIT License (see `LICENSE`).
Content (text, photographs, signature mark) is © Robin Jephthah Rajarathinam.
