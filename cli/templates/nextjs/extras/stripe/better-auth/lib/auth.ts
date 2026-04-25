import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { stripe } from "@better-auth/stripe"
import Stripe from "stripe"

import { prisma } from "@/lib/prisma"

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY ?? "")

export const auth = betterAuth({
  appName: "Dev-Start",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      // TODO: Replace with a real email transport (Resend, Nodemailer, etc.)
      // This console.log lets you test the flow locally — copy the URL from your terminal.
      console.log(`[auth] Password reset for ${user.email}: ${url}`)
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      enabled: Boolean(process.env.GOOGLE_CLIENT_ID),
    },
  },
  plugins: [
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",
      createCustomerOnSignUp: true,
      subscription: {
        enabled: true,
        plans: [
          {
            name: "free",
            priceId: "price_free_placeholder",
            limits: { projects: 3 },
          },
          {
            name: "pro",
            priceId: "price_pro_placeholder",
            limits: { projects: 25 },
          },
          {
            name: "enterprise",
            priceId: "price_enterprise_placeholder",
            limits: { projects: 100 },
          },
        ],
      },
    }),
  ],
})
