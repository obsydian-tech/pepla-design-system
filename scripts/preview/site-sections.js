/* PREVIEW ONLY. Drives the frames on the "Site hero and sections" UI kit page: parts arrive as they scroll into view,
   and a desktop frame shrinks to fit a screen narrower than 1280px. It is not part of any component and is never
   shipped to the site; the Angular site does the same arrival with a directive.
   It only sets data-site-reveal on a frame, the class pp-site-reveal--in on a part, and the --_fit and --_h inputs on a frame. */
(function () {
  var all = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* On a screen narrower than a desktop frame (1280px), the frame keeps its true 1280px layout and is scaled down to fit,
     through the documented --_fit and --_h inputs of the stage (a transform). Never zoom: iOS Safari inflates the text of a
     zoomed frame and overlaps its lines. */
  function fit() {
    all('.kframe--desktop').forEach(function (box) {
      var f = box.querySelector('.pp-site-stage'); if (!f) return;
      f.style.removeProperty('--_fit'); f.style.removeProperty('--_h'); box.style.minHeight = ''; box.style.overflow = '';
      var avail = box.clientWidth, need = 1280;
      if (avail && avail < need) {
        f.style.setProperty('--_h', f.offsetHeight + 'px'); f.style.setProperty('--_fit', (avail / need).toFixed(4));
        box.style.minHeight = '0'; box.style.overflow = 'hidden';
      }
    });
  }
  fit(); addEventListener('resize', fit); addEventListener('load', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);

  /* Arrival: hide the parts only now that this script runs (without it they stay visible), then show each as it scrolls in. */
  all('.pp-site-stage').forEach(function (s) { s.setAttribute('data-site-reveal', ''); });
  var show = function (el) { el.classList.add('pp-site-reveal--in'); };
  if (!('IntersectionObserver' in window)) { all('.pp-site-reveal').forEach(show); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  all('.pp-site-reveal').forEach(function (el) { io.observe(el); });
})();
