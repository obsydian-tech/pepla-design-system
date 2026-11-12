---
name: Empty state
group: messages
status: ready
classes: pp-empty-state
primeng: none (template inside p-table emptymessage and page bodies)
replaces: "No records found" table rows, blank dashboard panels
---

# Empty state

An empty state fills a page, card or table that has nothing to show yet. It says why it is empty and offers the one action that fills it. Naleko People uses no illustrations: an icon in a soft circle, a heading and a line.

## Anatomy

1. **Icon circle**: 64px, `--radius-full`, neutral fill, a 24px Lucide icon that names the area (`user-plus` for hiring, `search` for no results, `lock` for no permission).
2. **Heading**: what is empty, `--font-heading-medium`.
3. **Line**: one sentence on why, or on what will appear here.
4. **Action** (optional): one button. Primary on a page, default inside a card or table.
5. **Agent note** (done state only): a small line with `sparkles` that says what Batsi handled.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| (default) | A page or list with nothing in it yet; no permission; a first-run screen | With more than one primary action |
| `pp-empty-state--done` | "Nothing needs you today": the approvals inbox or home page when every task is done. Success circle and a larger heading | When something is still waiting, even one item |

## Sizes

| Class | Use |
| --- | --- |
| (default) | A whole page or a large panel: 64px circle, 48px padding |
| `pp-empty-state--compact` | Inside a card, a table body or a drawer: 48px circle, smaller heading, small default button |

## States

| State | How |
| --- | --- |
| First use | Explains what will appear and offers the action that starts it |
| No results | Names the search or filter and offers to clear it |
| No permission | Says who can give access; the action asks them |
| All done | `pp-empty-state--done`, announced with `role="status"` when the last task is approved |

## Behaviour

- Show it only after the data has loaded. While loading, show skeletons in the shape of the content.
- No results after a filter keeps the filter bar visible above it.
- The done state appears the moment the last approval lands, so the person sees the inbox clear.
- On phone the action button grows to 48px.

## Content

- Heading says what is empty in plain words: "No candidates yet", "Nothing needs you today". Not "No data".
- The line says what happens next: "When people apply for Bookkeeper, they show up here."
- No permission names the person who can help, not "Contact your administrator".
- The done state never praises in a loud way; no exclamation marks.

## Accessibility

- The heading is a real heading at the right level for its place in the page.
- The icon is decorative (`aria-hidden`); the heading carries the meaning.
- When a list empties because of a person's action, wrap the state in `role="status"` so the change is announced.
- The agent note's link names its target: "See them in the audit trail".

## PrimeNG mapping

No PrimeNG component. Use the classes inside PrimeNG templates:

```html
<p-table [value]="candidates">
  <ng-template #emptymessage>
    <tr><td colspan="5">
      <div class="pp-empty-state pp-empty-state--compact">
        <div class="pp-empty-state__icon"><i-lucide name="search" /></div>
        <h3 class="pp-empty-state__title">No one matches "{{ query }}"</h3>
        <p class="pp-empty-state__body">Check the spelling, or search by employee number.</p>
      </div>
    </td></tr>
  </ng-template>
</p-table>
```

## In Naleko People today

Empty tables use PrimeNG `emptymessage` rows (verifications list, HR dashboard home, admin audit), and lists show one line of text such as "No employees found", "No conversations found" or "No laptop and access found". None says why it is empty or what to do next.

## Do and don't

- **Do** offer one action that fills the space. **Don't** add a second primary button.
- **Do** use an icon from the vocabulary. **Don't** add illustrations, emoji or a coral circle.
- **Do** design the "Nothing needs you today" state. **Don't** show an empty table when the work is done.
