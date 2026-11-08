# Project 001 — Official Website

Single-page website for **Project 001**, an independent technology collective building
software guided by sovereignty, composability, and security.

**Tagline:** _Freedom Through Technology._
**Live:** https://project-001-official-website.vercel.app/

---

## Stack

| Layer      | Choice                                                        |
| ---------- | ------------------------------------------------------------- |
| UI         | React 19 + TypeScript 5.9                                     |
| Build      | Vite 8 (client build, IIFE-free ESM output)                    |
| Rendering  | Prerender on build (`renderToString`) + hydrate on the client  |
| Styling    | Hand-written CSS with design tokens (no CSS framework)         |
| Icons      | `lucide-react` + custom geometric SVG glyphs                   |
| Fonts      | Self-hosted Newsreader, Instrument Sans, JetBrains Mono        |
| Hosting    | Vercel (static)                                                |

There is no router: the site is one page with anchor navigation. Prerendering puts the
full content into `dist/index.html` so search engines and no-JS visitors get real HTML;
React then hydrates it.

## Requirements

- Node.js **22.x** (Vite 8 requires `^20.19` or `>=22.12`)
- npm 10+

## Commands

| Command             | What it does                                                        |
| ------------------- | ------------------------------------------------------------------- |
| `npm install`       | Install dependencies                                                |
| `npm run dev`       | Start the dev server (no prerender)                                 |
| `npm run build`     | Type-check, build the client, build SSR, prerender into `dist/`     |
| `npm run preview`   | Serve the production build locally                                  |
| `npm run verify`    | Validate `dist/index.html` (content, anchors, assets, SEO, encoding) |
| `npm run typecheck` | Type-check only                                                     |
| `npm run clean`     | Remove `dist/` and `dist-ssr/`                                      |

`npm run build` must run to completion — it needs both the client build and the SSR
bundle before `scripts/prerender.mjs` can inject the rendered HTML.

## Project structure

```
index.html                 Document shell: SEO meta, JSON-LD, preloads, #root
scripts/
  prerender.mjs            Injects the SSR HTML into dist/index.html
  verify-build.mjs         Post-build validation of the generated HTML
  clean.mjs                Removes build output
public/
  assets/brand/            Official Project 001 logo (do not recolor or crop)
  assets/fonts/            Self-hosted woff2 files + OFL licenses
  assets/projects/         Astra logo
  icons/                   Favicon set and web app icons
  og-image.png             Social share image (1200×630)
  robots.txt, sitemap.xml, site.webmanifest, 404.html
src/
  main.tsx                 Client entry (hydrate)
  entry-server.tsx         SSR entry (renderToString)
  App.tsx, pages/Home.tsx  Page composition
  components/layout/       Navbar, MobileMenu, Footer (+ CSS)
  components/sections/     Hero, About, Principles, Projects, Development, Contact
  components/ui/           Button, Emblem, ProjectCard, ProjectRecordDialog, …
  data/                    All copy and content (site, principles, projects, development)
  hooks/useReveal.ts       Scroll reveal (safe without JS / prefers-reduced-motion)
  styles/                  tokens.css, base.css, layout.css, fonts.css, animations.css
```

## Editing content

Most copy lives in `src/data/`:

- `site.ts` — name, tagline, description, navigation, about facts
- `principles.ts` — the three principles
- `projects.ts` — project register (name, category, status, logo, record dialog rows)
- `development.ts` — development philosophy steps

Adding a project only requires a new entry in `PROJECTS` in `src/data/projects.ts`.
Set `logoPath` to `null` when no official mark exists — the card falls back to a
typographic treatment.

Design decisions that must be preserved:

- Palette: Burgundy `#701C2C`, Gold `#C5A253`, Dark Blue `#26354A`, Warm White `#F5F0E6`,
  Soft Gray `#E8E5DF`
- Editorial/institutional tone — no gradients, glow, glassmorphism, or icon overload
- Project cards intentionally use different layouts: Astra (image-led), Nova (typographic
  burgundy panel), Aegis (archive strip)
- The footer stays light so the emerald logo reads correctly
- Logos must not be recolored, stretched, or replaced

## Assets

- **Fonts** are self-hosted from `public/assets/fonts/`. Their OFL licenses are in
  `public/assets/fonts/licenses/`. Keep them when redistributing.
- **Project 001 logo** (`public/assets/brand/`) is the official mark — do not edit it.
- **Nova and Aegis logos are not available yet.** Those cards use typographic
  placeholders. Replace the placeholder when official marks are supplied.
- New images should keep explicit `width`/`height` attributes; `npm run verify` fails
  on images without them.

## Deployment (Vercel)

The repo is ready for Vercel's free plan. `vercel.json` pins the framework, build
command, output directory, and long-term caching for hashed assets.

### Via the dashboard (recommended)

1. Open <https://vercel.com/new> and import
   `luciferizzzz/Project-001-official-website`.
2. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
3. Deploy. Every push to `main` redeploys automatically.

### Via the CLI

```bash
npx vercel        # preview deployment
npx vercel --prod # production deployment
```

Because the site uses absolute paths (`/assets/...`), it must be served from the domain
root, not a sub-path.

### Domain changes

The production URL is currently
`https://project-001-official-website.vercel.app/`. If you move to a custom domain,
update it in:

- `index.html` (canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD)
- `public/robots.txt` (sitemap URL)
- `public/sitemap.xml`
- `scripts/verify-build.mjs` (`SITE_URL`)

Then rebuild so `dist/` picks up the new metadata.

## Search and social metadata

`index.html` ships canonical, Open Graph, Twitter Card, and JSON-LD
(Organization / WebSite / WebPage) tags. `og-image.png` is 1200×630. `robots.txt`
allows everything and points at `sitemap.xml`. All of this is copied into `dist/` by
Vite and checked by `npm run verify`.

## Accessibility

- Semantic landmarks, one `<h1>`, no skipped heading levels
- Skip link to `#main`, visible focus styles, tap targets ≥ 24 px
- Project record and mobile menu use native `<dialog>` (focus handling, Escape, scroll lock)
- Scroll reveal only hides content below the initial viewport and is disabled for
  `prefers-reduced-motion` and browsers without `IntersectionObserver`
- Verified with axe-core (0 violations), contrast checks (all ≥ 4.5:1 or ≥ 3:1 for large
  text), and a headless Chrome interaction suite

## Known placeholders

- **Contact section** intentionally says “Pending publication” / “Unavailable”.
  No official email or social accounts have been supplied; do not invent them.
- **Nova and Aegis logos** are typographic placeholders until official marks exist.
- The Vercel URL is a free-tier subdomain, not a long-term brand domain.
