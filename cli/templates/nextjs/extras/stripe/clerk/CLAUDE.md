# Project Instructions

## Billing (Clerk)

- `lib/billing.ts` — Server-side billing helpers wrapping Clerk's `has()` for plan/feature checks
- `app/billing/page.tsx` — Billing page with `<PricingTable />` component
- Plans and features are configured in the Clerk Dashboard — no Stripe SDK code needed
- Use `hasPlan()` and `hasFeature()` in server components for gating
- Use `requirePlan()` for redirecting users without the required plan
