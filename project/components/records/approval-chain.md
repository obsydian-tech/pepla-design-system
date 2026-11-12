---
name: Approval chain
group: records
status: ready
classes: pp-approval-chain, pp-approval-chain--compact, __step, __step--approved, --declined, --skipped, --current, __marker, __body, __who, __detail, __reason
primeng: none (plain Angular template)
replaces: the offer tab's "Approval Chain" list
---

# Approval chain

The ordered list of people who must approve something (an offer, an IT laptop and access), with each one's status. The step that is waiting now is highlighted.

## Anatomy

1. **List**: an `<ol>`, because order matters.
2. **Marker** (`__marker`): the step number, or `check` when approved, `x` when declined, `skip-forward` when skipped. A line joins the markers.
3. **Who** (`__who`): the person's name, then their role in the chain.
4. **Detail** (`__detail`): when they were asked or decided; an agent lozenge if Batsi sent a reminder.
5. **Reason** (`__reason`): why they declined or why the step was skipped.
6. **Lozenge**: the step's status in words.

## States

| Step | Class | Lozenge |
| --- | --- | --- |
| Approved | `--approved` | success, `circle-check`, "Approved"; detail "Approved 3 Nov 2026, 10:12" |
| Waiting (current) | `--current`, `aria-current="step"` | information, `clock`, "Waiting 8 days" |
| Not yet | none | neutral, `circle-dashed`, "Not yet" |
| Declined | `--declined` (and `--current`, since the chain stops here) | danger, `circle-x`, "Declined", with the reason |
| Skipped | `--skipped` | neutral, `skip-forward`, "Skipped", with who skipped it and why |

`--compact` uses 24px markers and less padding, for an approval chain inside a card such as Offer summary.

## Behaviour

- Steps run in order. Only the current step can act; later steps say "After Thandeka".
- A decline stops the chain. The owner edits and sends it again, which starts a new chain; the old one stays in the history (rule 7).
- Skipping a step needs a reason and is done by an HR admin; the skip is audited.
- Batsi may remind the current approver; it never approves (rule 2). A reminder shows as an agent lozenge in the detail line.
- Below 480px the lozenge moves under the name.

## Content

- Who: "**Thandeka Dlamini**, HR director". Name first, role after, role in lower case.
- Waiting time in words: "Waiting 8 days". Decisions with the full date and time.
- A decline reason is the approver's own words. Ask for one when they decline.

## Accessibility

- An `<ol>` with an `aria-label` that names what is being approved.
- The current step has `aria-current="step"`.
- Markers are `aria-hidden`; the lozenge words carry the status.

## PrimeNG mapping

No PrimeNG component. Use a plain `@for` over the steps. Do not use `p-stepper` or `p-timeline`: neither has declined or skipped states. "Remind" and "Skip" actions are `p-button` with the Button pass-through.

## In Naleko People today

- `offer-tab.component.html` (state 2, "In Approval") lists `o.approvalChain` under "Approval Chain": each step shows `step.approverRole` with "Awaiting decision", "Approved {date}" or "Rejected {date}" (`d MMM yyyy`), a "Remind" button on pending steps, and an "All Approved" badge. It shows the role, not the person's name.
- `approval-chain-drawer.component.ts` (tenant settings) edits the offer and provisioning chains: ordered steps with a role (TA Specialist, Hiring Manager, HR Director, Finance), a required flag, and add, remove and move actions.
- There is no skipped state and no decline reason in the offer tab.

## Do and don't

- **Do** name the person and their role. **Don't** show the role alone.
- **Do** show the decline reason. **Don't** show "Rejected" with no why.
- **Do** keep earlier chains in the history. **Don't** reset a chain silently.
