/* PREVIEW ONLY. Drives the live frames on the "Site header" UI kit page: scroll shrink, the shared menu panel, the phone sheet.
   It is not part of any component and is never shipped to the site. The Angular site does the same with a directive.
   Everything here sets classes, attributes and the documented --_ inputs; it never sets a width, height or position. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var canHover = matchMedia('(hover:hover)').matches;

  /* On a screen narrower than a desktop frame (1280px), shrink the desktop frames to fit (a scale, not a zoom: a zoom breaks container queries on iOS) instead of scrolling sideways inside the page. */
  function fit() {
    $$('.kframe--desktop').forEach(function (box) {
      var f = $('.pp-site-frame', box); if (!f) return;
      f.style.removeProperty('--_fit'); var avail = box.clientWidth, need = 1280;
      box.style.minHeight = '';
      if (avail && avail < need) { f.style.setProperty('--_fit', (avail / need).toFixed(4)); box.style.minHeight = '0'; }
    });
  }
  fit(); addEventListener('resize', fit);

  $$('.pp-site-frame').forEach(function (frame) {
    var page = $('.pp-site-frame__page', frame), header = $('.pp-site-header', frame);
    if (!page || !header) return;

    /* 1. scrolled: frosted and shorter after 24px. A frame that starts scrolled is scrolled for real. */
    var startsScrolled = header.classList.contains('pp-site-header--scrolled');
    function onScroll() { header.classList.toggle('pp-site-header--scrolled', page.scrollTop > 24); }
    page.addEventListener('scroll', onScroll, { passive: true });
    if (startsScrolled) page.scrollTop = 80;

    /* 2. the shared menu */
    var menu = $('.pp-site-menu', header), morph = menu && $('.pp-site-menu__morph', menu), cur = null, closeT = null;
    var items = menu ? $$('.pp-site-menu__item', menu).filter(function (li) { return $('.pp-site-menu__panel', li); }) : [];
    function parts(li) { return { b: $('.pp-site-menu__trigger', li), p: $('.pp-site-menu__panel', li) }; }
    function measure(li) {
      var x = parts(li), w = x.p.offsetWidth, h = x.p.offsetHeight;
      var left = Math.max(0, Math.min(x.b.offsetLeft - 8, menu.clientWidth - w));
      return { left: left, sx: Math.min(1, w / morph.offsetWidth), sy: Math.min(1, h / morph.offsetHeight), ax: x.b.offsetLeft + x.b.offsetWidth / 2 - 6 };
    }
    function place(li) {
      var m = measure(li);
      menu.style.setProperty('--_x', m.left + 'px'); menu.style.setProperty('--_sx', m.sx.toFixed(3));
      menu.style.setProperty('--_sy', m.sy.toFixed(3)); menu.style.setProperty('--_ax', m.ax + 'px');
    }
    function layout() { items.forEach(function (li) { var m = measure(li); parts(li).p.style.setProperty('--_x', m.left + 'px'); }); if (cur) place(cur); }
    function setOpen(li, on) {
      var x = parts(li);
      x.p.classList.toggle('pp-site-menu__panel--open', on);
      x.b.setAttribute('aria-expanded', String(on));
      if (on) x.p.removeAttribute('inert'); else x.p.setAttribute('inert', '');
    }
    function open(li) {
      clearTimeout(closeT);
      if (cur === li) return;
      var from = items.indexOf(cur), to = items.indexOf(li), dir = from < 0 ? 0 : (to > from ? 1 : -1);
      var first = !cur;
      if (cur) { parts(cur).p.style.setProperty('--_dir', String(-dir)); setOpen(cur, false); }
      parts(li).p.style.setProperty('--_dir', String(dir || 1));
      /* the first opening snaps the background under the link instead of sliding in from the corner */
      if (first) { morph.style.transition = 'none'; place(li); void morph.offsetWidth; morph.style.transition = ''; } else place(li);
      void parts(li).p.offsetWidth;
      parts(li).p.style.setProperty('--_dir', '0'); setOpen(li, true);
      cur = li; menu.classList.add('pp-site-menu--open');
    }
    function close(returnFocus) {
      clearTimeout(closeT);
      if (!cur) return;
      var b = parts(cur).b; setOpen(cur, false); cur = null; menu.classList.remove('pp-site-menu--open');
      if (returnFocus) b.focus();
    }
    if (menu && items.length) {
      /* a frame that starts with a list open keeps it until the pointer leaves */
      items.forEach(function (li) { if (parts(li).p.classList.contains('pp-site-menu__panel--open')) cur = li; });
      layout();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
      addEventListener('resize', layout);
      items.forEach(function (li) {
        var x = parts(li);
        x.b.addEventListener('mouseenter', function () { if (canHover) open(li); });
        x.b.addEventListener('click', function (e) {
          if (cur === li && (e.detail > 0 ? !canHover : true)) { close(true); return; }
          open(li);
          if (e.detail === 0) { var f = $('.pp-site-menu__link', x.p); if (f) f.focus(); }
        });
        x.p.addEventListener('mouseenter', function () { clearTimeout(closeT); });
        x.p.addEventListener('keydown', function (e) {
          var links = $$('.pp-site-menu__link', x.p), i = links.indexOf(document.activeElement);
          if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); links[Math.min(links.length - 1, i + 1)].focus(); }
          if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); links[Math.max(0, i - 1)].focus(); }
        });
      });
      $$('.pp-site-menu__item', menu).forEach(function (li) {
        if (items.indexOf(li) < 0) li.addEventListener('mouseenter', function () { if (canHover && cur) closeT = setTimeout(function () { close(); }, 120); });
      });
      menu.addEventListener('mouseleave', function () { if (canHover) closeT = setTimeout(function () { close(); }, 220); });
      document.addEventListener('click', function (e) { if (cur && !menu.contains(e.target)) close(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && cur && frame.contains(document.activeElement || frame)) close(true); });
    }

    /* 3. the phone sheet: opens from the menu button, traps focus, returns it */
    var sheet = $('.pp-site-sheet', frame), burger = $('.pp-site-header__burger', header);
    if (sheet && burger) {
      var panel = $('.pp-site-sheet__panel', sheet), x = $('.pp-site-sheet__head .pp-button', sheet);
      var focusables = function () { return $$('a[href], button', panel).filter(function (el) { return el.offsetParent !== null; }); };
      var openSheet = function () {
        sheet.classList.add('pp-site-sheet--open'); sheet.removeAttribute('inert'); page.setAttribute('inert', '');
        burger.setAttribute('aria-expanded', 'true'); x.focus();
      };
      var closeSheet = function () {
        sheet.classList.remove('pp-site-sheet--open'); sheet.setAttribute('inert', ''); page.removeAttribute('inert');
        burger.setAttribute('aria-expanded', 'false'); burger.focus();
      };
      if (sheet.classList.contains('pp-site-sheet--open')) { page.setAttribute('inert', ''); burger.setAttribute('aria-expanded', 'true'); }
      burger.addEventListener('click', openSheet);
      x.addEventListener('click', closeSheet);
      $('.pp-site-sheet__blanket', sheet).addEventListener('click', closeSheet);
      sheet.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('.pp-site-sheet__link')) { e.preventDefault(); closeSheet(); } });
      sheet.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { closeSheet(); return; }
        if (e.key !== 'Tab') return;
        var f = focusables(), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });
    }
  });
})();
