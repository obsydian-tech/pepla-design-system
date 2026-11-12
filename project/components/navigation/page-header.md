---
name: Page header
group: navigation
status: ready
classes: pp-page-header
primeng: none (plain Angular template)
replaces: per-page title blocks, the candidate workspace header
---

# Page header

The page header opens every page: where you are, what this page is, and the main things you can do here. Record pages add tabs at the bottom.

## Anatomy

1. **Breadcrumbs** (optional): the Breadcrumbs component, ending at the parent.
2. **Title**: the page or the record's name, `--font-heading-xlarge` (28px Manrope); 24px on phone.
3. **Description** or **meta** (optional): one line about the page ("38 people across 3 countries"), or a row of facts with small icons ("Finance manager", "Started 3 Feb 2025").
4. **Actions** (optional): at most one primary, one or two default buttons, then `ellipsis` for the rest. Aligned to the end of the title row.
5. **Tabs** (optional): the Tabs component, as the last row.

## States

| State | How |
| --- | --- |
| Loading | Title and meta show as skeleton lines in their final size; actions are hidden until the record loads |
| Long title | Wraps; never truncates |
| No permission for an action | The action is hidden; if the person expects it, the more menu shows it locked with a reason |

## Behaviour

- One page header per page, at the top of the content area, below the top navigation.
- Actions wrap below the title when there is no room. On phone they take the full width with the primary stretched at 48px, and secondary actions move into the more menu.
- The header scrolls away with the page; tabs do not stick.

## Content

- The title is the name, not a description: "Thandeka Dlamini", "People", "Bookkeeper". Sentence case.
- The description says what the page holds or what it is for, in one sentence with numbers in words where they help.
- Dates in the meta row are absolute: "Started 3 Feb 2025". Deadlines are relative: "Offer due in 2 days".
- Actions name the outcome: "Send document", "Add new employee".

## Accessibility

- A `<header>` with the title as the page's only `<h1>`.
- The breadcrumbs `<nav>` comes before the title in the source order.
- Icon-only actions have names that include the record: "More actions for Thandeka Dlamini".
- Meta icons are decorative; the words carry the meaning.

## PrimeNG mapping

No PrimeNG component. Compose the Naleko People classes with `p-breadcrumb` and `p-tabs` inside:

```html
<header class="pp-page-header">
  <p-breadcrumb [model]="crumbs" />
  <div class="pp-page-header__main">
    <div class="pp-page-header__text">
      <h1 class="pp-page-header__title">{{ person.name }}</h1>
    </div>
    <div class="pp-page-header__actions">
      <p-button label="Send document" />
    </div>
  </div>
  <p-tabs class="pp-page-header__tabs" [value]="tab">...</p-tabs>
</header>
```

## In Naleko People today

Every page builds its own title block, so heading sizes and where the actions sit vary from page to page. The candidate workspace header (name, stage, actions) is the most complete one and is the model for this component.

## Do and don't

- **Do** keep one primary action. **Don't** line up four buttons in the header.
- **Do** let long names wrap. **Don't** truncate a person's name.
- **Do** put tabs in the header for record pages. **Don't** put page actions in the top navigation.
