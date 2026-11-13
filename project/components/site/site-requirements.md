---
name: Site role requirements
group: site
status: ready
classes: pp-site-req
primeng: none (public site only, no PrimeNG)
replaces: the public site's .rq, .rq-box and .rq-row, which changed border and fill colours by transition
---

# Site role requirements

The certificates a role needs, and the same list copied onto a new employee. Each copied requirement is requested, then uploaded or given a due date.

## Anatomy

1. **List** (`pp-site-req`): the role's box, an arrow, the employee's box.
2. **Box** (`pp-site-req__box`; `--live` once the requirements are added): a heading (`pp-site-req__head`) with a status on the right and a row for each requirement.
3. **Row** (`pp-site-req__row`, with `pp-site-step` in the employee's box): the certificate's name and a [live status](site-state.html).
4. **Arrow** (`pp-site-req__down`): a Lucide arrow pointing down.

## States

| State | How |
| --- | --- |
| Waiting | The employee's box says "New employee"; its rows are hidden |
| Added | `--live`: a mint fill and border fade in; the heading says "Requirements added"; rows step in 0.5s apart |
| Collected | Two rows say "Uploaded"; the third says "Due 8 Dec" |
| Still | The collected state shows |

## Behaviour

- The role's box is always there. The employee's box turns mint 0.9s in, its rows arrive from 1.3s, and the statuses change at 3.6s, 4.3s and 5.0s.
- Statuses are stacks of states that crossfade; none changes colour by transition.
- The mint look is a layer that fades in (opacity).

## Content

- Copied from the approved page: "Role requirements", "Warehouse operator", "3 requirements", "Required", "John Doe · starts 1 Dec", "New employee", "Requirements added", "Requested", "Uploaded", "Due 8 Dec" and the three certificate names.
- The sample person is John Doe.

## Accessibility

- A change in a status is announced (each stack is a `role="status"`).
- Every row says its certificate and its status in words.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The role requirements in Compliance Management: requirements per role and per site, inherited by new employees and collected during onboarding.

## Do and don't

- Do show where a requirement came from (the role) before the person it was copied to.
- Don't change a box's colour with a transition. Fade a layer in.
