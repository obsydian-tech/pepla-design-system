/* PREVIEW ONLY. Plays the five Recruitment demos on the "Site Recruitment demos" UI kit page, with the same timings as the
   approved page: each demo starts when it scrolls into view and "Play again" restarts it. It mirrors what the Angular
   site will do and is never shipped. The card data below is copied from the approved page by script. */
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
  function topState(sec) { return $('.pp-site-demo__top .pp-site-state', sec); }
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var COLS=["Applied", "Screening", "Interview", "Offer", "Hired", "Not hired"];
var C=[[["c7", "Candidate 7", "Sales Consultant \u00b7 today"], ["c6", "Candidate 6", "Sales Consultant \u00b7 2 days"]], [["c5", "Candidate 5", "Sales Consultant"], ["c4", "Candidate 4", "Sales Consultant"]], [["c3", "Candidate 3", "Panel booked \u00b7 Thu"], ["c2", "Candidate 2", "Feedback 2 of 3"]], [["c1", "Candidate 1", "Offer sent \u00b7 expires Fri"]], [], [["c8", "Candidate 8", "Closed with reason"]]];
var MOVES=[["c4", 2, "Moved by Jane Smith", "Sales Consultant", false], ["c1", 4, "Offer signed", "Starts 1 Dec", true], ["c5", 5, "Reason: another candidate selected", "Closed with reason", false]];

  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  /* Hiring board: three candidates move, counts follow, the log line appears. */
  function board(sec) {
    var R = runner(), cont = $('.pp-site-board__cols', sec), log = $('.pp-site-board__log', sec);
    function build() {
      cont.innerHTML = C.map(function (c, i) {
        return '<div class="pp-site-board__col" data-col="' + i + '"><h3 class="pp-site-board__head">' + esc(COLS[i]) + '<span class="pp-site-board__count">' + c.length + '</span></h3>' +
          c.map(function (x) { return '<div class="pp-site-board__card" data-card="' + x[0] + '"><b class="pp-site-board__name">' + esc(x[1]) + '</b><small class="pp-site-board__note">' + esc(x[2]) + '</small><span class="pp-site-board__why"></span></div>'; }).join('') + '</div>';
      }).join('');
    }
    function count() { $$('.pp-site-board__col', cont).forEach(function (c) { $('.pp-site-board__count', c).textContent = $$('.pp-site-board__card', c).length; }); }
    function move(id, col, why, sub, win) {
      var e = $('[data-card="' + id + '"]', cont), to = $('[data-col="' + col + '"]', cont), a = e.getBoundingClientRect();
      to.insertBefore(e, to.children[1] || null); count();
      if (!reduced) { var b = e.getBoundingClientRect(); e.animate([{ transform: 'translate(' + (a.left - b.left) + 'px,' + (a.top - b.top) + 'px)' }, { transform: 'none' }], { duration: 700, easing: 'cubic-bezier(.22,.7,.2,1)' }); }
      e.classList.add('pp-site-board__card--moved'); if (win) e.classList.add('pp-site-board__card--win');
      if (why) $('.pp-site-board__why', e).textContent = why; if (sub) $('.pp-site-board__note', e).textContent = sub;
    }
    function play() {
      live(sec); R.stop(); build(); log.classList.remove('pp-site-board__log--in'); showAgain(sec, false);
      var at = [700, 1900, 3100];
      MOVES.forEach(function (m, i) { R.at(at[i], function () { move(m[0], m[1], m[2], m[3], m[4]); }); });
      R.at(4000, function () { log.classList.add('pp-site-board__log--in'); showAgain(sec, true); });
    }
    again(sec).addEventListener('click', play);
    onView(sec, play, 0.3);
  }

  /* Scorecard: scores arrive panel by panel, averages settle, Jane Smith decides. */
  function score(sec) {
    var R = runner(), n = $('.pp-site-score__note', sec), d = $('.pp-site-score__decide', sec), s = topState(sec), go = $('.pp-button--primary', d);
    function col(c) { $$('.pp-site-score__v[data-c="' + c + '"]', sec).forEach(function (v) { v.classList.add('pp-site-score__v--in'); }); }
    function reset() { R.stop(); $$('.pp-site-score__v', sec).forEach(function (v) { v.classList.remove('pp-site-score__v--in'); }); stepIn(n, false); stepIn(d, false); d.classList.remove('pp-site-score__decide--done'); go.classList.remove('pp-button--pressed'); showAgain(sec, false); setState(s, 'scoring'); }
    function decide() { if (d.classList.contains('pp-site-score__decide--done')) return; go.classList.add('pp-button--pressed'); setTimeout(function () { d.classList.add('pp-site-score__decide--done'); setState(s, 'moved'); showAgain(sec, true); }, 300); }
    function play() {
      live(sec); reset();
      for (var c = 0; c < 4; c++) (function (c) { R.at(500 + c * 1000, function () { col(c); }); })(c);
      R.at(500 + 4 * 1000 + 300, function () { stepIn(n); setState(s, 'scored'); });
      R.at(500 + 4 * 1000 + 1100, function () { stepIn(d); });
      R.at(500 + 4 * 1000 + 3600, decide);
    }
    go.addEventListener('click', function () { R.stop(); decide(); });
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }

  /* Reminders: feedback chase, then a candidate reminder drafted for Jane Smith. */
  function follow(sec) {
    var R = runner(), li = $$('.pp-site-timeline__item', sec), fill = $('.pp-site-timeline__fill', sec), sg = $('.pp-site-suggest', sec), s = topState(sec);
    function reset() { R.stop(); li.forEach(function (l) { stepIn(l, false); }); fill.style.setProperty('--_fill', 0); stepIn(sg, false); showAgain(sec, false); setState(s, 'f2'); }
    function play() {
      live(sec); reset();
      li.forEach(function (l, i) {
        R.at(500 + i * 1100, function () {
          stepIn(l); fill.style.setProperty('--_fill', Math.min(1, (l.offsetTop + 10) / fill.offsetHeight));
          if (i === 2) setState(s, 'f3'); if (i === 3) setState(s, 'nr'); if (i === 4) setState(s, 'rs');
        });
        if (i === 3) R.at(500 + i * 1100 + 500, function () { stepIn(sg); });
      });
      R.at(500 + li.length * 1100 + 300, function () { showAgain(sec, true); });
    }
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }

  /* Risk: flags arrive, Batsi suggests, the expiring offer is signed and the count drops. */
  function risk(sec) {
    var R = runner(), it = $$('.pp-site-risk__item', sec), sg = $('.pp-site-suggest', sec), c = topState(sec), off = $('[data-offer]', sec), offSt = $('.pp-site-state:not(.pp-site-risk__why)', off), offWhy = $('.pp-site-risk__why', off);
    function cnt(n) { setState(c, n === 0 ? 'n' : 'c' + n); }
    function reset() { R.stop(); it.forEach(function (e) { stepIn(e, false); e.classList.remove('pp-site-risk__item--fix'); }); stepIn(sg, false); showAgain(sec, false); cnt(0); setState(offSt, 'exp'); setState(offWhy, 'a'); }
    function play() {
      live(sec); reset();
      it.forEach(function (e, i) { R.at(500 + i * 900, function () { stepIn(e); cnt(i + 1); }); });
      R.at(500 + it.length * 900 + 300, function () { stepIn(sg); });
      R.at(500 + it.length * 900 + 3400, function () { off.classList.add('pp-site-risk__item--fix'); setState(offSt, 'sg'); setState(offWhy, 'b'); cnt(2); showAgain(sec, true); });
    }
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }

  /* Offer to onboarding. */
  function offer(sec) {
    var R = runner(), cards = $$('.pp-site-offer__card', sec), A = cards[0], B = cards[1], as = $('.pp-site-state', A), bs = $('.pp-site-state', B), bf = $$('.pp-site-offer__value', B), n = $('.pp-site-suggest', sec), s = topState(sec);
    function reset() { R.stop(); A.classList.remove('pp-site-offer__card--live'); B.classList.remove('pp-site-offer__card--live'); setState(as, 'sent'); setState(bs, 'nc'); bf.forEach(function (b) { b.classList.remove('pp-site-offer__value--in'); }); stepIn(n, false); showAgain(sec, false); setState(s, 'sent'); }
    function play() {
      live(sec); reset();
      R.at(1200, function () { setState(as, 'signed'); setState(s, 'signed'); A.classList.add('pp-site-offer__card--live'); });
      R.at(2300, function () { setState(bs, 'cr'); B.classList.add('pp-site-offer__card--live'); });
      bf.forEach(function (b, i) { R.at(2700 + i * 450, function () { b.classList.add('pp-site-offer__value--in'); }); });
      R.at(4800, function () { stepIn(n); setState(bs, 'ac'); showAgain(sec, true); });
    }
    again(sec).addEventListener('click', play);
    onView(sec, play);
  }

  var ENGINE = { board: board, score: score, follow: follow, risk: risk, offer: offer };
  $$('.pp-site-demo[data-demo]').forEach(function (sec) { var e = ENGINE[sec.getAttribute('data-demo')]; if (e) e(sec); });
})();
