import { headers } from "next/headers"

import { auth } from "@/lib/auth"

interface PlanLimits {
  projects: number
}

const PLAN_LIMITS: Record<string, PlanLimits> = {
  free: { projects: 3 },
  pro: { projects: 25 },
  enterprise: { projects: 100 },
}

const DEFAULT_LIMITS: PlanLimits = { projects: 3 }

export async function getPlanName(): Promise<string> {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    return "free"
  }

  const subscriptions = await auth.api.listActiveSubscriptions({
    headers: await headers(),
  })

  if (!subscriptions || subscriptions.length === 0) {
    return "free"
  }

  return subscriptions[0].plan ?? "free"
}

export async function getSubscriptionLimits(): Promise<PlanLimits> {
  const planName = await getPlanName()
  return PLAN_LIMITS[planName] ?? DEFAULT_LIMITS
}

export async function isOnPlan(planName: string): Promise<boolean> {
  const currentPlan = await getPlanName()
  return currentPlan === planName
}
