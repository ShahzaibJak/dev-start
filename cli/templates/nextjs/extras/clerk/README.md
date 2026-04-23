# Clerk Auth

Adds authentication with Clerk. Includes pre-built sign-in/sign-up components, route protection via `proxy.ts`, and a protected dashboard page.

## First-run Setup

1. Create a Clerk application at [clerk.com/dashboard](https://dashboard.clerk.com)
2. Copy your API keys from **API Keys** in the Clerk Dashboard
3. Set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` in `.env.schema`

```bash
bun run env:check
bun run dev
```

## Key Files

| File | Purpose |
|---|---|
| `proxy.ts` | Route protection — Clerk's `clerkMiddleware()` with `createRouteMatcher` |
| `app/sign-in/[[...sign-in]]/page.tsx` | Sign-in page using Clerk's `<SignIn />` component |
| `app/sign-up/[[...sign-up]]/page.tsx` | Sign-up page using Clerk's `<SignUp />` component |
| `app/dashboard/page.tsx` | Protected dashboard with user info |
| `components/sign-out-button.tsx` | Sign-out button using Clerk's `<SignOutButton>` |

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Publishable key from Clerk Dashboard |
| `CLERK_SECRET_KEY` | Yes | Secret key from Clerk Dashboard |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | No | Custom sign-in path (default: `/sign-in`) |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | No | Custom sign-up path (default: `/sign-up`) |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | No | Redirect after sign-in (default: `/dashboard`) |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | No | Redirect after sign-up (default: `/dashboard`) |

## Route Protection

`proxy.ts` (Next.js 16) uses Clerk's `clerkMiddleware()` with `createRouteMatcher`:

- `/dashboard` and sub-routes require authentication — unauthenticated users are redirected to `/sign-in`
- Clerk handles session validation, MFA, and OAuth callbacks internally

## Next Steps

Use the `/clerk` skill for guidance on adding organizations, webhooks, custom claims, or role-based access control.
