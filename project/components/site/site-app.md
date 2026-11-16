---
name: Site app frame
group: site
status: ready
classes: pp-site-app, pp-site-app__nav, pp-site-app__company, pp-site-app__mark, pp-site-app__item, pp-site-app__item--current, pp-site-app__item--module, pp-site-app__item--in, pp-site-app__item--new, pp-site-app__spacer, pp-site-app__main, pp-site-app__title, pp-site-app__sub, pp-site-app__idle, pp-site-app__task, pp-site-app__task--in, pp-site-app__module
primeng: none (public site only, no PrimeNG)
replaces: the landing page's .pl-app, whose sidebar items slid open with a max-height transition
---

# Site app frame

A small sample of the Naleko People app: its sidebar and the Today list, which follow the modules switched on.

## Anatomy

1. **Frame** (`pp-site-app`, `role="group"`): sidebar and main area side by side; under 480px of width the sidebar becomes a row of items above the list.
2. **Sidebar** (`__nav`): the company (`__company` with a `__mark`), items (`__item`, a Lucide icon and a word; `--current` is Today), a spacer (`__spacer`) and Settings at the bottom. Module items carry `--module` and `data-m`.
3. **Main** (`__main`): "Today" (`__title`), who is signed in (`__sub`), a line for when nothing is on yet (`__idle`) and the items (`__task`, with the module name `__module` and a Site status).

## States

| State | How |
| --- | --- |
| Module off | Its sidebar item is invisible in its place; its Today item is not shown |
| Module on | The sidebar item fades and rises in, tinted violet for 1.4s (`--new`, a layer that fades); its Today item pops in 0.35s later |
| Nothing on | `__idle` is shown |

## Behaviour

- On the approved site the sidebar items slid open (max-height), which the site check does not allow. Here they fade into a place kept for them; the modules switch on in sidebar order, so the space fills from the top.

## Content

- Copied from the approved page: Sample company, Today, People, Recruitment, Onboarding, Leave, Compliance, Settings, "Jane Smith · HR", the four Today items and their statuses, and "Nothing to do yet. Items appear as modules are switched on."

## Accessibility

- The sidebar is a `nav` named "Sample app sidebar"; its items are text, not links. Icons are decorative.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The app's Today screen and sidebar follow the company's modules (Today screens are awaiting feedback).

## Do and don't

- Do use the sample company and the demo people only.
- Don't show real numbers or names.
