---
name: Provisioning bundle
group: records
status: ready
classes: pp-bundle__items, pp-bundle__item, __body, __name, __detail, __owner, __unowned, __status (with pp-card and pp-progress-bar)
primeng: none (plain Angular template); Card pass-through if p-card is used
replaces: tf-provisioning-bundle-card and the bundle block of the provisioning tab
---

# Provisioning bundle

A card for the IT setup a new starter needs: laptop, email, apps and access. Each item shows its own status, its owner and when it is due, so everyone can see what will not be ready on day 1.

## Anatomy

1. **Card header**: `laptop` icon tile, "IT setup for Kagiso Molefe", the bundle name and start date, and in `pp-card__aside` the most urgent deadline.
2. **Progress bar**: "3 of 5 items" ready, coloured like the most urgent item.
3. **Items** (`__items`): one row each:
   - icon tile (`laptop`, `mail`, `app-window`, `key-round`, `smartphone`, `lock-keyhole`),
   - name and detail,
   - owner (`pp-person` with a small avatar; Pepla's agent avatar if Pepla does it; "No owner yet" if nobody does),
   - status lozenge and, until ready, an inline deadline.
4. **Footer**: the one action that unblocks the bundle, then "View request".

## States

| Item | Lozenge | Deadline |
| --- | --- | --- |
| Waiting for review | neutral, `circle-dashed` | inline, neutral |
| Not started | neutral, `circle-dashed` | inline, by urgency |
| In progress | information, `loader` | inline, by urgency |
| Ready | success, `circle-check`, "Ready 10 Nov" | none |
| Done by Pepla | agent, `sparkles`, "Created by Pepla 9 Nov" (rule 1) | none |
| Blocked | danger, `octagon-alert`, "Blocked" and why | inline |
| No owner | owner column shows `user-x` "No owner yet" in danger text | inline |

## Behaviour

- Items sort: overdue, then blocked or unowned, then by deadline, then ready.
- The header aside shows the worst deadline: "1 item overdue", "Due in 2 days" or success "All ready".
- The hiring manager reviews the bundle before IT starts; until then every item says "Waiting for review" and the footer's primary action is "Review bundle".
- Pepla may create accounts it is allowed to create (email). It never orders hardware or grants payroll access on its own (rule 2).
- The list is a size container: below 560px, owner and status move under the name.

## Content

- Item names are things: "Laptop", "Email and Microsoft 365", "Building access card".
- Detail says which one: model, licence or access level.
- Never "SLA", "breached" or "queue" names in this card. Say "Overdue by 1 day" and name the person.

## Accessibility

- The items list has `aria-label="Items in this bundle"`.
- Icon tiles are `aria-hidden`; the item name carries the meaning.
- Status and deadline are icon and words (rules 4 and 5).

## PrimeNG mapping

No PrimeNG component of its own. The card can be `p-card` with the Card pass-through; the progress bar can be `p-progressBar` with the Progress bar pass-through. Buttons are `p-button` with the Button pass-through.

## In Pepla today

- `provisioning-bundle-card.component.ts` (`tf-provisioning-bundle-card`, used on the hiring manager's provisioning page) shows a progress bar, per-item status dots with labels, and SLA labels such as "SLA BREACHED", "AT RISK", "ON TRACK", "REVIEW OVERDUE" and "REVIEW DUE TODAY". Its colours come from `--naleko-*` variables with hex fallbacks.
- `provisioning-tab.component.html` (`tf-provisioning-tab`, in the candidate workspace) shows "{n} REQUIREMENTS"; each item has a label, a type, the queue, the specialist's initials and name or "Unassigned", and an upper-case status: COMPLETE, BREACHED, PENDING or IN PROGRESS. A "Readiness strip" counts COMPLETE, BREACHED and a READY percentage.
- Neither marks work done by the agent.

## Do and don't

- **Do** show who owns each item. **Don't** show a queue name instead of a person.
- **Do** say "Overdue by 1 day". **Don't** say "BREACHED".
- **Do** mark accounts Pepla created with the agent lozenge. **Don't** show them as plain "Ready".
