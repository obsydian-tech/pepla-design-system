---
name: Notification item
group: records
status: ready
classes: pp-notifications, pp-notification, pp-notification--unread, __icon, __icon--warning, --danger, --success, __body, __text, __meta, __action, __dot, pp-notifications-panel, __header, __title, __footer
primeng: reference only (built without PrimeNG) — Popover (p-popover) for the panel, to be checked
replaces: app-notification-dropdown items
---

# Notification item

One notification in the bell list: an icon or avatar, one sentence, the time in words, whether it is unread, and one action. Notifications from Pepla show the agent mark.

## Anatomy

1. **Leading mark**: the person's avatar, the agent avatar (`sparkles` on mint) for Pepla, or an icon in a circle (`__icon`) for system events.
2. **Text** (`__text`): one sentence; the person's name in bold.
3. **Meta** (`__meta`): time in words ("20 min ago", "Yesterday") with the exact time in `title`, then the action link (`__action`).
4. **Unread dot** (`__dot`): violet dot at the end of unread rows.

The **panel** (`pp-notifications-panel`) holds the header ("Notifications", "Mark all as read"), the list and a footer link to the full list.

## States

| State | How |
| --- | --- |
| Unread | `--unread`: brand-subtlest wash, full-strength text, violet dot, and hidden "Unread." before the text |
| Read | No wash, subtle text, no dot |
| From Pepla | Agent avatar and "Pepla" as the actor (rule 1) |
| Urgent | `__icon--danger` with `clock-alert` and the deadline in words in the text |
| Empty | "You are all caught up." |

## Behaviour

- Opening the action marks the notification read. "Mark all as read" marks every one in the list.
- Newest first; group older ones under "Earlier" when the list is long.
- The panel opens from the bell in the top navigation and closes on Escape or a click outside, returning focus to the bell.
- Time updates when the panel opens: "20 min ago", "2 hours ago", "Yesterday", then "3 Nov".

## Content

- One sentence, actor first: "**Pepla** checked Kagiso Molefe's ID. It passed."
- Deadlines in words: "is overdue by 1 day".
- The action is a verb: "Approve result", "Add scorecard", "Open offer". Never "Click here" or "View".
- No personal data in the text: no ID numbers, no salaries.

## Accessibility

- The list is a `<ul>` in a region labelled "Notifications".
- Unread is not shown by colour alone: bold text, the dot and hidden "Unread." words.
- The action is a real link inside the row; the row itself is not a button.
- Avatars, icons and the dot are `aria-hidden`.

## PrimeNG mapping

> **Reference only.** In the Angular app this component is built in `src/app/ds` without PrimeNG. The mapping below describes the behaviour to match; it is not a dependency. The app uses no PrimeNG at all: the hard patterns are built on Angular Aria and the Angular CDK (see `docs/verify-design-angular.md`).

The panel can be `p-popover` with a pass-through that adds `pp-notifications-panel` to its content (keys to be checked). The items are a plain `@for`. The bell's count uses the Badge pass-through.

## In Pepla today

- `notification-dropdown.component.html` (`app-notification-dropdown`, used in `topbar.component.html`) has a "Notifications" header with a count, items that are `div`s with `role="button"`, `tabindex="0"` and a click handler, and a "View All Notifications" link.
- For HR, each item shows the employee's name, the document type and a time ago; for employees, a status text and an action text. The empty state says "No pending reviews".
- The template has no unread state and no mark for agent actions.
- There is also a separate notifications page under `features/hr-dashboard/components/notifications`.

## Do and don't

- **Do** mark unread with weight, a dot and hidden words. **Don't** rely on a coloured background alone.
- **Do** show the agent avatar for Pepla's notifications. **Don't** use mint for anything else in the list.
- **Do** give one action. **Don't** make the whole row a button and put a link inside it.
