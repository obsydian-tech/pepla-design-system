/* PREVIEW ONLY. Joins the sections of the "Site landing page" UI kit page into one page, as on the approved page:
   the menu's MCP server and Events links scroll to Integrations and switch it to that tab. Each section plays from its
   own preview script. It mirrors what the Angular site will do and is never shipped. */
(function () {
  var TAB = { mcp: 'mcp', events: 'ev' };
  function show(stage, name) {
    var tab = stage.querySelector('[data-demo="int-landing"] .pp-site-editor__tab[data-k="' + TAB[name] + '"]');
    if (tab) tab.click();
  }
  function parse(href) {
    var m = /^#(mcp|events)-[dp]$/.exec(href || '');
    return m && m[1];
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    var stage = a && a.closest('.pp-site-stage[data-site-page]');
    var name = a && parse(a.getAttribute('href'));
    if (stage && name) setTimeout(function () { show(stage, name); }, 0);
  });
  var name = parse(location.hash), target = name && document.getElementById(location.hash.slice(1));
  var stage = target && target.closest('.pp-site-stage[data-site-page]');
  if (stage) addEventListener('load', function () { show(stage, name); });
})();
