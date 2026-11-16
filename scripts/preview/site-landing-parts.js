/* PREVIEW ONLY. Plays the landing page parts on the "Site landing parts" UI kit page with the approved page's timings:
   the hero's Ask Batsi button opens the peek, which plays a short sample conversation; the Ask Batsi module card types
   sample questions. On this page the peek also opens by itself when its frame scrolls into view, so it can be seen
   without a click. It mirrors what the Angular site will do and is never shipped. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function onView(el, fn) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var o = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { fn(); o.unobserve(el); } }); }, { threshold: 0.35 });
    o.observe(el);
  }

  /* The peek: the visitor's question at 0.2s, Batsi typing for 0.9s before each answer, the next 0.5s later. */
  function peek(panel) {
    var stage = panel.closest('.pp-site-stage'), open = $('[data-peek-open]', stage), body = $('.pp-site-chat__body', panel), timers = [];
    /* Icons are drawn when the page is built, so Batsi's name in each answer borrows the spark from the panel's head. */
    var spark = $('.pp-site-chat__name .lucide', panel), WHO = '<span class="pp-site-chat__who">' + (spark ? spark.outerHTML : '') + 'Batsi</span>';
    var SCRIPT = [
      { me: 'Who hasn’t sent their documents?' },
      { ai: 'John Doe is missing his UIF reference number. A reminder went out today at 09:00.' },
      { ai: 'Send another reminder now?', act: true }
    ];
    function add(html, who) { var d = document.createElement('div'); d.className = 'pp-site-chat__msg pp-site-chat__msg--' + who; d.innerHTML = html; body.appendChild(d); return d; }
    function play() {
      timers.forEach(clearTimeout); timers = []; body.innerHTML = ''; var at = 200;
      SCRIPT.forEach(function (s) {
        if (s.me) { timers.push(setTimeout(function () { add(s.me, 'me'); }, at)); at += 700; return; }
        var typ;
        timers.push(setTimeout(function () { typ = document.createElement('span'); typ.className = 'pp-site-chat__typing'; typ.innerHTML = '<i></i><i></i><i></i>'; body.appendChild(typ); }, at)); at += 900;
        timers.push(setTimeout(function () {
          if (typ) typ.remove();
          var d = add(WHO + s.ai, 'ai');
          if (!s.act) return;
          var a = document.createElement('div'); a.className = 'pp-site-chat__actions';
          a.innerHTML = '<button class="pp-button pp-button--primary pp-button--small" type="button" data-go>Send reminder</button><button class="pp-button pp-button--default pp-button--small" type="button">Not now</button>';
          d.appendChild(a);
          a.addEventListener('click', function (e) {
            var b = e.target.closest('button'); if (!b) return; var sent = b.hasAttribute('data-go');
            a.remove(); add(sent ? 'Send reminder' : 'Not now', 'me');
            timers.push(setTimeout(function () { add(WHO + (sent ? 'Sent to John Doe at 09:42. Logged as approved by you.' : 'Okay. I’ll remind you tomorrow at 09:00.'), 'ai'); }, 600));
          });
        }, at)); at += 500;
      });
    }
    function show() { panel.classList.add('pp-site-peek--open'); panel.removeAttribute('aria-hidden'); open.setAttribute('aria-expanded', 'true'); play(); }
    function hide() { panel.classList.remove('pp-site-peek--open'); panel.setAttribute('aria-hidden', 'true'); open.setAttribute('aria-expanded', 'false'); timers.forEach(clearTimeout); }
    open.addEventListener('click', function () { panel.classList.contains('pp-site-peek--open') ? hide() : show(); });
    $('.pp-site-peek__close', panel).addEventListener('click', function () { hide(); open.focus(); });
    onView(stage, show);
  }

  /* The Ask Batsi card types each question at 48ms a letter, holds it 1.8s, then deletes it at 22ms a letter. */
  function card(sec) {
    var el = $('.pp-site-tile__ask', sec); if (!el) return;
    var qs = ['Who hasn’t sent their documents?', 'Which certificates expire this month?', 'Who is on leave next week?', 'Which candidates are waiting on feedback?'];
    var qi = 0, ci = 0, del = false;
    function tick() {
      var q = qs[qi];
      if (!del) { ci++; el.textContent = q.slice(0, ci); if (ci === q.length) { del = true; return setTimeout(tick, 1800); } }
      else { ci--; el.textContent = q.slice(0, ci); if (ci === 0) { del = false; qi = (qi + 1) % qs.length; } }
      setTimeout(tick, del ? 22 : 48);
    }
    onView(sec, tick);
  }

  $$('.pp-site-peek[data-demo]').forEach(peek);
  $$('[data-demo^="land-mods"]').forEach(card);
})();
