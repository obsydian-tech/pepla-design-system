/* PREVIEW ONLY. Plays the landing page's Compliance and Leave sections on the "Site landing compliance and leave" UI kit
   page, with the approved page's timings. It mirrors what the Angular site will do and is never shipped. */
(function () {
  var one = function (s, r) { return (r || document).querySelector(s); };
  var all = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  /* Reduced motion: demos, fades and slow light keep playing. Only large movement stops (none in this script). */
  function runner() { var t = []; return { at: function (ms, f) { t.push(setTimeout(f, ms)); }, stop: function () { t.forEach(clearTimeout); t = []; } }; }
  function onView(el, fn, th) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var o = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { fn(); o.disconnect(); } }, { threshold: th });
    o.observe(el);
  }
  function state(stack, key) { all('.pp-site-state__item', stack).forEach(function (i) { var on = i.getAttribute('data-state') === key; i.classList.toggle('pp-site-state__item--on', on); if (on) i.removeAttribute('aria-hidden'); else i.setAttribute('aria-hidden', 'true'); }); }
  function step(e, on) { e.classList.toggle('pp-site-step--in', on); }

  /* Compliance: days count down from 3 Nov, reminders go out at 60, 30 and 7 days, John Doe's licence goes overdue,
     Batsi reads the renewal and Jane Smith accepts it. */
  all('[data-demo^="land-cmp"]').forEach(function (sec) {
    var R = runner(), rows = all('.pp-site-ledger__row', sec), today = one('.pp-site-ledger__today', sec), radar = one('.pp-site-radar', sec);
    var clr = one('.pp-site-clear', sec), cnt = one('.pp-site-clear__count', sec), rn = one('.pp-site-watch__renew', sec);
    var lines = all('.pp-site-watch__line', rn), read = one('.pp-site-read', rn), doc = one('.pp-site-read__doc', rn), vals = all('.pp-site-read__value', rn);
    var sg = one('.pp-site-read__suggest', rn), dd = one('.pp-site-read__decide', rn), acc = one('.pp-button', dd), START = 3, STEPS = 11;
    function chip(r, d) {
      var c = one('.pp-site-status', r);
      if (r.classList.contains('pp-site-ledger__row--renewed')) { c.className = 'pp-site-status pp-site-status--success'; c.textContent = '1,095 days'; return; }
      if (d < 0) { c.className = 'pp-site-status pp-site-status--danger'; c.textContent = (-d) + (d === -1 ? ' day' : ' days') + ' overdue'; }
      else if (d === 0) { c.className = 'pp-site-status pp-site-status--warning'; c.textContent = 'Expires today'; }
      else { c.className = 'pp-site-status pp-site-status--' + (d <= 30 ? 'warning' : 'success'); c.textContent = d + (d === 1 ? ' day' : ' days'); }
      all('.pp-site-ledger__pip', r).forEach(function (p) {
        var on = d <= +p.getAttribute('data-r');
        if (on && !p.classList.contains('pp-site-ledger__pip--sent')) { p.classList.add('pp-site-ledger__pip--hit'); setTimeout(function () { p.classList.remove('pp-site-ledger__pip--hit'); }, 500); }
        p.classList.toggle('pp-site-ledger__pip--sent', on);
      });
      r.classList.toggle('pp-site-ledger__row--late', d < 0);
    }
    function late(on) { clr.classList.toggle('pp-site-clear--has', on); radar.classList.toggle('pp-site-radar--overdue', on); state(cnt, on ? 'one' : 'z'); }
    function day(k) { today.textContent = 'Today · ' + (START + k) + ' Nov'; rows.forEach(function (r) { chip(r, +r.getAttribute('data-d') - k); }); late(rows[0].classList.contains('pp-site-ledger__row--late')); }
    function reset() {
      R.stop(); sec.setAttribute('data-site-live', '');
      rows.forEach(function (r) { r.classList.remove('pp-site-ledger__row--renewed', 'pp-site-ledger__row--late'); all('.pp-site-ledger__pip', r).forEach(function (p) { p.classList.remove('pp-site-ledger__pip--sent'); }); });
      rn.classList.remove('pp-site-watch__renew--on'); lines.concat([read, sg]).forEach(function (e) { step(e, false); });
      vals.forEach(function (v) { v.classList.remove('pp-site-read__value--in'); }); dd.classList.remove('pp-site-read__decide--done'); acc.classList.remove('pp-button--pressed'); doc.classList.remove('pp-site-read__doc--go');
      day(0);
    }
    function accept() {
      if (dd.classList.contains('pp-site-read__decide--done')) return; R.stop();
      rn.classList.add('pp-site-watch__renew--on'); lines.concat([read, sg]).forEach(function (e) { step(e, true); }); vals.forEach(function (v) { v.classList.add('pp-site-read__value--in'); }); dd.classList.add('pp-site-read__decide--done');
      var r = rows[0]; r.classList.remove('pp-site-ledger__row--late'); r.classList.add('pp-site-ledger__row--renewed'); all('.pp-site-ledger__pip', r).forEach(function (p) { p.classList.remove('pp-site-ledger__pip--sent'); }); chip(r, 0); late(false);
    }
    function play() {
      reset(); var t = 700;
      for (var k = 1; k <= STEPS; k++) { (function (k) { R.at(t, function () { day(k); }); })(k); t += k >= 9 ? 650 : 340; }
      R.at(t + 500, function () { rn.classList.add('pp-site-watch__renew--on'); step(lines[0], true); });
      R.at(t + 1500, function () { step(lines[1], true); });
      R.at(t + 2300, function () { step(read, true); void doc.offsetWidth; doc.classList.add('pp-site-read__doc--go'); });
      vals.forEach(function (v, i) { R.at(t + 3000 + i * 320, function () { v.classList.add('pp-site-read__value--in'); }); });
      R.at(t + 4600, function () { step(sg, true); });
      R.at(t + 6300, function () { acc.classList.add('pp-button--pressed'); R.at(400, accept); });
    }
    acc.addEventListener('click', accept);
    one('.pp-site-replay', sec).addEventListener('click', play);
    onView(one('.pp-site-watch', sec), play, 0.35);
  });

  /* Leave: John Doe fills the request on the phone, the days appear on the calendar, Batsi reminds the line manager,
     the line manager approves and the balance counts down to 11 days. */
  var JD = [14, 15, 17, 18];
  all('[data-demo^="land-lv"]').forEach(function (sec) {
    var R = runner(), flds = all('.pp-site-request__field', sec), count = one('.pp-site-request__count', sec), sub = one('.pp-site-request__submit', sec), toast = one('.pp-site-request__toast', sec);
    var cal = one('.pp-site-calendar__grid', sec), st = one('.pp-site-leave__top .pp-site-state', sec), nudge = one('.pp-site-suggest', sec), dd = one('.pp-site-approval__decide', sec);
    var btn = one('.pp-button--primary', dd), dec = one('.pp-button--default', dd), num = one('.pp-site-balance__num', sec), fill = one('.pp-site-balance__fill', sec);
    function d(n) { return one('[data-d="' + n + '"]', cal); }
    function bal(v) { all('span', num).forEach(function (s) { s.textContent = v + ' days'; }); fill.style.setProperty('--_fill', String(v / 15)); }
    function sent(on) { sub.disabled = on; }
    function reset() {
      R.stop(); sec.setAttribute('data-site-live', '');
      flds.forEach(function (f) { f.classList.remove('pp-site-request__field--on', 'pp-site-request__field--set'); }); count.classList.remove('pp-site-request__count--on'); sent(false); sub.classList.remove('pp-site-request__submit--press'); toast.classList.remove('pp-site-request__toast--on');
      JD.forEach(function (n) { d(n).classList.remove('pp-site-calendar__day--requested', 'pp-site-calendar__day--approved'); });
      state(st, 'none'); step(nudge, false); dd.classList.remove('pp-site-approval__decide--done'); btn.disabled = true; dec.disabled = true; btn.classList.remove('pp-button--pressed');
      num.classList.remove('pp-site-balance__num--flash'); bal(15);
    }
    function submitted() {
      sent(true); flds.forEach(function (f) { f.classList.remove('pp-site-request__field--on'); f.classList.add('pp-site-request__field--set'); }); count.classList.add('pp-site-request__count--on');
      JD.forEach(function (n, i) { R.at(i * 160, function () { d(n).classList.add('pp-site-calendar__day--requested'); }); });
      state(st, 'wait'); btn.disabled = false; dec.disabled = false;
    }
    function approve() {
      if (dd.classList.contains('pp-site-approval__decide--done')) return; R.stop();
      if (!sub.disabled) { flds.forEach(function (f) { f.classList.add('pp-site-request__field--set'); }); count.classList.add('pp-site-request__count--on'); sent(true); }
      JD.forEach(function (n) { d(n).classList.remove('pp-site-calendar__day--requested'); d(n).classList.add('pp-site-calendar__day--approved'); });
      dd.classList.add('pp-site-approval__decide--done'); state(st, 'done'); step(nudge, true);
      var v = 15; (function dn() { if (v <= 11) { toast.classList.add('pp-site-request__toast--on'); return; } v--; bal(v); num.classList.add('pp-site-balance__num--flash'); setTimeout(dn, 220); })();
    }
    function play() {
      reset();
      flds.forEach(function (f, i) { R.at(500 + i * 700, function () { if (i) { flds[i - 1].classList.remove('pp-site-request__field--on'); flds[i - 1].classList.add('pp-site-request__field--set'); } f.classList.add('pp-site-request__field--on'); }); });
      R.at(2700, function () { flds[2].classList.remove('pp-site-request__field--on'); flds[2].classList.add('pp-site-request__field--set'); count.classList.add('pp-site-request__count--on'); });
      R.at(3700, function () { sub.classList.add('pp-site-request__submit--press'); R.at(300, submitted); });
      R.at(6000, function () { step(nudge, true); });
      R.at(7800, function () { btn.classList.add('pp-button--pressed'); R.at(400, approve); });
    }
    sub.addEventListener('click', function () { if (sub.disabled) return; R.stop(); flds.forEach(function (f) { f.classList.add('pp-site-request__field--set'); }); submitted(); });
    btn.addEventListener('click', approve);
    dec.addEventListener('click', function () { R.stop(); JD.forEach(function (n) { d(n).classList.remove('pp-site-calendar__day--requested'); }); state(st, 'no'); btn.disabled = true; dec.disabled = true; });
    one('.pp-site-replay', sec).addEventListener('click', play);
    onView(one('.pp-site-leave', sec), play, 0.35);
  });
})();
