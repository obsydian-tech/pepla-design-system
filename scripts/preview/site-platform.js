/* PREVIEW ONLY. Plays the four Platform demos and the landing page's Platform section on the "Site Platform demos" UI
   kit page, with the same timings as the approved pages: each demo starts when it scrolls into view and "Play again"
   restarts it. It mirrors what the Angular site will do and is never shipped. */
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
  function again(sec) { return $('.pp-site-demo__again, .pp-site-platform__again', sec); }
  function showAgain(sec, on) { var a = again(sec); if (a && a.classList.contains('pp-site-demo__again')) a.classList.toggle('pp-site-demo__again--in', on); }

  /* A module row: its switch and the Off / On words under its name. */
  function flip(row, on) { $('.pp-toggle__input', row).checked = on; setState($('.pp-site-state', row), on ? 'on' : 'off'); }
  function rowsOf(sec) { return $$('.pp-site-modules__row[data-m]', sec); }

  /* Modules: Naleko switches four modules on, one by one; the sidebar chips follow. */
  function mod(sec) {
    var R = runner(), rows = rowsOf(sec), chips = $$('.pp-site-sidebar__item--module', sec), l = $('.pp-site-log', sec);
    function reset() { R.stop(); rows.forEach(function (r) { flip(r, false); }); chips.forEach(function (c) { c.classList.remove('pp-site-sidebar__item--in'); }); stepIn(l, false); showAgain(sec, false); }
    function play() {
      live(sec); reset();
      rows.forEach(function (r, i) { R.at(800 + i * 900, function () { flip(r, true); chips[i].classList.add('pp-site-sidebar__item--in'); }); });
      R.at(800 + rows.length * 900 + 200, function () { stepIn(l); showAgain(sec, true); });
    }
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }

  /* Rows of a settings list step in; the last one (the company's own) after a pause. */
  function list(sec, gap, end) {
    var R = runner(), rows = $$('.pp-site-list__row', sec), l = $('.pp-site-log', sec), last = rows.length - 1;
    function play() {
      live(sec); R.stop(); rows.concat([l]).forEach(function (e) { stepIn(e, false); }); showAgain(sec, false);
      rows.forEach(function (r, i) { R.at(500 + i * gap + (i === last ? 900 : 0), function () { stepIn(r); }); });
      R.at(end, function () { stepIn(l); showAgain(sec, true); });
    }
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }
  function tpl(sec) { list(sec, 450, 4000); }
  function hol(sec) { list(sec, 500, 3800); }

  /* Roles: the role buttons cycle every 3.2s from 2.6s after the demo is seen; a click stops the cycle. */
  var ROLES = [
    ['Administrator', 'Sets up the company, users and roles.', [['Settings and users', 'success', 'Full'], ['All modules switched on', 'success', 'Full'], ['Audit log', 'success', 'View']]],
    ['HR', 'Runs people processes across the modules.', [['All employee records', 'success', 'Full'], ['Recruitment, Onboarding, Leave, Compliance', 'success', 'Full'], ['Salary and ID details', 'warning', 'Hidden, each Show logged']]],
    ['Manager', 'Looks after a team.', [['Team members’ records', 'success', 'Team only'], ['Leave requests', 'success', 'Approve'], ['Salary and ID details', null, 'Not shown']]],
    ['Employee', 'Looks after their own record.', [['Own record', 'success', 'View'], ['Leave requests', 'success', 'Request'], ['Other employees', null, 'Not shown']]],
    ['Guest', 'Sees only what they are given.', [['Items shared with them', 'success', 'View'], ['Employee records', null, 'Not shown'], ['Settings', null, 'Not shown']]]];
  function roles(sec) {
    var btns = $$('.pp-site-slot', sec), n = $('.pp-site-roles__name', sec), p = $('.pp-site-roles__text', sec), acc = $('.pp-site-roles__access', sec), auto = true, i = 0, t = null, started = false;
    function show(k) {
      btns.forEach(function (b, j) { b.setAttribute('aria-pressed', String(j === k)); });
      var r = ROLES[k]; n.textContent = r[0]; p.textContent = r[1]; acc.textContent = '';
      r[2].forEach(function (x) {
        var d = document.createElement('div'), a = document.createElement('span'), s = document.createElement('span');
        d.className = 'pp-site-roles__item'; a.textContent = x[0]; s.className = 'pp-site-status' + (x[1] ? ' pp-site-status--' + x[1] : ''); s.textContent = x[2];
        d.appendChild(a); d.appendChild(s); acc.appendChild(d);
      });
    }
    function cycle() { if (!auto) return; i = (i + 1) % ROLES.length; show(i); t = setTimeout(cycle, 3200); }
    btns.forEach(function (b) { b.addEventListener('click', function () { auto = false; clearTimeout(t); show(+b.getAttribute('data-r')); }); });
    live(sec); show(0);
    onView(sec, function () { if (started) return; started = true; t = setTimeout(cycle, 2600); });
  }

  /* Landing Platform: each switch is pressed and turns on 1.1s apart; the app's sidebar item fades in and is tinted for
     1.4s, and the module's Today item arrives 0.35s later. A click on a switch turns it on or off by hand. */
  function landing(sec) {
    var R = runner(), rows = rowsOf(sec), idle = $('.pp-site-app__idle', sec);
    function q(sel, k) { return $(sel + '[data-m="' + k + '"]', sec); }
    function sync() { idle.hidden = !!$('.pp-site-app__task--in', sec); }
    function set(row, on) {
      var k = row.getAttribute('data-m'), ni = q('.pp-site-app__item', k), td = q('.pp-site-app__task', k);
      flip(row, on); ni.classList.toggle('pp-site-app__item--in', on);
      if (on) { ni.classList.add('pp-site-app__item--new'); setTimeout(function () { ni.classList.remove('pp-site-app__item--new'); }, 1400); setTimeout(function () { td.classList.add('pp-site-app__task--in'); sync(); }, 350); }
      else { td.classList.remove('pp-site-app__task--in'); sync(); }
    }
    function reset() { R.stop(); rows.forEach(function (r) { set(r, false); r.classList.remove('pp-site-modules__row--press'); }); }
    function play() {
      live(sec); reset();
      rows.forEach(function (r, i) { R.at(700 + i * 1100, function () { r.classList.remove('pp-site-modules__row--press'); void r.offsetWidth; r.classList.add('pp-site-modules__row--press'); R.at(250, function () { set(r, true); }); }); });
    }
    rows.forEach(function (r) { $('.pp-toggle__input', r).addEventListener('change', function () { R.stop(); set(r, this.checked); }); });
    again(sec).addEventListener('click', play);
    /* On a phone the two cards stack, so wait until the app is in view. */
    onView(sec.closest('.pp-site-stage--phone') ? $('.pp-site-app', sec) : $('.pp-site-platform', sec), play);
  }

  var ENGINE = { 'plat-mod': mod, 'plat-tpl': tpl, 'plat-hol': hol, 'plat-roles': roles, 'plat-landing': landing };
  $$('[data-demo]').forEach(function (sec) { var e = ENGINE[sec.getAttribute('data-demo')]; if (e) e(sec); });
})();
