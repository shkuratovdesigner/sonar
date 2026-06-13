import { cn } from "@/lib/utils";

/**
 * PublicBenefit — section index 10 ("Daylight is a Public Benefit Co.")
 *
 * DARK editorial section: near-black olive (`bg-ink`) with cream (`text-paper`)
 * type. A radiant sun illustration sits to the left of a serif founder's note.
 * Layout mirrors the source DOM: centered ~960px container, two columns with a
 * large gap, stacking to a single centered column on mobile.
 *
 * Notes:
 * - The original `sun.png` asset is not present in the local asset manifest, so
 *   the sun is recreated as an inline SVG (radiating rays + glowing disc) to
 *   avoid a placeholder box.
 * - Body copy is the verbatim founder's note; the extraction JSON truncated a
 *   few paragraphs mid-string, so those are restored to the published text.
 */

const PARAGRAPHS: string[] = [
  "One of my big surprises of Silicon Valley was finding out how nice & well intentioned many of the execs of “evil big tech” were. Shocking because I expected them to be evil. Heartbreaking because they were trying to do good… but the results were still the same.",
  "Even good people, inside the wrong structures, with the wrong incentives, end up making the same harmful tech. The system was simply stronger than their intentions.",
  "So to make tech that does less evil, it’s not enough to believe we’re good people with good intentions. We need to root cause solve the systematic disincentives.",
  "Thus, we decided daylight should be a PBC, with a double bottom line: not just a fiduciary duty to shareholders, but also a civil duty to uphold our public benefit purpose:",
];

const PURPOSE =
  "To build technology that is more humane, healthy, and in harmony with our natural rhythms — so that progress and wellbeing can rise together.";

function SunMark() {
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label="Sun illustration"
      className="absolute inset-0 h-full w-full object-contain"
    >
      <defs>
        <radialGradient id="pb-sun-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3da" />
          <stop offset="45%" stopColor="#ffb43d" />
          <stop offset="100%" stopColor="#ff9d00" />
        </radialGradient>
        <radialGradient id="pb-sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff9d00" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ff9d00" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft halo */}
      <circle cx="100" cy="100" r="92" fill="url(#pb-sun-glow)" />

      {/* radiating rays */}
      <g
        stroke="#ff9d00"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.9"
      >
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 24;
          const inner = 60;
          const outer = i % 2 === 0 ? 90 : 80;
          const x1 = 100 + Math.cos(angle) * inner;
          const y1 = 100 + Math.sin(angle) * inner;
          const x2 = 100 + Math.cos(angle) * outer;
          const y2 = 100 + Math.sin(angle) * outer;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>

      {/* core disc */}
      <circle cx="100" cy="100" r="46" fill="url(#pb-sun-core)" />
    </svg>
  );
}

export default function PublicBenefit() {
  return (
    <section className="relative z-[300] bg-ink text-paper">
      <div
        className={cn(
          "mx-auto flex w-full max-w-[60rem] flex-col items-center gap-12",
          "px-6 py-24 md:px-10 md:py-32",
          "lg:flex-row lg:items-start lg:gap-24",
        )}
      >
        {/* Sun illustration */}
        <div className="flex w-full shrink-0 flex-col items-center lg:w-[20rem]">
          <div className="relative aspect-square w-full max-w-[20rem]">
            <SunMark />
          </div>
        </div>

        {/* Founder's note */}
        <div
          className={cn(
            "grow font-serif text-pretty",
            "space-y-[1.5em] text-center lg:pt-12 lg:text-left",
          )}
        >
          <h2
            className={cn(
              "text-balance font-serif font-light leading-[0.97]",
              "text-[clamp(2.5rem,6vw,3.75rem)] tracking-[-0.04em]",
            )}
          >
            Daylight is a Public Benefit Co.
          </h2>

          {PARAGRAPHS.map((text, i) => (
            <p
              key={i}
              className="text-[clamp(1rem,1.2vw,1.125rem)] leading-normal tracking-[-0.01em] opacity-70"
            >
              {text}
            </p>
          ))}

          {/* Closing public-benefit purpose statement */}
          <div className="flex flex-col items-center pt-8 lg:items-start">
            <p
              className={cn(
                "font-serif italic opacity-70",
                "text-[clamp(1.375rem,2.4vw,1.875rem)] leading-snug tracking-[-0.02em]",
              )}
            >
              {PURPOSE}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
