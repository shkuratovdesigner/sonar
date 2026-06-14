/* ============================================================
   SONAR — motion
   Lenis smooth scroll (Daylight) + GSAP ScrollTrigger:
   hero zoom (intro + scroll-scrub), dark→light→dark theme scrub,
   reveal-on-scroll, nav frost.
   ============================================================ */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var nav = document.getElementById("nav");

  // If GSAP failed to load, un-hide everything and bail to native scroll.
  if (!window.gsap) {
    root.classList.remove("js");
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Themeable vars scrubbed dark → light → dark ---------- */
  var DARK = {
    "--page-bg":[17,19,28,1], "--page-fg":[255,255,255,1],
    "--page-fg-soft":[255,255,255,.72], "--page-fg-muted":[255,255,255,.52],
    "--card-bg":[26,29,40,1], "--card-line":[255,255,255,.10],
    "--hairline":[255,255,255,.10], "--eyebrow":[43,167,255,1]
  };
  var LIGHT = {
    "--page-bg":[251,252,253,1], "--page-fg":[21,22,29,1],
    "--page-fg-soft":[21,22,29,.74], "--page-fg-muted":[112,112,125,1],
    "--card-bg":[255,255,255,1], "--card-line":[21,22,29,.10],
    "--hairline":[21,22,29,.10], "--eyebrow":[10,111,203,1]
  };
  var DARK_SHADOW  = "0 1px 0 rgba(255,255,255,.04),0 24px 60px -28px rgba(0,0,0,.7)";
  var LIGHT_SHADOW = "0 1px 2px rgba(21,22,29,.05),0 22px 50px -30px rgba(21,22,29,.28)";

  function mix(a, b, t) {
    return "rgba(" +
      Math.round(a[0] + (b[0] - a[0]) * t) + "," +
      Math.round(a[1] + (b[1] - a[1]) * t) + "," +
      Math.round(a[2] + (b[2] - a[2]) * t) + "," +
      (a[3] + (b[3] - a[3]) * t).toFixed(3) + ")";
  }
  function setTheme(from, to, t) {
    var s = root.style;
    for (var k in from) s.setProperty(k, mix(from[k], to[k], t));
    s.setProperty("--shadow", t < 0.5 ? DARK_SHADOW : LIGHT_SHADOW);
  }
  setTheme(DARK, LIGHT, 0); // ensure correct dark start

  /* ---------- Lenis smooth scroll (Daylight config) ---------- */
  var lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true, touchMultiplier: 1.5 });
    window.__lenis = lenis; // exposed for testing/debugging
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  // anchor links → smooth scroll with nav offset
  document.querySelectorAll('[data-scroll]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (!id || id.charAt(0) !== "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -72, duration: 1.2 });
      else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
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
    gsap.set(".hero__stage", { scale: 1 });
    return;
  }

  /* ---------- Hero: intro zoom on load ---------- */
  var intro = gsap.timeline({ defaults: { ease: "power3.out" } });
  intro.to(".hero__stage", { scale: 1, duration: 1.5 }, 0)
       .to(".reveal-hero", { opacity: 1, y: 0, duration: 1.0, stagger: 0.12 }, 0.2);

  /* ---------- Hero: scroll-scrub zoom (pinned) ---------- */
  gsap.fromTo(".hero__stage",
    { scale: 1 },
    {
      scale: 1.18, ease: "none", immediateRender: false,
      scrollTrigger: { trigger: ".hero", start: "top top", end: "+=70%", scrub: true, pin: true, pinSpacing: true, anticipatePin: 1 }
    }
  );
  gsap.to(".hero__content", {
    y: -50, opacity: 0, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "+=50%", scrub: true }
  });

  /* ---------- dark → light → dark seams ---------- */
  // seam 1: entering "What you get" — dark → light
  ScrollTrigger.create({
    trigger: "#what", start: "top 92%", end: "top 38%", scrub: true,
    onUpdate: function (self) { setTheme(DARK, LIGHT, self.progress); }
  });
  // seam 2: entering "The form" — light → dark
  ScrollTrigger.create({
    trigger: "#form", start: "top 88%", end: "top 32%", scrub: true,
    onUpdate: function (self) { setTheme(LIGHT, DARK, self.progress); }
  });

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
