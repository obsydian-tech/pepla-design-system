---
name: Site hidden personal data
group: site
status: ready
classes: pp-site-hidden, pp-site-hidden--card
primeng: none (public site only, no PrimeNG)
replaces: the public site's .mask, .mrow, .mnote and the Show button on the Security page and the landing page's Trust section, which changed the value's colour by transition
---

# Site hidden personal data

ID number, bank account and salary, hidden. Show reveals the ID number to Jane Smith, the view is logged, and the value hides again by itself.

## Anatomy

1. **Block** (`pp-site-hidden`): the rows, a note and (on the Security page) a log line. `pp-site-hidden--card` makes it a card with a title (`__title`, `lock` icon, "Personal data, hidden") for the landing page.
2. **Row** (`pp-site-hidden__row`): the label (`__label`) and the value (`__value`). The ID number row ends with a small Show button.
3. **Value** (`pp-site-hidden__value`): copies stacked in one place (`__copy`): the hidden one and, for the ID number, the shown one (`__copy--shown`, in violet). `pp-site-hidden__value--shown` crossfades them.
4. **Note** (`pp-site-hidden__note`): "Each Show is logged. Values hide again after 2 minutes.", then "Shown to Jane Smith. Logged at 09:45.", then "Hidden again. Each Show is logged. Values hide again after 2 minutes."
5. **Log line** (`pp-site-hidden__log`): "Logged: Jane Smith viewed John Doe’s ID number, 09:45".

## States

| State | How |
| --- | --- |
| Hidden | The hidden copies show, the button says Show |
| Shown | `--shown` on the ID value: the real number fades in, the button says Hide, the note says who it was shown to, the log line steps in |
| Hidden again | The hidden copy fades back, the note starts "Hidden again." |
| Still | Hidden again |

## Behaviour

- Security page: Show is pressed at 1.6s, the number shows 0.4s later and hides again 2.8s after that.
- Landing page: Show is pressed 4s after Batsi's reminder arrives, and the number hides again after 2.6s. The view is added to the [audit log](site-audit.html).
- A click on Show or Hide does the same at once.
- The value crossfades over 0.3s; nothing changes colour by transition.

## Content

- Copied from the approved pages: "ID number" "•••••• ••• 0861" (shown: "900101 500 0861", a sample number), "Bank account" "•••• 4417", "Salary" "R •• •••", the notes and the log line above.
- The approved pages say "masked". The kit says "hidden" (Iggie's word rule): "Personal data, hidden".

## Accessibility

- Only the copy on show is read; the other carries `aria-hidden`. The note is a polite live region.
- Show and Hide is one real button whose words change.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The Masked field on an employee record: Show is logged, and the value hides again.

## Do and don't

- Do log every Show with a name and a time.
- Don't show a real ID number. The sample number is made up and never 13 digits run together.
