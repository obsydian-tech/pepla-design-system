---
name: Accordion
group: data
status: ready
classes: pp-accordion
primeng: Accordion (p-accordion, p-accordion-panel, p-accordion-header, p-accordion-content)
replaces: p-accordion (5 panels in the AI mode panel and config pages)
---

# Accordion

Sections that open one at a time, for long settings and help text people need only sometimes.

## Anatomy

1. **Header**: title, optional meta ("3 rules"), chevron at the end. At least 44px tall.
2. **Panel**: the section's content.
3. **Divider**: 1px border between items.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-accordion` | Grouped settings, FAQ, long forms split by topic | Hiding the one thing people came for |

## States

| State | How |
| --- | --- |
| Closed | Chevron down |
| Open | Chevron up (rotates 180°, 200ms; instant under reduced motion) |
| Hover | Raised-hovered background on the header |
| Contains an error | Header meta shows "1 problem" in danger text with icon, and the item opens |

## Behaviour

- Several items may be open at once unless the content is a strict sequence.
- If a form inside has an error on submit, its item opens and focus moves to the first error.
- Deep links (`#locale`) open the matching item.

## Content

Header titles are nouns: "Locale and currency", "Approval chains". Meta says how much is inside: "2 chains".

## Accessibility

- Built on `<details>` and `<summary>`, so keyboard and screen readers work without script.
- Do not put interactive controls inside the summary.

## PrimeNG mapping

```ts
accordion: { root: { class: 'pp-accordion' } },
accordionpanel: { root: { class: 'pp-accordion__item' } },
accordionheader: { root: { class: 'pp-accordion__header' }, toggleicon: { class: 'pp-accordion__chevron' } },
accordioncontent: { content: { class: 'pp-accordion__panel' } }
```

## In Pepla today

The AI mode panel and some config pages use `p-accordion` with five panels and their own chevrons.

## Do and don't

- **Do** use for optional detail. **Don't** hide required fields in a closed item without saying so.
- **Do** show counts in the header. **Don't** nest accordions.
