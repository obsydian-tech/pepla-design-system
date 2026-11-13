/* PREVIEW ONLY. Drives the form cards on the "Site form pages" UI kit page: chips and slots press, errors show and clear,
   and Send swaps the form for the confirmation. It mirrors what the Angular site will do, and sends nothing anywhere.
   It is not part of any component and is never shipped to the site. */
(function () {
  var all = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  all('.pp-site-form-card').forEach(function (card) {
    var form = card.querySelector('.pp-site-form-card__form'), done = card.querySelector('.pp-site-confirm');
    if (!form || !done) return;

    all('.pp-site-chip', form).forEach(function (b) {
      b.addEventListener('click', function () { b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')); });
    });
    all('.pp-site-slots__row', form).forEach(function (row) {
      var bs = all('.pp-site-slot', row);
      bs.forEach(function (b) { b.addEventListener('click', function () { bs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); }); });
    });

    function setBad(field, bad) {
      var el = field.querySelector('input,select,textarea'), err = field.querySelector('.pp-field__error');
      if (bad) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
      if (err) err.hidden = !bad;
    }
    all('.pp-field[data-req]', form).forEach(function (f) {
      var el = f.querySelector('input,select,textarea');
      el.addEventListener('input', function () { setBad(f, false); });
      el.addEventListener('change', function () { setBad(f, false); });
    });
    var box = form.querySelector('.pp-checkbox[data-req] input');
    if (box) box.addEventListener('change', function () { box.removeAttribute('aria-invalid'); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = null;
      all('.pp-field[data-req]', form).forEach(function (f) {
        var el = f.querySelector('input,select,textarea'), v = (el.value || '').trim(), bad = !v;
        if (!bad && el.type === 'email') bad = !EMAIL.test(v);
        setBad(f, bad); if (bad && !first) first = el;
      });
      if (box) { var bad = !box.checked; if (bad) { box.setAttribute('aria-invalid', 'true'); first = first || box; } }
      if (first) { first.focus(); return; }
      var rows = all('.pp-site-slots__row', form), pick = function (r) { var p = r && r.querySelector('[aria-pressed="true"]'); return p ? p.textContent : ''; };
      done.querySelector('[data-confirm-mail]').textContent = form.querySelector('input[type="email"]').value.trim();
      done.querySelector('[data-confirm-when]').textContent = pick(rows[0]) + ', ' + pick(rows[1]);
      form.hidden = true; done.hidden = false; done.focus();
      if (typeof window.fitFrames === 'function') window.fitFrames();
    });
  });
})();
