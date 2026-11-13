/* PREVIEW ONLY. Drives the live sub-menu frames on the "Site footer and sub-menu" UI kit page: the highlight that slides to the section in view,
   and a click on a tab that scrolls the frame to its section. It is not part of any component and is never shipped to the site.
   The Angular site does the same with a directive. It sets classes, attributes and the documented --_ inputs only; the header, menu and sheet
   are driven by the site-header preview script, which this kit loads too. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  $$('.pp-site-frame').forEach(function (frame) {
    var page = $('.pp-site-frame__page', frame), nav = $('.pp-site-subnav', frame);
    if (!page || !nav) return;
    var tabs = $('.pp-site-subnav__tabs', nav), pill = $('.pp-site-subnav__pill', nav), links = $$('.pp-site-subnav__link', nav);
    var secs = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
    var cur = null;

    /* a frame under a scale (desktop frames shrunk to fit a phone) reports client rects in scaled pixels; scrollTop is not */
    function k() { return page.clientHeight ? page.getBoundingClientRect().height / page.clientHeight : 1; }
    function local(el) { return (el.getBoundingClientRect().top - page.getBoundingClientRect().top) / k(); }
    /* where a section's top lands when it is scrolled to: just under the header and the sub-menu */
    function target(s) { return Math.max(0, local(s) + page.scrollTop - nav.offsetHeight - (parseFloat(getComputedStyle(nav).top) || 0)); }

    function mark(a, snap) {
      if (a === cur) return;
      cur = a;
      links.forEach(function (l) { if (l === a) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current'); });
      nav.classList.toggle('pp-site-subnav--active', !!a);
      if (!a) return;
      if (snap) { pill.style.transition = 'none'; }
      pill.style.setProperty('--_x', a.offsetLeft + 'px');
      pill.style.setProperty('--_sx', (a.offsetWidth / pill.offsetWidth).toFixed(3));
      if (snap) { void pill.offsetWidth; pill.style.transition = ''; }
      var l = a.offsetLeft - tabs.scrollLeft;
      if (l < 0 || l + a.offsetWidth > tabs.clientWidth) tabs.scrollTo({ left: Math.max(0, a.offsetLeft - 24), behavior: reduce ? 'auto' : 'smooth' });
    }
    function check() {
      if (page.scrollTop > 0 && page.scrollTop + page.clientHeight >= page.scrollHeight - 2) { mark(links[links.length - 1], cur === null); return; } /* at the very end the last tab is current, even when its section is too short to reach the top */
      var y = local(nav) + nav.offsetHeight + 24, hit = null;
      secs.forEach(function (s, i) { if (!s) return; var t = local(s); if (t <= y && t + s.offsetHeight > y) hit = links[i]; });
      mark(hit, cur === null);
    }

    /* a frame that starts with a tab current starts scrolled to that section */
    var first = links.filter(function (l) { return l.getAttribute('aria-current') === 'true'; })[0] || null;
    if (first) page.scrollTop = target(secs[links.indexOf(first)]);
    page.addEventListener('scroll', check, { passive: true });
    function again() { var a = cur; cur = null; mark(a, true); }
    addEventListener('resize', again);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(again);
    check();

    links.forEach(function (a, i) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        if (secs[i]) page.scrollTo({ top: target(secs[i]), behavior: reduce ? 'auto' : 'smooth' });
      });
    });
  });
})();
