# Mercury Homepage — Behavior Bible

Behaviors that are invisible in a static screenshot. Reference when building each component.

## Navbar (scroll-driven)
- **State A (top, scrollY 0):** transparent background (`rgba(0,0,0,0)`), no shadow, no backdrop. Links/logo render **white** over the dark hero photo. Height 72px, `position: sticky; top: 0`.
- **State B (scrolled past ~hero, scrollY > ~600):** background `rgba(23,23,33,0.96)`, `backdrop-filter: blur(10px)`. Links/logo stay light. Still 72px.
- **Transition:** animate `background-color` + `backdrop-filter` (~0.3s ease). Implement with a scroll listener toggling a boolean at a threshold (~hero height or window.innerHeight * 0.6).
- Desktop nav items (Products, Solutions, Resources, About, Pricing) have hover dropdowns; for the clone, hover color change + a chevron is sufficient (full mega-menus optional). Right side: "Log in" link + "Open account" pill button (`bg-brand text-white rounded-full`).

## Hero (time-driven / video)
- Background is a full-bleed autoplaying, muted, looping `<video>` (`/videos/hero-scrub-lg.mp4`) with `hero_end_frame_xl` as poster/fallback. On the live site it is scroll-scrubbed; for the clone, an autoplay+loop muted video is an acceptable, faithful approximation.
- Foreground: centered Arcadia Display headline (white), sub-headline, an email input + "Open account" pill, and a fine-print disclaimer pinned near the bottom of the hero.

## Cards / images (hover)
- Feature cards and tiles generally have a subtle hover (slight lift / shadow or background shift). Diagonal "arrow" icons fade in on hover (opacity 0 → 100, ~0.3s). Use `ArrowUpRightIcon`/`ArrowRightIcon` from `@/components/icons`.

## Section reveal
- Most content sections are static flow (no scroll-snap, no parallax). A light fade/translate-up on enter is optional polish; not required for fidelity.

## Responsive
- Desktop ≥1024: multi-column grids (bento, 2×2 cards, 2-col text+image).
- Tablet ~768: grids reduce to 2 / stack; padding tightens.
- Mobile ≤640: everything stacks to a single column, images full-width, nav collapses to a hamburger (animated lines → X), headline sizes step down.
- Mobile reference: `docs/design-references/mercury-fullpage-mobile.png`.
