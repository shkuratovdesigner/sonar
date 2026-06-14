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

  /* ---------- Demand form: input masks + inline validation (no GSAP needed) ---------- */
  (function initDemandForm() {
    var form = document.getElementById("demand-form");
    if (!form) return;

    var success = form.querySelector(".form__success");
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var fieldOf = function (el) { return el.closest(".field"); };

    function setError(el, on) {
      var f = fieldOf(el);
      if (f) f.classList.toggle("is-invalid", !!on);
      el.setAttribute("aria-invalid", on ? "true" : "false");
    }

    /* masks — normalize a value once the user leaves the field */
    function maskUrl(el) {
      var v = el.value.trim().replace(/\s+/g, "");
      if (v && !/^https?:\/\//i.test(v)) v = "https://" + v;   // bare domain → add scheme
      el.value = v;
      return v;
    }
    function maskEmail(el) { var v = el.value.trim().toLowerCase(); el.value = v; return v; }

    /* validators — true when acceptable */
    function validUrl(el) {
      var v = maskUrl(el);
      if (!v) return true;                                     // optional field
      try { var u = new URL(v); return !!u.hostname && /\.[a-z]{2,}$/i.test(u.hostname); }
      catch (e) { return false; }
    }
    function validAbout(el) { return el.value.trim().length >= 12; }
    function validEmail(el) { return emailRe.test(maskEmail(el)); }

    var checks = [
      { el: form.querySelector("#f-link"),  fn: validUrl,   mask: maskUrl },
      { el: form.querySelector("#f-store"), fn: validUrl,   mask: maskUrl },
      { el: form.querySelector("#f-about"), fn: validAbout },
      { el: form.querySelector("#f-email"), fn: validEmail, mask: maskEmail }
    ].filter(function (c) { return c.el; });

    /* live masking: strip whitespace from url/email as it's typed */
    ["#f-link", "#f-store", "#f-email"].forEach(function (sel) {
      var el = form.querySelector(sel);
      if (!el) return;
      el.addEventListener("input", function () {
        if (/\s/.test(el.value)) {
          var pos = el.selectionStart;
          el.value = el.value.replace(/\s+/g, "");
          try { el.setSelectionRange(pos - 1, pos - 1); } catch (e) {}
        }
        if (fieldOf(el).classList.contains("is-invalid")) setError(el, false);
      });
    });

    checks.forEach(function (c) {
      c.el.addEventListener("blur", function () {
        if (c.mask) c.mask(c.el);
        setError(c.el, !c.fn(c.el));
      });
      if (c.el.tagName === "TEXTAREA") {
        c.el.addEventListener("input", function () {
          if (fieldOf(c.el).classList.contains("is-invalid") && c.fn(c.el)) setError(c.el, false);
        });
      }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstBad = null;
      checks.forEach(function (c) {
        var ok = c.fn(c.el);
        setError(c.el, !ok);
        if (!ok && !firstBad) firstBad = c.el;
      });
      if (firstBad) { firstBad.focus(); return; }

      form.classList.add("is-sent");
      if (success) success.hidden = false;
      [].forEach.call(form.querySelectorAll(".field, .form__submit, .microtrust"), function (el) {
        el.style.display = "none";
      });
    });
  })();

  /* ---------- Hero sonar — canvas radar sweep that reveals blips ----------
     A beam rotates from the headline's center. Each blip is dark until the
     beam passes over it, then flashes and fades in the trailing afterglow —
     so dots only show where the light currently is. The text block is punched
     out of the scene, keeping the area behind the copy clear. */
  (function initHeroSonar() {
    var stage = document.querySelector(".hero__stage");
    var canvas = document.querySelector(".sonar-canvas");
    if (!stage || !canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");

    var TWO = Math.PI * 2;
    var TRAIL = Math.PI * 1.05;     // afterglow length behind the leading edge
    var SPEED = TWO / 7.5;          // radians per second (~7.5s per revolution)
    var BRAND = [82, 102, 235], HOT = [179, 192, 255], WARM = [252, 146, 180];

    var W = 0, H = 0, DPR = 1, cx = 0, cy = 0, maxR = 0;
    var ex = { x: 0, y: 0, rx: 0, ry: 0 };   // text exclusion ellipse (px)
    var blips = [], rings = [];
    var angle = -Math.PI / 2, last = 0, raf = 0, running = false;

    function rgba(c, a) { return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")"; }

    function measure() {
      var r = stage.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width));
      H = Math.max(1, Math.round(r.height));
      DPR = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      // exclusion ellipse hugs the real text extent (not the full container box),
      // so dots can flank the headline left/right while staying off the copy.
      var items = document.querySelectorAll(".hero__content .container > *");
      var minL = Infinity, minT = Infinity, maxX = -Infinity, maxB = -Infinity;
      items.forEach(function (el) {
        var b = el.getBoundingClientRect();
        if (!b.width || !b.height) return;
        if (b.left < minL) minL = b.left;
        if (b.top < minT) minT = b.top;
        if (b.right > maxX) maxX = b.right;
        if (b.bottom > maxB) maxB = b.bottom;
      });
      if (minL < maxX) {
        ex.x = (minL + maxX) / 2 - r.left;
        ex.y = (minT + maxB) / 2 - r.top;
        ex.rx = (maxX - minL) / 2 + 62;
        ex.ry = (maxB - minT) / 2 + 52;
      } else {
        ex.x = W / 2; ex.y = H / 2; ex.rx = W * 0.3; ex.ry = H * 0.26;
      }
      cx = ex.x; cy = ex.y;
      maxR = Math.max(
        Math.hypot(cx, cy), Math.hypot(W - cx, cy),
        Math.hypot(cx, H - cy), Math.hypot(W - cx, H - cy)
      ) + 24;
      build();
    }

    function build() {
      rings = [];
      var n = 6;
      for (var k = 1; k <= n; k++) {
        rings.push({ r: maxR * (k / (n + 0.6)), o: 0.11 * (1 - (k - 1) / n) });
      }

      blips = [];
      var target = Math.round(Math.min(130, Math.max(54, (W * H) / 13000)));
      var warmLeft = Math.max(3, Math.round(target * 0.07));
      var tries = 0;
      while (blips.length < target && tries < target * 40) {
        tries++;
        var x = Math.random() * W, y = Math.random() * H;
        var dx = (x - ex.x) / (ex.rx + 16), dy = (y - ex.y) / (ex.ry + 20);
        if (dx * dx + dy * dy <= 1) continue;           // keep the text zone clear
        if (Math.hypot(x - cx, y - cy) > maxR) continue;
        var warm = warmLeft > 0 && Math.random() < 0.11;
        if (warm) warmLeft--;
        blips.push({
          x: x, y: y,
          a: Math.atan2(y - cy, x - cx),
          r: warm ? (3.8 + Math.random() * 2) : (1.7 + Math.random() * 2.1),
          warm: warm,
          pink: warm && Math.random() < 0.4,
          ph: Math.random() * TWO
        });
      }
    }

    function draw(animate) {
      ctx.clearRect(0, 0, W, H);

      // concentric rings (clipped to clear the text zone by the punch below)
      ctx.lineWidth = 1;
      for (var i = 0; i < rings.length; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, rings[i].r, 0, TWO);
        ctx.strokeStyle = rgba(BRAND, rings[i].o);
        ctx.stroke();
      }

      if (animate) {
        // trailing afterglow wedge — brightest at the leading edge
        var slices = 50;
        for (var s = 0; s < slices; s++) {
          var t = s / slices, k = (1 - t) * (1 - t);
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.arc(cx, cy, maxR, angle - (s + 1) / slices * TRAIL, angle - t * TRAIL);
          ctx.closePath();
          ctx.fillStyle = rgba(BRAND, 0.13 * k);
          ctx.fill();
        }
        // bright leading edge
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
        ctx.strokeStyle = rgba(HOT, 0.5);
        ctx.lineWidth = 1.7;
        ctx.stroke();
      }

      // blips, lit only within the afterglow
      for (var b = 0; b < blips.length; b++) {
        var bl = blips[b], bright;
        if (animate) {
          var d = angle - bl.a; d = ((d % TWO) + TWO) % TWO;
          bright = d < TRAIL ? 1 - d / TRAIL : 0;
          bright *= bright;
        } else {
          bright = 0.45;
        }
        if (bright <= 0.002) continue;
        var col = bl.pink ? WARM : (bl.warm ? HOT : BRAND);
        var rad = bl.r * (0.86 + 0.14 * Math.sin((animate ? angle * 2 : 0) + bl.ph));
        // soft glow halo — every blip, so they read brighter
        ctx.beginPath();
        ctx.arc(bl.x, bl.y, rad * (bl.warm ? 3.4 : 2.7), 0, TWO);
        ctx.fillStyle = rgba(col, (bl.warm ? 0.22 : 0.14) * bright);
        ctx.fill();
        // bright core
        ctx.beginPath();
        ctx.arc(bl.x, bl.y, rad, 0, TWO);
        ctx.fillStyle = rgba(col, (bl.warm ? 1 : 0.95) * bright);
        ctx.fill();
      }

      // punch a soft elliptical hole so the copy sits on clean darkness
      ctx.globalCompositeOperation = "destination-out";
      ctx.save();
      ctx.translate(ex.x, ex.y);
      ctx.scale(ex.rx, ex.ry);
      var hole = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      hole.addColorStop(0, "rgba(0,0,0,1)");
      hole.addColorStop(0.72, "rgba(0,0,0,1)");
      hole.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = hole;
      ctx.beginPath();
      ctx.arc(0, 0, 1, 0, TWO);
      ctx.fill();
      ctx.restore();
      ctx.globalCompositeOperation = "source-over";
    }

    function tick(t) {
      if (!running) return;
      if (!last) last = t;
      var dt = Math.min(0.05, (t - last) / 1000); last = t;
      angle += SPEED * dt;
      if (angle > Math.PI) angle -= TWO;
      draw(true);
      raf = requestAnimationFrame(tick);
    }

    function start() { if (running) return; running = true; last = 0; raf = requestAnimationFrame(tick); }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; }

    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    measure();
    if (reduce) {
      draw(false);                                   // static field, no sweep
    } else {
      start();
      // pause when the hero is off-screen or the tab is hidden
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (en) {
          en[0] && en[0].isIntersecting ? start() : stop();
        }, { threshold: 0 }).observe(stage);
      }
      document.addEventListener("visibilitychange", function () {
        document.hidden ? stop() : start();
      });
    }

    var rz;
    window.addEventListener("resize", function () {
      clearTimeout(rz);
      rz = setTimeout(function () { measure(); if (reduce) draw(false); }, 150);
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { measure(); if (reduce) draw(false); });
    }
  })();

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
