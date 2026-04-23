# Project Instructions

## Auth

- `proxy.ts` — Route protection via Clerk's `clerkMiddleware()` (Next.js 16)
- Auth pages: `/sign-in`, `/sign-up`, `/dashboard`
- Clerk manages users externally — no database tables needed for auth
- Use `currentUser()` in server components and `useUser()` in client components
- Use `auth()` in server components for session/auth state checks

## Auth Skills
- `/clerk` — Configure Clerk provider, proxy, server/client auth helpers, and environment variables.
