import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About",
  description: "Why ds-start exists and the vision behind it.",
}

export default function AboutPage(): React.ReactNode {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <p className="mt-2 text-muted-foreground">
        Why ds-start exists and where it&apos;s going.
      </p>

      {/* Origin */}
      <section className="mt-12">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Origin
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            ds-start came out of repetition. I was building a lot with AI — spinning
            up Next.js projects, wiring up the same strict TypeScript config, the same
            oxlint and oxfmt setup, the same pre-commit hooks, the same env
            validation, the same API route patterns. Every new project started with
            hours of boilerplate before I could write a single feature.
          </p>
          <p>
            Worse, every time I started a new AI coding session, I had to re-explain
            the project conventions, the quality gates, the patterns I wanted followed.
            The AI assistant had no memory of how I like to work.
          </p>
          <p>
            So I built the template I wished I had. One command, and you get a project
            where the tooling is already wired, the types already flow end-to-end, and
            your AI assistant already understands the codebase conventions from the
            first prompt.
          </p>
        </div>
      </section>

      {/* Opinionated */}
      <section className="mt-12">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Opinionated by design
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            ds-start is deliberately opinionated. It picks a stack and commits to it.
            That&apos;s not a limitation — it&apos;s the point. Opinions eliminate decisions.
            Decisions slow you down. When everything from your ORM to your commit
            messages follows a known convention, both you and your AI assistant can
            move faster.
          </p>
          <p>
            The stack reflects what I actually build production apps with:
          </p>
          <ul className="space-y-2 pl-4">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
              <span>
                <span className="font-medium text-foreground">Next.js + TypeScript strict</span>{" "}
                — the foundation. App Router, server components, Turbopack.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
              <span>
                <span className="font-medium text-foreground">Tailwind + shadcn/ui</span>{" "}
                — fast, consistent UI without fighting a component library.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
              <span>
                <span className="font-medium text-foreground">nuqs + React Query + next-ts-api + varlock</span>{" "}
                — URL state, server state, type-safe API routes, and validated env vars. No gaps in the chain.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
              <span>
                <span className="font-medium text-foreground">Prisma + Better Auth</span>{" "}
                — when you need a database and auth, they&apos;re one flag away and already integrated.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
              <span>
                <span className="font-medium text-foreground">Built-in AI skills</span>{" "}
                — your AI assistant gets structured workflows, not just a blank context window.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Vision */}
      <section className="mt-12">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Vision
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            The way we build software is changing. AI coding assistants are getting
            better fast, but they still work best when they have context — conventions
            to follow, quality gates to enforce, patterns to reuse. Most starters give
            you files. ds-start gives you a system.
          </p>
          <p>
            The goal is simple: you should be able to go from idea to deployed,
            production-grade app as fast as possible, with an AI assistant that&apos;s
            genuinely useful from the first prompt. Not because it&apos;s magic, but
            because someone already told it how this project works.
          </p>
          <p>
            See what&apos;s coming next on the{" "}
            <Link
              href="/roadmap"
              className="font-medium text-foreground underline"
            >
              roadmap
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
