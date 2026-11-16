---
name: Site Integrations
device: desktop
order: 31
preview: site-sections, site-integrations
source: the Integrations section of landing-concepts/naleko-concept-d.html (markup and script)
---

# Site Integrations

The landing page's Integrations section: the code editor (the one dark surface on the site) beside the Naleko People panel, over a violet light and grid that follow the pointer. In the live frames the code types itself in, the panel reacts, then the next tab plays (REST API, then MCP server, then Events); clicking a tab plays only that one, and "Play again" starts from the REST API. That behaviour comes from a preview-only script, not from a component.

## Screens

- **Landing: Integrations**. REST API: a check on John Doe waits in the approval queue, Batsi drafts a reminder, Jane Smith approves. MCP server: an AI assistant calls an allowed tool, then a tool that needs approval. Events: three deliveries to the payroll and safety systems. Uses Site code editor, Site connection panel, Site integrations layout, Site capability columns, Site live status.
- Shown at desktop width and at 390px.

## Where the redraw changes the approved site

See `DEVIATIONS.md` for the full table. In short:

- **Colours are design system tokens**, including the code colours (`color.site.code.*`) and a new `color.site.glow.violet` for the light.
- **Every motion is kept.** The tab label's colour and the tool tint fade on copies and layers; the status changes crossfade.
- **Not on this page:** the menu's MCP server and Events links that open their tab (`#mcp`, `#events`). They need the site header and belong to the assembled landing page (chunk 14).
