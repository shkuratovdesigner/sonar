import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * PaperDisplay — section index 6 of the Daylight clone (the largest section).
 *
 * On the live site this is a ~6700px-tall pinned section that horizontally
 * scroll-scrubs through a filmstrip of full-screen panels (a 12,594px-wide
 * `will-change-transform` track), swapping product/display imagery as you
 * scroll to tell the "paper-like display" story.
 *
 * Per the BUILDER_CONTRACT, the scroll-scrub animation is rendered here as a
 * faithful STATIC stacked sequence of feature blocks — real local imagery, the
 * verbatim headline, and alternating heading + large-image + caption layouts —
 * keeping the calm, warm, generously-spaced Daylight feel. No scroll engine.
 *
 * Assets used (all local, from public/images):
 *  - product-reveal-color.webp / -portrait.webp  (the glowing DC-1 in hands)
 *  - mux-1.webp                                    (stylus writing smooth ink)
 *  - Comp_00040.webp                               (DC-1 on moss, direct daylight)
 */

const SPECS = [
  { value: "60fps", label: "Full-speed refresh" },
  { value: "0ms", label: "Perceptible ink lag" },
  { value: "10.5″", label: "LivePaper™ display" },
  { value: "Sunlight", label: "Readable, glare-free" },
] as const;

export default function PaperDisplay() {
  return (
    <section className="relative w-full overflow-hidden bg-paper text-ink">
      {/* ---------------------------------------------------------------- */}
      {/* Intro header                                                      */}
      {/* ---------------------------------------------------------------- */}
      <div className="mx-auto w-full max-w-[1200px] px-6 pt-[18vh] pb-[8vh] text-center md:px-10">
        <p className="font-extended text-[11px] uppercase tracking-[0.22em] text-ink/55">
          The display
        </p>
        <h2
          className={cn(
            "mx-auto mt-5 max-w-[18ch] font-serif font-light",
            "text-[clamp(2.25rem,6.4vw,4.5rem)]",
            "leading-[0.98] tracking-[-0.05em] text-balance",
          )}
        >
          The world&rsquo;s first full-speed{" "}
          <em className="italic">paper-like</em> display
        </h2>
        <p className="mx-auto mt-7 max-w-[46ch] font-sans text-[clamp(1rem,1.4vw,1.25rem)] font-light leading-relaxed text-ink/70">
          Smooth ink that keeps up with your hand. A reflective screen you can
          read in direct sunlight — no backlight, no flicker, no eye strain.
        </p>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Hero reveal — the glowing DC-1, centered on a soft amber glow      */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative mx-auto w-full max-w-[1320px] px-4 pb-[6vh] sm:px-6">
        <div className="relative flex items-center justify-center">
          {/* warm radial glow behind the device */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber/25 blur-[90px]"
          />
          {/* landscape on larger screens */}
          <Image
            src="/images/product-reveal-color.webp"
            alt="A pair of hands holding the Daylight DC-1, its amber-lit display glowing warmly"
            width={1920}
            height={1080}
            priority
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 88vw, 1100px"
            className="relative hidden h-auto w-full max-w-[1100px] select-none sm:block"
          />
          {/* portrait crop on phones */}
          <Image
            src="/images/product-reveal-color-portrait.webp"
            alt="Hands holding the Daylight DC-1 in portrait orientation, amber display aglow"
            width={1080}
            height={1920}
            priority
            sizes="92vw"
            className="relative h-auto w-full max-w-[420px] select-none sm:hidden"
          />
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Feature blocks (alternating)                                      */}
      {/* ---------------------------------------------------------------- */}
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[14vh] px-6 py-[12vh] md:px-10">
        {/* Block 1 — Smooth ink / full speed (image right on desktop) */}
        <FeatureBlock
          eyebrow="Full speed"
          title={
            <>
              Ink that keeps pace with{" "}
              <em className="italic">every stroke</em>
            </>
          }
          body="Other e-paper smears and stutters. The DC-1 runs at a true full-speed refresh, so handwriting, scrolling and typing land the instant you make them — with the unmistakable texture of paper."
          image={{
            src: "/images/mux-1.webp",
            alt: "Close-up of a stylus writing flowing handwritten ink across the DC-1's paper-like screen",
            width: 1280,
            height: 720,
          }}
          caption="Writing on the DC-1 with the included stylus — full-speed, lag-free ink."
        />

        {/* Block 2 — Readable in sunlight (image left on desktop) */}
        <FeatureBlock
          reverse
          eyebrow="Reflective by design"
          title={
            <>
              Brightest in <em className="italic">direct sunlight</em>
            </>
          }
          body="Instead of fighting the sun with a blinding backlight, the LivePaper™ display reflects it — like a printed page. The brighter your surroundings, the sharper it reads. Step outside and keep working."
          image={{
            src: "/images/Comp_00040.webp",
            alt: "The Daylight DC-1 resting on green moss in warm natural daylight, surrounded by leaves",
            width: 1200,
            height: 600,
          }}
          caption="A glare-free, paper-white display that thrives in the light."
        />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Spec strip                                                        */}
      {/* ---------------------------------------------------------------- */}
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-[18vh] md:px-10">
        <div className="border-y border-ink/10 py-12">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 text-center md:grid-cols-4">
            {SPECS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2">
                <dt className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-none text-ink">
                  {s.value}
                </dt>
                <dd className="font-extended text-[10px] uppercase tracking-[0.18em] text-ink/55">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- */
/* Feature block: heading + large image + short caption.                 */
/* Alternates image/text order on desktop via `reverse`; single column   */
/* on mobile.                                                             */
/* -------------------------------------------------------------------- */
function FeatureBlock({
  eyebrow,
  title,
  body,
  image,
  caption,
  reverse = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  image: { src: string; alt: string; width: number; height: number };
  caption: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16",
      )}
    >
      {/* Text */}
      <div
        className={cn(
          "lg:col-span-5",
          reverse ? "lg:order-2 lg:col-start-8" : "lg:order-1",
        )}
      >
        <p className="font-extended text-[11px] uppercase tracking-[0.2em] text-ink/55">
          {eyebrow}
        </p>
        <h3 className="mt-4 font-serif text-[clamp(1.875rem,4vw,3rem)] font-light leading-[1.02] tracking-[-0.04em] text-balance">
          {title}
        </h3>
        <p className="mt-5 max-w-[42ch] font-sans text-[clamp(1rem,1.25vw,1.125rem)] font-light leading-relaxed text-ink/70">
          {body}
        </p>
      </div>

      {/* Image */}
      <figure
        className={cn(
          "lg:col-span-7",
          reverse ? "lg:order-1 lg:col-start-1" : "lg:order-2",
        )}
      >
        <div className="overflow-hidden rounded-2xl bg-beige shadow-[0_24px_60px_-28px_rgba(24,25,15,0.35)] ring-1 ring-ink/5 lg:rounded-3xl">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 1024px) 100vw, 700px"
            className="h-auto w-full object-cover"
          />
        </div>
        <figcaption className="mt-4 px-1 font-sans text-sm font-light leading-snug text-ink/55">
          {caption}
        </figcaption>
      </figure>
    </div>
  );
}
