import { cn } from "@/lib/utils";

/**
 * Testimonials — section index 9 of the Daylight clone ("What people are saying").
 *
 * Live-site source of truth: a DARK section (bg-night → bg-ink, text-moonlight →
 * text-paper) with a large flared-serif heading whose two halves are split across
 * the row ("What people" left, "are saying" right-aligned, italicised), followed by
 * a loose masonry of testimonial cards. On daylightcomputer.com the cards are a
 * JS-driven, slightly-overlapping cluster with a parallax tilt; per the builder
 * contract we render a faithful STATIC, responsive masonry.
 *
 * The extraction tree for this section is shallow (cards are client-rendered, so the
 * quotes/avatars never made it into sections-extract.json or the local asset
 * manifest). The verbatim quotes, names and roles below were recovered from the live
 * site. No headshot assets exist locally, so each avatar is recreated in markup as a
 * small monogram chip in the warm palette (no gray placeholders).
 *
 * Closing row recreates the "know more about daylight on:" press strip.
 */

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** monogram shown in the avatar chip */
  initials: string;
  /** tailwind classes tinting the avatar chip */
  avatar: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "It's the only computer I feel comfortable sharing with my kids!",
    name: "Akshay Kothari",
    role: "Co-Founder @ Notion",
    initials: "AK",
    avatar: "bg-amber/20 text-amber",
  },
  {
    quote:
      "Daylight gets it — a computer that brings the simplicity back to our digital life.",
    name: "Waqas Ali",
    role: "Founder @ Atoms",
    initials: "WA",
    avatar: "bg-paper/12 text-paper",
  },
  {
    quote:
      "The Daylight is the computer of tomorrow. It does not bathe you in blue light or endless notifications. It's fast and beautiful, like a trim little boat.",
    name: "Soleio",
    role: "Early Design @ Meta, Dropbox",
    initials: "S",
    avatar: "bg-paper/12 text-paper",
  },
  {
    quote:
      "There is simply no better device out there right now for reading long-form, navigating knowledge archives or the night sky, panning around, zooming and marking up PDFs, and writing.",
    name: "Andrew",
    role: "Founder @ UrsaBio",
    initials: "U",
    avatar: "bg-amber/20 text-amber",
  },
];

const PRESS = ["The Verge", "WIRED", "TechRadar", "Daring Fireball"];

function Avatar({ initials, avatar }: Pick<Testimonial, "initials" | "avatar">) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
        "font-sans text-sm font-medium tracking-wide",
        "ring-1 ring-inset ring-paper/15",
        avatar,
      )}
    >
      {initials}
    </span>
  );
}

function Card({ t, className }: { t: Testimonial; className?: string }) {
  return (
    <figure
      className={cn(
        "break-inside-avoid rounded-3xl",
        "bg-paper/[0.04] ring-1 ring-inset ring-paper/10",
        "px-7 py-7 md:px-8 md:py-8",
        "transition-colors duration-300 hover:bg-paper/[0.07]",
        className,
      )}
    >
      <blockquote
        className={cn(
          "font-serif font-light text-paper",
          "text-[clamp(1.15rem,1.9vw,1.5rem)] leading-[1.32] tracking-[-0.01em]",
          "text-balance",
        )}
      >
        {t.quote}
      </blockquote>

      <figcaption className="mt-7 flex items-center gap-3.5">
        <Avatar initials={t.initials} avatar={t.avatar} />
        <span className="flex flex-col">
          <span className="font-sans text-[0.95rem] font-medium leading-snug text-paper">
            {t.name}
          </span>
          <span className="font-sans text-sm font-light leading-snug text-paper/55">
            {t.role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section className="relative w-full overflow-x-clip bg-ink text-paper">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-[clamp(5rem,11vw,9rem)] md:px-10">
        {/* Heading — split across the row, "are saying" set in italic on the right */}
        <h2
          className={cn(
            "flex flex-col font-serif font-light",
            "text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.04em]",
            "lg:flex-row lg:items-end lg:justify-between",
          )}
        >
          <span className="block whitespace-nowrap">What people</span>
          <span className="block whitespace-nowrap italic lg:text-right">
            are saying
          </span>
        </h2>

        {/* Masonry of testimonial cards: multi-column on desktop, single column on mobile */}
        <div
          className={cn(
            "mt-[clamp(2.5rem,5vw,4.5rem)]",
            "gap-5 md:gap-6",
            "columns-1 md:columns-2",
            "[&>*]:mb-5 md:[&>*]:mb-6",
          )}
        >
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </div>

        {/* Press / social strip */}
        <div className="mt-[clamp(3rem,6vw,5rem)]">
          <p className="text-center font-sans text-sm font-light tracking-wide text-paper/50">
            know more about daylight on:
          </p>
          <ul
            className={cn(
              "mx-auto mt-5 flex max-w-max flex-wrap items-center justify-center",
              "gap-x-8 gap-y-3 max-md:grid max-md:grid-cols-2 max-md:gap-x-10",
            )}
          >
            {PRESS.map((name) => (
              <li key={name}>
                <span
                  className={cn(
                    "font-serif text-lg font-light tracking-tight text-paper/75",
                    "transition-colors duration-200 hover:text-paper",
                  )}
                >
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
