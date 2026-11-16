/* PREVIEW ONLY. Plays the landing page's Integrations section on the "Site Integrations" UI kit page, with the same
   timings as the approved page: the code types itself in, the Naleko People panel beside it reacts, then the next tab
   plays (REST API, MCP server, Events). A violet light and grid follow the pointer, or drift on their own. It mirrors
   what the Angular site will do and is never shipped. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function onView(el, fn) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var o = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { fn(); o.unobserve(el); } }); }, { threshold: 0.35 });
    o.observe(el);
  }
  var ON = 'pp-site-state__item--on';
  function setState(stack, key) {
    $$('.pp-site-state__item', stack).forEach(function (i) { var on = i.getAttribute('data-state') === key; i.classList.toggle(ON, on); if (on) i.removeAttribute('aria-hidden'); else i.setAttribute('aria-hidden', 'true'); });
  }

  var SRC = {
    api: { file: 'check-new-hire.ts', code:
'⟦c|// Ask Batsi to check a new hire from any system⟧\n⟦k|const⟧ check = ⟦k|await⟧ naleko.checks.⟦f|run⟧({\n  employee: ⟦s|\'John Doe\'⟧,\n  documents: [⟦s|\'id\'⟧, ⟦s|\'matric\'⟧, ⟦s|\'bank_letter\'⟧],\n  approver: ⟦s|\'Jane Smith\'⟧\n});\n⟦c|// check.status → "waiting_for_approval"⟧\n⟦c|// check.flags  → ["uif_reference_missing"]⟧' },
    mcp: { file: 'AI assistant · MCP', code:
'⟦c|// An AI assistant asks Batsi through MCP⟧\n⟦f|call_tool⟧(⟦s|"list_missing_documents"⟧, {\n  team: ⟦s|"Operations"⟧,\n  due_within_days: ⟦n|7⟧\n});\n⟦c|// → John Doe: UIF reference number⟧\n⟦c|// → Candidate 3: bank letter, matric⟧\n⟦f|call_tool⟧(⟦s|"draft_reminder"⟧,\n  { to: ⟦s|"Candidate 3"⟧ });\n⟦c|// Writes wait for HR approval⟧' },
    ev: { file: 'webhook · employee.onboarded', code:
'⟦c|// Naleko People posts each change⟧\n⟦k|POST⟧ /hooks/naleko\n{\n  ⟦s|"event"⟧: ⟦s|"employee.onboarded"⟧,\n  ⟦s|"employee"⟧: ⟦s|"John Doe"⟧,\n  ⟦s|"start_date"⟧: ⟦s|"2026-12-01"⟧,\n  ⟦s|"approved_by"⟧: ⟦s|"Jane Smith"⟧\n}\n⟦c|// → 200 OK in 182 ms⟧' }
  };
  var ORDER = ['api', 'mcp', 'ev'];
  function esc(t) { return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  /* Flatten the code into characters that each carry their colour. */
  function chars(src) {
    var out = [], re = /⟦(\w)\|([^⟧]*)⟧/g, last = 0, m;
    function push(t, c) { for (var i = 0; i < t.length; i++) out.push([c, t[i]]); }
    while ((m = re.exec(src))) { push(src.slice(last, m.index), ''); push(m[2], m[1]); last = re.lastIndex; }
    push(src.slice(last), ''); return out;
  }
  function markup(cs, n) {
    var h = '', cur = null, buf = '';
    function flush() { if (buf) h += cur ? '<span class="pp-site-editor__' + cur + '">' + esc(buf) + '</span>' : esc(buf); buf = ''; }
    for (var i = 0; i < n; i++) { if (cs[i][0] !== cur) { flush(); cur = cs[i][0]; } buf += cs[i][1]; }
    flush(); return h;
  }
  var CARET = '<span class="pp-site-editor__caret"></span>';

  function landing(sec) {
    var tabs = $$('.pp-site-editor__tab', sec), pre = $('.pp-site-editor__code', sec), file = $('.pp-site-editor__file', sec);
    var timers = [], typing = null, auto = true;
    function panel(k) { return $('.pp-site-connect[data-k="' + k + '"]', sec); }
    function at(ms, f) { timers.push(setTimeout(f, ms)); }
    function stop() { timers.forEach(clearTimeout); timers = []; if (typing) { clearTimeout(typing); typing = null; } }
    var api = panel('api'), status = $('[data-s="1"] .pp-site-state', api), words = $('[data-s="3"] .pp-site-state', api), ok = $('.pp-button', api);
    function resetPanel(k) {
      var p = panel(k), idle = $('.pp-site-connect__idle', p);
      $$('[data-s]', p).forEach(function (e) { e.classList.remove('pp-site-connect__item--in'); });
      $$('.pp-site-connect__tool', p).forEach(function (e) { e.classList.remove('pp-site-connect__tool--hit'); });
      if (idle) idle.hidden = false;
      if (k === 'api') { setState(status, 'wait'); setState(words, 'wait'); ok.hidden = false; ok.classList.remove('pp-button--pressed'); }
    }
    function step(k, n) { var p = panel(k), e = $('[data-s="' + n + '"]', p), idle = $('.pp-site-connect__idle', p); if (!e) return; e.classList.add('pp-site-connect__item--in'); if (idle) idle.hidden = true; }
    function approve() { if (ok.hidden) return; ok.hidden = true; setState(words, 'done'); setState(status, 'done'); }
    function select(k) {
      tabs.forEach(function (t) { var on = t.getAttribute('data-k') === k; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; panel(t.getAttribute('data-k')).hidden = !on; });
      file.textContent = SRC[k].file;
    }
    function next(k, ms) { if (!auto) return; var i = ORDER.indexOf(k); if (i < ORDER.length - 1) at(ms, function () { play(ORDER[i + 1]); }); }
    function after(k) {
      if (k === 'api') {
        at(300, function () { step('api', 1); }); at(1300, function () { step('api', 2); }); at(2400, function () { step('api', 3); });
        at(4200, function () { ok.classList.add('pp-button--pressed'); at(400, approve); }); next(k, 7200);
      } else if (k === 'mcp') {
        var t = $$('[data-tool]', panel('mcp'));
        at(200, function () { t[0].classList.add('pp-site-connect__tool--hit'); step('mcp', 1); });
        at(1700, function () { t[0].classList.remove('pp-site-connect__tool--hit'); t[1].classList.add('pp-site-connect__tool--hit'); step('mcp', 2); });
        at(3600, function () { t[1].classList.remove('pp-site-connect__tool--hit'); }); next(k, 6200);
      } else {
        at(300, function () { step('ev', 1); }); at(1300, function () { step('ev', 2); }); at(2300, function () { step('ev', 3); });
      }
    }
    /* Each character takes 17ms, and a new line 170ms. */
    function play(k) {
      sec.setAttribute('data-site-live', ''); stop(); select(k); resetPanel(k);
      var cs = chars(SRC[k].code), due = [], t = 0, start = performance.now(), n = 0;
      cs.forEach(function (c) { due.push(t); t += c[1] === '\n' ? 170 : 17; });
      pre.innerHTML = CARET;
      (function tick() {
        var el = performance.now() - start, m = n;
        while (m < cs.length && due[m] <= el) m++;
        if (m !== n) { n = m; pre.innerHTML = markup(cs, n) + CARET; }
        if (n < cs.length) typing = setTimeout(tick, 16); else { typing = null; after(k); }
      })();
    }
    ok.addEventListener('click', function () { stop(); approve(); });
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { auto = false; play(t.getAttribute('data-k')); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!d) return;
        e.preventDefault(); var nt = tabs[(i + d + tabs.length) % tabs.length]; nt.focus(); auto = false; play(nt.getAttribute('data-k'));
      });
    });
    $('.pp-site-editor__again', sec).addEventListener('click', function () { auto = true; play('api'); });

    /* The violet light follows a mouse pointer; with no pointer it drifts slowly on its own. */
    var lt = $('.pp-site-glow', sec), gr = $('.pp-site-glow__grid', sec), R = 550, px = null, t0 = performance.now(), vis = false, raf = 0;
    function put(x, y) { lt.style.transform = 'translate(' + (x - R) + 'px,' + (y - R) + 'px)'; gr.style.transform = 'translate(' + (R - x) + 'px,' + (R - y) + 'px)'; }
    sec.addEventListener('pointermove', function (e) { if (e.pointerType !== 'mouse') return; var r = sec.getBoundingClientRect(); px = [e.clientX - r.left, e.clientY - r.top]; put(px[0], px[1]); });
    sec.addEventListener('pointerleave', function () { px = null; });
    var slow = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.5 : 1;
    function drift(now) {
      raf = 0; if (!vis) return;
      if (!px) { var t = (now - t0) / 1000 * slow; put(sec.clientWidth * (0.62 + 0.2 * Math.sin(t / 5)), sec.clientHeight * (0.4 + 0.16 * Math.cos(t / 6.5))); }
      raf = requestAnimationFrame(drift);
    }
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis && !raf) raf = requestAnimationFrame(drift); }).observe(sec);
    onView($('.pp-site-integrations', sec), function () { play('api'); });
  }

  $$('[data-demo="int-landing"]').forEach(landing);
})();
