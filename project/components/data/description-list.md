---
name: Description list
group: data
status: ready
classes: pp-dl
primeng: none
replaces: label and value grids in the employee detail, candidate identity card, verification detail and audit event drawer
---

# Description list

Label and value pairs about one record: a person's details, a document's fields, an audit event.

## Anatomy

1. **Term** (`dt`): the label, subtle text.
2. **Detail** (`dd`): the value.
3. **Source mark** (optional): "From ID document" in agent text when Pepla read the value from a document.
4. **Masked value** (optional): personal data with a "Show" link-button.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-dl` | Two columns on desktop; stacks under 480px | More than about 12 pairs in one list; split into sections |
| `pp-dl--stacked` | Narrow panels and drawers | Wide pages |

## States

| State | How |
| --- | --- |
| Not set | `pp-dl__notset`: "Not set", never blank, never 0 |
| Masked | A Masked field (`pp-masked`) in the `dd`: Show is recorded before the value appears (rule 6) |
| Read by Pepla | `pp-dl__source` with sparkles: "From ID document" |
| Restricted | Lock icon and "Hidden" for people without access |

## Behaviour

- Order follows how people think about the record, not the database: name, role, start date, manager, then contact, then personal data last.
- Editing happens in a Drawer or inline edit, never in the list itself.

## Content

- Labels are short nouns: "Start date", "Manager", "Tax number".
- Values keep their real formats: "17 Nov 2026", "R 18 500", "+27 82 555 0198".

## Accessibility

- Real `<dl>`, `<dt>`, `<dd>`.
- The Show button names what it reveals: "Show ID number". After reveal, focus stays on the button, which becomes "Hide ID number".

## PrimeNG mapping

None. Plain markup.

## In Pepla today

Employee detail, the candidate identity card, verification detail (fields read from the ID) and the audit event drawer.

## Do and don't

- **Do** write "Not set". **Don't** leave a value blank.
- **Do** mark values Pepla read from a document. **Don't** present extracted values as if a person typed them.
- **Do** mask ID and bank numbers by default. **Don't** show them in full in lists.
