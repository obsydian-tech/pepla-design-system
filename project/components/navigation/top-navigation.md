---
name: Top navigation
group: navigation
status: ready
classes: pp-top-navigation
primeng: Toolbar (p-toolbar)
replaces: the 5 app shells' top bars, the topbar notification dropdown
---

# Top navigation

The top navigation is the 56px bar across the top of every Pepla app: search on the left, notifications and the person's account on the right. On phone it also holds the menu button that opens the side navigation.

## Anatomy

1. **Bar**: 56px (`--layout-topbar-height`), raised surface, a 1px border below, sticky at the top.
2. **Menu button** (phone): `menu`, opens the side navigation as a drawer.
3. **Mark** (phone): the Pepla mark, links home. On desktop the mark lives in the side navigation.
4. **Search**: a pill field, up to 480px, `search` icon, placeholder that names what it finds, a `/` shortcut hint. On phone it shrinks to an icon button that opens full-screen search.
5. **Notifications**: `bell` icon button with a count badge; opens the notification list in a Popup.
6. **Account**: the person's initials in a 32px circle; opens the avatar Dropdown menu. The menu names the role the person is acting as and lets them switch; the bar never shows a role pill.
7. **Ask Pepla** (optional): a default button with the `sparkles` icon, before Notifications, that opens the Agent panel.

Nothing else goes in the bar. Page actions such as "Add candidate" belong in the page header, so a screen has one primary button, not one in the bar and one on the page.

## Appearances

| Class | Use |
| --- | --- |
| (default) | Desktop and tablet |
| `pp-top-navigation--compact` | The phone layout, applied by the phone breakpoint on its own; the class forces it in narrow containers |
| `pp-top-navigation--inline` | Rendered in place for docs; not sticky |

## States

| State | How |
| --- | --- |
| Search focused | Violet 2px border on the pill |
| Unread notifications | Violet badge with the count, ringed in the bar colour. Hidden at 0; "9+" above 9 |
| Notifications open | Bell button pressed (`aria-pressed`), Popup below aligned to its end |
| Scrolled | The bar stays; its border separates it from content |

## Behaviour

- `/` focuses search from anywhere outside a field. Escape clears and leaves search.
- The notification Popup lists the newest 10, marks them read when it closes, and links to the full list. Agent items carry `sparkles` in mint; deadline items say the deadline in words.
- On phone, every icon button is 44px; search opens a full-screen search view.
- The bar never holds page actions; those belong in the Page header.

## Content

- Search placeholder names what it finds: "Search people and documents". Not "Search..."
- The bell's label includes the count: "Notifications, 4 unread".
- Notification lines lead with who or what: "Lerato Mokoena signed her contract", "Pepla drafted 3 offer letters".

## Accessibility

- A `<header>` landmark; search is a labelled `input type="search"`.
- Icon buttons have `aria-label`; the count badge is `aria-hidden` because the label carries it.
- The notification and account buttons have `aria-haspopup` and `aria-expanded`. Popups close on Escape and return focus to their button.
- The menu button has `aria-expanded` and `aria-controls` pointing at the side navigation.
- New notifications are announced politely, at most once a minute, through a hidden `role="status"` region.

## PrimeNG mapping

```ts
toolbar: {
  root: { class: 'pp-top-navigation', role: 'banner' },
  start: { style: 'display:contents' },
  center: { style: 'display:contents' },
  end: { class: 'pp-top-navigation__actions' },
}
```

The notification list is a `p-popover` (see Popup, `pp-popup--flush pp-popup--wide`); the account menu is a `p-menu` popup (see Dropdown menu).

## In Pepla today

The shared `topbar` (HR dashboard) has the notification dropdown, built as its own `notification-dropdown` component; the TalentFlow and IT provisioning shells build their own headers. This one bar replaces them.

## Do and don't

- **Do** keep the bar to search, notifications and account. **Don't** add page actions or tabs to it.
- **Do** put the count in the bell's label. **Don't** use a red dot with no number.
- **Do** show the mark here on phone only. **Don't** show two marks on desktop.
