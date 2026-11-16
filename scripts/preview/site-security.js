/* PREVIEW ONLY. Plays the five Security demos and the landing page's Trust and POPIA section on the "Site Security
   demos" UI kit page, with the same timings as the approved pages: each demo starts when it scrolls into view and
   "Play again" restarts it. It mirrors what the Angular site will do and is never shipped. */
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
  function setState(stack, key) {
    $$('.pp-site-state__item', stack).forEach(function (i) { var on = i.getAttribute('data-state') === key; i.classList.toggle(ON, on); if (on) i.removeAttribute('aria-hidden'); else i.setAttribute('aria-hidden', 'true'); });
  }
  function stepIn(e, on) { e.classList.toggle('pp-site-step--in', on !== false); }
  function live(sec) { sec.setAttribute('data-site-live', ''); }
  function again(sec) { return $('.pp-site-demo__again, .pp-site-trust__again', sec); }
  function showAgain(sec, on) { var a = again(sec); if (a && a.classList.contains('pp-site-demo__again')) a.classList.toggle('pp-site-demo__again--in', on); }
  function press(btn, R, then) { btn.classList.remove('pp-button--pressed'); void btn.offsetWidth; btn.classList.add('pp-button--pressed'); R.at(400, then); }

  /* Audit rows: the page holds every row once; the script takes them out and adds them back one by one. */
  function rowsOf(list) { return $$('.pp-site-audit__row', list).map(function (r) { return r.cloneNode(true); }); }
  function addRow(list, tpl) { var r = tpl.cloneNode(true); r.classList.add('pp-site-audit__row--new'); list.appendChild(r); return r; }

  /* Hidden personal data: Show swaps in the real ID number, logs it, and it hides again. */
  var NOTE = 'Each Show is logged. Values hide again after 2 minutes.';
  function hider(box) {
    var val = $('.pp-site-hidden__value', box), btn = $('.pp-button', box), note = $('.pp-site-hidden__note', box), copies = $$('.pp-site-hidden__copy', val);
    function set(shown) {
      val.classList.toggle('pp-site-hidden__value--shown', shown);
      copies[0].setAttribute('aria-hidden', String(shown)); copies[1].setAttribute('aria-hidden', String(!shown));
      btn.textContent = shown ? 'Hide' : 'Show';
    }
    return {
      btn: btn,
      shown: function () { return val.classList.contains('pp-site-hidden__value--shown'); },
      reset: function () { set(false); btn.classList.remove('pp-button--pressed'); note.textContent = NOTE; },
      reveal: function () { set(true); note.textContent = 'Shown to Jane Smith. Logged at 09:45.'; },
      hide: function () { set(false); note.textContent = 'Hidden again. ' + NOTE; }
    };
  }

  /* Approvals: Batsi's reminder and an API write wait; Jane Smith approves. */
  function appr(sec) {
    var R = runner(), items = $$('.pp-site-queue__item', sec), s = $('.pp-site-queue__item--agent .pp-site-state', sec), d = $('.pp-site-approval__decide', sec), ok = $('.pp-button--primary', d), l = $('.pp-site-approval__log', sec);
    var DONE = 'pp-site-approval__decide--done';
    function reset() { R.stop(); items.concat([d, l]).forEach(function (e) { stepIn(e, false); }); d.classList.remove(DONE); ok.classList.remove('pp-button--pressed'); setState(s, 'wait'); showAgain(sec, false); }
    function approve() { if (d.classList.contains(DONE)) return; R.stop(); ok.classList.add('pp-button--pressed'); setTimeout(function () { d.classList.add(DONE); setState(s, 'done'); stepIn(l); showAgain(sec, true); }, 300); }
    function play() {
      live(sec); reset();
      R.at(500, function () { stepIn(items[0]); });
      R.at(1400, function () { stepIn(items[1]); });
      R.at(2300, function () { stepIn(d); });
      R.at(4800, approve);
    }
    ok.addEventListener('click', approve);
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }

  /* Audit trail: six entries arrive 0.7s apart. */
  function audit(sec) {
    var R = runner(), list = $('.pp-site-audit__list', sec), tpl = rowsOf(list);
    function play() {
      live(sec); R.stop(); list.textContent = ''; showAgain(sec, false);
      tpl.forEach(function (t, i) { R.at(500 + i * 700, function () { addRow(list, t); }); });
      R.at(500 + tpl.length * 700 + 300, function () { showAgain(sec, true); });
    }
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }

  /* Hidden data: Show is pressed, the ID number shows, the view is logged, and it hides again. */
  function mask(sec) {
    var R = runner(), h = hider($('.pp-site-hidden', sec)), l = $('.pp-site-hidden__log', sec);
    function hide() { h.hide(); showAgain(sec, true); }
    function reveal() { h.reveal(); stepIn(l); R.at(2800, hide); }
    function play() {
      live(sec); R.stop(); h.reset(); stepIn(l, false); showAgain(sec, false);
      R.at(1600, function () { press(h.btn, R, reveal); });
    }
    h.btn.addEventListener('click', function () { R.stop(); if (h.shown()) { hide(); return; } reveal(); });
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }

  /* POPIA consent: agreed, then the upload unlocks and the document is uploaded. */
  function consent(sec) {
    var R = runner(), c = $('.pp-site-consent', sec), up = $('.pp-site-consent__upload', sec), words = $('.pp-site-state--start', up), st = $('.pp-site-state:not(.pp-site-state--start)', up), l = $('.pp-site-consent__log', sec);
    function reset() { R.stop(); c.classList.remove('pp-site-consent--agreed'); up.classList.add('pp-site-consent__upload--locked'); setState(words, 'locked'); setState(st, 'locked'); stepIn(l, false); showAgain(sec, false); }
    function play() {
      live(sec); reset();
      R.at(1400, function () { c.classList.add('pp-site-consent--agreed'); stepIn(l); });
      R.at(2400, function () { up.classList.remove('pp-site-consent__upload--locked'); setState(st, 'ready'); });
      R.at(4000, function () { setState(words, 'done'); setState(st, 'done'); showAgain(sec, true); });
    }
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }

  /* Data in South Africa: what is stored there, one row after another. */
  function res(sec) {
    var R = runner(), rows = $$('.pp-site-residency__row', sec);
    function play() {
      live(sec); R.stop(); rows.forEach(function (r) { stepIn(r, false); }); showAgain(sec, false);
      rows.forEach(function (r, i) { R.at(600 + i * 600, function () { stepIn(r); }); });
      R.at(600 + rows.length * 600 + 200, function () { showAgain(sec, true); });
    }
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }

  /* Landing Trust and POPIA: five entries arrive, Batsi's reminder waits and is approved, then the ID number is shown,
     logged and hidden again. The last three rows on the page are the reminder, the approval and the view. */
  function trust(sec) {
    var R = runner(), list = $('.pp-site-audit__list', sec), tpl = rowsOf(list), h = hider($('.pp-site-hidden', sec));
    var first = tpl.slice(0, 5), draft = tpl[5], approved = tpl[6], viewed = tpl[7], pend = null;
    function approve() {
      if (!pend || !pend.classList.contains('pp-site-audit__row--waiting')) return;
      pend.classList.remove('pp-site-audit__row--waiting');
      $('.pp-site-audit__what', pend).textContent = $('.pp-site-audit__what', draft).textContent;
      addRow(list, approved);
    }
    function hide() { h.hide(); }
    function reveal() { if (h.shown()) return; h.reveal(); addRow(list, viewed); R.at(2600, hide); }
    function play() {
      live(sec); R.stop(); list.textContent = ''; pend = null; h.reset();
      first.forEach(function (t, i) { R.at(400 + i * 650, function () { addRow(list, t); }); });
      var t = 400 + first.length * 650;
      R.at(t, function () {
        pend = addRow(list, draft); pend.classList.add('pp-site-audit__row--waiting');
        var what = $('.pp-site-audit__what', pend), wait = document.createElement('span'), btn = document.createElement('button');
        wait.className = 'pp-site-status pp-site-status--warning'; wait.textContent = 'Waiting for approval';
        btn.className = 'pp-button pp-button--primary pp-button--small'; btn.type = 'button'; btn.textContent = 'Approve';
        what.appendChild(document.createTextNode(' ')); what.appendChild(wait); what.appendChild(btn);
        btn.addEventListener('click', function () { R.stop(); approve(); });
      });
      R.at(t + 2200, function () { var b = pend && $('.pp-button', pend); if (b) press(b, R, approve); });
      R.at(t + 4000, function () { press(h.btn, R, reveal); });
    }
    h.btn.addEventListener('click', function () { if (h.shown()) { R.stop(); hide(); return; } reveal(); });
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }

  var ENGINE = { 'sec-appr': appr, 'sec-audit': audit, 'sec-mask': mask, 'sec-consent': consent, 'sec-res': res, 'sec-trust': trust };
  $$('[data-demo]').forEach(function (sec) { var pg = sec.closest('[data-site-module]'); if (pg && pg.getAttribute('data-site-module') !== 'security') return; /* a whole-site kit page holds every module's demos */ var e = ENGINE[sec.getAttribute('data-demo')]; if (e) e(sec); });
})();
