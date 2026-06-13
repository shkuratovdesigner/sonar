"use client";

/**
 * FeesYield — section index 7 ("Stop losing money to fees. Start using it to
 * fuel your growth.").
 *
 * Dark (`bg-surface-dark`) section. Desktop: a tall 4:5 visual card on the
 * LEFT and, on the RIGHT, a display headline pinned to the top with an
 * interactive feature accordion pinned toward the bottom. Selecting an item
 * expands its description and swaps the left visual. Mobile stacks to a single
 * column (headline, then visual, then list).
 *
 * Imagery: the active "payments" item shows a CSS-reconstructed luminous
 * sphere (the live-site graphic for this item is not in the asset manifest);
 * the other two items use the local manifest assets `net-yield` (toggles) and
 * `portfolio` ($5M vs $250K bars). Footnote markers (²/⁵) mirror the
 * screenshot's superscripts.
 */

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Item = {
  title: React.ReactNode;
  body?: React.ReactNode;
};

const ITEMS: Item[] = [
  {
    title: "Send no-fee USD payments around the globe",
    body: (
      <>
        $0 USD wires and $0 maintenance fees can save you thousands of dollars
        per year.<sup className="text-[0.7em] align-super">5</sup>
      </>
    ),
  },
  {
    title: "Earn 1.5% cashback on credit spend",
  },
  {
    title: (
      <>
        Earn up to 4.46% yield with Mercury Treasury
        <sup className="text-[0.7em] align-super">2</sup>
      </>
    ),
  },
];

/** Concentric "ripple" sphere visual for the active payments item. */
function SphereVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Soft off-white field */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_45%,#ffffff_0%,#f3f3f1_55%,#e9e9e7_100%)]" />
      {/* Concentric ripple rings emanating from centre */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[1, 2, 3, 4, 5].map((r) => (
          <span
            key={r}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0c0c14]/[0.06]"
            style={{ width: `${r * 150}px`, height: `${r * 150}px` }}
          />
        ))}
      </div>
      {/* Central sphere with longitudinal/latitudinal lines */}
      <div className="absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2">
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_38%_32%,#ffffff_0%,#f2f2f1_45%,#dededb_100%)] shadow-[0_18px_40px_rgba(12,12,20,0.12)]" />
        {/* meridians */}
        <span className="absolute inset-0 rounded-[50%] border border-[#0c0c14]/[0.18]" />
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#0c0c14]/[0.18]" />
        <span className="absolute inset-y-0 left-1/2 w-[44%] -translate-x-1/2 rounded-[50%] border-x border-[#0c0c14]/[0.16]" />
        <span className="absolute inset-y-0 left-1/2 w-[82%] -translate-x-1/2 rounded-[50%] border-x border-[#0c0c14]/[0.12]" />
        {/* nodes */}
        <span className="absolute left-1/2 top-1/2 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0c0c14]/70" />
        <span className="absolute left-1/2 top-[18%] h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-[#0c0c14]/60" />
        <span className="absolute bottom-[16%] left-1/2 h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-[#0c0c14]/60" />
      </div>
    </div>
  );
}

function ImageVisual({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 1024px) 100vw, 531px"
      className="object-cover object-top"
    />
  );
}

export default function FeesYield() {
  const [active, setActive] = useState(0);

  return (
    <section className="w-full bg-surface-dark text-white">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        {/* Mobile: single flex column → headline, visual, accordion.
            Desktop: 2-col grid (visual left, spanning both rows; headline
            top-right, accordion bottom-right) at a fixed section height so
            the tall portrait card is cropped by the section's bottom edge. */}
        <div className="flex flex-col gap-8 pt-20 pb-20 md:grid md:h-[704px] md:grid-cols-[531px_minmax(0,1fr)] md:grid-rows-[auto_1fr] md:gap-x-8 md:gap-y-0 md:pt-28 md:pb-0">
          {/* Headline */}
          <h2 className="order-1 max-w-[440px] font-display text-[26px] font-medium leading-[1.15] tracking-tight text-white md:order-none md:col-start-2 md:row-start-1">
            Stop losing money to fees. Start using it to fuel your growth.
          </h2>

          {/* Visual card — swaps with the active item. Keeps its 4:5 portrait
              ratio on mobile; on desktop spans both grid rows and is clipped by
              the section bottom. */}
          <div className="order-2 w-full md:order-none md:col-start-1 md:row-span-2 md:row-start-1 md:h-full">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl md:h-full md:w-[531px]">
              {active === 0 && <SphereVisual />}
              {active === 1 && (
                <ImageVisual
                  src="/images/1764621344-2025_fem_homepage-portfolio_4x5.webp"
                  alt="A comparison showing $5M of coverage with Mercury versus the $250K industry standard"
                />
              )}
              {active === 2 && (
                <ImageVisual
                  src="/images/1764621041-2025_fem_homepage-net-yield_4x5.webp"
                  alt="Three toggle switches with the bottom one switched on, illustrating yield earned with Mercury Treasury"
                />
              )}
            </div>
          </div>

          {/* Accordion — pinned to the bottom of the right column on desktop */}
          <div className="order-3 md:order-none md:col-start-2 md:row-start-2 md:flex md:items-end">
            <ul className="flex w-full flex-col">
              {ITEMS.map((item, i) => {
                const isActive = i === active;
                return (
                  <li
                    key={i}
                    className="border-t border-white/15 first:border-t-0 md:first:border-t"
                  >
                    <button
                      type="button"
                      aria-expanded={isActive}
                      onClick={() => setActive(i)}
                      className="group relative block w-full py-5 text-left"
                    >
                      {/* Hanging bullet — outdented into the left gutter, so
                          titles stay flush with the divider edge. */}
                      <span
                        className={cn(
                          "absolute left-[-20px] top-[27px] h-[7px] w-[7px] rounded-full bg-[#9cb4e8] transition-opacity duration-300",
                          isActive ? "opacity-100" : "opacity-0",
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={cn(
                          "block text-[16px] leading-snug font-medium transition-colors duration-300",
                          isActive
                            ? "text-white"
                            : "text-white/55 group-hover:text-white/80",
                        )}
                      >
                        {item.title}
                      </span>
                      <span
                        className={cn(
                          "grid transition-all duration-300 ease-out",
                          isActive && item.body
                            ? "mt-1.5 grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <span className="overflow-hidden">
                          <span className="block max-w-[340px] text-[15px] leading-snug text-white/55">
                            {item.body}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
