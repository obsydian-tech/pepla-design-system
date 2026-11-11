---
name: Heading
group: core
status: ready
classes: pp-heading
primeng: none (plain h1 to h6)
replaces: per-page title classes such as registration__title and tf-create__title, PrimeFlex text-xl and text-2xl on headings
---

# Heading

A heading names the page or the section below it. Its size comes from a class and its level comes from the tag, so a drawer can use a small h2 and a profile page a large h1.

## Anatomy

1. **Tag**: `h1` to `h6`, picked for the outline of the page, never for the look.
2. **Size**: one of seven classes, each mapped to a `--font-heading-*` token.
3. **Colour**: `--color-text`; `pp-heading--subtle` for quiet labels over lists.

Headings have no margin. The layout around them sets the space.

## Sizes

| Class | Token | Use |
| --- | --- | --- |
| `pp-heading--xxlarge` | `--font-heading-xxlarge` (32px, Manrope) | A person's name on their profile; the marketing site |
| `pp-heading--xlarge` | `--font-heading-xlarge` (28px, Manrope) | Page titles (the Page header uses this size, and large on phone) |
| `pp-heading--large` | `--font-heading-large` (24px, Manrope) | Titles of full-page sections, page titles on phone |
| `pp-heading--medium` (default) | `--font-heading-medium` (20px, Manrope) | Modal dialog and drawer titles |
| `pp-heading--small` | `--font-heading-small` (16px, Inter) | Card titles, form sections, drawer sections |
| `pp-heading--xsmall` | `--font-heading-xsmall` (14px, Inter) | Groups inside a card, table captions |
| `pp-heading--xxsmall` | `--font-heading-xxsmall` (12px, Inter) | Menu section labels, small lists |

Below 480px the two largest sizes step down one size.

## Levels

- One `h1` per page: the page title. In a modal dialog or drawer the title is an `h2`.
- Go down one level at a time. A section inside an `h2` is an `h3`, even when it looks small.
- If the design calls for a small `h2`, use `<h2 class="pp-heading pp-heading--small">`. Never pick `h4` because it looks right.

## States

Headings have no interactive states. A heading that is also a link (rare) wraps a Link inside it; the heading itself never changes on hover.

## Behaviour

- Long headings wrap and are balanced across lines. They never truncate, except a person's name in a narrow card, where the card truncates it and shows the full name in a tooltip.
- Headings do not change size with data. A page with 1 new hire and a page with 40 use the same title size.

## Content

- Sentence case: "Documents to review", not "Documents To Review".
- No full stop, no colon.
- Short and specific: "Banking", "Emergency contact". Put counts in a Badge, not in the heading text, unless the number is the point ("3 documents expire this month").
- A person's name is a heading on their own page: "Thandeka Dlamini".

## Accessibility

- Screen reader users jump between headings, so the levels must make an outline that reads well on its own.
- Never style a `<p>` or `<span>` to look like a heading. If it names a section, it is a heading.
- Never use a heading tag only to make text bold.
- Sizes from xsmall up meet contrast with `--color-text` and `--color-text-subtle` in both themes.

## PrimeNG mapping

No PrimeNG component. Use plain tags with the class:

```html
<h1 class="pp-heading pp-heading--large">{{ employee.fullName }}</h1>
<h2 class="pp-heading pp-heading--small">Banking</h2>
```

PrimeNG components that render their own titles (`p-card` header, `p-dialog` header, `p-drawer` header) get the class through pass-through. Check the key names against the PrimeNG 19 pass-through docs:

```ts
card: { title: { class: 'pp-heading pp-heading--small' } },       // key to be checked
dialog: { title: { class: 'pp-heading pp-heading--medium' } },    // key to be checked
drawer: { title: { class: 'pp-heading pp-heading--medium' } },    // key to be checked
```

## In Pepla today

There is no shared heading style. Under `src/app`, `<h1>` appears in 26 files, `<h2>` in 37, `<h3>` in 23 and `<h4>` in 3, and each page sizes them with its own class, for example `registration__title` in `new-employee-registration.component.html` and `tf-create__title` in `candidate-create-page.component.html`. Candidate create names its form sections with `<p class="tf-create__section-label">` rather than a heading tag.

## Do and don't

- **Do** pick the tag for the outline and the class for the look. **Don't** use `h4` because it is the right size.
- **Do** keep one `h1` per page. **Don't** make every card title an `h1`.
- **Do** write "Employment details". **Don't** write "EMPLOYMENT DETAILS" or "Employment Details:".
