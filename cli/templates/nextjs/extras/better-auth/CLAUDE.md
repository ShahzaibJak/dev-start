# Project Instructions

## Auth

- `lib/auth.ts` — Server config with Prisma adapter, Google OAuth, and password reset handler
- `lib/auth-client.ts` — React client instance
- `proxy.ts` — Route protection via optimistic cookie check (Next.js 16)
- Auth pages: `/sign-in`, `/sign-up`, `/forgot-password`, `/reset-password`, `/dashboard`
- Google OAuth is optional — disabled when `GOOGLE_CLIENT_ID` is empty
- Password reset uses a console.log stub — replace with real email transport before deploying

## Auth Skills
- `/better-auth-best-practices` — Configure Better Auth server and client, database adapters, sessions, plugins, and environment variables.
