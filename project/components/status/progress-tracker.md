---
name: Progress tracker
group: status
status: ready
classes: pp-progress-tracker, pp-progress-tracker--vertical
primeng: Stepper (p-stepper, read-only steps), Steps (p-steps, deprecated)
replaces: p-steps with default theme, the onboarding stepper's numbered circles, the candidate stage bar
---

# Progress tracker

A progress tracker shows the steps of a process and where someone is in it: a new hire's onboarding, a candidate's hiring stages, a long registration form. Each step says its state in an icon and words.

## Anatomy

1. **List**: an ordered list, one equal column per step on desktop.
2. **Marker**: a 24px circle. Upcoming shows the step number; current is violet-tinted with a violet ring; done is violet with a `check`; done by Pepla is mint with `sparkles`; blocked has `octagon-alert`.
3. **Line**: 2px between markers; violet after a done step, `--color-border` after the rest.
4. **Label**: the step name, `--font-label`; bold when current.
5. **Meta** (optional): the deadline or result in words: "Due in 2 days", "Done 28 Oct", "Checked by Pepla, 3 Nov".
6. **State text**: hidden words read before the label: "Done:", "Current step:", "Not started:".

Below 768px the tracker stacks vertically: markers on the left, the line runs down, text beside each marker.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-progress-tracker` | 3 to 7 steps across a page or card | For more than 7 steps; group them |
| `pp-progress-tracker--vertical` | Vertical at every width: side panels, narrow cards, the new-hire portal | In a wide page header |

## States

| Step class | Marker | Meaning |
| --- | --- | --- |
| (none) | Number, bold border | Not started |
| `pp-progress-tracker__step--current` + `aria-current="step"` | Number, violet ring and tint, bold label | Where they are now |
| `pp-progress-tracker__step--done` | Violet with `check` | A person finished it |
| `pp-progress-tracker__step--agent` | Mint with `sparkles`, meta in agent text | Pepla's agent did it, and a person approved where needed (rule 1) |
| `pp-progress-tracker__step--blocked` | Danger ring with `octagon-alert`, meta in danger text | Stuck until someone acts; meta says what to do |

Done uses violet, not green, so success green stays free for results like "Verified" and a page of done steps does not shout.

## Behaviour

- Steps are in order and the tracker only shows state; it does not navigate by default.
- In a multi-page form, done steps may be links back (`a.pp-progress-tracker__link` around the marker and body). Upcoming steps are never links.
- Meta lines update with time: "Due in 2 days", "Due today", "Overdue by 1 day" (rule 5).
- When a step is blocked, every later step stays upcoming, and the meta line says the one thing to do next.
- Labels wrap to two lines on desktop; keep them short so the columns stay even.

## Content

- Step names are nouns or short phrases: "Offer signed", "Documents checked", "Laptop and access", "First day".
- Meta says when or what: "Done 28 Oct", "Due in 2 days", "Checked by Pepla, 3 Nov", "ID does not match. Ask Sipho for a new copy."
- Hidden state words: "Done:", "Done by Pepla:", "Current step:", "Blocked:", "Not started:".

## Accessibility

- An `<ol>` with an `aria-label` that names the process and the person: "Lerato's onboarding".
- The current or blocked step has `aria-current="step"`.
- Each label starts with hidden state words (`pp-progress-tracker__state`), so the state is read, not just seen. Markers are `aria-hidden`.
- Done, current and blocked differ by icon, ring and weight, not colour alone.

## PrimeNG mapping

```ts
stepper: { root: { class: 'pp-progress-tracker' } },
steplist: { root: { style: 'display:contents' } },
step: {
  root: ({ context }) => ({
    class: ['pp-progress-tracker__step', {
      'pp-progress-tracker__step--done': context.completed,
      'pp-progress-tracker__step--current': context.active,
    }],
    'aria-current': context.active ? 'step' : undefined,
  }),
  number: { class: 'pp-progress-tracker__marker' },
  title: { class: 'pp-progress-tracker__label' },
  separator: { style: 'display:none' },
},
```

For a read-only tracker, plain markup is simpler than `p-stepper`; use the HTML from the examples. Agent and blocked states are set from the step's data, not from PrimeNG.

## In Pepla today

The candidate workspace uses PrimeNG's stepper for the hiring stages, and the employee onboarding stepper is a custom component. Both show where someone is in a process; both move to this tracker.

## Do and don't

- **Do** say each step's state in words. **Don't** rely on a filled circle.
- **Do** use the agent step only for what Pepla did. **Don't** make every done step mint.
- **Do** say what unblocks a blocked step. **Don't** show a red circle with no next action.
