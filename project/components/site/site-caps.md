---
name: Site capabilities
group: site
status: ready
classes: pp-site-caps
primeng: none (public site only, no PrimeNG)
replaces: the public site's .caps and .cap, which used literal sizes and colours
---

# Site capabilities

A row of four short columns that closes a module section: what the module does, in a title and a sentence each. A column that Batsi does the work for carries the Batsi tag.

## Anatomy

1. **List** (`pp-site-caps`): an unordered list. One column on a phone, two from 768px, four from 1080px (of the section's width, not the window's).
2. **Item** (`pp-site-caps__item`): a list item with a 2px rule on top in the text colour.
3. **Title** (`pp-site-caps__title`): `--font-heading-small`, a noun phrase.
4. **Text** (`pp-site-caps__text`): `--font-body`, one or two short sentences, subtle text.
5. **Batsi tag** (optional): a `pp-lozenge pp-lozenge--agent` with `sparkles` and the word "Batsi", under the text.

## States

Static. A column is not a link; a section's "Learn more" is a [Link](../actions/link.html) under the list.

## Behaviour

- Items may carry `pp-site-reveal` with `--_i` 0 to 3, so the four arrive one after another.
- Two columns at 768px leave an odd one out when there are three items. Use four, or use [Layout](../layout/layout.html) columns.

## Content

- Title: a noun phrase of two to four words ("Interview panels", "Reminders at 60, 30 and 7 days").
- Text: states what happens and who decides. Factual, the product as the subject. "No candidate is rejected automatically." No "you".
- The Batsi tag only where Batsi does the work. HR makes every decision, so no column says Batsi decides.
- Exactly four columns per section, so the row fills at 1080px.

## Accessibility

- A list, so a screen reader announces "list, 4 items". Titles are `h3`.
- The rule is decoration; colour carries no meaning. Text is 13:1 (title) and 9:1 (text) on white.
- The tag's text is "Batsi", not only the icon.

## PrimeNG mapping

None. The public site does not use PrimeNG.

## In Naleko People today

Not in the signed-in app. Source: the approved public site, the four columns under each module demo.

## Do and don't

- Do keep every title to one line at 1080px.
- Do put the Batsi tag on the columns where Batsi does the work, and only there.
- Don't add icons, numbers or links to the columns.
- Don't use more than four, or fewer than four.
