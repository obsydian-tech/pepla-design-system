---
name: Site choices
group: site
status: ready
classes: pp-site-chips, pp-site-chip, pp-site-slots, pp-site-slot
primeng: none (public site only, no PrimeNG)
replaces: the public site's .chips and .slots, which faded colours with a transition the site check does not allow
---

# Site choices

Two pickers for the public forms: chips, where a visitor ticks the modules they care about, and slots, where they pick a day and a time for the call.

## Anatomy

1. **Chip group** (`pp-site-chips`, `role="group"`, named by its label): wrapping rounded chips.
2. **Chip** (`pp-site-chip`, a `button` with `aria-pressed`): any number can be pressed.
3. **Slot picker** (`pp-site-slots`, named by its label): a row of days (`pp-site-slots__row`, `role="group"`, named "Day" by a visually hidden word), a row of times (named "Time" the same way) and a note (`pp-site-slots__note`).
4. **Slot** (`pp-site-slot`, a `button` with `aria-pressed`): one day or one time. Exactly one day and one time are pressed.

## States

| State | How |
| --- | --- |
| Rest | White with the input border |
| Pressed chip | Violet text, a pale violet fill and a violet border, label semibold |
| Pressed slot | Dark fill and white label, semibold |
| Focus | The Naleko focus ring |

## Behaviour

- A chip toggles on click. A slot selects on click and clears the other in its row.
- The pressed look fades in by opacity on a layer behind the label (380ms of `--motion-site-duration-header`). The label's own colour changes at once.
- The default slot is the second day and the second time.
- Days are the next five working days from today (no weekends), shown as "Mon 16 Nov". Times are 09:00, 10:00, 11:00, 14:00, 15:00 South African time.

## Content

- The note under the slots: "South African time (SAST). 30 minutes."
- Chip names are the module names: "Onboarding and Offboarding", "Recruitment", "Leave Management", "Compliance Management", and either "Not sure yet" (Get started) or "Ask Batsi" and "API and MCP" (Book a demo).

## Accessibility

- Every chip and slot is a real button, 44px tall, with its state in `aria-pressed`, not in colour alone: pressed items are also semibold.
- Pressed chip text on its fill is at least 5:1; white on the dark slot fill is 15:1.
- The groups are named so a screen reader says "Day, group".

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the signed-in app. Source: the approved public site's form pickers.

## Do and don't

- Do keep the chip names identical to the menu's module names.
- Do keep exactly one pressed slot in each row.
- Don't use chips for a single choice; use a select or radio buttons.
- Don't offer weekend days.
