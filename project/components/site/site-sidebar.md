---
name: Site sidebar preview
group: site
status: ready
classes: pp-site-sidebar, pp-site-sidebar__label, pp-site-sidebar__item, pp-site-sidebar__item--current, pp-site-sidebar__item--module, pp-site-sidebar__item--in
primeng: none (public site only, no PrimeNG)
replaces: the public site's .sbar chips on the Platform page
---

# Site sidebar preview

The app's sidebar as a row of chips under the modules list. A module's chip arrives when the module is switched on.

## Anatomy

1. **Box** (`pp-site-sidebar`, `role="group"`): a pale violet box of wrapping chips.
2. **Label** (`__label`): "Sidebar", small capitals, on its own line.
3. **Chip** (`__item`): `--current` is the page you are on (dark), `--module` is a module's chip (violet), shown once `--in` is set.

## States

| State | How |
| --- | --- |
| Module off | The chip is not shown (while the demo plays) |
| Module on | The chip pops in (opacity and transform) |
| Still | All chips shown |

## Behaviour

- Each module's chip arrives together with its switch.

## Content

- Today, People, Recruitment, Onboarding, Leave, Compliance, Settings, as on the approved page.

## Accessibility

- The chips are not links; they describe the sidebar. The group is named "Sidebar".

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The app's sidebar shows only the modules switched on for the company.

## Do and don't

- Do keep the order of the real sidebar.
- Don't make the chips clickable.
