---
name: clerk
description: Configure Clerk authentication provider, ClerkProvider, proxy (middleware), server/client auth helpers, route protection, webhooks, and environment variables. Use when users mention Clerk, @clerk/nextjs, ClerkProvider, clerkMiddleware, or need to set up managed authentication with pre-built components.
---

# Clerk Integration Guide

**Always consult [clerk.com/docs](https://clerk.com/docs) for code examples and latest API.**

---

## Setup Workflow

1. Create app at [dashboard.clerk.com](https://dashboard.clerk.com)
2. Copy API keys from Dashboard → API Keys
3. Set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` in `.env.schema`
4. Wrap app in `<ClerkProvider>` in `layout.tsx`
5. Add `proxy.ts` with `clerkMiddleware()`
6. Run `bun run env:check` and `bun run dev`

---

## Quick Reference

### Environment Variables
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — Publishable key (safe for client)
- `CLERK_SECRET_KEY` — Secret key (server-only)
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` — Custom sign-in path (default: `/sign-in`)
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL` — Custom sign-up path (default: `/sign-up`)
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` — Redirect after sign-in (default: `/dashboard`)
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` — Redirect after sign-up (default: `/dashboard`)

### File Location
- `proxy.ts` — Root of project (Next.js 16 proxy, replaces middleware.ts)
- `app/layout.tsx` — Must wrap children in `<ClerkProvider>`

---

## Server Components

### `currentUser()`
Returns the full `User` object or `null`. Use for displaying user data.

```tsx
import { currentUser } from "@clerk/nextjs/server"

export default async function Page() {
  const user = await currentUser()
  if (!user) redirect("/sign-in")
  return <p>{user.firstName}</p>
}
```

### `auth()`
Returns auth state (`userId`, `sessionId`, `orgId`). Use for authorization checks.

```tsx
import { auth } from "@clerk/nextjs/server"

export default async function Page() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")
}
```

### `auth.protect()`
Throws `NEXT_REDIRECT` if unauthenticated. Simpler than manual checks.

```tsx
import { auth } from "@clerk/nextjs/server"

export default async function Page() {
  const { userId } = await auth.protect()
  // userId is guaranteed non-null here
}
```

---

## Client Components

### `useUser()`
Access user data in client components.

```tsx
"use client"
import { useUser } from "@clerk/nextjs"

export function UserGreeting() {
  const { user, isLoaded } = useUser()
  if (!isLoaded) return null
  return <p>Hello, {user?.firstName}</p>
}
```

### `useAuth()`
Access auth state (userId, sessionId, sign-out function).

```tsx
"use client"
import { useAuth } from "@clerk/nextjs"

export function AuthStatus() {
  const { isSignedIn, userId } = useAuth()
  return <p>{isSignedIn ? `Signed in: ${userId}` : "Not signed in"}</p>
}
```

---

## Pre-built Components

| Component | Purpose |
|-----------|---------|
| `<SignIn />` | Full sign-in flow (email, OAuth, MFA) |
| `<SignUp />` | Full sign-up flow |
| `<UserButton />` | Avatar dropdown with account management |
| `<UserProfile />` | Full account management page |
| `<SignOutButton>` | Wraps a child element to trigger sign-out |
| `<OrganizationSwitcher />` | Org picker (requires Organizations feature) |

### Custom pages with catch-all routes
Sign-in and sign-up use optional catch-all routes for multi-step flows:

```
app/sign-in/[[...sign-in]]/page.tsx
app/sign-up/[[...sign-up]]/page.tsx
```

---

## Route Protection (proxy.ts)

Next.js 16 uses `proxy.ts` instead of `middleware.ts`. Clerk's `clerkMiddleware()` works as a default export.

### Protect specific routes

```tsx
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
```

### Protect all routes (auth-required app)

```tsx
export default clerkMiddleware(async (auth) => {
  await auth.protect()
})
```

### Role-based protection

```tsx
const isAdminRoute = createRouteMatcher(["/admin(.*)"])

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    await auth.protect({ role: "admin" })
  }
})
```

---

## Webhooks

Clerk can send webhooks for user events. Install `svix` for signature verification.

```bash
bun add svix
```

```tsx
// app/api/clerk/webhook/route.ts
import { Webhook } from "svix"
import { headers } from "next/headers"
import type { WebhookEvent } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) throw new Error("Missing CLERK_WEBHOOK_SECRET")

  const headerPayload = await headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)
  const wh = new Webhook(WEBHOOK_SECRET)

  const evt = wh.verify(body, {
    "svix-id": svix_id,
    "svix-timestamp": svix_timestamp,
    "svix-signature": svix_signature,
  }) as WebhookEvent

  switch (evt.type) {
    case "user.created":
      // Sync user to your database
      break
    case "user.updated":
      break
    case "user.deleted":
      break
  }

  return new Response("OK", { status: 200 })
}
```

---

## Common Patterns

### Sync Clerk users to database
Use webhooks to keep a local user table in sync. Listen for `user.created`, `user.updated`, `user.deleted` events.

### Organizations
Enable in Clerk Dashboard → Organizations. Use `<OrganizationSwitcher />` and `auth().orgId` for multi-tenancy.

### Custom claims
Add metadata via Clerk Dashboard or API, access via `user.publicMetadata` / `user.privateMetadata`.

---

## Key Differences from Better Auth

| Aspect | Clerk | Better Auth |
|--------|-------|-------------|
| User storage | Managed by Clerk | Your database (Prisma) |
| Database required | No | Yes |
| Auth UI | Pre-built components | Custom forms |
| Session management | Clerk handles it | Your server |
| Pricing | Free tier + paid plans | Free / open-source |
| Customization | Dashboard + components | Full code control |
