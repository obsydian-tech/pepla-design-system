---
name: Site question tabs
group: site
status: ready
classes: pp-site-qtabs, pp-site-qtabs--paused, pp-site-qtabs__tab, pp-site-qtabs__n, pp-site-qtabs__bar
primeng: none (public site only, no PrimeNG)
replaces: the landing page's .qs and .qbtn, which changed background and border by transition and grew the bar by width
---

# Site question tabs

Numbered sample questions on the landing Ask Batsi band. One is selected and a bar under it fills while its conversation plays; then the next one plays.

## Anatomy

1. **Tabs** (`pp-site-qtabs`, `role="tablist"`, "Sample questions").
2. **Tab** (`__tab`, a button with `role="tab"` and `aria-selected`): a number (`__n`, 01 to 03), the question and a bar (`__bar`).

## States

| State | How |
| --- | --- |
| Rest | Translucent white, grey border, grey number |
| Hover | A violet border fades in |
| Selected | A white card with a mint border and shadow fades in (a layer); mint number; the bar fills across in 11s (`motion.site.duration.question`) |
| Paused (`--paused`) | The bar stops where it is |
| Still | The bar shows full; no fades |

## Behaviour

- The bar fills by scaling across (transform), never by width. A script can set `--_dur` to change its time.
- Pressing a tab plays that question and pauses the automatic cycle for good.

## Content

- Copied from the approved page. Three questions at most.

## Accessibility

- A tablist with tabs, so the selected question is announced. The conversation it plays is a polite live region.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The questions are ones Ask Batsi answers in the app today: readiness to start, missing documents, candidates at risk.

## Do and don't

- Do keep the questions short enough for one line at desktop width.
- Don't use it outside the landing Ask Batsi band; module pages use the question chips.
