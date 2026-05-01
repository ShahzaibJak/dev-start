import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About",
  description: "Why ds-start exists — from starter template to composable app kit.",
}

export default function AboutPage(): React.ReactNode {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[32px_32px] opacity-25" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_0%,var(--muted)_0%,transparent_55%)] opacity-80" />
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20" style={{ minHeight: "280px" }}>
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            About
          </p>
          <h1
            className="mt-4 max-w-3xl font-semibold tracking-tight text-balance"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.1 }}
          >
            From starter template to composable app kit.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            ds-start exists to remove repeated setup so product work can start sooner.
          </p>
        </div>
      </section>

      {/* Origin */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_0%,var(--muted)_0%,transparent_55%)] opacity-70" />
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Origin
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              ds-start came out of repetition. I was building a lot with AI — spinning
              up Next.js projects, wiring up the same strict TypeScript config, the same
              oxlint and oxfmt setup, the same pre-commit hooks, the same env
              validation, the same API route patterns. Every new project started with
              hours of setup before I could write a product feature.
            </p>
            <p>
              Worse, every time I started a new AI coding session, I had to re-explain
              the project conventions, the quality gates, the patterns I wanted followed.
              The AI assistant had no memory of how I like to work.
            </p>
            <p>
              So I built the starter I wished I had. One command, and you get a project
              where the tooling is already wired, the types already flow end-to-end, and
              your AI assistant already understands the codebase conventions from the
              first prompt.
            </p>
            <p>
              Then the starter grew. People wanted auth, email, payments, forms — but not
              always at scaffold time. So ds-start became composable: a foundation you
              start from, plus modules you can install later. Same templates, same
              conventions, whether you scaffold fresh or add to an existing app.
            </p>
            <p>
              The latest evolution is the interactive wizard. Instead of passing
              flags or answering yes/no prompts one by one, you choose a build
              path — recommended production starter, app with auth, or base app —
              and the wizard walks you through the rest. Three presets cover the
              common cases; flags and{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                --base
              </code>{" "}
              remain for CI and power users.
            </p>
          </div>
        </div>
      </section>

      {/* Opinionated */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_100%,var(--muted)_0%,transparent_55%)] opacity-70" />
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Opinionated by design
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              ds-start is deliberately opinionated. It picks a stack and commits to it.
              That&apos;s not a limitation — it&apos;s the point. Opinions eliminate decisions.
              Decisions slow you down. When everything from your ORM to your commit
              messages follows a known convention, both you and your AI assistant can
              move faster.
            </p>
            <p>The stack reflects what I actually build production apps with:</p>
          </div>
          <ul className="mt-4 max-w-3xl divide-y rounded-xl border bg-background/95 shadow-sm backdrop-blur">
            <li className="flex items-start gap-3 px-4 py-3 text-sm">
              <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">Next.js + TypeScript strict</span>{" "}
                — the foundation. App Router, server components, Turbopack.
              </span>
            </li>
            <li className="flex items-start gap-3 px-4 py-3 text-sm">
              <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">Tailwind + shadcn/ui</span>{" "}
                — fast, consistent UI without fighting a component library.
              </span>
            </li>
            <li className="flex items-start gap-3 px-4 py-3 text-sm">
              <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">nuqs + React Query + next-ts-api + varlock</span>{" "}
                — URL state, server state, type-safe API routes, and validated env vars. No gaps in the chain.
              </span>
            </li>
            <li className="flex items-start gap-3 px-4 py-3 text-sm">
              <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">Prisma + Better Auth</span>{" "}
                — when you need a database and auth, they&apos;re one flag away and already integrated.
              </span>
            </li>
            <li className="flex items-start gap-3 px-4 py-3 text-sm">
              <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">Agent-ready workflows</span>{" "}
                — your coding agent gets structured workflows, not just a blank context window.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Vision */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_100%,var(--muted)_0%,transparent_55%)] opacity-70" />
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Vision
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              The way we build software is changing. AI coding agents are getting
              better fast, but they still work best when they have context — conventions
              to follow, quality gates to enforce, patterns to reuse. Most starters give
              you files. ds-start gives you a system: a foundation, composable modules,
              and agent workflows that work together.
            </p>
            <p>
              The goal is simple: you should be able to go from idea to deployed,
              production-grade app as fast as possible, with an AI assistant that&apos;s
              genuinely useful from the first prompt. Not because it&apos;s magic, but
              because someone already told it how this project works.
            </p>
            <p>
              See what&apos;s coming next on the{" "}
              <Link href="/roadmap" className="font-medium text-foreground underline">
                roadmap
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
