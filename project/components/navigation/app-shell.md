---
name: App shell
group: navigation
status: ready
classes: pp-app-shell
primeng: none (plain Angular layout component; the phone drawer is the Side navigation's)
replaces: the separate shells (shared sidebar and topbar, TalentFlow shell, TalentFlow admin shell, IT provisioning shell)
---

# App shell

The app shell is the frame of every Pepla page. It places the side navigation, the top navigation, a banner slot, the main content and the flag group, so each module only fills the main area. It brings no new look of its own: every part is an existing component.

## Anatomy

1. **Banner slot** (optional): one `pp-banner`, full width above everything, for problems that affect the whole account ("The payroll connection stopped at 06:00").
2. **Side navigation**: `pp-side-navigation`, 256px, or 64px collapsed. On phone it becomes a drawer from the left.
3. **Top navigation**: `pp-top-navigation`, 56px, across the content column. On phone it holds the menu button and the mark.
4. **Main**: `<main class="pp-app-shell__main">`, the only part that scrolls on desktop. 24px side padding on desktop, 16px on phone. `pp-app-shell__content` caps the width at 1280px.
5. **Flag group**: `pp-flag-group`, bottom left of the main column, clear of the sidebar.
6. **Bottom action bar** (phone, optional): `pp-app-shell__actions`, one or two buttons pinned to the bottom, 48px tall.
7. **Skip link**: "Skip to main content", hidden until it gets keyboard focus.

## Layouts

| Layout | How | Use |
| --- | --- | --- |
| Desktop | Sidebar 256px (or `pp-side-navigation--collapsed`, 64px) on the left, top bar 56px over the content | Every product on screens 768px and wider |
| Admin | The same frame and classes. The selected item sits in the sidebar's Admin section ("Payroll connection", "Audit trail") | Admin and settings pages. There is no separate admin shell, admin top bar or second sidebar |
| Phone | Under 768px: top bar with the menu button, the sidebar as a drawer, the page scrolls as a whole, optional bottom action bar | The new-hire and employee portal, and every product on a phone (rule 9) |

| Class | Use |
| --- | --- |
| `pp-app-shell` | The frame. Applies the phone layout on its own under 768px |
| `pp-app-shell--phone` | Forces the phone layout in a narrow frame, for docs and previews |
| `pp-app-shell--inline` | A fixed-height frame instead of the full viewport, for docs. Set `--_height` to change it (default 520px) |

## States

| State | How |
| --- | --- |
| Sidebar collapsed | `pp-side-navigation--collapsed`; the content column grows, and flags move with it. Pepla remembers the choice per person |
| Drawer open (phone) | The sidebar gets `data-open="true"`, `pp-app-shell__blanket` shows behind it, the page behind is `inert` |
| Banner showing | The whole frame moves down by the banner's height; nothing overlaps it |
| Loading a page | The frame stays; only main shows skeletons. The shell never shows a full-page spinner |

## Behaviour

- One Pepla, one shell. Everyone signs in once and lands on **Today**: what needs them across every module (approvals, Pepla's proposals, people starting soon, overdue items). Every module (Hire, Onboard, Requests, Help desk and the rest) is a section of the same sidebar, so moving between them never changes the frame, the patterns or the look.
- Inside a module, pages use the same patterns as everywhere else: a list (Table or Pipeline board), a record page (Person header and Tabs), a Drawer to edit, the Agent proposal card for Pepla's suggestions, and Deadline chips.
- On desktop the sidebar and top bar stay put and only main scrolls. On phone the whole page scrolls and the top bar sticks to the top, so the browser bar can hide.
- The collapse toggle (`panel-left`) sits at the start of the top bar on desktop.
- When the content column is narrower than 400px (a tablet with the sidebar open), search moves behind its icon button. The top bar's markup carries both.
- On phone, the menu button opens the drawer; choosing an item, Escape or a tap on the blanket closes it, and focus goes back to the menu button.
- The bottom action bar holds the one main action of the page on phone ("Sign contract", "Upload document"), with an optional second. It hides when the keyboard is open. Flags sit above it.
- At most one banner. Page-level messages go in a Section message inside main, not in the banner slot.
- Focus moves to main's first heading after each route change, and the page title updates.

## Content

- The browser tab title is "Page, Module, pepla": "Pipeline, Hire, pepla". Today is "Today, pepla".
- The bottom bar's buttons follow the Button rules: a verb and an object, "Upload document", never "Next" or "Submit".
- Banner text says what is wrong for everyone and what to do; see Banner.

## Accessibility

- Landmarks: one `<header>` (top navigation), one `<nav aria-label="Main">` (side navigation), one `<main id="main">`. The banner is `role="alert"` or a labelled region.
- The skip link is the first focusable element and jumps to `#main`.
- Tab order: skip link, banner actions, sidebar, top bar, main, bottom bar.
- The open phone drawer is modal: focus is trapped in it, the rest of the shell is `inert`.
- The flag group is a live region (see Flag); it is outside main so route changes don't clear it.
- Everything tappable in the top bar and the bottom bar is at least 44px on touch (rule 9).

## PrimeNG mapping

No PrimeNG component for the frame. Build it as one Angular layout component (`pp-app-shell`) with content projection for main, and the router outlet inside main. The parts map as they do on their own pages:

- Top navigation: `p-toolbar` with pass-through, see Top navigation.
- Side navigation on phone: `p-drawer` with `position="left"`, see Side navigation.
- Flags: `p-toast`, mapped in Flag. Place one `p-toast` in the shell, not one per page.

```html
<div class="pp-app-shell">
  <a class="pp-app-shell__skip" href="#main">Skip to main content</a>
  @if (banner(); as b) { <pp-banner [message]="b" /> }
  <pp-side-navigation [collapsed]="collapsed()" [(open)]="drawerOpen" />
  <pp-top-navigation (menu)="drawerOpen.set(true)" (collapse)="toggleCollapsed()" />
  <main class="pp-app-shell__main" id="main" tabindex="-1">
    <div class="pp-app-shell__content"><router-outlet /></div>
  </main>
  <p-toast position="bottom-left" />
</div>
```

`pp-banner`, `pp-side-navigation` and `pp-top-navigation` above are the Angular wrappers to build around the existing classes. The `p-toast` root needs the `pp-flag-group` class through pass-through; that key name is to be checked in Flag.

## In Pepla today

There is no single shell. What exists:

- The HR dashboard and the employee dashboard each place the shared `app-sidebar` and `app-topbar` themselves (`shared/components/sidebar`, `shared/components/topbar`). The sidebar is 250px wide and turns into an overlay with a backdrop at 768px and below; the top bar has a hamburger button for that and opens notifications in a `p-overlayPanel`.
- The TalentFlow shell (`features/talent-flow/shell`) has no sidebar: a horizontal top bar holds the brand, the navigation links and a `p-popover` bell panel for SLA breaches.
- The TalentFlow admin shell (`features/talent-flow/shell/admin-shell`) has its own admin top bar with a "Back to TalentFlow" button and its own `tf-admin-sidebar`, 220px wide. It is the only shell with a `p-toast` and a `p-confirmDialog`.
- The IT provisioning shell (`features/it-provisioning/shell`) copies the TalentFlow layout: a horizontal top bar with its own links and bell popover.
- The platform shell (`features/platform`) is a bare `router-outlet`; its child areas bring their own navigation.

## Do and don't

- **Do** use one shell for all of Pepla and add a module as a sidebar section. **Don't** build a new shell, a product switcher or a separate menu for a module or for admin.
- **Do** keep page actions in the Page header inside main. **Don't** put them in the top bar.
- **Do** keep one banner for account-wide problems. **Don't** stack banners or use the slot for page messages.
- **Do** use the bottom action bar for the one main action on phone. **Don't** put navigation tabs in it.
