---
name: Person header
group: records
status: ready
classes: pp-person-header, pp-person-header__layout, __main, __name-row, __name, __role, __facts, __fact, __status, __actions
primeng: none (plain Angular template of pp-avatar, pp-lozenge and pp-button)
replaces: the employee-detail header, the candidate workspace header
---

# Person header

The top of an employee or candidate page. It says who this is, what they do, where they are in the process, and the two or three things you can do now.

## Anatomy

1. **Avatar**: `pp-avatar--xlarge` (64px) on desktop, 48px on phone. Initials when there is no photo.
2. **Name**: the page's `<h1>`, `pp-person-header__name`.
3. **Status** (`__status`): one or two lozenges: where they are ("Onboarding, day 3 of 10", "Interview"), and at most one deadline or agent lozenge.
4. **Role line** (`__role`): role · department. For a candidate: "Candidate for Sales rep · Sales".
5. **Facts** (`__facts`): up to three, each an icon and words: start date, place, manager. No personal data here (rule 6).
6. **Actions** (`__actions`): at most one primary, one default and a "More actions" menu.

## States

| State | How |
| --- | --- |
| Employee | Status from the employee's stage, start date as "Starts 17 Nov 2026" or "Started 1 Dec 2025" |
| Candidate | Stage lozenge and, when something is due, a deadline chip |
| Agent at work | An agent lozenge: "Pepla is chasing 2 documents" (rule 1) |
| Loading | Skeleton circle, two skeleton lines, no actions |
| No permission for an action | Leave the action out; do not show it disabled |

## Behaviour

- The root is a size container. Below 600px wide the layout stacks: avatar beside the name, facts in a column, actions full width at the bottom, 48px tall (rule 9).
- The header does not stick when the page scrolls; tabs under it may.
- Actions follow the stage: "Move to offer" for a candidate in interview, "Plan first week" for a new hire.

## Content

- Full name as the person gives it. No titles ("Ms", "Mr").
- Dates as "17 Nov 2026"; the start date reads "Starts" before the day and "Started" after it.
- Status words come from the lozenge vocabulary. Never an upper-case code such as "PRE_ONBOARDING".

## Accessibility

- The name is the page's only `<h1>`. (The examples use `role="heading"` only because they sit inside this documentation page.)
- The avatar is `aria-hidden`; the name already says who it is.
- Facts are a `<ul>`. Where the icon carries meaning, add hidden words: "Start date: Starts 17 Nov 2026".
- The icon-only "More actions" button names the person: "More actions for Thandeka Dlamini".

## PrimeNG mapping

No PrimeNG component. A standalone Angular component composes `pp-avatar`, `pp-lozenge`, `pp-deadline` and `pp-button`. Action buttons may be `p-button` with the Button pass-through; the "More actions" menu is `p-menu` with the Dropdown menu pass-through (to be checked against the menu pass-through keys).

## In Pepla today

- `employee-detail.component.html` has an "Employee Header": an initials circle, name, email, a `p-tag` showing `employee.stage.replace('_', ' ')`, then department, employee ID, start date (`date:'mediumDate'`), phone and HR partner, each with a PrimeIcons icon. The risk band is shown with emoji circles (green, yellow, red) and the words "LOW", "MEDIUM" or "HIGH" Risk.
- `candidate-workspace-page.component.html` has a "persistent header": back button, initials avatar, name, subtitle, health and sentiment pills, source, "Edit Details" and "Reject Candidate" buttons for TA, and an SLA bar.

Both move to this header. The emoji risk circles go; risk becomes a lozenge with an icon and a word.

## Do and don't

- **Do** keep one primary action. **Don't** line up five buttons.
- **Do** show stage and deadline as words. **Don't** show a bar or a coloured dot alone.
- **Do** keep ID, salary and bank details out of the header. **Don't** show the phone number or ID number here.
