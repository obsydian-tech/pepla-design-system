---
name: Site code editor
group: site
status: ready
classes: pp-site-editor, pp-site-editor__bar, pp-site-editor__dot, pp-site-editor__file, pp-site-editor__tabs, pp-site-editor__tab, pp-site-editor__label, pp-site-editor__label--on, pp-site-editor__code, pp-site-editor__k, pp-site-editor__s, pp-site-editor__c, pp-site-editor__f, pp-site-editor__n, pp-site-editor__caret, pp-site-editor__foot, pp-site-editor__live, pp-site-editor__again
primeng: none (public site only, no PrimeNG)
replaces: the landing page's .ap-ed editor, whose tab labels faded their colour
---

# Site code editor

The one dark surface on the site: a code window with three tabs, code that types itself in, and Play again.

## Anatomy

1. **Window** (`pp-site-editor`): dark (`color.site.code.surface`), rounded, with the site card shadow.
2. **Bar** (`__bar`): three dots (`__dot`) and the file name (`__file`), which changes with the tab.
3. **Tabs** (`__tabs`, `role="tablist"` named "Ways to connect"): `__tab` buttons with `role="tab"`, `aria-selected` and `aria-controls`. Each label is written twice (`__label` and `__label--on`, `aria-hidden`), so its colour fades. The chosen tab has a mint underline (a layer that fades).
4. **Code** (`__code`, a `pre` named "Sample code"): colour spans `__k` keyword, `__s` string, `__c` comment (italic), `__f` function, `__n` number, and a blinking caret (`__caret`) while typing.
5. **Foot** (`__foot`): a mint live dot (`__live`), "Per-company key · Sample data" and Play again (`__again`, `rotate-ccw`).

## States

| State | How |
| --- | --- |
| Typing | Characters arrive 17ms apart, a new line after 170ms, with the caret at the end |
| Done | The caret stays and blinks every second |
| Tab chosen | White label and mint underline fade in |

## Behaviour

- Arrow Left and Right move between tabs and play the one reached, as on the approved page.
- The code is 10 lines tall at least, so the window does not jump between tabs. Under 640px of width the code is set smaller.

## Content

- The three code samples are copied from the approved page, with John Doe, Jane Smith, Candidate 3 and "Operations" as the sample data.

## Accessibility

- Real tabs with roving `tabindex`. The code is a `pre` with a name; the colour spans carry no meaning of their own.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The REST API, MCP server and events are planned (agents sold as APIs). The samples show the intended shape, not a published API.

## Do and don't

- Do use the demo people and sample data only.
- Don't show a real key, URL or company name in the code.
