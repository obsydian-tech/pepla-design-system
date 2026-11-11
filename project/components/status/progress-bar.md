---
name: Progress bar
group: status
status: ready
classes: pp-progress-bar
primeng: ProgressBar (p-progressbar)
replaces: p-progressbar with default theme, percentage-only bars, coloured bars with no words
---

# Progress bar

A progress bar shows how far along something is when the total is known: documents received, onboarding steps done, files uploaded, leave days used. The value is always said in words beside it.

## Anatomy

1. **Label**: what is measured, `--font-label`.
2. **Value**: the count in words, `--font-body-small`: "3 of 5 received". Never a bare percentage.
3. **Track**: 8px pill in `--color-background-neutral`.
4. **Fill**: the done part, violet by default.
5. **Help line** (optional): an icon and words for the state: "Overdue by 1 day", "Done 3 Nov".

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-progress-bar` | Progress that is going fine | For a status that needs action |
| `pp-progress-bar--success` | Complete. Pair with `circle-check` and "Done 3 Nov". | Before it is 100% |
| `pp-progress-bar--warning` | Close to a limit or a deadline: leave nearly used, due soon. Pair with an icon and words. | For errors |
| `pp-progress-bar--danger` | Behind: overdue documents, a failed step. Pair with `clock-alert` or `octagon-alert` and words. | As the only sign of a problem |
| `pp-progress-bar--agent` | Work Pepla's agent is doing: "Pepla is checking the documents" | For work a person does (rule 1) |

## Sizes

| Class | Height | Use |
| --- | --- | --- |
| (default) | 8px | Cards, record headers, the new-hire portal |
| `pp-progress-bar__track--small` | 4px | Inside table rows and file upload rows |

## States

| State | How |
| --- | --- |
| In progress | Fill grows over 300ms when the value changes; no animation under reduced motion |
| Complete | Success fill, `circle-check` and the date in the help line |
| Behind | Danger or warning fill, plus the icon and the words (rule 4) |
| Unknown total | Not a progress bar. Use Spinner, or Skeleton for loading content. |

## Behaviour

- The value text and the bar change together. Count real things ("3 of 5 documents"), not time.
- A bar that reaches 100% turns success only when the thing is truly done (approved, not just uploaded).
- Never move a bar backwards without saying why ("A document was declined: 2 of 5").

## Content

- Label names the thing and whose it is: "Lerato's documents", "Annual leave used".
- Value in words with a count: "3 of 5 received", "13 of 15 days", "All 8 steps done".
- Help line says the deadline or result in words: "Overdue by 1 day", "2 days left until 31 Dec", "Done 3 Nov".

## Accessibility

- Use the native `<progress value max>`; it has the progressbar role. Name it with `aria-labelledby` (the label) and describe it with `aria-describedby` (the value in words).
- A div-based bar (PrimeNG) needs `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` and `aria-valuetext="3 of 5 received"`.
- Colour is never the only signal: warning, danger and success all carry an icon and words.

## PrimeNG mapping

```ts
progressbar: {
  root: ({ instance }) => ({
    class: 'pp-progress-bar__track',
    'aria-valuetext': instance.valueText,   // set from the component: "3 of 5 received"
  }),
  value: { class: 'pp-progress-bar__fill' },
  label: { style: 'display:none' },
},
```

Wrap `p-progressbar` in a `div.pp-progress-bar` with the header and help line, and hide PrimeNG's percentage label. `mode="indeterminate"` is not used.

## In Pepla today

Progress bars are rare today: the employee detail page restyles `p-progressbar`. Onboarding progress elsewhere is shown as text or steps.

## Do and don't

- **Do** say the count in words. **Don't** show "60%" alone.
- **Do** add an icon and words when it is behind. **Don't** turn the bar red and say nothing.
- **Do** use the agent fill while Pepla works. **Don't** use mint for a person's progress.
