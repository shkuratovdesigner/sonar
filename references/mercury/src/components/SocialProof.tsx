/**
 * SocialProof — section index 2 ("Loved by 300K+ ...").
 *
 * Dark, short section: a centered display headline above a horizontal,
 * edge-faded marquee of customer wordmarks.
 *
 * NOTE: the real customer logos are NOT present in /public (the asset
 * manifest only contains two testimonial photos, no wordmark SVGs/images).
 * Per the builder contract we substitute tasteful text wordmark placeholders
 * in `text-muted-ink`, matching the count, order, and spacing of the
 * screenshot. The strip auto-scrolls (mask-faded both edges) to mirror the
 * original marquee, with motion disabled under prefers-reduced-motion.
 */

const LOGOS: string[] = [
  "BOGEY BROS",
  "Linktree",
  "GAINFUL",
  "supabase",
  "Linear",
  "Lovable",
  "partiful",
  "Ramp",
];

function Wordmark({ name }: { name: string }) {
  // Per-brand light styling so the row reads as distinct wordmarks rather
  // than one repeated label, while staying monochrome like the screenshot.
  const styleByName: Record<string, string> = {
    "BOGEY BROS": "font-display font-semibold tracking-[0.12em] text-[15px]",
    Linktree: "font-sans font-semibold tracking-tight text-[22px]",
    GAINFUL: "font-display font-semibold tracking-[0.22em] text-[20px]",
    supabase: "font-sans font-medium tracking-tight text-[24px] lowercase",
    Linear: "font-sans font-semibold tracking-tight text-[24px]",
    Lovable: "font-display font-bold tracking-tight text-[24px]",
    partiful: "font-sans font-medium tracking-tight text-[24px] lowercase",
    Ramp: "font-display font-semibold tracking-tight text-[24px]",
  };

  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center whitespace-nowrap text-muted-ink/70 ${
        styleByName[name] ?? "font-sans font-semibold text-[22px]"
      }`}
    >
      {name}
    </span>
  );
}

export default function SocialProof() {
  // Two identical sequences back-to-back so the -50% translate loops seamlessly.
  const sequence = [...LOGOS, ...LOGOS];

  return (
    <section className="w-full bg-surface-dark text-white">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-6 pt-28 pb-16 md:px-10 md:pt-36 md:pb-20">
        {/* Headline */}
        <h2 className="max-w-[680px] text-center font-display font-medium tracking-tight text-balance text-[34px] leading-[1.1] text-white sm:text-[42px] md:text-[52px]">
          Loved by 300K+ of the most ambitious entrepreneurs on the planet
        </h2>

        {/* Logo marquee */}
        <div
          className="relative mt-12 w-full overflow-hidden md:mt-16"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
          }}
          aria-label="Trusted by leading companies"
        >
          <ul className="sp-marquee flex w-max items-center gap-x-12 sm:gap-x-16 md:gap-x-24">
            {sequence.map((name, i) => (
              <li key={`${name}-${i}`} className="flex items-center">
                <Wordmark name={name} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .sp-marquee {
          animation: sp-marquee-scroll 38s linear infinite;
        }
        @keyframes sp-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sp-marquee {
            animation: none;
            justify-content: center;
            width: 100%;
            flex-wrap: wrap;
            row-gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
