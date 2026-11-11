---
name: pepla-design
description: Use this skill to design or build any Pepla interface (the HR platform for teams under 100 in South Africa, Zimbabwe and Zambia), for production code or for mock-ups. Holds the rules, tokens, components, icons and example screens.
user-invocable: true
---

Read `readme.md` first, then `tokens/` and the component usage notes in `components/`.

Standing rules, never broken:
- Semantic tokens only. No hex, rgb or palette step in a component or screen. CI rejects raw colours.
- Mint (`agent` tokens) only for what Pepla's AI agents did or propose. Coral (`warmth`) never for status or errors.
- Every status is an icon and a word. Every deadline is said in words.
- Every agent action uses the Agent proposal card: what, why now, what it read, where data goes, then approve / edit / decline.
- Personal data (IDs, bank, tax, health, salary) is masked until revealed, and revealing is logged.
- Lucide icons only, from the vocabulary table in `readme.md`. No emoji.
- Touch targets at least 44px. Text 4.5:1, icons and borders 3:1, in light and dark.
- Sample data is fictional. The product is called Pepla; the wordmark is lowercase `pepla`.

If something you need is missing, do not invent a one-off: say so, and propose a component or token for the system.
