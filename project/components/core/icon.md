---
name: Icon
group: core
status: ready
classes: pp-icon, pp-icon-tile
primeng: none (PrimeIcons are not used)
replaces: PrimeIcons (pi pi-*), Material icons and emoji used in the current app
---

# Icon

Lucide icons, one meaning per icon, from the vocabulary in the readme. Icons support words; they rarely replace them.

## Anatomy

1. **Glyph**: a Lucide outline icon, 24 by 24 grid, 1.75px stroke, round caps and joins.
2. **Colour**: inherits the text colour, or takes an icon role (`--color-icon-*`).
3. **Tile** (optional, `pp-icon-tile`): a 40px rounded square behind the icon for module entry points and empty states.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-icon` | Inherits `currentColor`: buttons, menu items, inline text | Filled or duotone icons |
| `pp-icon--subtle` | Supporting icons in meta lines | Anything the person must notice |
| `pp-icon--success / warning / danger / information` | Next to a status word | Without the word (rule 4) |
| `pp-icon--agent` | `sparkles` beside anything the agent did | Any other icon in mint |
| `pp-icon-tile` / `--brand` / `--agent` | Module cards, empty states, settings sections | As a button without a label |

## Sizes

| Class | Size | Use |
| --- | --- | --- |
| `pp-icon--small` | 16px | Inside buttons, lozenges, table cells |
| (default) | 20px | Navigation, messages, fields |
| `pp-icon--large` | 24px | Empty states, page headers |

## States

| State | How |
| --- | --- |
| Default | Inherits text colour |
| In a disabled control | Inherits the disabled text colour |

## Behaviour

- Use the vocabulary table: `sparkles` always means the agent, `clock` always means a deadline, `eye-off` always means hidden personal data. A new meaning needs a new row in the readme first.
- Icons are inlined SVG (from the `lucide` package), never an icon font.

## Content

An icon is never the only carrier of meaning except universal controls (close `x`, menu, search) and those still need an accessible name.

## Accessibility

- Decorative icons next to text: `aria-hidden="true"`.
- Icon-only controls: the control gets `aria-label`; the SVG stays hidden.
- Status icons meet 3:1 against every surface (CI checks the icon roles).

## PrimeNG mapping

Set PrimeNG's icon templates to Lucide (`lucide-angular`), for example `<ng-template #dropdownicon><lucide-icon name="chevron-down" class="pp-icon pp-icon--small"/></ng-template>`. Never load PrimeIcons.

## In Pepla today

The current app mixes PrimeIcons (`pi pi-check`, `pi pi-user`), a few Material icons and emoji in the AI panel. All of them move to Lucide.

## Do and don't

- **Do** use the same icon for the same meaning everywhere. **Don't** pick a "nicer" icon for one screen.
- **Do** pair a status icon with its word. **Don't** use a coloured icon alone to say something is late.
- **Do** use `sparkles` for the agent. **Don't** use `sparkles` to mean "new" or "premium".
