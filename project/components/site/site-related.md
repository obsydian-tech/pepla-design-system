---
name: Site related modules
group: site
status: ready
classes: pp-site-related
primeng: none (public site only, no PrimeNG)
replaces: the public site's .lm-rel and .rel cards, which drew their own icons and moved their border colour
---

# Site related modules

"Works together with" on a Learn more page: a headline and three [Site module cards](site-tile.html) that link to the modules this one works with.

## Anatomy

1. **Section** (`pp-site-related`): the cream canvas.
2. **Headline** (`pp-site-related__title`, an `h2`, `--font-site-faq`): "Works together with".
3. **List** (`pp-site-related__list`, a `ul`): one column on a phone, three from 768px. Each item holds one `pp-site-tile` (icon, name, one line and "Learn more").

## States

| State | How |
| --- | --- |
| Default | Three cards in a row |
| Hover or focus on a card | The card's own states: it lifts, its icon fills and the arrow moves (see Site module cards) |
| Still | `data-site-still`: the cards' transitions stop |

## Behaviour

- The section adds no motion of its own. Cards reveal on arrival with `pp-site-reveal`.

## Content

- Three cards per page, copied from the approved page. "masked" in the source reads "hidden" here, by the words rule.
- Icons follow the landing module cards: Onboarding and Offboarding rocket, Employee Records users, Recruitment user-plus, Compliance Management scale, Leave Management calendar-days, Security and POPIA shield-check, API code, events zap.

## Accessibility

- Each card is one link; its name is an `h3`.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the signed-in app. Source: the approved Learn more pages' related section (`lm-rel`).

## Do and don't

- Do link to modules that really share data with this one.
- Don't put more than three cards in the row.
