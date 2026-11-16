---
name: Site facts
group: site
status: ready
classes: pp-site-facts, pp-site-facts__item
primeng: none (public site only, no PrimeNG)
replaces: the landing page's .batsi-facts row, which used inline svg ticks
---

# Site facts

A short row of ticked facts under the landing Ask Batsi questions.

## Anatomy

1. **Facts** (`pp-site-facts`, a list) of **items** (`__item`): a mint check icon and a short fact.

## States

| State | How |
| --- | --- |
| Rest | Static; it arrives with the section (`pp-site-reveal`) |

## Behaviour

- Items wrap onto more lines when there is no room.

## Content

- Copied from the approved page. Three facts, each a few words.

## Accessibility

- A list; the icons are decorative.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Each fact is how Ask Batsi works in the app: its own records, HR approval and the audit log.

## Do and don't

- Do keep each fact to one line.
- Don't make the facts links.
