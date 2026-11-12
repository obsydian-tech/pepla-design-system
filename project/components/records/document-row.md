---
name: Document row
group: records
status: ready
classes: pp-document-row, pp-document-row__body, __name, __meta, __reason, __status, __actions, pp-document-row--attention, pp-document-checklist, pp-document-checklist__header, __titles, __title, __subtitle, __list, __footer
primeng: none (plain Angular template); upload uses File upload
replaces: app-document-row and app-document-checklist; the HR document detail card's status block
---

# Document row

One required document: what it is, where it stands, who did what and when, and what you can do next. A **document checklist** groups the rows for one person under a header that counts them.

## Anatomy

**Row**

1. **Icon tile**: `id-card` for ID, `landmark` for bank letters, `graduation-cap` for qualifications, `file-text` for everything else.
2. **Name** (`__name`): the document type in plain words: "Bank confirmation letter".
3. **Meta** (`__meta`): who and when: "Uploaded by Kagiso, 9 Nov 2026, 08:02". An agent lozenge when Batsi checked it. A deadline chip while it is still requested.
4. **Reason** (`__reason`, rejected only): what is wrong and what to do.
5. **Status** (`__status`): one lozenge.
6. **Actions** (`__actions`): "View", "Request again", "Send reminder" or "Upload".

**Checklist**

1. **Header**: title ("Kagiso's documents"), subtitle, and a progress bar: "2 of 6 documents".
2. **List**: one row per required document, problems first.
3. **Footer** (optional, `__footer`): one note under the list, such as an agent inline message saying what Batsi checks after upload.

## States

| Status | Lozenge | Meta shows | Actions |
| --- | --- | --- | --- |
| Requested | neutral, `circle-dashed`, "Requested" | "Asked 3 Nov" and a deadline chip | Send reminder |
| Uploaded | information, `upload`, "Uploaded" | who uploaded it, when; "Waiting for HR to check" | View |
| Checking | information, `hourglass`, "Checking" | agent lozenge "Batsi is checking", or the person checking | View |
| Matches | success, `circle-check`, "Matches" | who uploaded it and who checked it (agent lozenge if Batsi) | View |
| Rejected | danger, `circle-x`, "Rejected" | who rejected it, when; the reason line | View, Request again |
| Expired | warning, `clock-alert`, "Expired 2 Oct" | "Valid until 2 Oct 2026" | View, Request again |

`pp-document-row--attention` gives a rejected row a quiet danger wash so it stands out in a long list.

## Behaviour

- Rows sort: rejected and expired, then requested (soonest deadline first), then checking and uploaded, then verified.
- "View" opens the file in a drawer or a new tab. Opening an ID or bank document is logged (rule 6).
- "Request again" asks the person for a new copy with the reason, and the row goes back to "Requested".
- While an upload runs, the Upload button shows its working state (rule 8); the row moves to "Uploaded" when it lands.
- The checklist is a size container: below 600px the status and actions move under the name. On a phone the one upload action is a large block button.

## Content

- Name documents the way people say them: "Bank confirmation letter", "Matric certificate", "Tax number letter (SARS)".
- A rejection reason says what is wrong and how to fix it, without blame: "The tax number is cut off at the edge. Ask for a full copy."
- Never show an ID or account number in the row. If one helps, show the last 4 digits only: "ID ending 0876".
- Never "OCR", "PENDING" or upper-case status codes.

## Accessibility

- The list is a `<ul>`; each row is an `<li>`.
- Every "View" button carries hidden words naming the document, so a screen reader hears "View bank confirmation letter".
- The status is a word, never colour alone. The attention wash is extra, not the signal.
- The header's progress bar is a labelled `<progress>` with the count in words.

## PrimeNG mapping

No PrimeNG component for the row. The upload action uses `p-fileUpload` in basic mode with the File upload pass-through (to be checked), or a hidden `<input type="file">` behind a `pp-button`. Buttons are `p-button` with the Button pass-through. Replace the row's `p-tag` with a `pp-lozenge`.

## In Naleko People today

- `document-row.component.ts` (`app-document-row`) uses `p-tag` with the labels "ACCEPTED", "REJECTED", "VERIFICATION PENDING", "UNDER HR REVIEW", "UPLOADING...", "OCR PROCESSING..." and "PENDING", and PrimeIcons only for accepted, rejected and in review. The statuses come from `DocumentStatus` in `employee.model.ts`: PENDING, UPLOADING, PROCESSING, ACCEPTED, REJECTED, SUBMITTED, IN_REVIEW. There is no expired status.
- The row checks file type (PDF, JPG, PNG) and size (5MB) and has upload, re-upload and view actions.
- `document-checklist.component.html` has the header "Upload Your Documents", a counter "{n} of {total} complete" and a "Verification Note" that says ID and bank confirmation use "AI OCR".
- The document types are National ID, Bank Account Confirmation Letter, Matric Certificate and Tertiary Qualification(s).

## Do and don't

- **Do** say who checked a document, and mark Batsi's checks with the agent lozenge. **Don't** say "AI OCR".
- **Do** give the reason with every rejection. **Don't** show "REJECTED" alone.
- **Do** keep one primary upload action on a phone. **Don't** put three buttons in every row.
