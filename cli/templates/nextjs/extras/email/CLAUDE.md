# Project Instructions

## Email

- `lib/email.ts` — Encapsulated send helper; accepts a React Email template + props, sends via Resend
- `emails/` — React Email templates (`.tsx` components)
- `emails/layout.tsx` — Shared email layout wrapper (use for all templates)
- Do not import the Resend client directly — use the `sendEmail` function from `lib/email.ts`
- Run `bun run email:dev` to preview templates in the browser (port 4000)
- To add a new template: create a `.tsx` file in `emails/`, import `EmailLayout`, then call `sendEmail` with the component
