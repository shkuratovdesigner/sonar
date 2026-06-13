import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Hero — covers sections-extract indices 1 + 2 (the DC-1 tablet on moss).
 *
 * The live site scroll-scrubs a 168-frame WebP sequence and composites a
 * botanical e-paper render onto the tablet screen via mix-blend-multiply.
 * For this static pass we use a single representative mid-sequence frame
 * (Comp_00084.webp) as a full-cover background and overlay the real botanical
 * render (thumbnail.webp) positioned over the tablet screen to match the
 * screenshot. No scroll engine.
 */
export default function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-ink p-3 lg:p-[18px]">
      <div className="relative h-[calc(100vh-1.5rem)] min-h-[620px] w-full overflow-hidden rounded-2xl bg-olive lg:h-[calc(100vh-36px)] lg:rounded-3xl">
        {/* Full-cover moss / tablet frame */}
        <Image
          src="/images/Comp_00084.webp"
          alt="Daylight DC-1 tablet resting on green moss in warm natural light"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_center] sm:object-center"
        />

        {/* Botanical e-paper render composited onto the tablet screen.
            Positioned to sit over the screen area of the representative frame. */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <Image
            src="/images/thumbnail.webp"
            alt="Botanical illustration rendered on the Daylight tablet's e-paper screen"
            width={1080}
            height={1350}
            aria-hidden
            className="absolute left-1/2 top-1/2 w-[clamp(180px,17vw,260px)] -translate-x-[8%] -translate-y-1/2 rotate-[14deg] opacity-90 mix-blend-multiply"
          />
        </div>

        {/* Soft warmth + top vignette so dark ink text stays legible */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper/35 via-transparent to-ink/15" />

        {/* ---- Overlaid copy: top-left (recenters on mobile) ---- */}
        <div className="absolute inset-x-0 top-0 px-6 pt-10 text-center sm:px-10 sm:pt-14 lg:max-w-[640px] lg:px-12 lg:pt-16 lg:text-left">
          <h1 className="font-serif text-[clamp(2.25rem,6vw,4.25rem)] font-light leading-[1.02] tracking-tight text-ink">
            The computer, de-invented
          </h1>
          <p className="mx-auto mt-4 max-w-md font-sans text-base font-light leading-snug text-ink/80 sm:text-lg lg:mx-0">
            Meet DC-1. A new kind of computer, designed for deep focus and
            wellbeing.
          </p>
          <a
            href="#order"
            className={cn(
              "mt-6 inline-flex h-11 items-center justify-center rounded-full bg-amber px-6",
              "font-sans text-sm font-medium text-ink shadow-sm transition-colors",
              "hover:bg-amber/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30"
            )}
          >
            Order now
          </a>
        </div>

        {/* ---- Floating video-thumbnail card (bottom-left) ---- */}
        <div className="absolute bottom-5 left-5 hidden sm:block lg:bottom-7 lg:left-7">
          <button
            type="button"
            aria-label="Play product film"
            className="group relative h-[88px] w-[150px] overflow-hidden rounded-xl shadow-lg ring-1 ring-ink/10 lg:h-[104px] lg:w-[176px]"
          >
            {/* Park / outdoor scene recreated in markup (no local asset matched) */}
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-[#8fa86b] via-[#5f7d44] to-[#3c5230]"
            />
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#cdd6c0] to-transparent"
            />
            {/* Suggested skyline silhouette */}
            <span
              aria-hidden
              className="absolute left-3 top-4 h-6 w-2 bg-[#7c8a6e]/70"
            />
            <span
              aria-hidden
              className="absolute left-6 top-3 h-7 w-2.5 bg-[#6e7d60]/70"
            />
            <span
              aria-hidden
              className="absolute left-[2.3rem] top-5 h-5 w-2 bg-[#7c8a6e]/70"
            />
            {/* Tree silhouette */}
            <span
              aria-hidden
              className="absolute bottom-0 right-5 h-9 w-9 rounded-full bg-[#2f4526]/80"
            />
            <span
              aria-hidden
              className="absolute bottom-0 right-[2.1rem] h-5 w-1.5 bg-[#2f4526]/80"
            />
            {/* Amber play button */}
            <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-amber shadow-md transition-transform group-hover:scale-105">
              <svg
                viewBox="0 0 24 24"
                className="ml-0.5 h-4 w-4 fill-ink"
                aria-hidden
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        </div>

        {/* ---- Newsletter / Order card (bottom-right) ---- */}
        <div
          id="order"
          className="absolute inset-x-4 bottom-4 mx-auto max-w-sm rounded-2xl bg-paper/95 p-4 shadow-xl ring-1 ring-ink/5 backdrop-blur-sm sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[300px] lg:right-7 lg:bottom-7"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-serif text-xl font-light text-ink">
                Newsletter
              </p>
              <p className="mt-0.5 font-extended text-[11px] uppercase tracking-wide text-ink/55">
                Get updates · No spam
              </p>
            </div>
            <button
              type="button"
              aria-label="Dismiss"
              className="-mt-1 -mr-1 grid h-7 w-7 place-items-center rounded-full text-ink/40 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </button>
          </div>

          <div className="mt-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-ink/60">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber" />
            In stock · Ships in 3–5 business days
          </div>

          <a
            href="#order"
            className="mt-3 flex h-11 w-full items-center justify-center rounded-full bg-amber font-sans text-sm font-medium uppercase tracking-wide text-ink shadow-sm transition-colors hover:bg-amber/90"
          >
            Order now
          </a>
        </div>
      </div>
    </section>
  );
}
