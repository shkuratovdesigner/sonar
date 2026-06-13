import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * GetStarted — section index 6 ("Get started fast. And never stop moving.").
 *
 * Dark section (bg #171721). Two-column layout on desktop: a left column with
 * the display headline anchored to the top and a vertical, divider-separated
 * feature list anchored toward the bottom; a right column holding the tall
 * 4:5 "apply online" artwork (a luminous fountain of light on a dark field).
 *
 * The feature list mirrors the live site: the first item is "active" — a soft
 * lavender bullet, bright title, and a supporting line — while the remaining
 * items read as collapsed rows (muted title only). On mobile everything stacks
 * to a single column with the image full-width below the copy.
 */

type Feature = {
  title: string;
  /** Superscript footnote marker shown after the title, if any. */
  footnote?: string;
  /** Supporting copy — only present on the active (expanded) item. */
  description?: string;
  active?: boolean;
};

const FEATURES: Feature[] = [
  {
    title: "Apply online in 10 minutes",
    description:
      "Free checking and savings accounts — no in-person visits or paperwork.",
    active: true,
  },
  {
    title: "Get a credit card instantly",
    footnote: "4",
  },
  {
    title: "Tackle banking tasks in seconds",
  },
];

export default function GetStarted() {
  return (
    <section className="w-full bg-surface-dark text-white">
      <div className="mx-auto w-full max-w-[1200px] px-6 pt-20 pb-20 md:px-10 md:pt-28 md:pb-24">
        <div className="grid grid-cols-1 items-start gap-x-12 gap-y-12 lg:grid-cols-[1fr_1.06fr] lg:gap-x-20 lg:gap-y-0">
          {/* Left column: heading (top) + feature list (bottom) */}
          <div className="flex flex-col lg:min-h-[600px]">
            <h2 className="font-display text-[30px] font-medium leading-[1.1] tracking-tight text-white sm:text-[34px] md:text-[38px]">
              Get started fast. And never stop moving.
            </h2>

            <ul className="mt-12 lg:mt-auto">
              {FEATURES.map((feature) => (
                <li
                  key={feature.title}
                  className="border-t border-line-dark py-5"
                >
                  <div className="flex items-start gap-3">
                    {/* Bullet gutter — filled only on the active item */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-[7px] h-[7px] w-[7px] shrink-0 rounded-full",
                        feature.active ? "bg-[#cdddff]" : "bg-transparent",
                      )}
                    />
                    <div>
                      <p
                        className={cn(
                          "text-[17px] leading-[1.4] tracking-tight",
                          feature.active
                            ? "font-semibold text-[#ededf3]"
                            : "font-normal text-[#a6a6b0]",
                        )}
                      >
                        {feature.title}
                        {feature.footnote ? (
                          <sup className="ml-0.5 text-[11px] font-normal text-[#a6a6b0]">
                            {feature.footnote}
                          </sup>
                        ) : null}
                      </p>
                      {feature.description ? (
                        <p className="mt-1.5 max-w-[26rem] text-[16px] leading-[1.45] text-[#a6a6b0]">
                          {feature.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column: tall 4:5 artwork (drives the section height on desktop) */}
          <div className="relative order-first aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface-dark-2 lg:order-none">
            <Image
              src="/images/1764029665-2025_fem_homepage-apply-online_4x5.webp"
              alt="A radiant fountain of light streaming upward from a single point — the speed of getting started with Mercury."
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
