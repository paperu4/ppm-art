# AGENTS.md

## Project Shape
- Next.js App Router site. `app/layout.jsx` defines global metadata and analytics, `app/page.jsx` renders the landing page, and `app/gallery.jsx` contains the interactive lightbox.
- Use npm, not pnpm/yarn; `package-lock.json` is the lockfile.
- There are no configured lint, test, typecheck, formatter, or CI commands in this repo.

## Commands
- Fresh checkout: run `npm install` before any npm script.
- Dev server: `npm run dev`.
- Production verification: `npm run build`.
- Preview built output: `npm run preview` after `npm run build`.

## Gallery And Assets
- Gallery data lives in `src/gallery-data.js`; import each image from `src/assets/obras/` and add it to the exported `obras` array in the desired order.
- The hero/branding image is imported from `src/assets/branding/etiqueta.jpg` in `src/gallery-data.js`.
- Next.js optimizes images through `next/image`; keep meaningful `alt` text for SEO and accessibility.

## Current Build Notes
- `npm run build` passes after dependencies are installed.
