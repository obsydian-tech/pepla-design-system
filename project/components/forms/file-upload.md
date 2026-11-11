---
name: File upload
group: forms
status: ready
classes: pp-file-upload, pp-file-list, pp-file
primeng: FileUpload (p-fileupload)
replaces: p-fileupload with default theme, bare input type="file", the document checklist's upload links
---

# File upload

File upload takes documents and photos: IDs, bank letters, payslips, certificates. It says up front which files work and how big they can be, shows each file's progress, and says plainly when one fails.

## Anatomy

1. **Drop zone**: 2px dashed `--color-border-bold`, `--radius-large`, `--elevation-surface-raised`.
2. **Icon**: `upload` (or `file-text`, `id-card` for a named document) in a 48px violet-tinted circle.
3. **Title**: "Drag Sipho's ID here, or choose a file". On phone only "choose a file" shows, because phones cannot drag.
4. **Hint**: accepted types and size in words: "PDF, JPG or PNG, up to 5 MB".
5. **Choose button**: a `<label class="pp-button">` for the hidden file input.
6. **File row**: file icon, name, size, status, actions (cancel, remove, try again), and a small Progress bar while uploading.

## Appearances

| Class | Use | Never |
| --- | --- | --- |
| `pp-file-upload` | One document or a few, on a form or in the new-hire portal | Several on one screen; use compact rows instead |
| `pp-file-upload--compact` | One row per required document inside a checklist | For bulk upload |

## States

| State | How |
| --- | --- |
| Empty | Dashed border, icon, title, hint, button |
| Hover | `--elevation-surface-raised-hovered` |
| Dragging over | `pp-file-upload--dragover`: solid `--color-border-selected`, `--color-background-selected`, title "Drop to upload" |
| Focus | 2px violet ring around the whole zone when the input has keyboard focus |
| Invalid | `pp-file-upload--invalid`: danger border, and a Field error that names the file and the fix |
| Disabled | `pp-file-upload--disabled`; the hint says why |
| File uploading | Small Progress bar, "Uploading, 64%", a cancel button |
| File uploaded | `circle-check` and "Uploaded" in success colours |
| File checked by Pepla | Agent Lozenge "Checked by Pepla" with `sparkles`, only after Pepla's agent has read and checked it (rule 1) |
| File failed | `pp-file--error`: danger tint, `octagon-alert` and the reason, "Try again" and remove |

## Behaviour

- Check type and size in the browser before uploading, and again on the server. Reject at once with a reason; never upload 12 MB to say no.
- Upload as soon as a file is chosen. The form's own save button does not wait for a second "Upload" press.
- Phone photos: accept HEIC and convert it; rotate by the photo's own orientation.
- ID and bank documents are personal data (rule 6): the file name shows, the preview needs a deliberate open that is logged.
- Removing an uploaded document that someone already approved keeps it in the audit trail (rule 7) and asks for a reason.
- After upload, Pepla's agent may check the document. Its result is a separate step that shows as an agent Lozenge, never as the upload status.

## Content

- Title names the document and the person when known: "Drag Sipho's ID here, or choose a file".
- Hint gives types and size in words: "PDF, JPG or PNG, up to 5 MB". Add one tip if it saves a retry: "A phone photo is fine if all four corners show."
- Errors name the file and the fix: "bank-letter.docx is a Word file. Save it as a PDF and try again." "Too big. The limit is 5 MB."
- Sizes: `840 KB`, `1.2 MB`, `12.4 MB`.

## Accessibility

- The real `<input type="file">` stays in the page, visually hidden, with `aria-labelledby` (the field label) and `aria-describedby` (hint and error).
- The visible button is its `<label>`, so keyboard and screen reader users never need to drag.
- Each row's buttons name the file: "Remove matric-certificate.pdf", "Cancel upload of payslip-october-2026.pdf".
- Progress uses a native `<progress>` with a label; announce "Uploaded" or the error in a polite live region once per file.
- Status is an icon and words (rule 4), never a coloured border alone.

## PrimeNG mapping

```ts
fileupload: {
  root: ({ state }) => ({ class: ['pp-file-upload', { 'pp-file-upload--dragover': state.dragHighlight }] }),
  input: { class: 'pp-file-upload__input' },
  pcChooseButton: { root: { class: 'pp-button pp-button--default pp-file-upload__browse' } },
  pcUploadButton: { root: { style: 'display:none' } },
  pcCancelButton: { root: { style: 'display:none' } },
  content: { class: 'pp-file-list' },
  file: { class: 'pp-file' },
  fileName: { class: 'pp-file__name' },
  fileSize: { class: 'pp-file__meta' },
  pcProgressbar: { root: { class: 'pp-progress-bar pp-file__progress' } }, // the track inside: pp-progress-bar__track pp-progress-bar__track--small
},
```

Use `mode="advanced"`, `[auto]="true"`, `accept` and `maxFileSize`, and replace the `content` and `empty` templates with the markup above so the messages are Pepla's.

## In Pepla today

File inputs appear on the new employee registration form, the document row and the tenant branding card. Each builds its own upload control and messages.

## Do and don't

- **Do** say the types and the limit before anyone tries. **Don't** let them find the limit by failing.
- **Do** name the file and the fix in an error. **Don't** say "Upload failed".
- **Do** show "Checked by Pepla" only when the agent checked it. **Don't** use mint for a plain "Uploaded".
