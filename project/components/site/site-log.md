---
name: Site log line
group: site
status: ready
classes: pp-site-log
primeng: none (public site only, no PrimeNG)
replaces: the public site's .logline on the Learn more pages
---

# Site log line

A dashed pill under a demo that says what was written to the log.

## Anatomy

1. **Line** (`pp-site-log`): a `file-text` icon and the words, in a dashed pill.

## States

| State | How |
| --- | --- |
| Waiting | Hidden below its place while the demo plays (`pp-site-step`) |
| In | Steps in at the end of the demo (`pp-site-step--in`) |

## Behaviour

- It steps in with the other parts of a demo, opacity and transform only.

## Content

- Starts with "Logged:" when it reports a log entry, as the approved pages do. Copied word for word from the approved page.

## Accessibility

- The icon is decorative. The words are plain text.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Every change in Settings is written to the audit log. The app shows it in the audit log, not as a pill.

## Do and don't

- Do say who did what.
- Don't use it for an error or a warning; it only reports what was logged.
