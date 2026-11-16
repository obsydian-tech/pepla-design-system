---
name: Site POPIA consent
group: site
status: ready
classes: pp-site-consent
primeng: none (public site only, no PrimeNG)
replaces: the public site's .cs, .cs-box, .tick and .cs-up on the Security page, which changed border, background and colour by transition
---

# Site POPIA consent

The privacy notice comes first. Once John Doe agrees to it, the upload unlocks, and only then is a document uploaded. The consent is logged.

## Anatomy

1. **Block** (`pp-site-consent`, `--agreed` once consent is given).
2. **Notice** (`pp-site-consent__notice`): the title (`__title`, "Privacy notice"), the text (`__text`) and the agreement line (`__agree`) with a tick box (`__box`). Agreed, a mint wash and border fade in and the box fills.
3. **Upload** (`pp-site-consent__upload`, `--locked` before consent): the `upload` icon, the words (a start-aligned [live status](site-state.html): "Upload ID document", then "ID document uploaded") and a status ("Locked", "Ready", "Uploaded").
4. **Log line** (`pp-site-consent__log`): "Logged: John Doe gave POPIA consent, 09:12".

## States

| State | How |
| --- | --- |
| Before consent | No wash, empty box, upload faded (`--locked`), status "Locked" |
| Agreed | `--agreed`: wash and tick fade in, the log line steps in |
| Ready | `--locked` comes off, status "Ready" |
| Uploaded | Words "ID document uploaded", status "Uploaded" |
| Still | Uploaded |

## Behaviour

- Agreed at 1.4s, ready at 2.4s, uploaded at 4s.
- Every change is a layer or a word stack that fades (opacity); the lock is an opacity fade.

## Content

- Copied from the approved page: "Privacy notice", "Naleko People collects identity and qualification documents for employment checks. The notice states how they are read and who can see them.", "John Doe agrees to the privacy notice", "Upload ID document", "ID document uploaded", "Locked", "Ready", "Uploaded" and the log line.

## Accessibility

- The upload status is a live region. Only the words on show are read.
- The tick box is decorative: the sentence says who agreed.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The consent step before the first upload in the new employee portal (ONB-05, ONB-06).

## Do and don't

- Do record consent before any document is collected.
- Don't unlock an upload before consent is given.
