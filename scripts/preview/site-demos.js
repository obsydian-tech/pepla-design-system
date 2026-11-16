/* PREVIEW ONLY. Drives the frames on the "Site demos, questions and Ask Batsi" UI kit page: a demo plays when it scrolls into
   view, "Play again" restarts it, the Ask Batsi band plays a sample conversation, and the questions open and close.
   It mirrors what the Angular site will do and is never shipped. */
(function () {
  var all = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var one = function (s, r) { return (r || document).querySelector(s); };
  function runner() { var t = []; return { at: function (ms, f) { t.push(setTimeout(f, ms)); }, stop: function () { t.forEach(clearTimeout); t = []; } }; }
  function onView(el, fn, th) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var o = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { fn(); o.unobserve(el); } }); }, { threshold: th });
    o.observe(el);
  }

  /* Demo: steps in one by one, then "Play again" appears. Only sections marked data-live play on their own. */
  all('.pp-site-demo').forEach(function (sec) {
    var R = runner(), steps = all('.pp-site-step', sec), again = one('.pp-site-demo__again', sec);
    function play() {
      R.stop(); sec.setAttribute('data-site-live', '');
      steps.forEach(function (s) { s.classList.remove('pp-site-step--in'); }); again.classList.remove('pp-site-demo__again--in');
      steps.forEach(function (s, i) { R.at(500 + i * 500 + (i === 4 ? 700 : 0), function () { s.classList.add('pp-site-step--in'); }); });
      R.at(4200, function () { again.classList.add('pp-site-demo__again--in'); });
    }
    again.addEventListener('click', play);
    if (sec.hasAttribute('data-live')) onView(sec, play, 0.35);
  });

  /* Questions: one open at a time. */
  all('.pp-site-faq__list').forEach(function (list) {
    var items = all('.pp-site-faq__item', list);
    items.forEach(function (it) {
      one('.pp-site-faq__q', it).addEventListener('click', function () {
        var open = !it.classList.contains('pp-site-faq__item--open');
        items.forEach(function (o) { o.classList.remove('pp-site-faq__item--open'); one('.pp-site-faq__q', o).setAttribute('aria-expanded', 'false'); });
        if (open) { it.classList.add('pp-site-faq__item--open'); one('.pp-site-faq__q', it).setAttribute('aria-expanded', 'true'); }
      });
    });
  });

  /* Ask Batsi: each Learn more page's three sample questions, picked by the band's data-batsi (leave when absent).
     An item with act ends with a person's approval. A row's kind is a status modifier; empty is neutral. */
  var QS = {
    recruitment: [
      {"q": "Which candidates have gone quiet?", "a": "Two candidates have not replied.", "rows": [["Candidate 3 · Interview", "warning", "No reply in 5 days"], ["Candidate 6 · Screening", "warning", "Missed interview"]], "act": "Send Candidate 3 a reminder about Thursday?", "btn": "Send reminder", "done": "Reminder sent to Candidate 3 at 09:42.", "log": "Approved by Jane Smith · logged"},
      {"q": "Who still owes interview feedback?", "a": "One interviewer has feedback outstanding.", "rows": [["Candidate 2 · Panel 3", "warning", "Feedback 2 of 3"]], "act": "Remind Panel 3 to submit feedback?", "btn": "Send reminder", "done": "Reminder sent to Panel 3 at 09:44.", "log": "Approved by Jane Smith · logged"},
      {"q": "Which offers expire this week?", "a": "One offer expires on Friday.", "rows": [["Candidate 1 · Sales Consultant", "warning", "Expires Fri"]]}
    ],
    onboarding: [
      {"q": "Who hasn’t sent their documents?", "a": "Two new employees are missing documents.", "rows": [["John Doe · UIF reference number", "warning", "2 reminders sent"], ["Employee 3 · Matric certificate", "brand", "Requested today"]], "act": "Send John Doe another reminder now?", "btn": "Send reminder", "done": "Reminder sent to John Doe at 10:05.", "log": "Approved by Jane Smith · logged"},
      {"q": "Who starts next week?", "a": "One new employee starts on Monday 1 December.", "rows": [["John Doe · Sales Consultant", "success", "Ready for day one"]]},
      {"q": "Which laptops are not ready?", "a": "All laptops for December starts are ready. One request is open for January.", "rows": [["John Doe · laptop", "success", "Ready"], ["Employee 5 · laptop", "brand", "IT · due 9 Jan"]]}
    ],
    compliance: [
      {"q": "Which certificates expire in 30 days?", "a": "Two certificates expire within 30 days.", "rows": [["John Doe · Forklift licence", "warning", "9 days"], ["Employee 3 · Medical certificate", "warning", "16 days"]], "act": "Send both employees a reminder now?", "btn": "Send reminders", "done": "Reminders sent at 09:12.", "log": "Approved by Jane Smith · logged"},
      {"q": "Who is not cleared to work?", "a": "One employee has an expired requirement.", "rows": [["Employee 5 · Driver’s licence", "danger", "12 days overdue"]]},
      {"q": "Which work permits expire this year?", "a": "One work permit expires this year.", "rows": [["Employee 4 · Work permit", "success", "195 days"]]}
    ],
    leave: [
      {"q": "Who is off next week?", "a": "Two employees are off on 14 to 18 Dec.", "rows": [["John Doe · Annual leave", "success", "14 to 18 Dec"], ["Employee 2 · Annual leave", "success", "21 to 23 Dec"]]},
      {"q": "Which requests are waiting?", "a": "One request is waiting for the line manager.", "rows": [["John Doe · Annual leave · 4 days", "warning", "Waiting 1 day"]], "act": "Send the line manager a reminder now?", "btn": "Send reminder", "done": "Reminder sent at 09:12.", "log": "Approved by Jane Smith · logged"},
      {"q": "What is John Doe’s annual leave balance?", "a": "John Doe has 15 days of annual leave left.", "rows": [["Annual leave", "success", "15 days"], ["Sick leave", "success", "28 days"], ["Family responsibility", "success", "3 days"]]}
    ],
    security: [
      {"q": "What did Batsi do for John Doe?", "a": "Batsi made two entries for John Doe.", "rows": [["09:00 · Asked for UIF reference number", "success", "Logged"], ["09:15 · Read ID document, suggested Matches", "success", "Logged"]]},
      {"q": "Who viewed an ID number today?", "a": "One ID number was viewed today.", "rows": [["09:45 · Jane Smith · John Doe", "success", "Logged"]]},
      {"q": "Which actions are waiting for approval?", "a": "One action is waiting for approval.", "rows": [["Reminder to Candidate 3", "warning", "Waiting"]], "act": "Send the reminder to Jane Smith for review?", "btn": "Send for review", "done": "Sent to Jane Smith at 09:43.", "log": "Approved by Jane Smith · logged"}
    ],
    platform: [
      {"q": "What needs my attention today?", "a": "Three items need Jane Smith today.", "rows": [["Leave Management · 1 request to approve", "warning", "Waiting"], ["Compliance · John Doe forklift licence", "warning", "9 days"], ["Onboarding · John Doe, 2 documents left", "", "Open"]]},
      {"q": "Which modules are switched on?", "a": "Five modules are on for this company.", "rows": [["Employee Records", "success", "On"], ["Recruitment", "success", "On"], ["Onboarding and Offboarding", "success", "On"], ["Leave Management", "success", "On"], ["Compliance Management", "success", "On"]]},
      {"q": "Who can see salary?", "a": "HR and the Administrator. It is hidden, and each Show is logged.", "rows": [["HR", "warning", "Hidden"], ["Administrator", "warning", "Hidden"], ["Manager", "", "Not shown"]]}
    ]
  };
  all('.pp-site-batsi').forEach(function (band) {
    var Q = QS[band.getAttribute('data-batsi')] || QS.leave, body = one('.pp-site-chat__body', band), btns = all('.pp-site-ask__chip', band), R = runner(), cur = 0, auto = true, started = false;
    var spark = one('.pp-site-chat__name .lucide', band);
    function el(cls, html) { var d = document.createElement('div'); d.className = cls; d.innerHTML = html; body.appendChild(d); return d; }
    function who() { return '<span class="pp-site-chat__who">' + (spark ? spark.outerHTML : '') + 'Batsi</span>'; }
    function sel(i) { btns.forEach(function (b, k) { b.setAttribute('aria-pressed', String(k === i)); }); }
    function next() { if (auto) R.at(5200, function () { play((cur + 1) % Q.length); }); }
    function finish(m, x) {
      var a = one('.pp-site-chat__actions', m); if (!a) return; a.remove(); R.stop();
      el('pp-site-chat__msg pp-site-chat__msg--me', 'Yes, send it.');
      R.at(700, function () { el('pp-site-chat__msg pp-site-chat__msg--ai', who() + x.done); });
      R.at(1300, function () { el('pp-site-chat__logged', x.log); next(); });
    }
    function play(i) {
      R.stop(); body.innerHTML = ''; cur = i; sel(i); var x = Q[i];
      R.at(300, function () { el('pp-site-chat__msg pp-site-chat__msg--me', x.q); });
      R.at(900, function () { el('pp-site-chat__typing', '<i></i><i></i><i></i>'); });
      R.at(2000, function () {
        var t = one('.pp-site-chat__typing', body); if (t) t.remove();
        var h = who() + x.a + '<span class="pp-site-chat__rows">' + x.rows.map(function (r) { return '<span class="pp-site-chat__row">' + r[0] + '<span class="pp-site-status' + (r[1] ? ' pp-site-status--' + r[1] : '') + '">' + r[2] + '</span></span>'; }).join('') + '</span>';
        if (x.act) h += '<p class="pp-site-chat__ask">' + x.act + '</p><div class="pp-site-chat__actions"><button class="pp-button pp-button--primary pp-button--small" type="button">' + x.btn + '</button><button class="pp-button pp-button--default pp-button--small" type="button">Not now</button></div>';
        var m = el('pp-site-chat__msg pp-site-chat__msg--ai', h);
        if (x.act) {
          var g = one('.pp-button--primary', m);
          g.addEventListener('click', function () { auto = false; finish(m, x); });
          R.at(2600, function () { g.classList.add('pp-button--pressed'); R.at(350, function () { finish(m, x); }); });
        } else next();
      });
    }
    btns.forEach(function (b, i) { b.addEventListener('click', function () { auto = false; play(i); }); });
    /* The actions in a frame that opens already waiting for a person work too. */
    var g0 = one('.pp-site-chat__actions .pp-button--primary', body);
    if (g0) g0.addEventListener('click', function () {
      var m = g0.closest('.pp-site-chat__msg'); var a = one('.pp-site-chat__actions', m); if (a) a.remove();
      el('pp-site-chat__msg pp-site-chat__msg--me', 'Yes, send it.'); el('pp-site-chat__msg pp-site-chat__msg--ai', who() + Q[1].done); el('pp-site-chat__logged', Q[1].log);
    });
    if (band.hasAttribute('data-live')) onView(band, function () { if (!started) { started = true; play(0); } }, 0.25);
  });
})();
