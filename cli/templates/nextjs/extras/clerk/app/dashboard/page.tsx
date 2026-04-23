import Link from "next/link"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import { SignOutButton } from "@/components/sign-out-button"

export default async function DashboardPage(): Promise<React.ReactNode> {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <main className="min-h-svh bg-background">
      <div className="mx-auto flex min-h-svh max-w-5xl flex-col justify-between gap-10 px-6 py-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Protected example
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">Dashboard</h1>
          </div>
          <SignOutButton />
        </div>

        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl border bg-card p-6">
            <p className="text-sm font-medium">Current user</p>
            <dl className="mt-4 grid gap-4 text-sm">
              <div className="rounded-2xl border bg-background p-4">
                <dt className="text-muted-foreground">Name</dt>
                <dd className="mt-1 font-medium">
                  {user.firstName} {user.lastName}
                </dd>
              </div>
              <div className="rounded-2xl border bg-background p-4">
                <dt className="text-muted-foreground">Email</dt>
                <dd className="mt-1 font-medium">
                  {user.emailAddresses[0]?.emailAddress}
                </dd>
              </div>
              <div className="rounded-2xl border bg-background p-4">
                <dt className="text-muted-foreground">Clerk User ID</dt>
                <dd className="mt-1 font-mono text-xs font-medium">{user.id}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-3xl border bg-card p-6">
            <p className="text-sm font-medium">Setup contract</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
              <li>
                Set your <code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> and{" "}
                <code>CLERK_SECRET_KEY</code> in <code>.env.schema</code>.
              </li>
              <li>
                Manage users, sessions, and organizations from the{" "}
                <a
                  href="https://dashboard.clerk.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  Clerk Dashboard
                </a>
                .
              </li>
              <li>
                Use the <code>/clerk</code> skill for guidance on webhooks, organizations, and
                custom claims.
              </li>
            </ul>

            <Link className="mt-6 inline-block text-sm underline underline-offset-4" href="/">
              Return to the project overview
            </Link>
          </section>
        </div>
      </div>
    </main>
  )
}
