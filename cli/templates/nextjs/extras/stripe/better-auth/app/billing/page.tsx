import Link from "next/link"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"
import { getPlanName, getSubscriptionLimits } from "@/lib/billing"
import { BillingActions } from "@/components/billing-actions"

export default async function BillingPage(): Promise<React.ReactNode> {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/sign-in")
  }

  const currentPlan = await getPlanName()
  const limits = await getSubscriptionLimits()

  return (
    <main className="min-h-svh bg-background">
      <div className="mx-auto flex min-h-svh max-w-5xl flex-col gap-10 px-6 py-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Subscription
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">Billing</h1>
          </div>
          <Link
            className="text-sm text-muted-foreground underline underline-offset-4"
            href="/dashboard"
          >
            Back to Dashboard
          </Link>
        </div>

        <section className="rounded-3xl border bg-card p-6">
          <p className="text-sm font-medium">Current plan</p>
          <p className="mt-2 text-2xl font-semibold capitalize">{currentPlan}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {limits.projects} projects included
          </p>
        </section>

        <BillingActions currentPlan={currentPlan} />
      </div>
    </main>
  )
}
