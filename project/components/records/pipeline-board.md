---
name: Pipeline board
group: records
status: ready
classes: pp-pipeline, pp-pipeline__picker, __board, __column, __column--current, __column--drop-target, __column-header, __column-name, __column-alert, __column-alert--warning, __cards, __card, __card--dragging, __handle, __card-body, __placeholder, __empty
primeng: none for the board; Angular CDK drag and drop (cdkDropList, cdkDrag); Menu (p-menu) for the move menu
replaces: the pipeline page's kanban view
---

# Pipeline board

A kanban board of hiring stages for one role. Each column is a stage with a count and a warning when people wait too long; each card is a candidate. People move a card by dragging it or with the "Move" button. On a phone the board becomes a stage picker and one list.

## Anatomy

1. **Board** (`__board`): an `<ol>` of columns, in stage order. It scrolls sideways when the columns do not fit.
2. **Column** (`__column`): header with the stage name, a `pp-badge` count and, when needed, an alert line (`__column-alert`): "1 scorecard overdue", "1 waiting over 5 days".
3. **Cards** (`__cards`): a `<ul>` of candidate cards, or an empty line "No one yet".
4. **Card** (`__card`): a drag handle (`grip-vertical`), `pp-person` with the name as a link and one meta line, at most one lozenge (a deadline, a status, or an agent lozenge), and a "Move" icon button (`arrow-right-left`).
5. **Stage picker** (`__picker`, phone only): a select listing each stage with its count.
6. **Live region**: a hidden `aria-live="polite"` element that announces moves.

## States

| State | How |
| --- | --- |
| Card at rest | Raised surface, 1px border; hover darkens the border |
| Dragging | `__card--dragging`: selected border and overlay shadow (use as `cdkDragPreviewClass`) |
| Placeholder | `__placeholder`: dashed box where the card will land (`*cdkDragPlaceholder`) |
| Drop target | `__column--drop-target`: selected border and wash on the column under the card (`cdk-drop-list-receiving`) |
| Column warning | `__column-alert` (danger, `clock-alert`) when something is overdue; `--warning` (`clock`) when people wait longer than the stage's limit |
| Empty column | `__empty`: "No one yet" |
| Phone | Below 480px: the picker shows; only `__column--current` shows, as a plain list; handles hide |

## Behaviour

- **Drag**: pick a card up by its handle or body and drop it in another column. The move saves at once and shows a flag with "Undo" for 5 seconds.
- **Keyboard and phone**: the "Move" button opens a menu of the other stages ("Move to Offer"). Focus returns to the card in its new column. The live region says "Bongani Mthembu moved to Offer".
- Some moves need more: moving to Offer opens the offer form; moving to "Not hired" asks for a reason. Those open a dialog instead of moving straight away.
- Pepla never moves a card (rule 2). It may book interviews or chase scorecards; those show as agent lozenges on the card.
- Every move is audited with who, when, from and to (rule 7).
- The stage picker on phone keeps the chosen stage when the person comes back.

## Content

- Stage names are short nouns: "Applied", "Interview", "Offer", "Hired".
- Column alerts count people and say the problem: "1 scorecard overdue". Never "SLA breach".
- Card meta is one fact: "Applied 4 Nov", "Interviewed 3 Nov", or the place.
- One lozenge per card: the most urgent thing.

## Accessibility

- The board is an `<ol>` labelled with the role; each column is labelled by its heading.
- Dragging is never the only way: every card has a "Move" button named with the person ("Move Bongani Mthembu to another stage").
- Counts have words for screen readers: the badge's hidden label (`pp-badge__label`, " candidates"), as on every badge.
- The live region announces each move and each undo.
- The phone picker is a real `<select>` with a visible label.

## PrimeNG mapping

PrimeNG has no board. Build it with Angular CDK drag and drop:

```html
<ol class="pp-pipeline__board" cdkDropListGroup>
  <li class="pp-pipeline__column" [class.pp-pipeline__column--drop-target]="receiving">
    <ul class="pp-pipeline__cards" cdkDropList [cdkDropListData]="stage.candidates" (cdkDropListDropped)="move($event)">
      <li class="pp-pipeline__card" cdkDrag cdkDragPreviewClass="pp-pipeline__card--dragging">
        <li *cdkDragPlaceholder class="pp-pipeline__placeholder"></li>
```

The "Move" menu is `p-menu` (popup) with the Dropdown menu pass-through (keys to be checked). The phone picker is a native select, or `p-select` with the Select pass-through.

## In Pepla today

- `pipeline-page.component.html` has a List and Kanban view toggle (list is the default). The kanban has 4 phase columns: Interview & Evaluation, Offer Stage, Accepted and Pre-Onboarding, each with a label, a sub-label and a count that turns to an alert style when a card is urgent.
- The comment in the template says "no drag-and-drop", and no file in `src/app` uses the CDK drag and drop module.
- Each kanban card is a `div` with `role="button"`, `tabindex="0"` and a click handler (no key handler in the template). It shows initials, name, role, a stage sub-label, sentiment and health pills, and an SLA bar coloured by `slaStatus`.
- The page header shows "{n} SLA breaches".

## Do and don't

- **Do** give every card a "Move" button. **Don't** make drag the only way to move.
- **Do** say what is late in the column header. **Don't** colour a whole column red.
- **Do** keep one lozenge per card. **Don't** stack health, sentiment and SLA pills.
