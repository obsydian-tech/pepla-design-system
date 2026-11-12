---
name: Agent proposal card
group: agent
status: ready
classes: pp-proposal, pp-proposal--compact, pp-proposal-list
primeng: none (a plain Angular template composed from Card, Lozenge, Tag, Button, Confidence chip and Textarea)
replaces: app-ai-hitl-confirm, the "Human approval required" block in tf-ai-chat-panel, and the pending-action list on the TalentFlow dashboard
---

# Agent proposal card

The proposal card is how Batsi asks a person to approve something. It is the signature of rule 2: the agent proposes, a person approves. Every agent action that changes a record, sends a message or sends data anywhere goes through this card, in one of three shapes: a full card, a compact row in a list, or a batch.

## Anatomy

1. **Container**: a Card (`pp-card pp-proposal`) with the mint agent border (`--color-border-agent`).
2. **Who**: the Agent mark with "Batsi suggests" ("Batsi suggested" once decided).
3. **What it will do**: the title. One sentence, verb first: "Send Kagiso Molefe's bank details to payroll".
4. **Status** in `pp-card__aside`: one Lozenge (see States).
5. **Facts** (`pp-proposal__facts`, a `<dl>`):
   - **Why now**: the reason it matters today: "Kagiso starts on 16 Nov. Payroll closes on 20 Nov."
   - **What Batsi read**: each source as a Tag that links to it.
   - **Where it goes** (POPIA): one row per system that receives data, with its country and exactly which fields. If nothing leaves Naleko People, say so.
   - **How sure**: a Confidence chip.
6. **Actions**: Approve (`pp-button--agent`, `check` icon), Edit (default), Decline (subtle). The mint Approve button appears only on proposals, here or inside the agent panel.
7. **Note**: "Your choice is recorded with your name and the time."
8. **Outcome** (`pp-proposal__outcome`, after a decision): who decided, when, and a link to the audit trail. Replaces the actions.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-card pp-proposal` | The full card: on Today, on a record, in the agent panel when there is room | Without all four facts |
| `pp-card pp-card--compact pp-proposal` | Decided proposals in history | For a pending proposal that needs the facts |
| `pp-proposal--compact` in `pp-proposal-list` | A list of proposals ("Needs you"). Shows what, why now and where it goes in one line, with Approve and Review | For proposals that send personal data outside Naleko People: these need Review, not one-tap Approve |
| Batch (`pp-proposal__items`) | One decision for several records of the same kind: "Approve 3 documents" | For mixed kinds, or more than 20 items |

## States

| State | Lozenge | What shows |
| --- | --- | --- |
| Pending | `info` "Waiting for you", or `clock` "Expires in 2 days" (warning) when it has a deadline | Facts and the three buttons |
| Working | `loader` "Working" (information) | Approve is busy (`aria-busy`, spinner, rule 8); Edit and Decline are `aria-disabled`; the card has `aria-busy="true"` |
| Approved | `circle-check` "Approved" (success) | Outcome: "Approved by Thandeka Dlamini", the time, "View in audit trail" |
| Declining | unchanged | A reason field (optional) replaces the buttons, with "Decline proposal" and "Back" |
| Declined | `circle-x` "Declined" (neutral) | Outcome: who, when and their reason. "Batsi did nothing." |
| Expired | `clock-alert` "Expired" (neutral) | Outcome: no one decided in time, Batsi did nothing, and what happened since if known |
| Failed | `octagon-alert` "Did not go through" (danger) | Outcome: who approved, what the other system said, and how to fix it |

## Behaviour

- Nothing happens until a person presses Approve. Batsi never acts on a pending card, and a card never approves itself on a timer. An expired card does nothing.
- Approve goes to Working at once and stays busy until the server answers (rule 8). Then the card shows the outcome, focus moves to the outcome line, and a Flag confirms it.
- Edit opens the proposal's draft (the email, the record change, the laptop and access) in a drawer. Saving the edit approves it; the outcome says "Approved with changes by ...".
- Decline asks for a reason in place, optional. The reason is kept with the decision and shown in the activity log.
- Every decision is written to the audit trail with who, when, what was proposed and what was done (rules 2 and 7).
- A failed action keeps the approval on record and says what to fix. "Fix and try again" opens Edit with the problem field marked.
- Compact rows: one-tap Approve is offered when the action stays inside Naleko People (a reminder, chasing a document, an email to the person concerned). When personal data goes to another company (payroll, a background check, a bank), the row offers Review instead, which opens the full card with "Where it goes". A proposal Batsi is unsure of ("Check this") also offers only Review.
- Batch: every item is ticked to start. Unticking an item updates the button ("Approve 2 documents"). Each item gets its own audit entry.
- Personal data in the facts is masked (rule 6): "ID ending 0876", "account ending 4821".
- Today, the TalentFlow API has `GET /agent/v1/actions/pending` and `POST /agent/v1/actions/{id}/approve|reject`, and its `PendingAction` has `expiresAt` and the statuses PENDING, APPROVED, REJECTED and EXPIRED. The card's states map to these, plus Working and Failed on the client.

## Content

- Title: verb first, one sentence, names the person: "Remind Chipo Banda to upload her tax form". Never "Action required" or a tool name such as `update_stage_config`.
- Why now: one sentence with a date or a deadline in words.
- Where it goes: system, country, then the fields: "Payroll system, South Africa: name, ID ending 0876, account ending 4821". If nothing leaves: "Nothing leaves Naleko People. Kept in Cape Town."
- Buttons: "Approve", "Edit", "Decline". The batch button counts: "Approve 3 documents".
- Outcomes are past tense and name the person: "Approved by Thandeka Dlamini. Payroll has the details."
- Never "Human approval required", "HITL", "AI", or raw JSON.

## Accessibility

- The card is an `<article>` labelled by its title, which is a real heading (`<h3>` in the app).
- When the state changes, the outcome text is announced politely (`role="status"`); a failure uses `role="alert"`.
- After a decision, focus moves to the outcome line (`tabindex="-1"`), so keyboard users are not left on a button that has gone.
- Each compact-row button is described by its row title (`aria-describedby`), so "Approve" is read with what it approves.
- Status is a lozenge with an icon and a word (rule 4). The mint border is decoration; "Batsi suggests" says the same in words.
- Phone: buttons stack with Approve on top (`pp-button-group--stack-phone`) and are at least 44px tall.

## PrimeNG mapping

No PrimeNG component. The card is a plain Angular component (`<pp-proposal-card>`, root class `pp-proposal`) composed from existing pieces: `pp-card`, `pp-lozenge`, `pp-tag`, `pp-confidence`, `pp-button` (PrimeNG `p-button` through the Button pass-through), and `pp-textarea` (`pTextarea`) for the reason.

```html
<article class="pp-card pp-proposal" [attr.aria-busy]="state() === 'working' || null" [attr.aria-labelledby]="id + '-t'">
  <header class="pp-card__header">
    <div class="pp-proposal__titles">
      <span class="pp-agent-mark"><svg lucideSparkles aria-hidden="true"></svg><span>Batsi suggests</span></span>
      <h3 class="pp-proposal__title" [id]="id + '-t'">{{ p.title }}</h3>
    </div>
    <div class="pp-card__aside"><pp-lozenge [status]="state()" [expiresAt]="p.expiresAt" /></div>
  </header>
  ...
  <p-button styleClass="pp-button--agent" label="Approve" icon="check" [loading]="state() === 'working'" (onClick)="approve()" />
