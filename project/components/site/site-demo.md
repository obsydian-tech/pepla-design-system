---
name: Site demo
group: site
status: ready
classes: pp-site-demo, pp-site-status, pp-site-step, pp-site-ok
primeng: none (public site only, no PrimeNG)
replaces: the public site's .lm-sec, .lm-split, .panel, .again, .lt-row, .st and .step-in, which used literal sizes, colour transitions and inline svg ticks
---

# Site demo

A module section: the words on one side (eyebrow, headline, lead and a short list) and a sample panel on the other, whose contents step in one after another. Every module page has several. This component is the shell and one list-style row; each demo's own contents come in the next chunks.

## Anatomy

1. **Section** (`pp-site-demo`, with `--cream` for the cream ground and `--flip` to put the text second from 1024px): a container. White by default.
2. **Split** (`pp-site-demo__split`, with `pp-site-wrap`): one column on a phone, two from 1024px.
3. **Text** (`pp-site-demo__text`): eyebrow (`pp-site-eyebrow`), headline (`pp-site-demo__title`, `--font-site-demo`, 30px growing to 48px), lead (`pp-site-demo__lead`) and a list (`pp-site-demo__list`, `pp-site-demo__item`, each with a `pp-site-demo__tick` holding a `check` icon).
4. **Visual** (`pp-site-demo__vis`) holding the **panel** (`pp-site-demo__panel`, a white card with the lifted shadow).
5. **Panel top** (`pp-site-demo__top`): the panel's name (`pp-site-demo__top-title`) a note (`pp-site-demo__top-note`, usually the sample record or "Sample data"; it drops to its own line under 520px).
6. **Body** (`pp-site-demo__body`): the demo's contents. Each part that appears in turn carries `pp-site-step`.
7. **Play again** (`pp-site-demo__again`): a text button that fades in when the demo has finished.
8. **Row** (`pp-site-demo__row`, with `--brand` for a company's own item): a name (`pp-site-demo__row-name`), a line under it (`pp-site-demo__row-note`) and a **status** (`pp-site-status`, with `--success`, `--brand`, `--warning` or `--danger`; neutral by default).
9. **Batsi tag** (optional, in a list item): the agent [Lozenge](lozenge.html) with the sparkles icon and "Batsi", after the words.
10. **Tick** (`pp-site-ok`, with `--in` once shown): the mint circle with a check that scales in. Used inside demo contents.

## States

| State | How |
| --- | --- |
| Waiting | The page has set `data-site-live` on the section and the steps are not in yet: each `pp-site-step` is hidden and 8px low |
| Playing | Each step gets `pp-site-step--in` in its turn: it rises and fades in over 450ms |
| Finished | After the last step, "Play again" gets `pp-site-demo__again--in` and fades in |
| Still | `data-site-still`: every step shows, nothing moves |

## Behaviour

- A demo starts when 35% of its section is in view, once. "Play again" restarts it from the first step.
- The steps and "Play again" are the only things that move: opacity and transform. A page that never sets `data-site-live` shows every step at rest.
- The preview script on the kit page plays the demo. It is not part of the component; the Angular site does the same with a directive.

## Content

- The words are copied from the approved page. The sample here is Leave types: "Leave types set to the BCEA.", the lead, five list items and five rows ("Annual leave", "15 working days a year", "BCEA" and so on).
- A panel's note names the sample record ("John Doe", "Template: Sales", "Employee 4 · last day 31 Dec") or says "Sample data", exactly as the approved page does. Sample people are John Doe (employee) and Jane Smith (HR) only.
- A list has five items at most. A row's line is one short fact.

## Accessibility

- The panel is a `role="group"` named "Sample: leave types" (the demo's name).
- Ticks are decorative (`aria-hidden`). Status words carry the meaning, never colour alone.
- "Play again" is a real button, 44px tall.
- Steps stay in the page's reading order. Hiding a step does not remove it from assistive technology.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the signed-in app. Source: the approved public site's module sections (`lm-sec`) and the Leave types demo.

## Do and don't

- Do give every demo panel a note and a "Play again" (the phone loops on its own and has none).
- Do alternate white and cream sections down a page, and flip the text side with them.
- Don't put real company data or a real employee's name in a demo.
- Don't animate anything but opacity and transform inside a step.
