import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * AmberGlow — section index 7.
 *
 * "When the lights go off, enjoy the amber glow." → "Goodbye, blue light."
 * A dark, warm night-mode section: the DC-1 lying on dark grass at night with
 * its amber backlight glowing. On the real site this is a pinned, scroll-scrubbed
 * frame sequence (Comp_*.webp) over a near-black background; here it is rendered
 * as a faithful static composition using representative amber-lit frames plus the
 * warm dim hand-writing shot (mux-1).
 */
export default function AmberGlow() {
  return (
    <section className="relative w-full overflow-hidden bg-ink text-paper">
      {/* Subtle amber radial bloom from the lower-center, evoking the screen glow
          bleeding into the dark scene. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 78%, rgba(255,157,0,0.18) 0%, rgba(255,157,0,0.06) 32%, rgba(24,25,15,0) 62%)",
        }}
      />

      {/* ============ Part 1: hero — amber-lit device at night ============ */}
      <div className="relative z-10">
        {/* Eyebrow */}
        <div className="mx-auto w-full max-w-[1200px] px-6 pt-24 md:px-10 md:pt-32">
          <p className="font-extended text-[11px] uppercase tracking-[0.22em] text-amber/90">
            Blue-light-free
          </p>
        </div>

        {/* Big centered display headline sitting over the dark scene */}
        <h2
          className={cn(
            "mx-auto mt-6 max-w-[14ch] px-6 text-center font-serif font-light text-paper",
            "text-[clamp(2.5rem,7vw,3.5rem)] leading-[1.02] tracking-[-0.03em]",
          )}
        >
          When the lights go off, enjoy the amber&nbsp;glow.
        </h2>

        {/* Hero amber-glow frame: device on dark grass, screen lit amber */}
        <div className="relative mx-auto mt-12 w-full max-w-[1200px] px-6 md:mt-16 md:px-10">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl">
            <Image
              src="/images/Comp_00168.webp"
              alt="The Daylight DC-1 tablet resting on dark grass at night, its screen glowing warm amber"
              fill
              priority={false}
              sizes="(max-width: 768px) 100vw, 1120px"
              className="object-cover"
            />
            {/* gentle vignette so the rounded frame reads against the section bg */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_120px_40px_rgba(24,25,15,0.55)]"
            />
          </div>
        </div>
      </div>

      {/* ============ Part 2: "Goodbye, blue light." copy + warm imagery ============ */}
      <div className="relative z-10 mx-auto mt-20 w-full max-w-[1200px] px-6 pb-24 md:mt-28 md:px-10 md:pb-36">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: warm dim "writing in the dark" image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
              <Image
                src="/images/mux-1.webp"
                alt="A hand writing with a stylus on the Daylight tablet in warm, dim amber light"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>

            {/* Stat row, warm-toned, beneath the image */}
            <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:gap-10">
              <div className="flex-1">
                <p className="font-serif text-[clamp(2rem,4vw,2.75rem)] font-light leading-none tracking-[-0.03em] text-amber">
                  0%
                </p>
                <p className="mt-3 max-w-[20ch] text-sm font-light leading-snug text-paper/65">
                  Blue light emitted — even after the sun goes down.
                </p>
              </div>
              <div className="flex-1">
                <p className="font-serif text-[clamp(2rem,4vw,2.75rem)] font-light leading-none tracking-[-0.03em] text-amber">
                  1–100%
                </p>
                <p className="mt-3 max-w-[20ch] text-sm font-light leading-snug text-paper/65">
                  Amber backlight, dimmable to a candle-soft glow.
                </p>
              </div>
            </div>
          </div>

          {/* Right: headline + paragraph */}
          <div className="order-1 max-lg:text-center lg:order-2 lg:pl-10">
            <h3 className="font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-[0.97] tracking-[-0.035em] text-paper">
              Goodbye, blue&nbsp;light.
            </h3>
            <p className="mx-auto mt-6 max-w-[23em] text-[clamp(1.05rem,1.6vw,1.3rem)] font-normal leading-snug tracking-[-0.01em] text-paper/85 lg:mx-0">
              Most devices emit blue light that affects your circadian rhythm,
              even in night mode. Daylight doesn&rsquo;t.
            </p>

            {/* Secondary amber-lit frame to reinforce the warm mood on the copy side */}
            <div className="relative mt-10 hidden aspect-[16/10] w-full overflow-hidden rounded-3xl lg:block">
              <Image
                src="/images/Comp_00120.webp"
                alt="Close view of the Daylight tablet's warm amber backlight in a dark setting"
                fill
                sizes="560px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
