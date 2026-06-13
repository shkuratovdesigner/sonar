import { ArrowRightIcon } from "@/components/icons";

/**
 * FinalCta — dark closing call-to-action section.
 *
 * Section index 12 of the mercury.com clone. A full-width dark section with a
 * subtle atmospheric dusk gradient (the original photographic mountain backdrop
 * is not present in the local asset manifest, so the mood is reproduced with
 * layered CSS gradients over `bg-surface-dark`). Centered Arcadia Display
 * headline with two pill CTAs.
 */
export default function FinalCta() {
  return (
    <section className="relative w-full overflow-hidden bg-surface-dark">
      {/* Atmospheric dusk gradients evoking the mountain backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 18% 0%, rgba(173,150,142,0.28) 0%, rgba(94,104,128,0.12) 34%, rgba(23,23,33,0) 62%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 90% at 82% 120%, rgba(60,72,96,0.45) 0%, rgba(23,23,33,0) 60%)",
        }}
      />
      {/* Darkening floor so content stays legible */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(23,23,33,0.1) 0%, rgba(23,23,33,0.55) 70%, rgba(23,23,33,0.85) 100%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center px-6 py-28 text-center md:px-10 md:py-36 lg:py-44">
        <h2 className="max-w-[16ch] font-display text-[36px] font-medium leading-[1.05] tracking-tight text-white sm:text-[44px] md:text-[52px]">
          Banking – redesigned from the ground up.
        </h2>

        <p className="mt-5 max-w-[34rem] text-base leading-relaxed text-[#ededf3]/70 md:mt-6 md:text-lg">
          Apply online in 10 minutes to experience banking unlike anything
          that&rsquo;s come before.
        </p>

        <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row md:mt-10">
          <a
            href="#"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand px-6 font-medium text-white transition-colors hover:bg-brand-hover sm:w-auto"
          >
            Open account
            <ArrowRightIcon className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="inline-flex h-11 w-full items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/15 sm:w-auto"
          >
            Contact sales
          </a>
        </div>
      </div>
    </section>
  );
}
