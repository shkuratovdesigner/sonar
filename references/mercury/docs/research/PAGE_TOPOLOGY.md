# Mercury Homepage — Page Topology (assembly blueprint)

Viewport recon: desktop 1440 (content max-width ~1200px, 16-col grid, 32px gutters), page ~11,110px tall. Light canvas (`#fbfcfd`) with several dark (`#171721`) sections. Native scroll (no Lenis). DPR 2.

Render order in `src/app/page.tsx` (each = one component in `src/components/`):

| # | Component | Section label | bg | Notes |
|---|-----------|---------------|----|-------|
| nav | `Navbar` | top bar | transparent → dark frosted on scroll | fixed/sticky overlay, z above hero |
| 0 | `Hero` | "Radically different banking" | dark photo/video | full-bleed scrubbed video bg, centered headline, email+CTA, disclaimer bar |
| 1 | `EverythingBento` | "Everything you do with money. All in one place." | light | bento grid of product mockups (video/img tiles) |
| 2 | `SocialProof` | "Loved by 300K+…" | light | headline + customer logo wall |
| 3 | `Industries` | "SaaS / Unlike most financial institutions…" | light | industry switcher + supporting imagery |
| 4 | `HeadStartCards` | "Banking's been a headache. Now, it's a head start." | **dark** | 2×2 feature cards (virtual cards, bill pay, invoicing, receipts) |
| 5 | `TestimonialLinear` | "Mercury has completely changed my expectations…" | light | large pull-quote + customer image |
| 6 | `GetStarted` | "Get started fast. And never stop moving." | light | text + apply-online imagery |
| 7 | `FeesYield` | "Stop losing money to fees…" | light | yield/fees feature + imagery |
| 8 | `SeasonedPro` | "Run your business like a seasoned pro / Total visibility" | light | feature block, total-visibility + guidance imagery |
| 9 | `TestOfTime` | "You're creating something to stand the test of time." | light | short editorial text section |
| 10 | `Protection` | "Standard protection stops short. Mercury goes further." | light | security/coverage stats + imagery |
| 11 | `Spotlight` | "Mercury in the spotlight / $650M in annual revenue" | light | stats + press logos (WSJ, Fortune, Fast Co) |
| 12 | `FinalCta` | "Banking – redesigned from the ground up." | dark | closing CTA (Open account / Contact sales) |
| footer | `Footer` | link columns + legal | light | multi-column nav + disclaimer fine print |

Page-level: `Navbar` is sticky and overlays `Hero`. Everything else is normal flow. Assembly wires them top-to-bottom inside a single scroll container.
