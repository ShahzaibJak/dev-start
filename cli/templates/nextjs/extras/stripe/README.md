# Stripe Billing

## Setup

### 1. Stripe Dashboard

1. Create a [Stripe account](https://dashboard.stripe.com/register) or sign in
2. Switch to **Test mode** (toggle in the top-right)
3. Go to **Products** and create your plans (Free, Pro, Enterprise)
4. Copy each plan's **Price ID** (starts with `price_`)

### 2. Environment Variables

Copy the required keys from your Stripe Dashboard → Developers → API keys:

```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 3. Replace Placeholder Price IDs

Search for `price_*_placeholder` in your code and replace with real Stripe Price IDs from step 1.

### 4. Testing with Stripe CLI

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login and forward webhooks to your local server
stripe login
stripe listen --forward-to localhost:3000/api/auth/stripe/webhook
```

Use the webhook signing secret printed by `stripe listen` as your `STRIPE_WEBHOOK_SECRET`.

## Test Cards

| Card Number          | Scenario         |
|---------------------|------------------|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0000 0000 9995` | Declined payment   |
| `4000 0025 0000 3155` | Requires 3D Secure |

Use any future expiry date and any 3-digit CVC.
