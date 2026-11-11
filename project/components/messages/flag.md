---
name: Flag
group: messages
status: ready
classes: pp-flag, pp-flag-group
primeng: Toast (p-toast)
replaces: p-toast and its four severities, alert() calls in the onboarding wizard
---

# Flag

A flag tells a person the result of something they just did, or that something finished in the background. It floats over the page, bottom left, and never blocks work.

## Anatomy

1. **Group**: fixed, bottom left on desktop (24px from the edges), full width at the bottom on phone. Newest flag at the bottom, at most 3 shown.
2. **Container**: overlay surface, `--radius-large`, overlay shadow, 400px wide at most.
3. **Icon**: Lucide, 20px, in the appearance's icon colour.
4. **Title**: what happened, `--font-heading-xsmall`.
5. **Body** (optional): one sentence on what happens next.
6. **Actions** (optional): one or two link buttons, usually "Undo" or "Try again".
7. **Dismiss**: small subtle icon button.
8. **Timer** (success only): a hairline that empties while the flag counts down.

## Appearances

| Class | Icon | Role | Use |
| --- | --- | --- | --- |
| `pp-flag--success` | `circle-check` | `status` | The action landed: "Contract sent to Lerato Mokoena". The only flag that dismisses itself |
| (default) information | `info` | `status` | A neutral result, often with Undo: "Thandeka removed from the interview panel" |
| `pp-flag--warning` | `triangle-alert` | `status` | It worked, with a catch the person should check |
| `pp-flag--error` | `octagon-alert` | `alert` | It failed. Says why and offers "Try again" |
| `pp-flag--agent` | `sparkles` | `status` | Pepla finished background work: "Pepla drafted 4 leave requests" (rule 1) |

## States

| State | How |
| --- | --- |
| Entering | Slides up 8px and fades in over 200ms. Under reduced motion it only fades |
| Counting down | Success only: 8s, shown by the timer line. Hover or keyboard focus pauses it |
| Waiting | Every other flag stays until dismissed or until its action runs |
| Leaving | Fades out over 100ms; the flags above move down |

## Behaviour

- Only success flags auto-dismiss, after 8s. Warning, error, information and agent flags stay until the person dismisses them, so nobody misses a failure.
- Undo runs at once and replaces the flag with a short "Undone" information flag. The original action waits on the server until the flag goes, so undo never needs a second request.
- Show at most 3. A fourth pushes the oldest out (if it is success) or collapses into "2 more" (if not).
- Flags sit above dialogs and drawers (`--layer-flag`), so a save inside a drawer can confirm.
- On phone the group spans the width with 16px gutters and sits above the safe area.

## Content

- Title in past tense with the person's name: "Contract sent to Lerato Mokoena". Not "Success!".
- Errors say why and that nothing was lost: "The connection dropped. Your draft is saved."
- Agent flags start with "Pepla" and say what is waiting for a person.
- Actions are one or two words: "Undo", "Try again", "Review requests".

## Accessibility

- The group is a `<ul>`; each flag is an `<li>` with `role="status"` (polite), or `role="alert"` for errors.
- Never move focus to a flag. The live region announces it; the person can reach it with Tab from the end of the page or with F6.
- The countdown pauses on hover and focus (WCAG 2.2.1), and an error never times out.
- The dismiss button has `aria-label="Dismiss"`. After dismiss, focus returns to where it was before the person entered the flag.

## PrimeNG mapping

One `<p-toast position="bottom-left">` in the app shell. Severity maps to the appearance; `secondary` is reserved for agent flags. Set `life` only for success.

```ts
toast: {
  root: { class: 'pp-flag-group' },
  message: ({ props }) => ({
    class: ['pp-flag', {
      'pp-flag--success': props.message?.severity === 'success',
      'pp-flag--warning': props.message?.severity === 'warn',
      'pp-flag--error': props.message?.severity === 'error',
      'pp-flag--agent': props.message?.severity === 'secondary',
    }],
    role: props.message?.severity === 'error' ? 'alert' : 'status',
  }),
  messageContent: { class: 'pp-flag__content' },
  summary: { class: 'pp-flag__title' },
  detail: { class: 'pp-flag__body' },
  closeButton: { class: 'pp-button pp-button--subtle pp-button--icon pp-button--small pp-flag__dismiss' },
}
```

```ts
this.messages.add({ severity: 'success', summary: 'Contract sent to Lerato Mokoena', life: 8000 });
this.messages.add({ severity: 'error', summary: "Couldn't send the contract", sticky: true });
```

Use a `#message` template to add the Undo action.

## In Pepla today

`p-toast` appears in two places with two positions: top right in the TalentFlow admin shell and bottom right on the admin users page. Messages close after 3 to 5 seconds (the `life` value differs per page), errors included. All of these become one bottom-left flag group, and errors stay until closed.

## Do and don't

- **Do** auto-dismiss success only. **Don't** let an error disappear on its own.
- **Do** offer Undo for anything reversible. **Don't** open a confirm dialog for something Undo could fix.
- **Do** name the person and the thing. **Don't** write "Operation completed successfully".
