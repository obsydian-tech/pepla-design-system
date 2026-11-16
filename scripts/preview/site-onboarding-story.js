/* PREVIEW ONLY. Plays the landing page's Onboarding story on the "Site onboarding story" UI kit page, as on the approved
   page: the step whose top is above 55% of the window is the current one; the pinned John Doe card follows it (bar,
   count, line, stage and step view). On the ID document step Batsi reads the document, suggests Matches and Jane Smith
   accepts it. It mirrors what the Angular site will do and is never shipped. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ON = 'pp-site-state__item--on';
  function setState(stack, key) {
    $$('.pp-site-state__item', stack).forEach(function (i) { var on = i.getAttribute('data-state') === key; i.classList.toggle(ON, on); if (on) i.removeAttribute('aria-hidden'); else i.setAttribute('aria-hidden', 'true'); });
  }
  function story(sec) {
    sec.setAttribute('data-site-live', '');
    var steps = $$('.pp-site-story__step', sec), views = $$('.pp-site-person__view', sec), fill = $('.pp-site-person__fill', sec),
      count = $('[data-count]', sec), now = $('[data-now]', sec), stage = $('.pp-site-person__head .pp-site-state', sec), last = -2, dt = [];
    var doc = $('.pp-site-read__doc', sec), vals = $$('.pp-site-read__value', sec), sg = $('.pp-site-read__suggest', sec), dd = $('.pp-site-read__decide', sec),
      btn = $('.pp-button', dd), fo = $('.pp-site-person__follow', sec);
    function done() { dt.forEach(clearTimeout); vals.forEach(function (b) { b.classList.add('pp-site-read__value--in'); }); sg.classList.add('pp-site-step--in'); dd.classList.add('pp-site-read__decide--done'); fo.classList.add('pp-site-step--in'); }
    /* Fields fill from 0.9s, 0.35s apart; Batsi suggests at 2.5s; Accept is pressed at 4.2s; the follow-up shows at 5s. */
    function read() {
      dt.forEach(clearTimeout); dt = [];
      vals.forEach(function (b) { b.classList.remove('pp-site-read__value--in'); }); sg.classList.remove('pp-site-step--in'); dd.classList.remove('pp-site-read__decide--done'); fo.classList.remove('pp-site-step--in'); btn.classList.remove('pp-button--pressed');
      doc.classList.remove('pp-site-read__doc--go'); void doc.offsetWidth; dt.push(setTimeout(function () { doc.classList.add('pp-site-read__doc--go'); }, 200));
      vals.forEach(function (b, i) { dt.push(setTimeout(function () { b.classList.add('pp-site-read__value--in'); }, 900 + i * 350)); });
      dt.push(setTimeout(function () { sg.classList.add('pp-site-step--in'); }, 2500));
      dt.push(setTimeout(function () { btn.classList.add('pp-button--pressed'); dt.push(setTimeout(function () { dd.classList.add('pp-site-read__decide--done'); }, 400)); }, 4200));
      dt.push(setTimeout(function () { fo.classList.add('pp-site-step--in'); }, 5000));
    }
    btn.addEventListener('click', done);
    function onScroll() {
      var mid = innerHeight * 0.55, idx = -1;
      steps.forEach(function (s, i) { if (s.getBoundingClientRect().top < mid) idx = i; });
      if (idx === last) return; last = idx;
      steps.forEach(function (s, i) { s.classList.toggle('pp-site-story__step--done', i < idx); s.classList.toggle('pp-site-story__step--active', i === idx); });
      var n = Math.max(0, idx + 1); fill.style.setProperty('--_p', String(n / steps.length)); count.textContent = n + ' of ' + steps.length;
      now.textContent = idx >= 0 ? steps[idx].getAttribute('data-now') : 'Waiting for the signed offer';
      setState(stage, idx === steps.length - 1 ? 'active' : 'onb');
      var v = Math.max(0, idx);
      views.forEach(function (e, i) { var on = i === v; e.classList.toggle('pp-site-person__view--on', on); if (on) e.removeAttribute('aria-hidden'); else e.setAttribute('aria-hidden', 'true'); });
      if (v === 2) read();
    }
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
  $$('[data-demo^="land-story"]').forEach(story);
})();
