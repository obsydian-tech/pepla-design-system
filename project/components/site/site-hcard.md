---
name: Site hero card
group: site
status: ready
classes: pp-site-hcard, pp-site-hcard__head, pp-site-hcard__avatar, pp-site-hcard__who, pp-site-hcard__name, pp-site-hcard__sub, pp-site-hcard__note, pp-site-hcard__note--good, pp-site-hcard__note--late, pp-site-hcard__meter, pp-site-hcard__fill, pp-site-hcard__count, pp-site-hcard__steps, pp-site-hcard__step, pp-site-hcard__step--done, pp-site-hcard__step--now, pp-site-hcard__mark, pp-site-hcard__owner, pp-site-hcard__pipe, pp-site-hcard__stage, pp-site-hcard__stage--hired, pp-site-hcard__stage--out, pp-site-hcard__stage--bump, pp-site-hcard__label, pp-site-hcard__bar, pp-site-hcard__grow, pp-site-hcard__num, pp-site-hcard__box, pp-site-hcard__small
primeng: none (public site only, no PrimeNG)
replaces: the Learn more pages' .hcard, .hc-head, .avatar, .stage, .hc-note, .meter, .hc-steps, .pipe and .lv-card-row, which used literal colours and sizes and animated colour, width and box-shadow
---

# Site hero card

The sample card beside the headline at the top of each Learn more page. It plays a short loop of the module at work: a hiring pipeline whose counts move, John Doe's onboarding steps, a register where the days pass, a leave balance that drops, an audit log that fills, or modules that switch on. It sits in the card column of the page top ([Site form page](site-form-page.html) grid inside a [Site hero](site-hero.html)).

## Anatomy

1. **Card** (`pp-site-hcard`): white at 92% over the page's lights, blurred behind, a large radius and the site card shadow. A group with an `aria-label` that names the sample ("Sample hiring pipeline").
2. **Head** (`__head`): an **avatar** (`__avatar`, a Lucide icon or initials in a violet circle), the **name** and a **line under it** (`__who`, `__name`, `__sub`), and a [Site status](site-demo.html) pushed to the end.
3. **Body**, one of:
   - **Pipeline** (`__pipe`): a **stage** row each (`__stage`): the **label** (`__label`), a **bar** (`__bar`) whose **fill** (`__grow`) is scaled to the count with `--_p` (count ÷ 4), and the **number** (`__num`). `--hired` fills mint, `--out` grey; `--bump` turns the number violet for a moment when it changes.
   - **Meter and steps**: a **meter** (`__meter`, `__fill` scaled with `--_p`) with a **count** row under it (`__count`), then **steps** (`__steps`, `__step`) with a round **mark** (`__mark`, a check icon), the step and its **owner** (`__owner`). A step Batsi does carries a Batsi lozenge.
   - **Register**: [Site ledger](site-ledger.html) rows with `pp-site-ledger--tiles`.
   - **Balance**: a **box** (`__box`) holding a [Site leave balances](site-balance.html) line and a **small** line (`__small`).
   - **Audit log**: [Site audit log](site-audit.html) rows in `pp-site-audit__list--hero`, which keeps the room for four rows.
   - **Module switches**: [Site modules](site-modules.html) rows.
4. **Note** (`__note`): a violet wash with a "Sample data" status and one line saying what just happened.

## States

| State | How |
| --- | --- |
| Pipeline count changed | `pp-site-hcard__stage--bump` for 800ms; the bar scales to the new count |
| Step done | `pp-site-hcard__step--done`: the mark fills mint and shows its check |
| Current step | `pp-site-hcard__step--now`: a violet wash, a violet edge and a lift; the mark gets a violet ring |
| Note, good | `pp-site-hcard__note--good`: mint wash |
| Note, overdue | `pp-site-hcard__note--late`: coral wash |
| Still | `data-site-still`: nothing fades or grows |

## Behaviour

- Each card loops on its own, like the approved pages: Recruitment every 13 seconds, Onboarding every 12, Compliance every 12, Leave every 11, Security every 9, Platform every 9. The loop lives in a preview-only script on the kit page and in the Angular site's own code; the card has no script of its own.
- Every change is opacity or transform: washes and fills are layers that fade, bars and the meter scale from the left.

## Content

- Words copied from the approved Learn more pages. Sample people are John Doe and Jane Smith; everyone else is "Candidate 4" or "Employee 2".
- The note always starts with the "Sample data" status.

## Accessibility

- The card is a group named by its `aria-label`. The note is a polite live region, so the line under it is read when it changes.
- Bars, the meter and marks are decorative (`aria-hidden`); the numbers and step names carry the meaning.
- Module switches are real switches that cannot be changed on the sample (`tabindex="-1"`, the included one disabled).

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Each card is a small view of the module in the app: the hiring board, the onboarding checklist, the certificate register, a leave balance, the audit log and Settings, Modules.

## Do and don't

- Do keep one body per card.
- Do start each loop from the approved page's first state.
- Don't put a primary button on a hero card; the page's own buttons sit beside it.
