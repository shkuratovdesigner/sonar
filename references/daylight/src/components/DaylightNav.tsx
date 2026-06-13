"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Product", href: "#product" },
  { label: "FAQ", href: "#faq" },
] as const;

/** The small Daylight sun/leaf glyph, recreated inline so it needs no asset. */
function DaylightMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* sun disc */}
      <circle cx="12" cy="12" r="4.4" fill="currentColor" />
      {/* radiating leaf-like rays */}
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M12 2.6v3.1" />
        <path d="M12 18.3v3.1" />
        <path d="M2.6 12h3.1" />
        <path d="M18.3 12h3.1" />
        <path d="M5.4 5.4l2.2 2.2" />
        <path d="M16.4 16.4l2.2 2.2" />
        <path d="M18.6 5.4l-2.2 2.2" />
        <path d="M7.6 16.4l-2.2 2.2" />
      </g>
    </svg>
  );
}

/** Circular "LIMITED · daylight KIDS · BUNDLE" amber seal from the screenshot. */
function KidsSeal({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative grid h-[68px] w-[68px] shrink-0 place-items-center rounded-full bg-amber text-ink shadow-sm",
        "md:h-[76px] md:w-[76px]",
        className,
      )}
      aria-label="Limited Daylight Kids bundle"
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full text-ink/90"
        aria-hidden="true"
      >
        <defs>
          <path id="seal-top" d="M16,50 a34,34 0 0 1 68,0" fill="none" />
          <path id="seal-bottom" d="M18,52 a32,32 0 0 0 64,0" fill="none" />
        </defs>
        <text className="font-extended" fill="currentColor" fontSize="9.5" letterSpacing="1.6">
          <textPath href="#seal-top" startOffset="50%" textAnchor="middle">
            LIMITED
          </textPath>
        </text>
        <text className="font-extended" fill="currentColor" fontSize="9.5" letterSpacing="1.6">
          <textPath href="#seal-bottom" startOffset="50%" textAnchor="middle">
            BUNDLE
          </textPath>
        </text>
      </svg>
      <span className="relative flex flex-col items-center leading-none">
        <span className="font-serif text-[11px] lowercase tracking-tight text-ink md:text-[12px]">
          daylight
        </span>
        <span className="mt-[2px] rounded-[3px] bg-paper px-[5px] py-[1px] font-extended text-[10px] font-bold uppercase tracking-[0.12em] text-ink md:text-[11px]">
          Kids
        </span>
      </span>
    </div>
  );
}

export default function DaylightNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex w-full max-w-[1320px] items-start justify-between gap-4 px-4 py-4 md:px-8 md:py-6">
        {/* LEFT: logo mark on a paper chip */}
        <a
          href="#home"
          aria-label="Daylight home"
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-paper/70 text-ink backdrop-blur-md transition-colors hover:bg-paper/90"
        >
          <DaylightMark className="h-6 w-6 text-amber" />
        </a>

        {/* RIGHT: nav pill + promo seal */}
        <div className="flex items-start gap-3">
          {/* Desktop nav pill */}
          <nav className="pointer-events-auto hidden overflow-hidden rounded-2xl border border-black/10 lg:block">
            <ul className="flex h-[58px] items-center gap-1 bg-paper/80 p-1.5 backdrop-blur-lg">
              {NAV_LINKS.map((link, i) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={cn(
                      "inline-flex h-[42px] items-center whitespace-nowrap rounded-xl px-4 text-[16px] tracking-[-0.02em] text-ink transition-colors",
                      i === 0
                        ? "bg-paper font-medium shadow-sm"
                        : "font-light text-ink/70 hover:text-ink",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#order"
                  className="ml-1 inline-flex h-[42px] items-center whitespace-nowrap rounded-full bg-amber px-5 text-[15px] font-medium tracking-[-0.01em] text-ink transition-opacity hover:opacity-90"
                >
                  Order now
                </a>
              </li>
            </ul>
          </nav>

          {/* The amber "Daylight Kids" limited seal (overlaps the pill, per screenshot) */}
          <KidsSeal className="-ml-3 mt-[-2px] hidden lg:grid" />

          {/* Mobile: order pill + menu toggle */}
          <div className="pointer-events-auto flex items-center gap-2 lg:hidden">
            <a
              href="#order"
              className="inline-flex h-11 items-center whitespace-nowrap rounded-full bg-amber px-5 text-[15px] font-medium text-ink shadow-sm"
            >
              Order now
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-paper/80 text-ink backdrop-blur-md"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                {menuOpen ? (
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="pointer-events-auto px-4 lg:hidden">
          <nav className="mx-auto w-full max-w-[1320px] overflow-hidden rounded-2xl border border-black/10 bg-paper/90 p-2 backdrop-blur-lg">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-[17px] font-light tracking-[-0.02em] text-ink/80 transition-colors hover:bg-paper hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            {/* Compact promo card */}
            <a
              href="#order"
              onClick={() => setMenuOpen(false)}
              className="mt-1 flex items-center gap-3 rounded-xl bg-beige/80 px-3 py-3"
            >
              <KidsSeal />
              <span className="flex flex-col leading-tight">
                <span className="font-serif text-[15px] text-ink">Meet Daylight Kids</span>
                <span className="font-light text-[13px] text-ink/60">
                  Accessories included · Order now ↗
                </span>
              </span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
