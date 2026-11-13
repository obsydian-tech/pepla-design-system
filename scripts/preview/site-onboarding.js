/* PREVIEW ONLY. Plays the six Onboarding demos on the "Site Onboarding demos" UI kit page, with the same timings as the
   approved page: each demo starts when it scrolls into view and "Play again" restarts it. It mirrors what the Angular
   site will do and is never shipped. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function runner() { var t = []; return { at: function (ms, f) { t.push(setTimeout(f, ms)); }, stop: function () { t.forEach(clearTimeout); t = []; } }; }
  function onView(el, fn) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var o = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { fn(); o.unobserve(el); } }); }, { threshold: 0.35 });
    o.observe(el);
  }
  var ON = 'pp-site-state__item--on';
  /* Move the current state of a stack of states. */
  function setState(stack, key) {
    $$('.pp-site-state__item', stack).forEach(function (i) { var on = i.getAttribute('data-state') === key; i.classList.toggle(ON, on); if (on) i.removeAttribute('aria-hidden'); else i.setAttribute('aria-hidden', 'true'); });
  }
  function stepIn(e, on) { e.classList.toggle('pp-site-step--in', on !== false); }
  function reflow(e) { void e.offsetWidth; }
  function live(sec) { sec.setAttribute('data-site-live', ''); }
  function again(sec) { return $('.pp-site-demo__again', sec); }
  function showAgain(sec, on) { var a = again(sec); if (a) a.classList.toggle('pp-site-demo__again--in', on); }

  /* New employee's phone */
  function phone(sec) {
    var R = runner(), phoneEl = $('.pp-site-phone', sec), open = $('.pp-site-phone__open', sec), cons = $('.pp-site-phone__consent', sec), docs = $$('.pp-site-phone__doc', sec), note = $('.pp-site-phone__note', sec);
    function doc(k) { return $('.pp-site-phone__doc[data-doc="' + k + '"]', sec); }
    function bar(d, full) { var f = $('.pp-site-phone__fill', d); f.classList.add('pp-site-phone__fill--reset'); f.classList.toggle('pp-site-phone__fill--full', full); reflow(f); f.classList.remove('pp-site-phone__fill--reset'); return f; }
    function up(k, res, label) {
      var d = doc(k), s = $('.pp-site-state', d), t = $('.pp-site-phone__track', d);
      setState(s, 'uploading'); $('.pp-site-phone__fill', d).classList.add('pp-site-phone__fill--full');
      R.at(1000, function () { setState(s, 'reading'); t.classList.add('pp-site-phone__track--dim'); });
      R.at(2200, function () { setState(s, label); t.classList.remove('pp-site-phone__track--dim'); d.classList.add(res === 'bad' ? 'pp-site-phone__doc--bad' : 'pp-site-phone__doc--ok'); });
    }
    function reset() {
      R.stop(); open.classList.remove('pp-site-phone__open--press'); cons.classList.remove('pp-site-phone__consent--on'); stepIn(cons, false); stepIn(note, false); setState(note, 'a');
      docs.forEach(function (d) { stepIn(d, false); d.classList.remove('pp-site-phone__doc--bad', 'pp-site-phone__doc--ok'); setState($('.pp-site-state', d), 'waiting'); $('.pp-site-phone__track', d).classList.remove('pp-site-phone__track--dim'); bar(d, false); });
    }
    function play() {
      live(sec); reset();
      R.at(700, function () { open.classList.add('pp-site-phone__open--press'); });
      R.at(1200, function () { stepIn(cons); });
      R.at(1900, function () { cons.classList.add('pp-site-phone__consent--on'); });
      R.at(2500, function () { docs.forEach(function (d, i) { setTimeout(function () { stepIn(d); }, i * 120); }); });
      R.at(3300, function () { up('id', 'ok', 'matches'); });
      R.at(4300, function () { up('bank', 'bad', 'look'); });
      R.at(5300, function () { up('tax', 'ok', 'received'); });
      R.at(9200, function () { var d = doc('bank'); d.classList.remove('pp-site-phone__doc--bad'); bar(d, false); up('bank', 'ok', 'matches'); });
      R.at(12000, function () { setState(note, 'b'); stepIn(note); });
      R.at(16500, play);
    }
    onView(sec, play);
  }

  /* Document read */
  function read(sec) {
    var R = runner(), card = $('.pp-site-read__doc', sec), f = $$('.pp-site-read__value', sec), ck = $$('.pp-site-read__check', sec), sg = $('.pp-site-read__suggest', sec), dd = $('.pp-site-read__decide', sec), lg = $('.pp-site-read__log', sec), s = $('.pp-site-demo__top .pp-site-state', sec), acc = $('.pp-button--primary', dd);
    function reset() {
      R.stop(); card.classList.remove('pp-site-read__doc--go'); reflow(card); f.forEach(function (b) { b.classList.remove('pp-site-read__value--in'); });
      ck.forEach(function (c) { stepIn(c, false); $('.pp-site-ok', c).classList.remove('pp-site-ok--in'); });
      [sg, dd, lg].forEach(function (e) { stepIn(e, false); }); dd.classList.remove('pp-site-read__decide--done'); acc.classList.remove('pp-button--pressed'); showAgain(sec, false); setState(s, 'reading');
    }
    function accept() {
      if (dd.classList.contains('pp-site-read__decide--done')) return;
      acc.classList.add('pp-button--pressed');
      setTimeout(function () { dd.classList.add('pp-site-read__decide--done'); setState(s, 'accepted'); stepIn(lg); showAgain(sec, true); }, 300);
    }
    function play() {
      live(sec); reset();
      R.at(300, function () { card.classList.add('pp-site-read__doc--go'); });
      f.forEach(function (b, i) { R.at(900 + i * 450, function () { b.classList.add('pp-site-read__value--in'); }); });
      ck.forEach(function (c, i) { R.at(2900 + i * 500, function () { stepIn(c); setTimeout(function () { $('.pp-site-ok', c).classList.add('pp-site-ok--in'); }, 200); }); });
      R.at(4700, function () { stepIn(sg); setState(s, 'matches'); });
      R.at(5400, function () { stepIn(dd); });
      R.at(7600, accept);
    }
    acc.addEventListener('click', function () { R.stop(); accept(); });
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }

  /* Follow-ups */
  function follow(sec) {
    var R = runner(), li = $$('.pp-site-timeline__item', sec), fill = $('.pp-site-timeline__fill', sec), w = $('.pp-site-timeline__waiting', sec), s = $('.pp-site-demo__top .pp-site-state', sec);
    function reset() { R.stop(); li.forEach(function (l) { stepIn(l, false); }); fill.style.setProperty('--_fill', 0); stepIn(w, false); showAgain(sec, false); setState(s, 'missing'); }
    function play() {
      live(sec); reset();
      li.forEach(function (l, i) { R.at(500 + i * 1100, function () { stepIn(l); fill.style.setProperty('--_fill', Math.min(1, (l.offsetTop + 10) / fill.offsetHeight)); if (i === li.length - 1) setState(s, 'received'); }); });
      R.at(500 + li.length * 1100 + 300, function () { stepIn(w); showAgain(sec, true); });
    }
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }

  /* Contract */
  function contract(sec) {
    var R = runner(), mf = $$('.pp-site-contract__detail', sec), ink = $('.pp-site-contract__ink', sec), sigT = $('.pp-site-contract__sign-note', sec), p = $('.pp-site-contract__probation', sec), s = $('.pp-site-demo__top .pp-site-state', sec);
    function mark(m, on) { m.classList.toggle('pp-site-contract__detail--in', on); $('.pp-site-contract__label', m).setAttribute('aria-hidden', String(on)); if (on) $('.pp-site-contract__value', m).removeAttribute('aria-hidden'); else $('.pp-site-contract__value', m).setAttribute('aria-hidden', 'true'); }
    function reset() { R.stop(); mf.forEach(function (m) { mark(m, false); }); ink.classList.remove('pp-site-contract__ink--on'); setState(sigT, 'waiting'); stepIn(p, false); showAgain(sec, false); setState(s, 'draft'); }
    function play() {
      live(sec); reset();
      mf.forEach(function (m, i) { R.at(600 + i * 500, function () { mark(m, true); }); });
      R.at(2900, function () { setState(s, 'sent'); });
      R.at(4200, function () { ink.classList.add('pp-site-contract__ink--on'); });
      R.at(5600, function () { setState(sigT, 'signed'); setState(s, 'signed'); });
      R.at(6400, function () { stepIn(p); showAgain(sec, true); });
    }
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }

  /* Checklists: tick one after another. */
  function checklist(sec) {
    var R = runner(), it = $$('.pp-site-checklist__item', sec), done = $('.pp-site-checklist__done', sec), s = $('.pp-site-demo__top .pp-site-state', sec);
    function after(on) { if (done) stepIn(done, on); if (s) setState(s, on ? 'closed' : 'open'); }
    function reset() { R.stop(); it.forEach(function (c) { c.classList.remove('pp-site-checklist__item--done', 'pp-site-checklist__item--now'); }); showAgain(sec, false); after(false); }
    function play() {
      live(sec); reset();
      it.forEach(function (c, i) {
        R.at(500 + i * 850, function () { c.classList.add('pp-site-checklist__item--now'); });
        R.at(500 + i * 850 + 550, function () { c.classList.remove('pp-site-checklist__item--now'); c.classList.add('pp-site-checklist__item--done'); });
      });
      R.at(500 + it.length * 850 + 400, function () { after(true); showAgain(sec, true); });
    }
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }

  var ENGINE = { phone: phone, read: read, follow: follow, contract: contract, laptop: checklist, exit: checklist };
  $$('.pp-site-demo[data-demo]').forEach(function (sec) { var e = ENGINE[sec.getAttribute('data-demo')]; if (e) e(sec); });
})();
