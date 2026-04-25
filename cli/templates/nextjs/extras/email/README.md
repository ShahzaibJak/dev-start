# Email (Resend + React Email)

Transactional email using [Resend](https://resend.com) for delivery and [React Email](https://react.email) for type-safe, previewable templates.

## Setup

### 1. Get a Resend API Key

1. Create a [Resend account](https://resend.com/signup) or sign in
2. Go to **API Keys** and create a new key
3. Set `RESEND_API_KEY` in `.env.schema`

The default `EMAIL_FROM` (`onboarding@resend.dev`) works immediately for testing — no domain verification needed.

### 2. Verify Your Domain (production)

1. Go to **Domains** in the Resend Dashboard
2. Add your domain and follow the DNS verification steps
3. Update `EMAIL_FROM` in `.env.schema` to use your verified domain

## Preview Templates

```bash
bun run email:dev
```

Opens the React Email preview server at `http://localhost:4000`. Edit templates in `emails/` and see changes live.

## Key Files

| File | Purpose |
|---|---|
| `lib/email.ts` | Typed send helper — accepts a React Email component + props |
| `emails/layout.tsx` | Shared email layout wrapper |
| `emails/welcome.tsx` | Welcome email template |

## Adding a New Template

1. Create a new `.tsx` file in `emails/`
2. Import `EmailLayout` from `./layout`
3. Define your props interface and component
4. Send it:

```ts
import { sendEmail } from "@/lib/email"
import { MyTemplate } from "@/emails/my-template"

await sendEmail({
  to: "user@example.com",
  subject: "Hello",
  template: MyTemplate,
  props: { name: "World" },
})
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes | Resend API key |
| `EMAIL_FROM` | Yes | Default sender address (defaults to `onboarding@resend.dev`) |
