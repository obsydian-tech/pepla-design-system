---
name: Section message
group: messages
status: ready
classes: pp-section-message
primeng: reference only (built without PrimeNG) — Message (p-message)
replaces: p-message (11 uses), hand-built alert boxes in forms and drawers
---

# Section message

A section message explains something about the part of the page it sits in: a record that needs attention, a step that is blocked, or work Batsi did. It stays on the page until the cause changes.

## Anatomy

1. **Container**: 16px radius (`--radius-large`), a subtle tint, 16px padding, no shadow.
2. **Icon**: Lucide, 20px, top left, in the appearance's icon colour.
3. **Title**: one line that says the situation, `--font-heading-xsmall`.
4. **Body** (optional): one or two sentences with the detail and the reason.
5. **Actions** (optional): at most two, small default button and a link button.
6. **Dismiss** (optional): small subtle icon button, top right, only for messages that are safe to hide.

## Appearances

| Class | Icon | Use | Never |
| --- | --- | --- | --- |
| (default) information | `info` | Context or a next step that is not urgent | For something that blocks work |
| `pp-section-message--success` | `circle-check` | A check passed or a step finished and the page should say so | For something Batsi did (use agent) |
| `pp-section-message--warning` | `triangle-alert` | Something will become a problem: a document expires soon | For a hard block |
| `pp-section-message--danger` | `octagon-alert` | Something is blocked or failed and needs a fix | For a single field (use Inline message) |
| `pp-section-message--agent` | `sparkles` | Batsi did or prepared something on this record | For anything a person did (rule 1). For a proposal that needs approval, use the Agent proposal card |

## States

| State | How |
| --- | --- |
| Shown | In the flow of the page; never floats |
| Dismissed | Only if it has a dismiss button. The message goes and does not come back for that person until the cause changes |
| Working action | The action button goes to its working state (rule 8); the message updates or goes when the action lands |

## Behaviour

- Place it at the top of the section it is about, below the section heading.
- At most one per section. If several things need attention, list them in one message.
- Danger and warning messages are not dismissible while the problem stands.
- On phone the action buttons stretch to share the row.

## Content

- Title states the situation in plain words: "Lerato's contract is waiting on her tax number". No "Warning:" or "Error:" prefix; the icon says that.
- Body states the cause and the fix: "Contract on hold: Lerato's SARS tax number is missing."
- Deadlines in words (rule 5): "expires in 12 days", never a bare date.
- Agent messages start with "Naleko People", say what it did, and repeat that nothing changes until a person approves.

## Accessibility

- Use `role="region"` with `aria-labelledby` pointing at the title for messages present on load.
- A danger message that appears after an action uses `role="alert"`; a success one uses `role="status"`.
- The title is a real heading at the right level for the page (often `h3`).
- Status is icon, title and colour together, never colour alone (rule 4).
- The dismiss button has `aria-label="Dismiss"`; after dismiss, focus moves to the section heading.

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. The app uses no PrimeNG at all: the hard patterns are built on Angular Aria and the Angular CDK (see `docs/verify-design-angular.md`).

PrimeNG v19 runs in unstyled mode; pass-through adds the Naleko People classes. `severity` maps to the appearance; `secondary` is reserved for the agent notice.

```ts
message: {
  root: ({ props }) => ({
    class: ['pp-section-message', {
      'pp-section-message--success': props.severity === 'success',
      'pp-section-message--warning': props.severity === 'warn',
      'pp-section-message--danger': props.severity === 'error',
      'pp-section-message--agent': props.severity === 'secondary',
    }],
  }),
  content: { class: 'pp-section-message__content' },
  text: { class: 'pp-section-message__body' },
  closeButton: { class: 'pp-button pp-button--subtle pp-button--icon pp-button--small pp-section-message__dismiss' },
}
```

Put the title in the message's default slot as `<h3 class="pp-section-message__title">`. Use `variant="simple"` messages only through Inline message.

## In Naleko People today

`p-message` is used in three components: the verification detail, the document detail card and the new employee registration form. They use PrimeNG's own colours, not Naleko People's status tokens.

## Do and don't

- **Do** say what happened and what to do next. **Don't** write "An error occurred".
- **Do** use the agent appearance only for Batsi's own work. **Don't** use it as a friendly green success.
- **Do** keep one message per section. **Don't** stack three messages above a form.
