import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

interface PlanInfo {
  planSlug: string
  isActive: boolean
}

export async function hasPlan(planSlug: string): Promise<boolean> {
  const { has } = await auth()
  return has({ plan: planSlug })
}

export async function hasFeature(featureSlug: string): Promise<boolean> {
  const { has } = await auth()
  return has({ feature: featureSlug })
}

export async function requirePlan(planSlug: string): Promise<void> {
  const active = await hasPlan(planSlug)

  if (!active) {
    redirect("/billing")
  }
}

export async function getPlanFromAuth(): Promise<PlanInfo> {
  const plans = ["enterprise", "pro", "free"]

  for (const planSlug of plans) {
    const active = await hasPlan(planSlug)

    if (active) {
      return { planSlug, isActive: true }
    }
  }

  return { planSlug: "free", isActive: false }
}
