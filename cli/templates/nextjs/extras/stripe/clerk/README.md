# Clerk Billing

## Setup

### 1. Enable Billing in Clerk Dashboard

1. Go to [Clerk Dashboard](https://dashboard.clerk.com) → **Configure** → **Billing**
2. Enable **Billing** and connect your Stripe account
3. Clerk manages the Stripe integration — no Stripe API keys needed in your app

### 2. Create Plans

1. In Clerk Dashboard → **Billing** → **Plans**
2. Create your subscription plans (e.g., Free, Pro, Enterprise)
3. Attach Stripe prices to each plan
4. Optionally add **Features** to plans for granular access control

### 3. Using Billing Helpers

```typescript
// Server component — check if user has a plan
import { hasPlan, hasFeature, requirePlan } from "@/lib/billing"

// Check plan access
const isPro = await hasPlan("pro")

// Check feature access
const canExport = await hasFeature("export")

// Redirect if user doesn't have the plan
await requirePlan("pro")
```

### 4. PricingTable Component

The `/billing` page renders Clerk's `<PricingTable />` component, which automatically displays plans configured in your Clerk Dashboard.

No additional configuration needed — the component reads plans from Clerk directly.
