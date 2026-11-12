---
name: Link
group: actions
status: ready
classes: pp-link
primeng: none (plain a with routerLink)
replaces: footer-link, navbar__link, breadcrumb link classes, p-button with pi-external-link used to open documents
---

# Link

A link takes a person somewhere: another page, a record, a document, a site outside Naleko People. Links go somewhere; buttons do something. If clicking it changes data, sends something or opens a dialog, it is a Button.

## Anatomy

1. **Text**: the words that say where it goes, in `--color-link`, underlined.
2. **Icon** (optional, standalone links only): Lucide, 16px. `arrow-right` after the text for "see more", or a vocabulary icon before it (`history` for the audit trail).
3. **External icon** (external links only): `external-link` after the last word, sized to the text, and hidden text "(opens in a new tab)".

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-link` | Inside a sentence or a table cell. Always underlined, so it is not shown by colour alone | For an action ("Resend invite" is a button) |
| `pp-link--standalone` | On its own line: "View all new employees", "Audit trail". Label font, no underline until hover, 32px tall, 44px hit area on touch | Inside a sentence |
| `pp-link--subtle` | Names and dates in a "Last changed by" line, footers | As the only way to reach something important |
| `pp-link--external` | Goes outside Naleko People: SARS, the Department of Employment and Labour, a payroll provider. Add the `external-link` icon and the hidden text | For pages inside Naleko People, even in another product area |
| `pp-link--visited` | Lists people work through once: policies to read, help articles | In app navigation, tables or menus, where visited colour is noise |

A link that looks like a button is `<a class="pp-button">` (see Button). Use it only for a main call to action that navigates, such as "Get started" on an empty state.

## States

| State | How |
| --- | --- |
| Default | `--color-link`, 1px underline 2px below the text |
| Hover | Underline thickens to 2px (standalone: the underline appears) |
| Pressed | `--color-link-pressed` |
| Focus | 2px violet ring, 2px offset, keyboard focus only (from base.css) |
| Visited | `--color-link-visited`, only with `pp-link--visited` |
| Current page | `aria-current="page"`: text colour, semibold, no underline |

There is no disabled link. If the place is not available, show plain text and say why, or remove the link.

## Behaviour

- Links inside Naleko People open in the same tab. People use the browser's own "open in new tab" when they want one.
- External links and documents (contracts, payslips, ID scans) open in a new tab, so the person keeps their place. Say so with the icon and the hidden text.
- A document link whose address must be fetched first (a signed download link) is still a link to the person: render the `<a>` and fetch the address on click, rather than a button that calls `window.open`.
- Never put a link on a whole sentence. Link the words that name the destination.

## Content

- Say where it goes, in sentence case: "View Sipho's documents", "Leave policy". Never "Click here", "Here" or "Read more" on its own.
- The text must make sense out of context, because screen readers list links on their own.
- Two links to the same place on one page use the same words. Two links to different places never share words.
- Do not end a standalone link with a full stop.

## Accessibility

- Use `<a href>` (or `routerLink`) for every link. Never a `<span>` or `<div>` with a click handler; never `href="#"` on a real link.
- Inline links stay underlined, so they never rely on colour alone (WCAG 1.4.1).
- External links carry `<span class="pp-visually-hidden"> (opens in a new tab)</span>` and `rel="noopener"`. The icon is `aria-hidden`.
- `--color-link` and `--color-link-pressed` reach 4.5:1 on every surface in both themes (checked in CI). `--color-link-visited` is not in the contrast test yet; add it before using `pp-link--visited` widely.
- Standalone links get a 44px hit area on touch screens (rule 9).

## PrimeNG mapping

No PrimeNG component. Use Angular's router on a plain anchor:

```html
<a class="pp-link pp-link--standalone" routerLink="/people/new-hires">
  <span>View all new employees</span><i data-lucide="arrow-right"></i>
</a>
<a class="pp-link pp-link--external" [href]="guideUrl" target="_blank" rel="noopener">
  SARS guide to tax numbers<span class="pp-link__icon"><i data-lucide="external-link"></i></span>
  <span class="pp-visually-hidden"> (opens in a new tab)</span>
</a>
```

`p-button` with `[link]="true"` is a button styled as a link; use it only for actions, and map it to `pp-button--link` (see Button). For the `p-breadcrumb` and `p-menu` item links, pass-through adds the Naleko People classes in their own components.

## In Naleko People today

- `routerLink` appears in 10 files under `src/app`, including `sidebar.component.html`, `admin-sidebar.component.html` and the TalentFlow and IT provisioning shells. Breadcrumb links have their own classes (`bp-breadcrumb__link` in `hm-bundle-progress-page.component.html`, `br-breadcrumb__link` in `hm-bundle-review-page.component.html`).
- The footer (`footer.component.html`) and the landing page (`landing.component.html`) have links with `href="#"` placeholders and their own classes.
- Documents open from a `p-button` with the PrimeIcons `pi-external-link` icon that calls `window.open(..., '_blank')`, in 3 components: `verification-detail`, `document-detail-card` and `document-row`. These are links to the person and should become Links.
- No anchor in `src/app` uses `target="_blank"`.

## Do and don't

- **Do** write "View Sipho's documents". **Don't** write "Click here".
- **Do** use a link to open a document. **Don't** use a button with `window.open` for it.
- **Do** mark links that leave Naleko People with the icon and the hidden text. **Don't** open pages inside Naleko People in a new tab.
