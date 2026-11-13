---
name: Site subnav
group: site
status: ready
classes: pp-site-subnav
primeng: none (public site only, no PrimeNG)
replaces: the module pages' sub-menu, which slid a dark pill with left and width and used literal colours and blur
---

# Site subnav

The "on this page" bar of a module page: the page name and one tab per section. It sticks under the header while the page scrolls, and a highlight slides to the section in view.

## Anatomy

1. **Subnav** (`pp-site-subnav`): a `<nav aria-label="On this page">`, sticky at `--layout-site-header-height-shrunk` and `--layout-site-subnav-height` (56px) tall, frosted like the header.
2. **Bar** (`pp-site-subnav__bar`): the content row, at most `--layout-site-max` wide inside the site gutters.
3. **Title** (`pp-site-subnav__title`): the module name. Shown from 1280px wide.
4. **Tabs** (`pp-site-subnav__tabs`): one link (`pp-site-subnav__link`) per section. They scroll sideways inside the bar when they do not fit, with a soft fade at both edges.
5. **Highlight** (`pp-site-subnav__pill`): one neutral block that sits behind the current tab. It is `aria-hidden`.

## States

| State | How |
| --- | --- |
| No section in view | No tab current, highlight hidden |
| Section in view | The tab has `aria-current="true"` and `pp-site-subnav--active` is on the subnav; the highlight is under that tab |
| Tab hover | Full text colour |
| Tab focus | The Naleko focus ring |

## Behaviour

- The page script, not the CSS, decides which section is in view: it sets `aria-current="true"` on the matching tab and gives the highlight two inputs, `--_x` (the tab's left edge, in px) and `--_sx` (the tab's width divided by the highlight's own width, unitless). The highlight moves with `transform` only: `translateX` then `scaleX`. In the Angular site this is a small directive on the window scroll and the section elements.
- At the very end of the page the last tab is current, even when its section is too short to reach the top.
- The first time a tab becomes current the highlight appears under it without travelling; after that it slides over `--motion-site-duration-menu`.
- A tab that is out of view in the scrolling row is scrolled into view.
- A tap on a tab scrolls to its section, which stops under the header and the subnav (`scroll-margin-top`: header height plus subnav height).
- The preview on the UI kit page has a small script that does all of this. It is preview-only: it lives in `scripts/preview/` and is not part of the component or the site.

## Content

- Title: the module's name, for example "Leave Management".
- Tabs: one to six short noun phrases that match the section headings: "Leave types", "Requests", "Approvals", "Balances and calendar", "Questions".

## Accessibility

- A `<nav>` named "On this page"; the current tab is marked with `aria-current="true"`, not by colour alone (the highlight sits behind it).
- Tabs are 44px tall (`--size-touch-target`).
- Under the header: the subnav is one layer below it, so an open menu list always covers it.
- Reduced motion: the highlight fades in under the new tab instead of travelling.
- Still mode (`data-site-still`) switches the slide off.

## PrimeNG mapping

None. In Angular, `<pp-site-subnav>` wraps the same classes and a directive follows the scroll.

## In Naleko People today

Not in the signed-in app. Source: the sub-menu of the module pages of the approved site: a dark pill moved with `left` and `width`, white text switched on the current tab, a literal blur and literal colours.

## Do and don't

- Do keep to six tabs or fewer, in page order.
- Do make every tab point at a section on the same page.
- Don't put a different page in the tabs; that is the menu.
- Don't animate the highlight's width or position. Set `--_x` and `--_sx`.
- Don't change the text colour with a transition; the highlight is neutral so no colour change is needed.
