/* ============================================================
   SONAR — Demand Report page enhancements
   Self-contained: reveal-on-scroll, count-up, chart/bar draw-in.
   No GSAP / no scroll hijacking. Degrades to full static if JS off
   or reduced-motion is requested.
   ============================================================ */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Without dr-anim, all the opacity:0 / draw-in rules are inert, so the page
  // renders fully static. Only opt in to motion when it's welcome.
  if (reduce || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('dr-anim');

  function countUp(el) {
    var end = parseFloat(el.getAttribute('data-count')) || 0;
    var pre = el.getAttribute('data-prefix') || '';
    var suf = el.getAttribute('data-suffix') || '';
    var dur = 1100, t0 = null;
    function frame(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + Math.round(end * eased).toLocaleString('en-US') + suf;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function reveal(el) {
    el.classList.add('dr-in');
    if (el.hasAttribute('data-count')) countUp(el);
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      reveal(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

  // Reveal anything already on screen immediately (no first-paint flash, and
  // robust if the observer is throttled); observe the rest for scroll-in.
  var vh = window.innerHeight || document.documentElement.clientHeight;
  document
    .querySelectorAll('.dr-reveal, .dr-chart, .dr-keys, .dr-tablewrap, [data-count]')
    .forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) reveal(el);
      else io.observe(el);
    });
})();
