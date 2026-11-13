/* PREVIEW ONLY. Plays the four Leave demos on the "Site Leave demos" UI kit page, with the same timings as the
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
  function setState(stack, key) {
    $$('.pp-site-state__item', stack).forEach(function (i) { var on = i.getAttribute('data-state') === key; i.classList.toggle(ON, on); if (on) i.removeAttribute('aria-hidden'); else i.setAttribute('aria-hidden', 'true'); });
  }
  function stepIn(e, on) { e.classList.toggle('pp-site-step--in', on !== false); }
  function live(sec) { sec.setAttribute('data-site-live', ''); }
  function again(sec) { return $('.pp-site-demo__again', sec); }
  function showAgain(sec, on) { var a = again(sec); if (a) a.classList.toggle('pp-site-demo__again--in', on); }

  /* Leave types appear one by one, then a company type is added. */
  function types(sec) {
    var R = runner(), rows = $$('.pp-site-demo__row', sec);
    function reset() { R.stop(); rows.forEach(function (r) { stepIn(r, false); }); showAgain(sec, false); }
    function play() {
      live(sec); reset();
      rows.forEach(function (r, i) { R.at(500 + i * 500 + (i === 4 ? 700 : 0), function () { stepIn(r); }); });
      R.at(4200, function () { showAgain(sec, true); });
    }
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }

  /* The phone request: fields fill, the days are counted, the request is sent. */
  function req(sec) {
    var R = runner(), flds = $$('.pp-site-request__field', sec), count = $('.pp-site-request__count', sec), sub = $('.pp-site-request__submit', sec), toast = $('.pp-site-request__toast', sec);
    var ON_F = 'pp-site-request__field--on', SET_F = 'pp-site-request__field--set';
    function reset() { R.stop(); flds.forEach(function (f) { f.classList.remove(ON_F, SET_F); }); count.classList.remove('pp-site-request__count--on'); sub.disabled = false; sub.classList.remove('pp-site-request__submit--press'); toast.classList.remove('pp-site-request__toast--on'); showAgain(sec, false); }
    function sent() { sub.disabled = true; flds.forEach(function (f) { f.classList.remove(ON_F); f.classList.add(SET_F); }); count.classList.add('pp-site-request__count--on'); toast.classList.add('pp-site-request__toast--on'); showAgain(sec, true); }
    function set(f) { f.classList.remove(ON_F); f.classList.add(SET_F); }
    function play() {
      live(sec); reset();
      [0, 1, 2].forEach(function (i) { R.at(500 + i * 700, function () { if (i) set(flds[i - 1]); flds[i].classList.add(ON_F); }); });
      R.at(2700, function () { set(flds[2]); count.classList.add('pp-site-request__count--on'); });
      R.at(3700, function () { sub.classList.add('pp-site-request__submit--press'); R.at(300, sent); });
    }
    sub.addEventListener('click', function () { if (sub.disabled) return; R.stop(); sent(); });
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }

  /* Approval: waiting, Batsi reminds, the line manager approves (or declines). */
  function appr(sec) {
    var R = runner(), s = $('.pp-site-demo__top > .pp-site-state', sec), n = $('.pp-site-suggest', sec), d = $('.pp-site-approval__decide', sec), ok = $('.pp-button--primary', d), no = $('.pp-button--default', d), l = $('.pp-site-approval__log', sec);
    var DONE = 'pp-site-approval__decide--done';
    function reset() { R.stop(); setState(s, 'none'); stepIn(n, false); stepIn(l, false); d.classList.remove(DONE); ok.disabled = true; no.disabled = true; ok.classList.remove('pp-button--pressed'); showAgain(sec, false); }
    function approve() { if (d.classList.contains(DONE)) return; R.stop(); ok.classList.add('pp-button--pressed'); setTimeout(function () { d.classList.add(DONE); setState(s, 'done'); stepIn(l); showAgain(sec, true); }, 300); }
    function play() {
      live(sec); reset();
      R.at(700, function () { setState(s, 'wait'); ok.disabled = false; no.disabled = false; });
      R.at(2300, function () { stepIn(n); });
      R.at(5200, approve);
    }
    ok.addEventListener('click', approve);
    no.addEventListener('click', function () { if (no.disabled || d.classList.contains(DONE)) return; R.stop(); ok.disabled = true; no.disabled = true; setState(s, 'no'); showAgain(sec, true); });
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }

  /* Calendar and balance: the days are requested, then approved, and the balance counts down. */
  function bal(sec) {
    var R = runner(), days = $$('.pp-site-calendar__layer--approved', sec).map(function (e) { return e.parentNode; }), numEl = $('.pp-site-balance__num', sec), fill = $('.pp-site-balance__fill', sec);
    var REQ = 'pp-site-calendar__day--requested', APP = 'pp-site-calendar__day--approved', FLASH = 'pp-site-balance__num--flash';
    function setBal(v) { numEl.children[0].textContent = v + ' days'; numEl.children[1].textContent = v + ' days'; fill.style.setProperty('--_fill', v / 15); }
    function reset() { R.stop(); days.forEach(function (e) { e.classList.remove(REQ, APP); }); numEl.classList.remove(FLASH); setBal(15); showAgain(sec, false); }
    function play() {
      live(sec); reset();
      days.forEach(function (e, i) { R.at(800 + i * 180, function () { e.classList.add(REQ); }); });
      R.at(2800, function () {
        days.forEach(function (e) { e.classList.remove(REQ); e.classList.add(APP); });
        numEl.classList.add(FLASH);
        var v = 15;
        (function dn() { if (v <= 11) { showAgain(sec, true); return; } v--; setBal(v); R.at(220, dn); })();
      });
    }
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }

  var ENGINE = { types: types, req: req, appr: appr, bal: bal };
  $$('.pp-site-demo[data-demo]').forEach(function (sec) { var e = ENGINE[sec.getAttribute('data-demo')]; if (e) e(sec); });
})();
