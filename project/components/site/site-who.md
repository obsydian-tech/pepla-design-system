---
name: Site who did it
group: site
status: ready
classes: pp-site-who
primeng: none (public site only, no PrimeNG)
replaces: the public site's .who2 with .ag and .pp, which used literal colours and sizes
---

# Site who did it

The name on an audit entry or an approval queue item, with a small tag that says whether a person or Batsi did it. It is how the site shows that Batsi's actions and people's actions are kept apart.

## Anatomy

1. **Block** (`pp-site-who`, with `--agent` or `--person`): the name in the agent (mint) or brand (violet) colour.
2. **Kind** (`pp-site-who__kind`): "Agent" or "Person" in small capitals on a tinted tag, before the name.

## States

| State | How |
| --- | --- |
| Agent | `pp-site-who--agent`: mint tag, "Agent", the name "Batsi" |
| Person | `pp-site-who--person`: violet tag, "Person", the person's name |

## Behaviour

- Static. It arrives with the entry or item it belongs to.

## Content

- Copied from the approved pages: "Agent" with "Batsi"; "Person" with "John Doe" or "Jane Smith".
- Never "AI". Batsi is always tagged "Agent".

## Accessibility

- The kind is real text, read before the name ("Agent Batsi", "Person Jane Smith"), so colour is never the only signal.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

The actor on an audit event row: Batsi's actions carry the agent mark, people's carry their name.

## Do and don't

- Do tag every entry with who did it.
- Don't show a Batsi action without the Agent tag.
