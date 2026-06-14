/* ============================================================
   SONAR — motion
   Lenis smooth scroll (Daylight) + GSAP ScrollTrigger:
   hero zoom (intro + scroll-scrub), reveal-on-scroll, nav frost,
   bento accordion. (All-dark — no theme scrubbing.)
   ============================================================ */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var nav = document.getElementById("nav");

  /* ---------- Bento accordion (works with or without GSAP) ---------- */
  document.querySelectorAll("[data-accordion]").forEach(function (group) {
    var items = group.querySelectorAll(".acc");
    items.forEach(function (item) {
      var btn = item.querySelector(".acc__btn");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var open = item.classList.contains("is-open");
        items.forEach(function (i) { i.classList.remove("is-open"); });
        if (!open) item.classList.add("is-open");
      });
    });
  });

  // If GSAP failed to load, un-hide everything and bail to native scroll.
  if (!window.gsap) {
    root.classList.remove("js");
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Lenis smooth scroll (Daylight config) ---------- */
  var lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true, touchMultiplier: 1.5 });
    window.__lenis = lenis; // exposed for testing/debugging
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  function scrollToTarget(target) {
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -72, duration: 1.2 });
    else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }

  // anchor links → smooth scroll with nav offset
  document.querySelectorAll("[data-scroll]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (!id || id.charAt(0) !== "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      scrollToTarget(target);
    });
  });

  // hero inline form → scroll to the full form
  document.querySelectorAll("[data-scroll-to]").forEach(function (b) {
    b.addEventListener("click", function (e) {
      e.preventDefault();
      scrollToTarget(document.querySelector(b.getAttribute("data-scroll-to")));
    });
  });

  /* ---------- Nav frost on scroll ---------- */
  function onScroll(y) { nav.classList.toggle("scrolled", y > 60); }
  if (lenis) lenis.on("scroll", function (e) { onScroll(e.scroll); });
  else window.addEventListener("scroll", function () { onScroll(window.scrollY); }, { passive: true });
  onScroll(window.scrollY || 0);

  /* ---------- Reduced motion: reveal everything, skip the rest ---------- */
  if (reduce) {
    document.querySelectorAll(".reveal, .reveal-hero").forEach(function (el) {
      el.classList.add("is-in"); el.style.opacity = 1; el.style.transform = "none";
    });
    return;
  }

  /* ---------- Hero: text fade-in on load (no zoom, no pin) ---------- */
  gsap.to(".reveal-hero", { opacity: 1, y: 0, duration: 1.0, stagger: 0.12, ease: "power3.out", delay: 0.15 });

  /* ---------- Reveal on scroll (batched, CSS-driven) ---------- */
  ScrollTrigger.batch(".reveal", {
    start: "top 88%",
    onEnter: function (els) {
      els.forEach(function (el, i) {
        gsap.delayedCall(i * 0.06, function () { el.classList.add("is-in"); });
      });
    }
  });
  // safety net: never leave content hidden
  gsap.delayedCall(2.6, function () {
    document.querySelectorAll(".reveal:not(.is-in)").forEach(function (el) { el.classList.add("is-in"); });
  });

  /* ---------- Refresh after fonts load (layout shifts) ---------- */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }
  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
