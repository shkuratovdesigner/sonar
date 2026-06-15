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

  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* ---------- Demand forms: input masks + inline validation (no GSAP needed) ----------
     Generic so the same logic drives the page form AND the hero modal form. Fields are
     found by name, errors by the surrounding .field — no per-form IDs required. */
  function wireDemandForm(form) {
    if (!form || form.__wired) return;
    form.__wired = true;

    var success = form.querySelector(".form__success");
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

    var byName = function (n) { return form.querySelector("[name=" + n + "]"); };
    var checks = [
      { el: byName("product_link"), fn: validUrl,   mask: maskUrl },
      { el: byName("store_link"),   fn: validUrl,   mask: maskUrl },
      { el: byName("about"),        fn: validAbout },
      { el: byName("email"),        fn: validEmail, mask: maskEmail }
    ].filter(function (c) { return c.el && c.el.type !== "hidden"; });

    checks.forEach(function (c) {
      /* live masking: strip whitespace from url/email as it's typed */
      if (c.mask) {
        c.el.addEventListener("input", function () {
          if (/\s/.test(c.el.value)) {
            var pos = c.el.selectionStart;
            c.el.value = c.el.value.replace(/\s+/g, "");
            try { c.el.setSelectionRange(pos - 1, pos - 1); } catch (e) {}
          }
          if (fieldOf(c.el).classList.contains("is-invalid")) setError(c.el, false);
        });
      }
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
      if (firstBad) { if (firstBad.offsetParent !== null) firstBad.focus(); return; }

      // TODO(backend): POST the form data (incl. the hero email) to the leads endpoint.
      form.classList.add("is-sent");
      if (success) success.hidden = false;
      [].forEach.call(form.querySelectorAll(".field, .form__submit, .microtrust"), function (el) {
        el.style.display = "none";
      });
    });
  }
  document.querySelectorAll("form[data-demand]").forEach(wireDemandForm);

  /* ---------- Hero email → modal with the rest of the fields ----------
     Capture the email up front (backend send is a TODO), then open the modal
     pre-filled so the visitor only fills in what's left. */
  (function initHeroModal() {
    var modal = document.getElementById("demand-modal");
    var heroForm = document.querySelector(".hero__form");
    if (!modal) return;

    var lastFocus = null;
    function focusables() {
      return [].filter.call(
        modal.querySelectorAll("a[href],button:not([disabled]),input:not([type=hidden]),textarea,select"),
        function (el) { return el.offsetParent !== null; }
      );
    }
    function openModal() {
      lastFocus = document.activeElement;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      root.classList.add("modal-open");
      if (window.__lenis) window.__lenis.stop();
      var f = focusables();
      if (f.length) setTimeout(function () { f[0].focus(); }, 60);
    }
    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      root.classList.remove("modal-open");
      if (window.__lenis) window.__lenis.start();
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    modal.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-modal-close")) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });
    // simple focus trap
    modal.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var f = focusables();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    if (heroForm) {
      var heroEmail = heroForm.querySelector("[name=email]");
      var modalEmail = modal.querySelector("[name=email]");
      heroForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var v = (heroEmail.value || "").trim().toLowerCase();
        var ok = emailRe.test(v);
        heroForm.classList.toggle("is-invalid", !ok);
        if (!ok) { heroEmail.focus(); return; }
        heroEmail.value = v;
        if (modalEmail) modalEmail.value = v;            // carry the email into the modal
        // TODO(backend): send `v` to the leads database here (up-front email capture).
        openModal();
      });
      heroEmail.addEventListener("input", function () {
        if (heroForm.classList.contains("is-invalid")) heroForm.classList.remove("is-invalid");
      });
    }
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

    /* ---- Detection cards: a labeled hotspot per platform that the beam "finds" ----
       As the sweep crosses a hotspot, a logo + "+N new users" card pings in (with
       randomness + cooldowns so it stays intermittent, never cluttered). */
    var fx = document.querySelector(".sonar-fx");
    var PLATFORMS = [
      { key: "linkedin",  src: "assets/img/logos/linkedin.png" },
      { key: "youtube",   src: "assets/img/logos/youtube.png" },
      { key: "reddit",    src: "assets/img/logos/reddit.png" },
      { key: "x",         src: "assets/img/logos/x.png" },
      { key: "instagram", src: "assets/img/logos/instagram.png" },
      { key: "facebook",  src: "assets/img/logos/facebook.png" }
    ];
    PLATFORMS.forEach(function (p) { var im = new Image(); im.src = p.src; });  // warm the cache
    var spots = [], cards = [], lastSpawn = -1e9;
    var MAX_ACTIVE = 3;        // cards on screen at once
    var MIN_GAP = 520;         // ms between any two spawns
    var SPOT_COOLDOWN = 4200;  // ms before the same hotspot fires again
    var FIRE_PROB = 0.8;       // chance a crossing actually spawns a card

    function fxEnabled() { return !!fx && !reduce && W >= 720; }

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
      buildSpots();
    }

    /* labeled hotspots: one per platform, spread around the dial, marched out along
       each ray to a radius that's fully on-screen and clear of the headline. */
    function buildSpots() {
      spots = [];
      if (!fxEnabled()) return;
      var count = W >= 1024 ? 8 : 6;   // one hotspot per platform (6) + a couple repeats on wide screens
      var start = -Math.PI / 2 + Math.random() * TWO;
      // one spot per evenly-spaced sector, with a few jittered tries so a blocked
      // ray (headline in the way) can still find open space nearby.
      for (var s = 0; s < count; s++) {
        var base = start + (s / count) * TWO;
        for (var j = 0; j < 5; j++) {
          var p = findSpot(base + (Math.random() - 0.5) * 0.9);
          if (!p) continue;
          p.platform = PLATFORMS[spots.length % PLATFORMS.length];
          p.prevD = null;
          p.last = -1e9;
          spots.push(p);
          break;
        }
      }
    }

    function findSpot(theta) {
      var padX = 92, padTop = 104, padBottom = 56;  // card half-size + edge margin; top clears the nav
      var iRx = ex.rx + 22, iRy = ex.ry + 14;       // off the copy (ex already buffers 62/52px)
      var cos = Math.cos(theta), sin = Math.sin(theta);
      var lo = 0, hi = 0, found = false;
      for (var r = Math.min(W, H) * 0.14; r <= maxR; r += 6) {
        var x = cx + cos * r, y = cy + sin * r;
        var inBox = x >= padX && x <= W - padX && y >= padTop && y <= H - padBottom;
        var ndx = (x - ex.x) / iRx, ndy = (y - ex.y) / iRy;
        if (inBox && ndx * ndx + ndy * ndy >= 1) { if (!found) { lo = r; found = true; } hi = r; }
        else if (found) break;                  // left the valid window along this ray
      }
      if (!found) return null;
      var rr = lo + (hi - lo) * (0.35 + Math.random() * 0.5);
      return { a: Math.atan2(sin, cos), x: cx + cos * rr, y: cy + sin * rr };
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

      // labeled hotspots — the brighter dots the cards latch onto. Dimly visible
      // when unlit, flaring as the beam passes (so a card has something to land on).
      for (var sp = 0; sp < spots.length; sp++) {
        var S = spots[sp], sb;
        if (animate) {
          var sd = angle - S.a; sd = ((sd % TWO) + TWO) % TWO;
          sb = sd < TRAIL ? 1 - sd / TRAIL : 0; sb *= sb;
        } else { sb = 0.5; }
        ctx.beginPath();
        ctx.arc(S.x, S.y, 6.6, 0, TWO);
        ctx.fillStyle = rgba(HOT, 0.26 * (0.32 + 0.68 * sb));
        ctx.fill();
        ctx.beginPath();
        ctx.arc(S.x, S.y, 2.9, 0, TWO);
        ctx.fillStyle = rgba(HOT, 0.24 + 0.76 * sb);
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
      if (fxEnabled()) detect(t);
      draw(true);
      raf = requestAnimationFrame(tick);
    }

    function start() { if (running) return; running = true; last = 0; raf = requestAnimationFrame(tick); }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; clearFx(); }

    /* The beam advances by a small step each frame, so d = (angle − spot.a) mod 2π
       grows monotonically and wraps 2π→0 exactly when the beam crosses the spot —
       that one-frame drop (d < prevD) is the clean "found it" trigger. */
    function detect(t) {
      for (var i = 0; i < spots.length; i++) {
        var S = spots[i];
        var d = (((angle - S.a) % TWO) + TWO) % TWO;
        if (S.prevD != null && d < S.prevD) tryFire(S, t);
        S.prevD = d;
      }
    }

    function tryFire(S, t) {
      if (t - lastSpawn < MIN_GAP) return;
      if (cards.length >= MAX_ACTIVE) return;
      if (t - S.last < SPOT_COOLDOWN) return;
      if (Math.random() > FIRE_PROB) return;
      S.last = t; lastSpawn = t;
      spawnCard(S);
    }

    function spawnCard(S) {
      var p = S.platform;
      var n = 7 + Math.floor(Math.random() * 6);   // +7..+12 acquired users per ping

      var card = document.createElement("div");
      card.className = "sonar-card";
      card.style.left = S.x + "px";
      card.style.top = S.y + "px";
      var inner = document.createElement("div");
      inner.className = "sonar-card__inner";
      inner.innerHTML =
        '<span class="sonar-card__ping"></span>' +
        '<span class="sonar-card__chip"><img src="' + p.src + '" alt="" draggable="false"></span>' +
        '<span class="sonar-card__meta"><b>+' + n + '</b><i>new users</i></span>';
      card.appendChild(inner);
      fx.appendChild(card);

      var rec = { el: card };
      cards.push(rec);
      inner.addEventListener("animationend", function (e) {
        if (e.animationName === "sonarCardLife") removeCard(rec);   // ignore the ping's animation
      });
    }

    function removeCard(rec) {
      var i = cards.indexOf(rec);
      if (i >= 0) cards.splice(i, 1);
      if (rec.el && rec.el.parentNode) rec.el.parentNode.removeChild(rec.el);
    }

    function clearFx() { for (var i = cards.length - 1; i >= 0; i--) removeCard(cards[i]); }

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
      rz = setTimeout(function () { clearFx(); measure(); if (reduce) draw(false); }, 150);
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { measure(); if (reduce) draw(false); });
    }
  })();

  /* ---------- "Data, not guesses" sonar — the hero's beam-reveal logic, scaled to
     the 4:5 block. The beam is centred so it sweeps clean to every edge (no clipped
     arc at the bottom), platform "+N new users" cards ping in far more often than the
     hero, and the live count ticks up next to the blinking dot. ---------- */
  (function initWhySonar() {
    var media = document.querySelector("#why .tall-media");
    if (!media) return;
    var canvas = media.querySelector(".tall-media__canvas");
    var fx = media.querySelector(".tall-media__fx");
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var reduceW = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var TWO = Math.PI * 2;
    var TRAIL = Math.PI * 1.1;          // afterglow length behind the leading edge
    var SPEED = TWO / 6;                // ~6s per revolution (a touch faster than hero)
    var BRAND = [82, 102, 235], HOT = [179, 192, 255], WARM = [252, 146, 180];

    var PLATFORMS = [
      { src: "assets/img/logos/reddit.png" },
      { src: "assets/img/logos/x.png" },
      { src: "assets/img/logos/youtube.png" },
      { src: "assets/img/logos/linkedin.png" }
    ];
    PLATFORMS.forEach(function (p) { var im = new Image(); im.src = p.src; });

    // cards ping in much more often than the hero (shorter gap + cooldown, near-certain fire)
    var MAX_ACTIVE = 3, MIN_GAP = 360, SPOT_COOLDOWN = 1900, FIRE_PROB = 0.95;

    var askEl = media.querySelector("[data-asking]");
    var asking = askEl ? (parseInt(askEl.textContent, 10) || 532) : 532;

    var W = 0, H = 0, DPR = 1, cx = 0, cy = 0, maxR = 0;
    var blips = [], rings = [], spots = [], cards = [];
    var angle = -Math.PI / 2, last = 0, raf = 0, running = false, lastSpawn = -1e9;

    function rgba(c, a) { return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")"; }

    function measure() {
      var r = media.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width));
      H = Math.max(1, Math.round(r.height));
      DPR = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cx = W / 2; cy = H / 2;            // centred → the beam reaches every corner and edge
      maxR = Math.max(
        Math.hypot(cx, cy), Math.hypot(W - cx, cy),
        Math.hypot(cx, H - cy), Math.hypot(W - cx, H - cy)
      ) + 8;
      build();
    }

    function build() {
      rings = [];
      var n = 5;
      for (var k = 1; k <= n; k++) rings.push({ r: maxR * (k / (n + 0.6)), o: 0.13 * (1 - (k - 1) / n) });

      blips = [];
      var target = Math.round(Math.min(74, Math.max(28, (W * H) / 5200)));
      var warmLeft = Math.max(2, Math.round(target * 0.1));
      var tries = 0;
      while (blips.length < target && tries < target * 40) {
        tries++;
        var x = Math.random() * W, y = Math.random() * H;
        if (Math.hypot(x - cx, y - cy) > maxR) continue;
        var warm = warmLeft > 0 && Math.random() < 0.14;
        if (warm) warmLeft--;
        blips.push({
          x: x, y: y, a: Math.atan2(y - cy, x - cx),
          r: warm ? (3.2 + Math.random() * 1.8) : (1.5 + Math.random() * 1.8),
          warm: warm, pink: warm && Math.random() < 0.4, ph: Math.random() * TWO
        });
      }
      buildSpots();
    }

    // one hotspot per platform, spread around the dial and marched out to a radius
    // that keeps its card fully inside the block
    function buildSpots() {
      spots = [];
      if (reduceW) return;
      var count = 5;
      var startA = -Math.PI / 2 + Math.random() * TWO;
      for (var s = 0; s < count; s++) {
        var base = startA + (s / count) * TWO;
        for (var j = 0; j < 6; j++) {
          var p = findSpot(base + (Math.random() - 0.5) * 0.8);
          if (!p) continue;
          p.platform = PLATFORMS[spots.length % PLATFORMS.length];
          p.prevD = null; p.last = -1e9;
          spots.push(p);
          break;
        }
      }
    }

    function findSpot(theta) {
      var padX = 66, padY = 66;          // card half-size + edge margin
      var cos = Math.cos(theta), sin = Math.sin(theta);
      var lo = 0, hi = 0, found = false;
      for (var r = Math.min(W, H) * 0.18; r <= maxR; r += 5) {
        var x = cx + cos * r, y = cy + sin * r;
        var inBox = x >= padX && x <= W - padX && y >= padY && y <= H - padY;
        if (inBox) { if (!found) { lo = r; found = true; } hi = r; }
        else if (found) break;
      }
      if (!found) return null;
      var rr = lo + (hi - lo) * (0.4 + Math.random() * 0.45);
      return { a: Math.atan2(sin, cos), x: cx + cos * rr, y: cy + sin * rr };
    }

    function draw(animate) {
      ctx.clearRect(0, 0, W, H);

      ctx.lineWidth = 1;
      for (var i = 0; i < rings.length; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, rings[i].r, 0, TWO);
        ctx.strokeStyle = rgba(BRAND, rings[i].o);
        ctx.stroke();
      }

      if (animate) {
        var slices = 44;
        for (var s = 0; s < slices; s++) {
          var t = s / slices, k = (1 - t) * (1 - t);
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.arc(cx, cy, maxR, angle - (s + 1) / slices * TRAIL, angle - t * TRAIL);
          ctx.closePath();
          ctx.fillStyle = rgba(BRAND, 0.16 * k);
          ctx.fill();
        }
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
        ctx.strokeStyle = rgba(HOT, 0.55);
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      for (var b = 0; b < blips.length; b++) {
        var bl = blips[b], bright;
        if (animate) {
          var d = angle - bl.a; d = ((d % TWO) + TWO) % TWO;
          bright = d < TRAIL ? 1 - d / TRAIL : 0;
          bright *= bright;
        } else { bright = 0.5; }
        if (bright <= 0.002) continue;
        var col = bl.pink ? WARM : (bl.warm ? HOT : BRAND);
        var rad = bl.r * (0.86 + 0.14 * Math.sin((animate ? angle * 2 : 0) + bl.ph));
        ctx.beginPath();
        ctx.arc(bl.x, bl.y, rad * (bl.warm ? 3.2 : 2.6), 0, TWO);
        ctx.fillStyle = rgba(col, (bl.warm ? 0.24 : 0.15) * bright);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(bl.x, bl.y, rad, 0, TWO);
        ctx.fillStyle = rgba(col, (bl.warm ? 1 : 0.95) * bright);
        ctx.fill();
      }

      for (var sp = 0; sp < spots.length; sp++) {
        var S = spots[sp], sb;
        if (animate) {
          var sd = angle - S.a; sd = ((sd % TWO) + TWO) % TWO;
          sb = sd < TRAIL ? 1 - sd / TRAIL : 0; sb *= sb;
        } else { sb = 0.5; }
        ctx.beginPath();
        ctx.arc(S.x, S.y, 6, 0, TWO);
        ctx.fillStyle = rgba(HOT, 0.26 * (0.32 + 0.68 * sb));
        ctx.fill();
        ctx.beginPath();
        ctx.arc(S.x, S.y, 2.7, 0, TWO);
        ctx.fillStyle = rgba(HOT, 0.24 + 0.76 * sb);
        ctx.fill();
      }
    }

    function tick(t) {
      if (!running) return;
      if (!last) last = t;
      var dt = Math.min(0.05, (t - last) / 1000); last = t;
      angle += SPEED * dt;
      if (angle > Math.PI) angle -= TWO;
      detect(t);
      draw(true);
      raf = requestAnimationFrame(tick);
    }

    function start() { if (running || reduceW) return; running = true; last = 0; raf = requestAnimationFrame(tick); }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; clearFx(); }

    function detect(t) {
      for (var i = 0; i < spots.length; i++) {
        var S = spots[i];
        var d = (((angle - S.a) % TWO) + TWO) % TWO;
        if (S.prevD != null && d < S.prevD) tryFire(S, t);
        S.prevD = d;
      }
    }

    function tryFire(S, t) {
      if (t - lastSpawn < MIN_GAP) return;
      if (cards.length >= MAX_ACTIVE) return;
      if (t - S.last < SPOT_COOLDOWN) return;
      if (Math.random() > FIRE_PROB) return;
      S.last = t; lastSpawn = t;
      spawnCard(S);
    }

    function spawnCard(S) {
      var p = S.platform;
      var n = 3 + Math.floor(Math.random() * 5);   // +3..+7 new users per ping
      var card = document.createElement("div");
      card.className = "sonar-card";
      card.style.left = S.x + "px";
      card.style.top = S.y + "px";
      var inner = document.createElement("div");
      inner.className = "sonar-card__inner";
      inner.innerHTML =
        '<span class="sonar-card__ping"></span>' +
        '<span class="sonar-card__chip"><img src="' + p.src + '" alt="" draggable="false"></span>' +
        '<span class="sonar-card__meta"><b>+' + n + '</b><i>new users</i></span>';
      card.appendChild(inner);
      fx.appendChild(card);

      // nudge the live count so "people asking now" keeps ticking up
      if (askEl && Math.random() < 0.55) { asking += 1; askEl.textContent = asking; }

      var rec = { el: card };
      cards.push(rec);
      inner.addEventListener("animationend", function (e) {
        if (e.animationName === "sonarCardLife") removeCard(rec);   // ignore the ping's animation
      });
    }

    function removeCard(rec) {
      var i = cards.indexOf(rec);
      if (i >= 0) cards.splice(i, 1);
      if (rec.el && rec.el.parentNode) rec.el.parentNode.removeChild(rec.el);
    }
    function clearFx() { for (var i = cards.length - 1; i >= 0; i--) removeCard(cards[i]); }

    measure();
    draw(false);                                     // paint a static radar up front so the block is never blank
    if (!reduceW) {
      // Keep the beam running whenever the tab is visible. The hero can lean on an
      // IntersectionObserver because it starts on-screen; this block starts off-screen,
      // so the observer-driven restart was unreliable (it left the canvas blank until a
      // re-trigger that sometimes never came). Running while visible — paused only when
      // the tab is hidden — guarantees it's live by the time the section is scrolled to.
      start();
      document.addEventListener("visibilitychange", function () {
        document.hidden ? stop() : start();
      });
    }

    var rzW;
    window.addEventListener("resize", function () {
      clearTimeout(rzW);
      rzW = setTimeout(function () { clearFx(); measure(); draw(false); }, 150);
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { measure(); draw(false); });
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
  gsap.to(".reveal-hero", { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, stagger: 0.12, ease: "power3.out", delay: 0.15 });

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

  /* ---------- Report reel: slow scrub-zoom as it scrolls through ---------- */
  (function () {
    var v = document.querySelector(".report-reel__video");
    if (!v) return;
    gsap.fromTo(v, { scale: 1.14 }, {
      scale: 1, ease: "none",
      scrollTrigger: { trigger: ".report-reel", start: "top bottom", end: "bottom top", scrub: true }
    });
  })();

  /* ---------- Magnetic CTAs: the button drifts toward the cursor and springs back.
     Pointer-only; transform is owned by GSAP (CSS transform transition is disabled
     for [data-magnetic]) so the two never fight. ---------- */
  (function () {
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    var STR = 0.3, MAX = 9;
    document.querySelectorAll("[data-magnetic]").forEach(function (el) {
      var xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      var yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
      var sTo = gsap.quickTo(el, "scale", { duration: 0.4, ease: "power2.out" });
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) * STR;
        var dy = (e.clientY - (r.top + r.height / 2)) * STR;
        var d = Math.hypot(dx, dy);
        if (d > MAX) { dx *= MAX / d; dy *= MAX / d; }
        xTo(dx); yTo(dy);
      });
      el.addEventListener("pointerenter", function () { sTo(1.04); });
      el.addEventListener("pointerleave", function () { xTo(0); yTo(0); sTo(1); });
      el.addEventListener("pointerdown", function () { sTo(0.97); });
      el.addEventListener("pointerup", function () { sTo(1.04); });
    });
  })();

  /* ---------- Refresh after fonts load (layout shifts) ---------- */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }
  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
