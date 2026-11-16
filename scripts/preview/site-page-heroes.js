/* PREVIEW ONLY. Plays the hero cards on the "Site Learn more page tops" UI kit page with the approved pages' timings.
   It mirrors what the Angular site will do and is never shipped. It sets classes, text and the documented --_ inputs. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function runner() { var t = []; return { at: function (ms, f) { t.push(setTimeout(f, ms)); }, stop: function () { t.forEach(clearTimeout); t = []; } }; }
  function onView(el, fn) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var o = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { fn(); o.unobserve(el); } }); }, { threshold: 0.3 });
    o.observe(el);
  }
  function st(el, kind, text) { el.className = 'pp-site-status pp-site-status--' + kind; el.textContent = text; }
  function note(card, text, mod) {
    var n = $('.pp-site-hcard__note', card); $('[data-note]', n).textContent = text;
    n.classList.toggle('pp-site-hcard__note--good', mod === 'good'); n.classList.toggle('pp-site-hcard__note--late', mod === 'late');
  }
  function head(card) { return $('.pp-site-hcard__head > .pp-site-status', card); }

  var PLAY = {
    recruitment: function (card, R) {
      var rows = $$('.pp-site-hcard__stage', card), prev = null;
      var S = [[2, 2, 2, 1, 0, 1, '8 candidates across six stages'], [2, 1, 3, 1, 0, 1, 'Candidate 4 moved to Interview'], [2, 1, 3, 0, 1, 1, 'Offer signed. Candidate 1 is Hired'], [1, 2, 3, 0, 1, 1, 'Candidate 7 moved to Screening']];
      function set(i) {
        var s = S[i];
        rows.forEach(function (r, k) {
          if (prev && prev[k] !== s[k]) { r.classList.add('pp-site-hcard__stage--bump'); setTimeout(function () { r.classList.remove('pp-site-hcard__stage--bump'); }, 800); }
          $('.pp-site-hcard__num', r).textContent = s[k]; $('.pp-site-hcard__grow', r).style.setProperty('--_p', String(s[k] / 4));
        });
        note(card, s[6], i === 2 ? 'good' : ''); prev = s;
      }
      function play() {
        R.stop();
        for (var i = 0; i < S.length; i++) (function (k) { R.at(k === 0 ? 200 : 900 + k * 2600, function () { set(k); }); })(i);
        R.at(900 + S.length * 2600 + 2400, function () { prev = null; play(); });
      }
      play();
    },
    onboarding: function (card, R) {
      var lis = $$('.pp-site-hcard__step', card), fill = $('.pp-site-hcard__fill', card), count = $('[data-count]', card), s = head(card), n = lis.length;
      function set(k) {
        lis.forEach(function (li, i) { li.classList.toggle('pp-site-hcard__step--done', i < k); li.classList.toggle('pp-site-hcard__step--now', i === k); });
        fill.style.setProperty('--_p', String(k / n)); count.textContent = k + ' of ' + n;
        if (k >= n) st(s, 'success', 'Active'); else st(s, 'brand', 'Onboarding');
      }
      function play() { R.stop(); set(0); for (var i = 1; i <= n; i++) (function (k) { R.at(900 + k * 1300, function () { set(k); }); })(i); R.at(900 + n * 1300 + 3200, play); }
      play();
    },
    compliance: function (card, R) {
      var rows = $$('.pp-site-ledger__row', card), clr = head(card), day = $('[data-day]', card);
      var D0 = rows.map(function (r) { return +r.getAttribute('data-d'); });
      function chip(el, d) {
        if (d < 0) st(el, 'danger', (-d) + (d === -1 ? ' day overdue' : ' days overdue'));
        else if (d <= 30) st(el, 'warning', d + (d === 1 ? ' day' : ' days'));
        else st(el, 'success', (d >= 1000 ? Math.floor(d / 1000) + ',' + String(d % 1000).padStart(3, '0') : d) + ' days');
      }
      function show(k, renewed) {
        rows.forEach(function (r, i) {
          var d = D0[i] - k; if (i === 0 && renewed) d = 1095;
          chip($('.pp-site-status', r), d);
          r.classList.toggle('pp-site-ledger__row--late', d < 0); r.classList.toggle('pp-site-ledger__row--renewed', i === 0 && !!renewed);
        });
        day.textContent = 'Today · ' + (3 + k) + ' Nov';
        var late = !renewed && D0[0] - k < 0;
        st(clr, late ? 'danger' : 'success', late ? '3 of 4 cleared' : '4 of 4 cleared');
      }
      function play() {
        R.stop(); show(0, false); note(card, 'Batsi is watching 4 expiry dates');
        R.at(2400, function () { show(6, false); note(card, 'Reminder sent at 7 days'); });
        R.at(4600, function () { show(11, false); note(card, 'John Doe’s forklift licence expired 2 days ago. Jane Smith told.', 'late'); });
        R.at(7600, function () { show(11, true); note(card, 'Renewal accepted. John Doe is cleared to work.'); });
        R.at(11800, play);
      }
      play();
    },
    leave: function (card, R) {
      var s = head(card), num = $('.pp-site-balance__num', card), fill = $('.pp-site-balance__fill', card);
      function setBal(v) { $$('span', num).forEach(function (e) { e.textContent = v + ' days'; }); fill.style.setProperty('--_fill', (v / 15).toFixed(4)); }
      function play() {
        R.stop(); st(s, 'brand', 'Not requested'); num.classList.remove('pp-site-balance__num--flash'); setBal(15); note(card, 'No request yet');
        R.at(1500, function () { st(s, 'brand', 'Waiting for approval'); note(card, 'Request sent to the line manager'); });
        R.at(3800, function () { note(card, 'Batsi sent the line manager a reminder'); });
        R.at(5800, function () {
          st(s, 'success', 'Approved'); note(card, 'Approved by the line manager'); num.classList.add('pp-site-balance__num--flash');
          var v = 15; (function dn() { if (v <= 11) return; v--; setBal(v); R.at(220, dn); })();
        });
        R.at(10800, play);
      }
      play();
    },
    security: function (card, R) {
      var list = $('.pp-site-audit__list', card), rows = $$('.pp-site-audit__row', list);
      function play() {
        R.stop(); rows.forEach(function (r) { list.removeChild(r); });
        rows.forEach(function (r, i) { R.at(700 + i * 1300, function () { list.appendChild(r); }); });
        R.at(700 + rows.length * 1300 + 3200, play);
      }
      play();
    },
    platform: function (card, R) {
      var rows = $$('.pp-site-modules__row[data-m]', card), s = head(card);
      function flip(r, on) {
        $('.pp-toggle__input', r).checked = on;
        $$('.pp-site-state__item', r).forEach(function (i) {
          var me = (i.getAttribute('data-state') === 'on') === on; i.classList.toggle('pp-site-state__item--on', me);
          if (me) i.removeAttribute('aria-hidden'); else i.setAttribute('aria-hidden', 'true');
        });
      }
      function play() {
        R.stop(); rows.forEach(function (r) { flip(r, false); }); st(s, 'brand', '1 module on'); note(card, 'Switched on by Naleko. Each change logged.');
        rows.forEach(function (r, i) {
          R.at(1400 + i * 1200, function () { flip(r, true); st(s, 'brand', (i + 2) + ' modules on'); note(card, 'Naleko switched on ' + $('.pp-toggle__label', r).firstChild.textContent); });
        });
        R.at(1400 + rows.length * 1200 + 3200, play);
      }
      play();
    }
  };

  $$('.pp-site-hcard[data-demo^="hcard-"]').forEach(function (card) {
    var fn = PLAY[card.getAttribute('data-demo').slice(6)];
    if (!fn || card.closest('[data-site-still]')) return;
    onView(card, function () { fn(card, runner()); });
  });
})();
