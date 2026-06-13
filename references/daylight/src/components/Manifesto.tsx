import { cn } from "@/lib/utils";

/**
 * Manifesto — section index 5 of the Daylight clone.
 *
 * On the live site this is a 500vh pinned, scroll-scrubbed type reveal where the
 * manifesto statement animates in word-by-word and then crossfades into the
 * "Introducing Daylight" line. Per the builder contract we render a faithful
 * STATIC version: the real verbatim copy, the calm light-weight flared serif, the
 * exact emphasis (Daylight set in italic), and the very generous vertical
 * whitespace that makes the statement feel like a held breath.
 */
export default function Manifesto() {
  return (
    <section className="relative w-full bg-paper text-ink">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-[14vh] px-6 py-[26vh] text-center md:px-10">
        {/* Statement 1 — the refusal */}
        <h2
          className={cn(
            "font-serif font-light",
            "max-w-[1080px]",
            "text-[clamp(2.25rem,6.4vw,3.75rem)]",
            "leading-[0.97] tracking-[-0.06em]",
            "text-balance",
          )}
        >
          We refuse to accept a future where our devices are exhausting,
          addictive, and distracting
        </h2>

        {/* Statement 2 — the reveal. "Daylight" is set in italic. */}
        <h2
          className={cn(
            "font-serif font-light",
            "max-w-[900px]",
            "text-[clamp(2.25rem,6.4vw,3.75rem)]",
            "leading-[0.97] tracking-[-0.06em]",
            "text-balance",
          )}
        >
          Introducing <em className="italic">Daylight</em> — a healthier, more
          human-friendly computer
        </h2>
      </div>
    </section>
  );
}
