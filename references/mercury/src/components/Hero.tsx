import { cn } from "@/lib/utils";

/**
 * Hero — section 0. Full-bleed dark hero with a full-cover autoplaying, muted,
 * looping background video (poster = hero end frame). Foreground holds the
 * Arcadia Display headline, sub-headline, a combined email + "Open account"
 * pill, and a fine-print disclaimer pinned near the bottom. The navbar overlays
 * the top, so the headline block is vertically centered below it.
 */
export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-surface-dark">
      <div className="relative grid h-screen max-h-[820px] min-h-[600px] w-full grid-cols-1 overflow-hidden">
        {/* Background video (full cover) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero_end_frame_xl.30ad39be.jpg"
          className="absolute inset-0 col-start-1 row-start-1 h-full w-full object-cover"
        >
          <source src="/videos/hero-scrub-lg.mp4" type="video/mp4" />
        </video>

        {/* Legibility overlays: stronger gradient over the top (behind the
            headline) fading out toward the middle, plus a faint global tint. */}
        <div className="pointer-events-none absolute inset-0 col-start-1 row-start-1 z-[2] bg-black/15" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-2/3 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-1/3 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Foreground content — vertically centered below the overlaying navbar */}
        <div className="relative z-10 col-start-1 row-start-1 flex h-full flex-col items-center justify-center px-6 pt-[72px] md:px-10">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center text-center">
            <h1 className="font-display text-[34px] leading-[1.04] font-medium tracking-tight text-white sm:text-[44px] md:text-[52px] lg:text-[56px]">
              Radically different banking
            </h1>

            <p className="mt-5 max-w-[480px] text-[16px] leading-[1.45] text-white/75 md:mt-6 md:text-[18px]">
              {"Apply online in 10 minutes to experience banking"}
              <sup className="text-[0.6em]">1</sup>
              {" unlike anything that’s come before."}
            </p>

            {/* Combined email + CTA pill */}
            <form
              className="mt-8 flex w-full max-w-[440px] items-center gap-2 rounded-full border border-white/15 bg-white/15 p-1.5 backdrop-blur-md md:mt-9"
              action="#"
            >
              <label htmlFor="hero-email" className="sr-only">
                Email address
              </label>
              <input
                id="hero-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                className="h-11 min-w-0 flex-1 bg-transparent pl-4 pr-2 text-[15px] text-white placeholder:text-white/70 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-brand px-5 text-[15px] font-medium whitespace-nowrap text-white transition-colors hover:bg-brand-hover"
              >
                Open account
              </button>
            </form>
          </div>
        </div>

        {/* Fine-print disclaimer pinned near the bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 col-start-1 row-start-1 flex justify-center px-6 md:bottom-7">
          <p
            className={cn(
              "pointer-events-auto mx-auto w-full max-w-[1060px] rounded-xl bg-[rgba(23,23,33,0.55)] px-5 py-3 text-center",
              "text-[12px] leading-[1.4] text-white/80 backdrop-blur-sm md:text-[13px]",
            )}
          >
            Mercury is a fintech company, not an FDIC-insured bank. Banking
            services provided through Choice Financial Group and Column N.A.,
            Members FDIC.
          </p>
        </div>
      </div>
    </section>
  );
}
