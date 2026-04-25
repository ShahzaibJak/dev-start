import Link from "next/link"
import { currentUser } from "@clerk/nextjs/server"
import { PricingTable } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { getPlanFromAuth } from "@/lib/billing"

export default async function BillingPage(): Promise<React.ReactNode> {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  const plan = await getPlanFromAuth()

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
          <p className="mt-2 text-2xl font-semibold capitalize">{plan.planSlug}</p>
          {!plan.isActive && (
            <p className="mt-1 text-sm text-muted-foreground">
              No active subscription — choose a plan below to get started.
            </p>
          )}
        </section>

        <section>
          <PricingTable />
        </section>
      </div>
    </main>
  )
}
