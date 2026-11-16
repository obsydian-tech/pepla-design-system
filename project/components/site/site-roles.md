---
name: Site roles and access
group: site
status: ready
classes: pp-site-roles, pp-site-roles__box, pp-site-roles__name, pp-site-roles__text, pp-site-roles__access, pp-site-roles__item
primeng: none (public site only, no PrimeNG)
replaces: the public site's .rl-tabs and .rl-box, whose buttons faded their background colour
---

# Site roles and access

Five role buttons and a box that shows what the chosen role can see.

## Anatomy

1. **Block** (`pp-site-roles`).
2. **Role buttons**: Site choices slots (`pp-site-slots`, `pp-site-slots__row` named "Roles", `pp-site-slot` with `aria-pressed`). One is pressed.
3. **Box** (`__box`, `aria-live="polite"`): the role's name (`__name`), one line (`__text`) and its access (`__access`), rows (`__item`) with a Site status.

## States

| State | How |
| --- | --- |
| Cycling | From 2.6s after the demo is seen, the next role shows every 3.2s |
| Chosen | A click shows that role and stops the cycle |
| Rows | Each time a role shows, its rows pop in |

## Behaviour

- The pressed button's dark fill fades in on a layer (Site choices).

## Content

- The five roles, their lines and access rows exactly as on the approved page, with one change: the HR role's "Masked, each Show logged" is "Hidden, each Show logged".

## Accessibility

- Buttons use `aria-pressed`. The box is a polite live region, so a change is read once.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Five roles are decided: Administrator, HR, Manager, Employee and Guest (admin set-up).

## Do and don't

- Do show what a role cannot see as well as what it can.
- Don't add a role that is not in the five.
