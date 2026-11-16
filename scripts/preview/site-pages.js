/* PREVIEW ONLY. Drives the sub-menu on the "Site pages" UI kit page, where each whole page sits in a stage and the window
   scrolls: the highlight slides to the section in view, and a click on a tab scrolls the window to its section. It mirrors
   site-footer.js, which does the same inside a frame. The Angular site does this with a directive. It sets classes,
   attributes and the documented --_ inputs only. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  $$('.pp-site-stage[data-site-page]').forEach(function (stage) {
    var nav = $('.pp-site-subnav', stage);
    if (!nav) return;
    var tabs = $('.pp-site-subnav__tabs', nav), pill = $('.pp-site-subnav__pill', nav), links = $$('.pp-site-subnav__link', nav);
    var secs = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
    var cur = null;

    function mark(a, snap) {
      if (a === cur) return;
      cur = a;
      links.forEach(function (l) { if (l === a) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current'); });
      nav.classList.toggle('pp-site-subnav--active', !!a);
      if (!a) return;
      if (snap) pill.style.transition = 'none';
      pill.style.setProperty('--_x', a.offsetLeft + 'px');
      pill.style.setProperty('--_sx', (a.offsetWidth / pill.offsetWidth).toFixed(3));
      if (snap) { void pill.offsetWidth; pill.style.transition = ''; }
      var l = a.offsetLeft - tabs.scrollLeft;
      if (l < 0 || l + a.offsetWidth > tabs.clientWidth) tabs.scrollTo({ left: Math.max(0, a.offsetLeft - 24), behavior: reduce ? 'auto' : 'smooth' });
    }
    function check() {
      var y = nav.getBoundingClientRect().bottom + 24, hit = null;
      secs.forEach(function (s, i) { if (!s) return; var r = s.getBoundingClientRect(); if (r.top <= y && r.bottom > y) hit = links[i]; });
      mark(hit, cur === null);
    }
    addEventListener('scroll', check, { passive: true });
    addEventListener('resize', function () { var a = cur; cur = null; mark(a, true); });
    check();

    links.forEach(function (a, i) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var s = secs[i]; if (!s) return;
        function top() { return Math.max(0, s.getBoundingClientRect().top + scrollY - nav.offsetHeight - (parseFloat(getComputedStyle(nav).top) || 0)); }
        scrollTo({ top: top(), behavior: reduce ? 'auto' : 'smooth' });
        /* demos above can change height while the page moves; land exactly once it stops */
        var t; function settle() { clearTimeout(t); t = setTimeout(function () { removeEventListener('scroll', settle); if (Math.abs(top() - scrollY) > 4) scrollTo({ top: top() }); }, 180); }
        addEventListener('scroll', settle, { passive: true });
      });
    });
  });
})();
