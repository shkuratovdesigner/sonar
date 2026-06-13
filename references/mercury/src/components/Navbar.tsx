"use client";

import { useEffect, useState } from "react";
import { MercuryLogo, ChevronDownIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const NAV_LINKS: { label: string; hasChevron: boolean }[] = [
  { label: "Products", hasChevron: true },
  { label: "Solutions", hasChevron: true },
  { label: "Resources", hasChevron: true },
  { label: "About", hasChevron: true },
  { label: "Pricing", hasChevron: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-0 z-[99] w-full transition-[background-color,backdrop-filter] duration-300 ease-out",
        scrolled
          ? "bg-[rgba(23,23,33,0.96)] backdrop-blur-[10px]"
          : "bg-transparent backdrop-blur-0",
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1200px] items-center justify-between px-6 md:px-10">
        {/* Left: logo */}
        <div className="flex grow basis-0 items-center">
          <a href="#" aria-label="Mercury home" className="inline-flex items-center">
            <MercuryLogo className="h-7 w-auto text-white" />
          </a>
        </div>

        {/* Center: nav links (desktop) */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href="#"
                className="group inline-flex items-center gap-1 text-[15px] font-medium text-white/85 transition-colors hover:text-white"
              >
                <span className="border-b border-transparent pb-px transition-colors group-hover:border-white/60">
                  {link.label}
                </span>
                {link.hasChevron ? (
                  <ChevronDownIcon className="h-4 w-4 text-white/70 transition-transform group-hover:translate-y-0.5" />
                ) : null}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: actions (desktop) */}
        <div className="hidden grow basis-0 items-center justify-end gap-4 lg:flex">
          <a
            href="#"
            className="text-[15px] font-medium text-white/85 transition-colors hover:text-white"
          >
            Log in
          </a>
          <a
            href="#"
            className="inline-flex h-9 items-center justify-center rounded-full bg-brand px-4 text-[15px] font-medium text-white transition-colors hover:bg-brand-hover"
          >
            Open account
          </a>
        </div>

        {/* Mobile: Open account pill + hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <a
            href="#"
            className="inline-flex h-9 items-center justify-center rounded-full bg-brand px-4 text-[15px] font-medium text-white transition-colors hover:bg-brand-hover"
          >
            Open account
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative flex h-10 w-10 items-center justify-center text-white"
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <span
              className={cn(
                "absolute h-[1.5px] w-6 bg-current transition-transform duration-300 ease-out",
                menuOpen ? "rotate-45" : "-translate-y-[5px]",
              )}
            />
            <span
              className={cn(
                "absolute h-[1.5px] w-6 bg-current transition-opacity duration-300 ease-out",
                menuOpen ? "opacity-0" : "opacity-100",
              )}
            />
            <span
              className={cn(
                "absolute h-[1.5px] w-6 bg-current transition-transform duration-300 ease-out",
                menuOpen ? "-rotate-45" : "translate-y-[5px]",
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-white/10 bg-[rgba(23,23,33,0.98)] backdrop-blur-[10px] transition-[max-height] duration-300 ease-out lg:hidden",
          menuOpen ? "max-h-[420px]" : "max-h-0 border-t-0",
        )}
      >
        <ul className="flex flex-col px-6 py-2">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href="#"
                className="flex items-center justify-between py-3 text-[17px] font-medium text-white/90 transition-colors hover:text-white"
              >
                {link.label}
                {link.hasChevron ? <ChevronDownIcon className="h-4 w-4 text-white/60" /> : null}
              </a>
            </li>
          ))}
          <li className="mt-1 border-t border-white/10 pt-3 pb-4">
            <a
              href="#"
              className="text-[17px] font-medium text-white/90 transition-colors hover:text-white"
            >
              Log in
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
