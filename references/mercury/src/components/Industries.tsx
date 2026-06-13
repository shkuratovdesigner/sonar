"use client";

/**
 * Industries — section index 3.
 *
 * Dark section (sits on the same `bg-surface-dark` as the preceding
 * SocialProof strip). A single large ~2:1 rounded image "card" carries a
 * full-bleed customer photo with two overlays: an industry pill in the
 * top-left and a testimonial quote + author in the bottom-left. Below the
 * card sits a 3-segment indicator that doubles as the tab control — one
 * segment per industry (SaaS / Ecommerce / Agency). Clicking a segment
 * cross-fades to that industry's testimonial.
 *
 * Geometry/colours read from docs/research/sections-extract.json (index 3)
 * and docs/design-references/sections/04-industries.png:
 *   - section top padding 72px; content offset/centered, card ~1013px wide
 *   - card content/padding inset 32px; card height ~506px (≈2:1)
 *   - active indicator bar #ededf3, inactive ~white/15; 3 equal bars ~156px
 * All copy + author lines are verbatim from mercury.com; the three photos
 * are the testimonial assets in public/images (Linear / Gainful / Ways &
 * Means).
 */

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Industry = {
  id: string;
  /** Pill label shown on the card. */
  label: string;
  quote: string;
  author: string;
  role: string;
  image: string;
  alt: string;
};

const INDUSTRIES: Industry[] = [
  {
    id: "saas",
    label: "SaaS",
    quote:
      "Unlike most financial institutions, Mercury is built on software. Everything can be done within the app in 1-2 minutes.",
    author: "Karri Saarinen",
    role: "Founder, Linear",
    image: "/images/1764095939-2025_fem_testimonial-linear_2x1.webp",
    alt: "Karri Saarinen, Founder of Linear",
  },
  {
    id: "ecommerce",
    label: "Ecommerce",
    quote:
      "Building an ecommerce brand with millions of customers means constant change. Mercury is the one part of our finance stack that always keeps pace.",
    author: "Eric Wu and Jahaan Ansari",
    role: "Co-Founders, Gainful",
    image: "/images/1764169450-2025_fem_homepage-testimonial-gainful_4x5.webp",
    alt: "Eric Wu and Jahaan Ansari, Co-Founders of Gainful",
  },
  {
    id: "agency",
    label: "Agency",
    quote:
      "We love Mercury's interface. Built-in permissions means our accountant can easily make payments — literally one click and it's done.",
    author: "Karen Halstead",
    role: "Founder, Ways & Means",
    image: "/images/1764096101-2025_fem_testimonial-ways-and-means_2x1.webp",
    alt: "Karen Halstead, Founder of Ways & Means",
  },
];

export default function Industries() {
  const [active, setActive] = useState(0);

  return (
    <section className="w-full bg-surface-dark text-white">
      <div className="mx-auto w-full max-w-[1200px] px-6 pt-16 md:px-10 md:pt-[72px]">
        {/* Card cluster — width-constrained, centered within the container. */}
        <div className="mx-auto w-full max-w-[1013px]">
          {/* Image card with stacked, cross-fading testimonial panels. */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-surface-dark-2 sm:aspect-[16/9] md:aspect-[2/1]">
            {INDUSTRIES.map((ind, i) => (
              <article
                key={ind.id}
                aria-hidden={i !== active}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500 ease-out",
                  i === active
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0",
                )}
              >
                <Image
                  src={ind.image}
                  alt={ind.alt}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 1013px"
                  className="object-cover"
                />

                {/* Legibility scrim behind the bottom-left quote. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent"
                />

                {/* Industry pill — top-left, 32px inset on desktop. */}
                <span className="absolute left-5 top-5 inline-flex items-center rounded-lg bg-black/45 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm md:left-8 md:top-8">
                  {ind.label}
                </span>

                {/* Quote + author — bottom-left, 32px inset on desktop. */}
                <figure className="absolute inset-x-5 bottom-5 md:inset-x-8 md:bottom-8">
                  <blockquote className="max-w-[420px] text-[17px] leading-[1.45] font-medium text-white text-balance md:text-[19px]">
                    &ldquo;{ind.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 md:mt-6">
                    <div className="text-[15px] font-semibold text-white">
                      {ind.author}
                    </div>
                    <div className="text-[15px] text-white/65">{ind.role}</div>
                  </figcaption>
                </figure>
              </article>
            ))}
          </div>

          {/* Segmented indicator / tab control. */}
          <div
            role="tablist"
            aria-label="Industries"
            className="mt-5 flex items-center justify-center gap-2 md:mt-6"
          >
            {INDUSTRIES.map((ind, i) => (
              <button
                key={ind.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={ind.label}
                onClick={() => setActive(i)}
                className="group flex h-4 w-[120px] items-center md:w-[156px]"
              >
                <span
                  className={cn(
                    "h-[3px] w-full rounded-full transition-colors duration-300",
                    i === active
                      ? "bg-[#ededf3]"
                      : "bg-white/15 group-hover:bg-white/30",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
