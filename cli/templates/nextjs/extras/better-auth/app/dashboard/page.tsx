import Link from "next/link"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { SignOutButton } from "@/components/sign-out-button"
import { auth } from "@/lib/auth"

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
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
            <p className="text-sm font-medium">Current session</p>
            <dl className="mt-4 grid gap-4 text-sm">
              <div className="rounded-2xl border bg-background p-4">
                <dt className="text-muted-foreground">Name</dt>
                <dd className="mt-1 font-medium">{session.user.name}</dd>
              </div>
              <div className="rounded-2xl border bg-background p-4">
                <dt className="text-muted-foreground">Email</dt>
                <dd className="mt-1 font-medium">{session.user.email}</dd>
              </div>
              <div className="rounded-2xl border bg-background p-4">
                <dt className="text-muted-foreground">Session expires</dt>
                <dd className="mt-1 font-medium">
                  {new Date(session.session.expiresAt).toLocaleString()}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-3xl border bg-card p-6">
            <p className="text-sm font-medium">Setup contract</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
              <li>
                Run <code>bun run auth:generate</code> after changing the Better Auth config or
                plugins.
              </li>
              <li>
                Apply schema changes with <code>bun run db:migrate -- --name init</code>.
              </li>
              <li>
                Refresh Prisma Client with <code>bun run db:generate</code>.
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
