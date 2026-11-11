---
name: Text
group: core
status: ready
classes: pp-text
primeng: none (plain p and span)
replaces: PrimeFlex text-sm, text-color-secondary, font-semibold and font-bold, hand-written text-overflow rules
---

# Text

Text is body copy: sentences, labels in lists, names, amounts. One class sets the body style, and modifiers change size, weight, colour, figures and overflow. Titles use Heading.

## Anatomy

1. **Size**: `pp-text` is body (14px). `pp-text--large` is 16px, `pp-text--small` is 12px.
2. **Weight** (optional): `pp-text--strong` makes any size semibold.
3. **Colour** (optional): `--color-text` by default; `pp-text--subtle` or `pp-text--subtlest` for less important text.
4. **Figures** (optional): `pp-text--tabular` for numbers that line up; `pp-text--metric-*` for big numbers.
5. **Overflow** (optional): one line with an ellipsis, or a fixed number of lines.

## Styles

| Class | Token | Use |
| --- | --- | --- |
| `pp-text--large` | `--font-body-large` | The new-hire and employee portal on phone; intro lines; long reading |
| `pp-text` (default) | `--font-body` | Everything else in the HR web app |
| `pp-text--small` | `--font-body-small` | Who and when lines, captions, help under a value. Never for whole paragraphs |
| `pp-text--strong` | `--font-weight-semibold` | A name or the one fact the sentence is about |
| `pp-text--subtle` | `--color-text-subtle` | Secondary lines: role and team under a name |
| `pp-text--subtlest` | `--color-text-subtlest` | Metadata: dates joined, "Last changed by". Never for anything a person must read to act |
| `pp-text--tabular` | tabular figures at the current size | Money, counts and dates in a column or list |
| `pp-text--metric-small`, `--metric-medium`, `--metric-large` | `--font-metric-*` | A single number that is the point of the card. Stat card uses these |
| `pp-text--truncate` | one line, ellipsis | File names, emails and names in narrow cells |
| `pp-text--clamp`, `pp-text--clamp-3` | 2 or 3 lines, ellipsis | Notes and descriptions in cards and lists |
| `pp-text--measure` | at most 720px wide | Paragraphs on wide pages |
| `pp-text--nowrap` | no wrapping | Short values that must stay whole: `R 18 500`, `3 Nov 2026` |

The utility classes in `tokens/typography.css` (`pp-text-body` and so on) only set the font. Components and pages use `pp-text`, which also sets colour and margin.

## States

Text has no interactive states. Disabled controls colour their own text; never put `--color-text-disabled` on body copy to make it look less important (use subtle or subtlest).

## Behaviour

- Truncated text always has a way to see all of it: a tooltip with the full value, a `title` on file names, or the record it opens.
- Clamped text has a "Show all" link button when it is cut, and only then.
- Never truncate a number, an amount, a date or a status. Let the column grow or wrap the label instead.
- Body copy wraps; it never scrolls sideways.

## Content

- Sentence case, short sentences, the reader as "you".
- Money: `R 18 500`, symbol first, space for thousands. Dates: `3 Nov 2026`, with time `3 Nov 2026, 14:30`.
- Bold one thing in a sentence at most. If everything is strong, nothing is.
- Do not use colour to carry meaning in body text. Status gets a Lozenge with an icon and a word (rule 4).

## Accessibility

- `--color-text`, `--color-text-subtle` and `--color-text-subtlest` all meet 4.5:1 on the surfaces in both themes (checked in CI).
- `pp-text--small` (12px) is for short lines only. Long text at 12px is hard to read on phone.
- Truncation hides text from sighted people only; screen readers still read the whole value. Make sure the hidden part is reachable another way for everyone else.
- Use `<p>` for paragraphs and `<span>` inside a line. Use `<strong>` when the emphasis matters to meaning, and `pp-text--strong` when it is only visual.

## PrimeNG mapping

No PrimeNG component. Use plain tags with the class:

```html
<p class="pp-text pp-text--subtle">Payroll administrator, Finance</p>
<span class="pp-text pp-text--tabular">{{ salary | currency:'ZAR':'R ':'1.0-0':'en-ZA' }}</span>
<span class="pp-text pp-text--truncate" [pTooltip]="doc.fileName">{{ doc.fileName }}</span>
```

Check that the Angular `en-ZA` locale prints a space for thousands before relying on the pipe; it is to be checked.

## In Pepla today

There is no shared text style. Under `src/app`, the PrimeFlex class `text-color-secondary` is used 63 times in 11 files and `text-sm` 19 times in 12 files. 18 SCSS files write their own `text-overflow` rule (for example `support-inbox.component.scss` and `candidates-page.component.scss`). No file uses `line-clamp` or `font-variant-numeric`, so amounts and counts do not line up today.

## Do and don't

- **Do** use `pp-text--tabular` for amounts in a list. **Don't** let `R 9 870` and `R 21 100` start at different points.
- **Do** use subtle for the second line under a name. **Don't** use disabled grey to make text quiet.
- **Do** show the full file name on hover when it is truncated. **Don't** truncate an amount or a date.
