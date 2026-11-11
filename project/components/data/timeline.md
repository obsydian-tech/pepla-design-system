---
name: Timeline
group: data
status: ready
classes: pp-timeline
primeng: Timeline (p-timeline)
replaces: the hand-built activity lists (candidate workspace activity log, provisioning activity, task activity, bundle activity log)
---

# Timeline

A timeline is a vertical list of dated events, newest first. Each event says who did it, what changed and when. Use it for audit trails, a candidate's history and the history of any record.

## Anatomy

1. **List**: an ordered list, newest event at the top.
2. **Day heading** (optional): "Today", "Yesterday", "3 Nov 2026", for long lists.
3. **Marker**: who or what did it, 32px. A person's avatar with their initials; Pepla's agent mark (`sparkles` in mint, the agent avatar); or an icon from the vocabulary in a neutral circle for something that happened on its own (a deadline passed, a link expired).
4. **Line**: a 1px line joins the markers, so the events read as one history.
5. **Summary**: who, then what, in one sentence: "**Lerato Mokoena** moved Kagiso to Interview".
6. **Detail** (optional): what changed, from and to; the reason given; or who approved an agent's work.
7. **Time**: when, in words, in subtle small text. The full date and time is in the `<time>` element and its tooltip.
8. **More** (optional): "Show older events" at the end.

## Appearances

| Class | Use |
| --- | --- |
| (default) | Record pages and the audit trail: 32px markers, summary, detail and time |
| `pp-timeline--compact` | Side panels such as candidate history: 24px markers, tighter spacing, detail kept to one line |

## States

| State | How |
| --- | --- |
| Loading | Three skeleton events: a round skeleton marker and two text lines (see Skeleton) |
| Empty | One item, `li.pp-timeline__empty`, in place of the events: "No changes yet. Edits to Thandeka's record will show here." |
| More | A last item, `li.pp-timeline__more`, holding a subtle "Show older events" button |
| New event | Slides in at the top; the newest event's marker gets a ring for 2 seconds. Under reduced motion it only appears |
| Error | A Section message (danger) above the list; events already loaded stay |

## Behaviour

- Newest first. Load 20 events at a time; "Show older events" loads the next 20 and keeps focus on the first new one.
- Group by day when the list covers more than one day.
- An agent event always says who approved it, and when (rule 2): "Approved by Thandeka Dlamini".
- A correction is a new event beside the original, never an edit of it (rule 7).
- Personal data in a change stays masked (rule 6): "Changed bank account ending 4471 to ending 9012", never the full number.
- Each event can link to the record it changed. The summary is not a button; use a link inside it.
- Filters (All, Interviews, Scores) sit above the list as Tabs or a Select, never inside it.

## Content

- Lead with who: "Sipho Ndlovu uploaded his tax form", "Pepla drafted the offer letter", "The contract link expired".
- Use the person's name; use "you" only for the person reading.
- Say what changed, from and to: "Start date 17 Nov 2026 to 1 Dec 2026".
- Time in words: under an hour "12 min ago"; today "2 hours ago"; yesterday "Yesterday, 14:30"; older "3 Nov 2026, 14:30" (24-hour). The tooltip always holds the full date and time.
- Status changes carry an icon and a word (rule 4): `circle-check` "Verified", never a green dot alone.

## Accessibility

- `<ol class="pp-timeline">` with `aria-label` ("History for Kagiso Molefe"); each event is an `<li>`.
- Day headings are list items with a heading role, so screen readers can jump between days.
- Markers are decoration (`aria-hidden="true"`); the summary text names who did it, including "Pepla" for the agent.
- Times use `<time datetime="2026-11-11T09:12">` with a `title` holding the full date and time.
- Changes shown as struck and new values use `<del>` and `<ins>` with visually hidden "from" and "to", because most screen readers don't announce them.
- New events added while the page is open are announced politely, at most once a minute.

## PrimeNG mapping

PrimeNG v19 runs in unstyled mode; pass-through adds the Pepla classes. `p-timeline` gives the list and the line; Pepla's marker and content go in its templates. Key names below are to be checked against PrimeNG 19.

```ts
timeline: {
  root: ({ props }) => ({ class: ['pp-timeline', { 'pp-timeline--compact': props.styleClass?.includes('compact') }] }),
  event: { class: 'pp-timeline__event' },
  eventOpposite: { style: 'display:none' },     // to be checked: Pepla has no opposite column
  eventSeparator: { class: 'pp-timeline__marker' },
  eventMarker: { style: 'display:none' },       // to be checked: the marker template replaces it
  eventConnector: { style: 'display:none' },    // the line comes from pp-timeline CSS
  eventContent: { class: 'pp-timeline__content' },
}
```

```html
<p-timeline [value]="events" align="left" aria-label="History for Kagiso Molefe">
  <ng-template #marker let-e><span class="pp-avatar pp-avatar--small" [class.pp-avatar--agent]="e.byAgent">...</span></ng-template>
  <ng-template #content let-e>
    <span class="pp-timeline__summary"><strong>{{ e.actorName }}</strong> {{ e.what }}</span>
    <time class="pp-timeline__time" [attr.datetime]="e.at" [title]="e.at | date:'d MMM y, HH:mm'">{{ e.at | ppRelativeTime }}</time>
  </ng-template>
</p-timeline>
```

`p-timeline` renders `<div>`s, not an `<ol>`; set `role="list"` on the root and `role="listitem"` on each event (to be checked whether pass-through can set them). `ppRelativeTime` is the pipe to build for times in words.

## In Pepla today

`p-timeline` is not used anywhere. Each activity list is built by hand:

- The candidate workspace has an "Activity Log" side panel with All, Interviews, Scores and Sentiment filters. Each event is a dot joined by a line, the event type, the actor's name and a `d MMM · HH:mm` date. The dot's colour comes from the event type alone (blue for interview, stage and workflow; green for votes and scores; amber for sentiment; grey for the rest). The list ends with a "Candidate record created" entry whose actor reads "SYSTEM".
- The hiring manager's bundle progress page has an "ACTIVITY LOG" list, and the provisioning tab has a "PROVISIONING ACTIVITY" list. Both show a PrimeIcons icon picked by type (breach, complete, approval, info), a message and a detail line, with no avatar.
- The IT task detail page has a "TASK ACTIVITY" list: an icon by type (claim, release, complete, SLA, create), the text, then the timestamp and a subtext.
- The admin Audit page shows events in a `p-table`, not a timeline: timestamp (`dd MMM, HH:mm:ss`), user name and email, role, action, entity, module and outcome. A row opens an event detail drawer.

None of these icon or colour mappings has a type for work the agent did.

## Do and don't

- **Do** lead each event with who did it. **Don't** write "Stage updated" with no name.
- **Do** mark Pepla's work with the mint agent mark and say who approved it. **Don't** use mint for a person's event or for "success".
- **Do** say when in words and keep the full time in the tooltip. **Don't** show a bare `11/03` date.
- **Do** add a correction as a new event. **Don't** rewrite or hide an old one.
