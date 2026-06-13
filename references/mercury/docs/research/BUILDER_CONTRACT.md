# Mercury Clone — Builder Contract (read fully before coding)

You are building **ONE section** of a pixel-perfect clone of mercury.com, inside the Next.js 16 + React 19 + Tailwind v4 + shadcn project at `/Users/shkuratovdesigner/Cursor Projects/sonar/references/mercury`. Your section screenshot is the visual source of truth — **match it exactly** (layout, spacing, font sizes, colors, proportions).

## Inputs to read first
1. **Your section screenshot** (path given in your task) under `docs/design-references/sections/`. Study it closely — it is rendered at 2× (so 2880px wide = 1440 CSS).
2. **Exact computed styles + DOM + text + asset srcs:** `docs/research/sections-extract.json` — a JSON array; find the object whose `index` equals your section's index. Its `tree` is nested `{tag, cls, text, w, h, styles, img:{src,alt}, video:{src,poster}}` with real `getComputedStyle` values and real text. Use it for exact font sizes, paddings, gaps, colors, and to know which image/video each element uses. (`w`/`h` are CSS px at 1440.)
3. **Local assets:** `public/asset-manifest.json` maps original mercury URLs → local paths under `/public`. Take an `img.src`/`video.src` from the extraction tree, find it in the manifest, and use the local `/images/...` or `/videos/...` path. Browse `public/images` and `public/videos` to confirm.

## Design system (already configured — prefer these utilities over raw hex)
- **Colors:** `bg-canvas` (#fbfcfd page bg), `bg-canvas-secondary` (#f4f5f9), `bg-surface` (#ededf3), `bg-surface-dark` (#171721 dark sections), `bg-ink` (#1e1e2a), `bg-brand` (#5266eb) + `hover:bg-brand-hover` (#4354c8), `text-ink`, `text-muted-ink` (#70707d), `text-white`, `border-line` (#d7d7de), `text-pink`/`bg-pink` (#fc92b4). On dark sections, text is `text-white`/`text-[#ededf3]`.
- **Fonts:** `font-sans` = Arcadia (body/UI, default), `font-display` = Arcadia Display (large headlines), `font-serif` = Tiempos (rare italic editorial accents). Headlines: `font-display tracking-tight` weight ~400–500. Mercury headlines are NOT bold-heavy; they're medium-weight, large, tight leading.
- **Radii:** cards `rounded-2xl`/`rounded-3xl`; buttons & pills `rounded-full`.
- **Layout:** section = full-width element carrying its own background color; inner content centered with `mx-auto w-full max-w-[1200px] px-6 md:px-10`. Section vertical padding ≈ `py-20 md:py-28` (use the extraction for exact values).
- **Icons:** `import { MercuryLogo, ArrowRightIcon, ArrowUpRightIcon, ChevronDownIcon } from "@/components/icons";` and `import { cn } from "@/lib/utils";`
- **Buttons:** primary = `bg-brand text-white rounded-full px-5 h-11 font-medium hover:bg-brand-hover`; secondary/ghost per screenshot.
- **Images:** prefer `next/image` (`import Image from "next/image"`) with explicit width/height; for full-bleed use `fill` on a sized relative parent. **Videos:** plain `<video autoPlay muted loop playsInline className="...">` with `poster` — autoplay/muted/loop work fine in a server component (no `"use client"` needed just for video).

## Rules
- Create **exactly one file**: `src/components/<Name>.tsx` (name given in your task). Default-export a component `<Name>` with **no props**; hardcode the real, verbatim text and real local assets. No lorem ipsum, no gray placeholder boxes.
- Add `"use client"` at the very top **only** if you need React state/effects (e.g. a scroll listener). Otherwise keep it a server component.
- **Responsive:** desktop = multi-column per screenshot; tablet collapses; mobile (≤640) stacks to a single column, images full-width, headline sizes step down. Use `md:`/`lg:` prefixes.
- **Do NOT edit any other file** (not globals.css, layout.tsx, page.tsx, icons.tsx, lib/utils). **Do NOT run** `npm run build`, `npm run dev`, or `tsc` — other agents edit the project concurrently. Just write strictly valid, type-safe TSX (no `any` leaks, import what you use).
- Keep it self-contained and clean. Aim for genuine pixel fidelity to the screenshot.

## Report back (terse)
File created + 1-line description + any asset you couldn't match locally.
