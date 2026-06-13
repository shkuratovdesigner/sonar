# Daylight Clone — Builder Contract (read fully before coding)

You are building **ONE section** of a faithful clone of daylightcomputer.com (the DC-1, a calm "paper-like" e-ink tablet), inside the Next.js 15 + React 19 + Tailwind v4 + shadcn project at `/Users/shkuratovdesigner/Cursor Projects/sonar/references/daylight`. Your section screenshot is the visual source of truth — match it closely.

## Inputs to read first
1. **Your section screenshot** (path in your task) under `docs/design-references/sections/`. Rendered at 2× (2880px = 1440 CSS). Daylight's sections overlap in the DOM (pinned scroll), so these are scroll-*band* crops — focus on the content that belongs to your section.
2. **Exact styles + text + image srcs:** `docs/research/sections-extract.json` — JSON array; find the object whose `index` equals your section's index. `tree` is nested `{tag, cls, text, w, h, styles, img:{src}}` with real computed values. (Some trees are shallow where content is canvas/JS-rendered — then rely on the screenshot.)
3. **Local assets:** `public/asset-manifest.json` maps original URLs → local `/images|/fonts/...`. 139 images are in `public/images` (incl. a `Comp_00000.webp … Comp_00168.webp` hero frame sequence, `mux-1.webp`, and textures like `halftone.png`, `noise-2.png`, `leaf.jpg`, `tree-3.jpg`, `product-reveal-*`). Match by filename to what the screenshot shows.

## Design system (already configured — prefer these utilities)
- **Colors:** `bg-paper` (#faf4f2 warm cream page bg), `bg-beige` (#e8ded8 warm surface), `bg-ink` (#18190f near-black olive — used for DARK sections), `text-ink`, `text-paper` (cream text on dark), `bg-amber`/`text-amber` (#ff9d00 — the signature accent + CTAs), `text-olive`/`bg-olive` (#434626). On dark sections use `bg-ink text-paper`.
- **Fonts:** `font-sans` = ABC Room (weights 300/400/500/800; body + UI; Daylight leans on **light 300**). `font-serif` = ABC Arizona Flare (the DISTINCTIVE flared serif for big display headings — weights 300/400, supports italic; headings often mix roman + *italic* words). `font-extended` = ABC Room Extended (small UPPERCASE eyebrows/labels with wide tracking).
  - Display headings: `font-serif` large, weight 300–400, generous line-height. Eyebrow labels: `font-extended uppercase tracking-wide text-xs`.
- **Feel:** calm, warm, lots of whitespace, large fluid type, rounded corners (`rounded-2xl`/`rounded-3xl`), amber pill CTAs (`bg-amber text-ink rounded-full px-5 h-11 font-medium`). Fluid sizing via `clamp()` is welcome.
- **Layout:** section = full-width carrying its bg; inner content `mx-auto w-full max-w-[1200px] px-6 md:px-10` (some sections go wider/full-bleed for imagery — match the screenshot). Smooth scroll (Lenis) is handled globally at assembly — you do NOT need to add it.
- `import { cn } from "@/lib/utils";` Use `next/image` for images (explicit width/height or fill+sized parent).

## Rules
- Create **exactly one file**: `src/components/<Name>.tsx` (name in your task). Default-export `<Name>`, no props, hardcode real verbatim text + real local assets. No lorem ipsum, no gray placeholder boxes (recreate small UI mockups in markup if no asset exists).
- `"use client"` only if you need state/effects (carousels, toggles, hover-driven canvas). Otherwise server component.
- **Responsive:** desktop per screenshot; mobile (≤640) stacks to single column, type steps down.
- **Do NOT edit** any other file (globals.css, layout.tsx, page.tsx, lib/utils). **Do NOT run** build/dev/tsc — other agents edit concurrently. Write strictly valid, type-safe TSX.
- For scroll-scrubbed / image-sequence visuals (the hero, the paper-display showcase): a faithful **static** rendering using a representative frame + the real copy/layout is acceptable for this pass — note it in your report. Don't attempt a 128-frame scroll engine.

## Report back (terse)
File created + 1-line description + any asset you couldn't match locally.
