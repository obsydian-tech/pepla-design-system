/* PREVIEW ONLY. Plays the five Compliance demos on the "Site Compliance demos" UI kit page, with the same timings as the
   approved page: each demo starts when it scrolls into view and "Play again" restarts it. It mirrors what the Angular
   site will do and is never shipped. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function runner() { var t = []; return { at: function (ms, f) { t.push(setTimeout(f, ms)); }, stop: function () { t.forEach(clearTimeout); t = []; } }; }
  function onView(el, fn, th) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var o = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { fn(); o.unobserve(el); } }); }, { threshold: th || 0.35 });
    o.observe(el);
  }
  var ON = 'pp-site-state__item--on';
  function setState(stack, key) {
    $$('.pp-site-state__item', stack).forEach(function (i) { var on = i.getAttribute('data-state') === key; i.classList.toggle(ON, on); if (on) i.removeAttribute('aria-hidden'); else i.setAttribute('aria-hidden', 'true'); });
  }
  function stepIn(e, on) { e.classList.toggle('pp-site-step--in', on !== false); }
  function live(sec) { sec.setAttribute('data-site-live', ''); }
  function again(sec) { return $('.pp-site-demo__again', sec); }
  function showAgain(sec, on) { var a = again(sec); if (a) a.classList.toggle('pp-site-demo__again--in', on); }
  function topState(sec) { return $('.pp-site-demo__top > .pp-site-state', sec); }

  /* Requirements: the role's list is copied onto the new employee. */
  function req(sec) {
    var R = runner(), box = $$('.pp-site-req__box', sec)[1], rows = $$('.pp-site-req__row', box), s = $('.pp-site-req__head .pp-site-state', box);
    function reset() { R.stop(); box.classList.remove('pp-site-req__box--live'); rows.forEach(function (r) { stepIn(r, false); setState($('.pp-site-state', r), 'rq'); }); setState(s, 'new'); showAgain(sec, false); }
    function play() {
      live(sec); reset();
      R.at(900, function () { box.classList.add('pp-site-req__box--live'); setState(s, 'added'); });
      rows.forEach(function (r, i) { R.at(1300 + i * 500, function () { stepIn(r); }); });
      R.at(3600, function () { setState($('.pp-site-state', rows[0]), 'up'); });
      R.at(4300, function () { setState($('.pp-site-state', rows[1]), 'up'); });
      R.at(5000, function () { setState($('.pp-site-state', rows[2]), 'due'); showAgain(sec, true); });
    }
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }

  /* Register: the filters cycle by themselves and answer a click. */
  function reg(sec) {
    var btns = $$('.pp-site-register__filter', sec), rows = $$('.pp-site-register__row', sec), auto = true, i = 0, t = null, started = false;
    function apply(f) {
      btns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-f') === f)); });
      rows.forEach(function (r) { var s = r.getAttribute('data-s'); r.classList.toggle('pp-site-register__row--off', !(f === 'all' || s === f)); });
    }
    function cycle() { if (!auto) return; var F = ['all', 'due', 'late']; i = (i + 1) % 3; apply(F[i]); t = setTimeout(cycle, 3200); }
    btns.forEach(function (b) { b.addEventListener('click', function () { auto = false; clearTimeout(t); apply(b.getAttribute('data-f')); }); });
    live(sec);
    onView(sec, function () { if (started) return; started = true; t = setTimeout(cycle, 2600); });
  }

  /* Reminders: each reminder is sent, the licence expires, the renewal closes it. */
  function rem(sec) {
    var R = runner(), li = $$('.pp-site-timeline__item', sec), fill = $('.pp-site-timeline__fill', sec), c = topState(sec);
    function reset() { R.stop(); li.forEach(function (l) { stepIn(l, false); }); fill.style.setProperty('--_fill', 0); showAgain(sec, false); setState(c, 'valid'); }
    function play() {
      live(sec); reset();
      li.forEach(function (l, i) {
        R.at(500 + i * 1100, function () {
          stepIn(l); fill.style.setProperty('--_fill', Math.min(1, (l.offsetTop + 10) / fill.offsetHeight));
          if (i === 2) setState(c, 'd7'); if (i === 3) setState(c, 'exp'); if (i === 4) setState(c, 'ren');
        });
      });
      R.at(500 + li.length * 1100 + 300, function () { showAgain(sec, true); });
    }
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }

  /* Renewals: scan, fields, Batsi suggests, Jane Smith accepts, the register updates. */
  function read(sec) {
    var R = runner(), card = $('.pp-site-read__doc', sec), f = $$('.pp-site-read__value', sec), sg = $('.pp-site-read__suggest', sec), dd = $('.pp-site-read__decide', sec), rr = $('.pp-site-register__row', sec), s = topState(sec), acc = $('.pp-button--primary', dd);
    function reset() { R.stop(); card.classList.remove('pp-site-read__doc--go'); void card.offsetWidth; f.forEach(function (b) { b.classList.remove('pp-site-read__value--in'); }); [sg, dd, rr].forEach(function (e) { stepIn(e, false); }); dd.classList.remove('pp-site-read__decide--done'); acc.classList.remove('pp-button--pressed'); showAgain(sec, false); setState(s, 'reading'); }
    function accept() { if (dd.classList.contains('pp-site-read__decide--done')) return; acc.classList.add('pp-button--pressed'); setTimeout(function () { dd.classList.add('pp-site-read__decide--done'); setState(s, 'acc'); stepIn(rr); showAgain(sec, true); }, 300); }
    function play() {
      live(sec); reset();
      R.at(300, function () { card.classList.add('pp-site-read__doc--go'); });
      f.forEach(function (b, i) { R.at(900 + i * 450, function () { b.classList.add('pp-site-read__value--in'); }); });
      R.at(3000, function () { stepIn(sg); setState(s, 'matches'); });
      R.at(3700, function () { stepIn(dd); });
      R.at(6000, accept);
    }
    acc.addEventListener('click', function () { R.stop(); accept(); });
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }

  /* Not cleared to work: the licence expires, the list fills, the renewal empties it. */
  function nc(sec) {
    var R = runner(), box = $('.pp-site-clear', sec), n = $('.pp-site-clear__count', sec), d = $('.pp-site-day .pp-site-state', sec), t = $('.pp-site-clear__told', sec), sg = $('.pp-site-suggest', sec);
    function reset() { R.stop(); box.classList.remove('pp-site-clear--has'); setState(n, 'z'); setState(d, 'd0'); stepIn(t, false); stepIn(sg, false); showAgain(sec, false); }
    function play() {
      live(sec); reset();
      R.at(900, function () { setState(d, 'd1'); });
      R.at(1700, function () { setState(d, 'd2'); box.classList.add('pp-site-clear--has'); setState(n, 'one'); });
      R.at(2500, function () { stepIn(t); });
      R.at(5200, function () { box.classList.remove('pp-site-clear--has'); setState(n, 'z'); stepIn(t, false); stepIn(sg); showAgain(sec, true); });
    }
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }

  var ENGINE = { req: req, reg: reg, rem: rem, read: read, nc: nc };
  $$('.pp-site-demo[data-demo]').forEach(function (sec) { var e = ENGINE[sec.getAttribute('data-demo')]; if (e) e(sec); });
})();
