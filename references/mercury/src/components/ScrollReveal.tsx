"use client";

import { useEffect } from "react";

/**
 * Fades + lifts each top-level section into view on scroll (IntersectionObserver).
 * Bulletproof against stuck-invisible content: only adds the hiding `reveal`
 * class via JS, reveals anything already in view, and has a timeout safety net.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("main > *"),
    );
    if (els.length === 0) return;

    const show = (el: HTMLElement) => el.classList.add("is-visible");

    if (!("IntersectionObserver" in window)) {
      els.forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            show(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -6% 0px" },
    );

    els.forEach((el) => {
      el.classList.add("reveal");
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92) show(el);
      else io.observe(el);
    });

    const t = window.setTimeout(() => els.forEach(show), 2600);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return null;
}
