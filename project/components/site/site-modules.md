---
name: Site modules
group: site
status: ready
classes: pp-site-modules, pp-site-modules--flush, pp-site-modules__row, pp-site-modules__row--included, pp-site-modules__row--soon, pp-site-modules__row--press, pp-site-modules__name, pp-site-modules__on
primeng: none (public site only, no PrimeNG)
replaces: the public site's .pl-rows, .pl-row and .pl-sw switch, whose track faded its background colour
---

# Site modules

The Settings · Modules list: the modules Naleko switches on for a company. Each row is a design system toggle.

## Anatomy

1. **List** (`pp-site-modules`): a bordered box of rows. `pp-site-modules--flush` drops the border when the list sits inside a card (the landing page).
2. **Row** (`pp-site-modules__row`, `data-m` names the module): a `pp-toggle pp-toggle--end` (label first, switch at the end). The toggle's description is a Site live status stack with "Off" and "On" (`pp-site-modules__on`, violet).
3. **Included row** (`--included`): Employee Records, switched on and disabled; its words keep their normal colours.
4. **Coming soon row** (`--soon`): the name (`__name`) and a neutral "Coming soon" status, no switch.

## States

| State | How |
| --- | --- |
| Off | Toggle off, "Off" under the name |
| On | Toggle on, "On" in violet (the two words crossfade) |
| Pressed | `--press` gives the switch a short press (scale) before it turns on |
| Included | On and disabled (the toggle's disabled look) |

## Behaviour

- In the demos the switches turn on one by one (0.9s apart on the Learn more page, 1.1s on the landing page).
- On the landing page a person can click a switch to turn a module on or off.

## Content

- Module names exactly as on the approved site: Employee Records, Recruitment, Onboarding and Offboarding, Leave Management, Compliance Management, HR Help Desk, Performance Management. "Included with every company", "Off", "On", "Coming soon".

## Accessibility

- Each switch is a real checkbox with `role="switch"`, named by its label. Coming soon rows have no control.
- On the Learn more page the switches are out of the tab order (`tabindex="-1"`), as on the approved page, because only the demo turns them.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Modules are switched on per company by Naleko staff. The settings screen is still to be built (ADM cards).

## Do and don't

- Do keep Employee Records first and locked on.
- Don't let a company switch modules on itself on the site sample; Naleko does it after the onboarding call.