</article>
```

## In Naleko People today

Three different approval UIs, verified in `hr-portal/src/app`:

1. `features/hr-dashboard/components/ai-hitl-confirm/` (`app-ai-hitl-confirm`), shown inside the AI Assistant drawer in `features/hr-dashboard/components/ai-mode-panel/ai-mode-panel.component.html`. A banner reads "Human approval required", then the draft employee's fields are listed, then "Cancel" and "Approve & Create" buttons. It only handles one action type, `CREATE_EMPLOYEE` (`features/hr-dashboard/models/ai-chat.model.ts`). It shows no reason, no sources and no data destination, and records nothing on screen about who approved.
2. `features/talent-flow/components/ai-chat-panel/ai-chat-panel.component.html` (`tf-ai-chat-panel`). Inside a chat message, a block reads "Human approval required", names the tool ("The AI wants to update **{{ toolName }}**") and prints the raw parameters as JSON in a `<pre>`, with "Approve" (`p-button-success`) and "Reject" (`p-button-danger p-button-outlined`). After a decision it reads "Action approved and executed." or "Action rejected." `rejectAction()` in `ai-chat-panel.component.ts` always sends the fixed reason "Rejected by hiring manager."
3. The TalentFlow dashboard's "My actions today" card (`features/talent-flow/pages/dashboard/dashboard-page.component.html`) lists up to three pending actions (`myActionsToday`, `.slice(0, 3)` in `dashboard-page.component.ts`) with a bolt icon, a title, "Requested by" and a priority label, and a "{{ n }} pending" badge. There is no approve or decline there.

The approve and reject calls are `approveAction()` and `rejectAction()` in `features/talent-flow/services/talent-flow-agent-api.service.ts`; there is no function called `talentFlowApproveAction`. The intelligence tiles (`features/talent-flow/components/intelligence-tile/`) are signals with an action, snooze and dismiss; they do not approve agent actions, so they are not replaced by this card.

## Do and don't

- **Do** show all four facts: why now, what Batsi read, where it goes, how sure. **Don't** ask for approval of a JSON blob or a tool name.
- **Do** use the mint Approve button only here and in the agent panel. **Don't** make Approve violet, green or a "success" button.
- **Do** say where personal data goes, with the country. **Don't** write "Data is processed securely".
- **Do** keep a declined or expired card in history with who and why. **Don't** delete it or hide it.
