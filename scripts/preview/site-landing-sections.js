/* PREVIEW ONLY. Plays the landing page's Ask Batsi and Recruitment sections on the "Site landing sections" UI kit page,
   with the approved page's timings. It mirrors what the Angular site will do and is never shipped. */
(function () {
  var one = function (s, r) { return (r || document).querySelector(s); };
  var all = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  /* Reduced motion: demos, fades and slow light keep playing. Only large movement stops (here: a card flying between columns). */
  var noFly = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function runner() { var t = []; return { at: function (ms, f) { t.push(setTimeout(f, ms)); }, stop: function () { t.forEach(clearTimeout); t = []; } }; }
  function onView(el, fn, th) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var o = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { fn(); o.disconnect(); } }, { threshold: th });
    o.observe(el);
  }
  var ST = { g: 'success', r: 'danger', v: 'brand' };

  /* Ask Batsi: three sample questions, 11s each; the action is pressed after 2.6s unless a person pressed a question. */
  var S = [
    { q: 'Is John Doe ready to start on Monday?', a: 'Four of five checks are complete.', rows: [[1, 'ID document', 'Matches', 'g'], [1, 'Bank letter', 'Matches', 'g'], [1, 'Tax number', 'Captured', 'g'], [1, 'Contract', 'Signed', 'g'], [0, 'UIF reference number', 'Missing', 'r']],
      ask: 'Ask John Doe for his UIF reference number?', go: 'Send request', done: 'Request sent to John Doe.' },
    { q: 'Who hasn’t sent their documents?', a: 'Two new employees are waiting on documents.', rows: [[0, 'John Doe', 'UIF reference number', 'r'], [0, 'New employee 2', 'Bank letter', 'r']],
      ask: 'Send both a reminder now? The last one went out yesterday at 09:00.', go: 'Send reminders', done: 'Reminders sent to 2 new employees.' },
    { q: 'Which candidates are at risk?', a: 'Two candidates need attention.', rows: [[0, 'Candidate 3 · Interview', 'No reply in 5 days', 'r'], [0, 'Candidate 1 · Offer', 'Offer expires in 2 days', 'v']],
      ask: 'I drafted a reminder to Candidate 3. Send it?', go: 'Approve and send', done: 'Reminder sent to Candidate 3.' }
  ];
  all('[data-demo^="land-batsi"]').forEach(function (sec) {
    var body = one('.pp-site-chat__body', sec), tabs = one('.pp-site-qtabs', sec), btns = all('.pp-site-qtabs__tab', sec), R = runner(), cur = 0, auto = true, DUR = 11000;
    var spark = one('.pp-site-chat__name .lucide', sec), check = one('.pp-site-ok', sec);
    var OK = check ? check.outerHTML : '', W = '<span class="pp-site-chat__wait" aria-hidden="true">!</span>';
    function el(cls, html) { var d = document.createElement('div'); d.className = cls; d.innerHTML = html; body.appendChild(d); return d; }
    function who() { return '<span class="pp-site-chat__who">' + (spark ? spark.outerHTML : '') + 'Batsi</span>'; }
    function pause() { auto = false; tabs.classList.add('pp-site-qtabs--paused'); }
    function finish(sent, m) {
      var a = one('.pp-site-chat__actions', m); if (!a) return; a.remove(); var s = S[cur];
      el('pp-site-chat__msg pp-site-chat__msg--me', sent ? s.go : 'Not now');
      setTimeout(function () { el('pp-site-chat__logged', sent ? '<span class="pp-site-chat__dot" aria-hidden="true"></span>' + s.done + ' Approved by Jane Smith, 09:42' : 'Nothing sent. Batsi will ask again tomorrow at 09:00.'); }, 450);
    }
    function play(i) {
      R.stop(); body.innerHTML = ''; cur = i; var s = S[i];
      btns.forEach(function (b, k) { b.setAttribute('aria-selected', String(k === i)); var bar = one('.pp-site-qtabs__bar', b); bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = ''; });
      R.at(100, function () { el('pp-site-chat__msg pp-site-chat__msg--me', s.q); });
      R.at(700, function () { el('pp-site-chat__typing', '<i></i><i></i><i></i>'); });
      R.at(1500, function () {
        var t = one('.pp-site-chat__typing', body); if (t) t.remove();
        var m = el('pp-site-chat__msg pp-site-chat__msg--ai', who() + s.a + '<span class="pp-site-chat__rows"></span>'), c = one('.pp-site-chat__rows', m);
        s.rows.forEach(function (r, k) { R.at(200 + k * 320, function () { var d = document.createElement('span'); d.className = 'pp-site-chat__row'; d.innerHTML = (r[0] ? OK : W) + '<span>' + r[1] + '</span><span class="pp-site-status pp-site-status--' + ST[r[3]] + '">' + r[2] + '</span>'; c.appendChild(d); }); });
      });
      R.at(1700 + s.rows.length * 320 + 500, function () {
        var m = el('pp-site-chat__msg pp-site-chat__msg--ai', who() + s.ask + '<div class="pp-site-chat__actions"><button class="pp-button pp-button--primary pp-button--small" type="button">' + s.go + '</button><button class="pp-button pp-button--default pp-button--small" type="button">Not now</button></div>');
        one('.pp-site-chat__actions', m).addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; pause(); finish(b.classList.contains('pp-button--primary'), m); });
        if (auto) R.at(2600, function () { var g = one('.pp-button--primary', m); if (g) { g.classList.add('pp-button--pressed'); R.at(400, function () { finish(true, m); }); } });
      });
      if (auto) R.at(DUR, function () { play((cur + 1) % S.length); });
    }
    btns.forEach(function (b, i) { b.addEventListener('click', function () { pause(); play(i); }); });
    onView(one('.pp-site-chat', sec), function () { play(0); }, 0.35);
  });

  /* Recruitment: Candidate 4 moves to Interview, Candidate 1 to Hired, Candidate 3 goes quiet, Batsi drafts, Jane Smith sends. */
  var TXT = 'Hi, a reminder that your panel interview for Sales Consultant is on Thursday at 10:00. Please confirm you can attend.';
  var HOME = { c4: 1, c1: 3, c3: 2 };
  all('[data-demo^="land-rec"]').forEach(function (sec) {
    var cols = one('.pp-site-board__cols', sec), B = one('.pp-site-hiring__draft', sec), D = one('.pp-site-hiring__body', sec), R = runner();
    var send = one('.pp-site-hiring__row .pp-button--primary', sec), edit = one('.pp-site-hiring__row .pp-button--default', sec);
    function card(id) { return one('[data-card="' + id + '"]', cols); }
    function col(i) { return one('[data-col="' + i + '"]', cols); }
    function count() { all('.pp-site-board__col', cols).forEach(function (c) { one('.pp-site-board__count', c).textContent = all('.pp-site-board__card', c).length; }); }
    function move(id, ci) {
      var e = card(id), a = e.getBoundingClientRect(), c = col(ci); c.insertBefore(e, c.children[1] || null); count();
      e.classList.add('pp-site-board__card--moved'); if (noFly) return;
      var b = e.getBoundingClientRect(); e.animate([{ transform: 'translate(' + (a.left - b.left) + 'px,' + (a.top - b.top) + 'px)' }, { transform: 'none' }], { duration: 700, easing: 'cubic-bezier(.22,.7,.2,1)' });
    }
    function reset() {
      R.stop(); sec.setAttribute('data-site-live', '');
      ['c4', 'c1', 'c3'].forEach(function (id) { var e = card(id); e.className = 'pp-site-board__card'; one('.pp-site-board__flag', e).textContent = 'No reply in 5 days'; });
      var c3 = card('c3'), i2 = col(2); i2.insertBefore(c3, i2.children[1] || null); col(1).appendChild(card('c4')); col(3).appendChild(card('c1'));
      one('.pp-site-board__note', card('c1')).textContent = 'Offer sent · expires Fri';
      count(); B.className = 'pp-site-hiring__draft'; D.textContent = ''; D.removeAttribute('contenteditable'); send.classList.remove('pp-button--pressed');
    }
    function type(i) { if (i > TXT.length) return; D.textContent = TXT.slice(0, i); R.at(14, function () { type(i + 3); }); }
    function sendIt() { if (B.classList.contains('pp-site-hiring__draft--sent')) return; B.classList.add('pp-site-hiring__draft--sent'); var c = card('c3'); c.classList.remove('pp-site-board__card--risk'); c.classList.add('pp-site-board__card--done'); one('.pp-site-board__flag', c).textContent = 'Reminder sent'; }
    function play() {
      reset();
      R.at(600, function () { move('c4', 2); });
      R.at(1800, function () { move('c1', 4); one('.pp-site-board__note', card('c1')).textContent = 'Offer signed · starts 1 Dec'; });
      R.at(3000, function () { card('c3').classList.add('pp-site-board__card--risk'); });
      R.at(3800, function () { B.classList.add('pp-site-hiring__draft--on'); type(0); });
      R.at(7600, function () { send.classList.add('pp-button--pressed'); R.at(400, sendIt); });
    }
    send.addEventListener('click', function () { R.stop(); D.textContent = TXT; sendIt(); });
    edit.addEventListener('click', function () { D.setAttribute('contenteditable', 'true'); D.focus(); });
    one('.pp-site-replay', sec).addEventListener('click', play);
    onView(cols, play, 0.4);
  });
})();
