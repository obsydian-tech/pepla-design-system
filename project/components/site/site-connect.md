---
name: Site connection panel
group: site
status: ready
classes: pp-site-connect, pp-site-connect__head, pp-site-connect__title, pp-site-connect__note, pp-site-connect__body, pp-site-connect__idle, pp-site-connect__item, pp-site-connect__item--batsi, pp-site-connect__item--in, pp-site-connect__name, pp-site-connect__meta, pp-site-connect__code, pp-site-connect__tools, pp-site-connect__tool, pp-site-connect__tool--hit, pp-site-connect__foot
primeng: none (public site only, no PrimeNG)
replaces: the landing page's .ap-pn panels, whose statuses and tool rows faded their colours
---

# Site connection panel

The Naleko People side of an integration: one panel per tab, each a `role="tabpanel"`.

## Anatomy

1. **Panel** (`pp-site-connect`): white card with a head (`__head`: `__title` and `__note`) and a body (`__body`).
2. **Idle line** (`__idle`): shown until the first item arrives ("Waiting for a request.", "No events yet today.").
3. **Item** (`__item`, `data-s` gives its order): a name (`__name`), a tool or event name (`__code`), a Site status or live status, and a full-width line (`__meta`). `--batsi` is Batsi's own suggestion (mint, with the Batsi lozenge).
4. **Tools** (`__tools`, MCP): allowed tools (`__tool`) with Read or Needs approval; the one being called is tinted (`--hit`, a layer that fades).
5. **Foot line** (`__foot`): a closing sentence (Events).

## States

| State | How |
| --- | --- |
| Waiting | Items hidden, idle line shown |
| Item in | Pops in (`--in`) |
| Approved | Approve is pressed; "Waiting for approval" crossfades to "Approved by Jane Smith" and the line to "Approved and sent, 10:14" |

## Behaviour

- REST API: items at 0.3s, 1.3s and 2.4s after the code; Approve pressed at 4.2s; MCP server plays 7.2s after the code.
- MCP server: the first tool is called at 0.2s, the second at 1.7s; Events plays 6.2s after the code.
- Events: deliveries at 0.3s, 1.3s and 2.3s.

## Content

- Copied from the approved page.

## Accessibility

- Each panel is labelled by its tab. Approve is a real design system button. Status changes are in a `role="status"` stack.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Writes from outside wait in the same approval queue as Batsi's suggestions. The queue screen is still to be built.

## Do and don't

- Do show that every write from outside waits for a person.
- Don't show an outside write as already applied.
