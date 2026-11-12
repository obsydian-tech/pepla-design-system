---
name: Verification result
group: records
status: ready
classes: pp-verification, pp-verification__checks, __check, __check--mismatch, __check--unsure, __check-note, __by (with pp-card and pp-dl)
primeng: none (plain Angular template of pp-card, pp-lozenge and pp-dl)
replaces: the verification detail page's decision tag, confidence badge and "OCR Analysis" box
---

# Verification result

The result of an ID, bank or qualification check: everything matches, needs a look, or something does not match. The check only raises a flag; HR decides what happens next. It says what was compared, against which source, when, and who checked it: Batsi or a person.

## Anatomy

1. **Card header**: icon tile (`id-card`, `landmark`, `graduation-cap`), the check's name ("ID check"), the person and document, and the result as a bold lozenge in `pp-card__aside`.
2. **Checks** (`__checks`): one line per field compared, each an icon and words: "Name matches", "Certificate number not found".
3. **Facts** (`pp-dl`): Checked (the masked identifier), Against (the source), When, By.
4. **By**: the agent lozenge "Checked by Batsi", or a `pp-person` for a person. If a person approved Batsi's result, say so beside it.
5. **Footer** (needs a look or does not match only): HR's choice, "Accept document" or "Ask for a new one".

## States

| Result | Lozenge | Check lines |
| --- | --- | --- |
| Matches | bold success, `shield-check`, "Matches" | all `check` |
| Needs a look | bold warning, `triangle-alert`, "Needs a look" | at least one `--unsure` (`triangle-alert`) |
| Doesn't match | bold warning, `triangle-alert`, "Doesn't match" | at least one `--mismatch` (`x`) |
| Checking | agent lozenge "Batsi is checking" | none yet; skeleton lines |

## Behaviour

- A "Needs a look" or "Doesn't match" result always ends with HR's decision: accept, or ask for a new document (rule 2). The check never rejects a document on its own. The decision and who made it are added to "By".
- "Show ID number" reveals the full number in place, is logged with who and when (rule 6), and hides again when the person leaves the page.
- Batsi's result is a flag, never a verdict: HR sees it and decides before the new employee is told anything.

## Content

- Name the check by what it proves: "ID check", "Bank account check", "Qualification check".
- Check lines say what matched or not, then why in plain words: "Account holder is "C Banda". The full name could not be confirmed."
- Never show a confidence percentage. Say what was unsure instead.
- Sources are named plainly: "Home Affairs identity record", "The bank's account check", "The college's register of graduates".
- Identifiers are masked by default: SA ID `•••••••••0876`, account `••••••4521`, certificate `••••3390`.

## Accessibility

- The result lozenge is an icon and a word (rule 4).
- The checks list has `aria-label="What was compared"`.
- The reveal button says what it reveals: "Show ID number". After reveal, it changes to "Hide ID number" and focus stays on it.

## PrimeNG mapping

No PrimeNG component. A `pp-card` with `pp-dl`, lozenges and buttons. The reveal button is a `p-button` with `text` and the Button pass-through; the reveal itself is the Masked field pattern.

## In Naleko People today

- `verification-detail.component.ts` maps decisions to the labels "Verified" (PASSED), "Failed" (FAILED) and "Needs Review" (MANUAL_REVIEW) and shows them in a `p-tag` beside a confidence badge (`{{ v.confidence }}%`).
- `verification-detail.component.html` shows the reasoning in an "OCR Analysis" card, then an "Extracted Data" card listing every extracted field by its key with `{{ field.value }}`; the template does not mask them.
- For MANUAL_REVIEW it offers "Approve Document" and "Reject Document", plus "Request External Verification" and "View Employee".
- `employee.model.ts` defines `VerificationDecision` as MANUAL_REVIEW, PASSED or FAILED.

## Do and don't

- **Do** say what was compared and against what. **Don't** show "94%" as the result.
- **Do** mask every identifier until someone asks to see it. **Don't** list raw extracted fields.
- **Do** mark Batsi's checks with the agent lozenge. **Don't** make "Matches" mint; a match is success.
- **Do** say what matched and what did not. **Don't** write "Verified", "Passed", "Failed" or "Rejected": the check flags, HR decides.
