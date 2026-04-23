import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const stack = [
  {
    name: "Next.js 16",
    href: "https://nextjs.org",
    icon: (
      <svg viewBox="0 0 180 180" fill="none" className="size-5">
        <mask id="a" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
          <circle cx="90" cy="90" r="90" fill="currentColor" />
        </mask>
        <g mask="url(#a)">
          <circle cx="90" cy="90" r="90" fill="currentColor" />
          <path d="M149.508 157.52L69.142 54H54v71.97h12.114V69.384l73.885 95.461a90.304 90.304 0 009.509-7.325z" fill="url(#b)" />
          <rect x="115" y="54" width="12" height="72" fill="url(#c)" />
        </g>
        <defs>
          <linearGradient id="b" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--background)" />
            <stop offset="1" stopColor="var(--background)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="c" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--background)" />
            <stop offset="1" stopColor="var(--background)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "React 19",
    href: "https://react.dev",
    icon: (
      <svg viewBox="-11.5 -10.232 23 20.463" className="size-5" fill="currentColor">
        <circle r="2.05" />
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: "TypeScript",
    href: "https://www.typescriptlang.org",
    icon: (
      <svg viewBox="0 0 28 28" className="size-5" fill="currentColor">
        <rect width="28" height="28" rx="3" fill="currentColor" />
        <path d="M17.5 14v1.5h-3v8h-2v-8h-3V14h8zm1 4.7c0-1.7 1.3-2.5 3.2-2.7l1.3-.1v-.5c0-.7-.4-1.1-1.2-1.1-.7 0-1.2.4-1.3 1h-1.8c.1-1.5 1.3-2.5 3.2-2.5 1.8 0 3 1 3 2.6v5.1h-1.8l-.1-.9c-.4.7-1.1 1.1-2 1.1-1.4 0-2.5-.8-2.5-2zm1.8-.2c0 .6.5 1 1.3 1 .9 0 1.5-.7 1.5-1.6v-.5l-1.2.1c-1 .1-1.6.4-1.6 1z" fill="var(--background)" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS 4",
    href: "https://tailwindcss.com",
    icon: (
      <svg viewBox="0 0 54 33" className="size-5" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" />
      </svg>
    ),
  },
  {
    name: "shadcn/ui",
    href: "https://ui.shadcn.com",
    icon: (
      <svg viewBox="0 0 256 256" className="size-5" fill="none" stroke="currentColor" strokeWidth="20" strokeLinecap="round">
        <line x1="208" y1="128" x2="128" y2="208" />
        <line x1="192" y1="40" x2="40" y2="192" />
      </svg>
    ),
  },
  {
    name: "next-ts-api",
    href: "https://github.com/zahinafsar/next-ts-api",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    name: "varlock",
    href: "https://varlock.dev",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
]

const agenticFlow = [
  {
    step: "1",
    command: "/start-prd",
    title: "Plan",
    detail: "Interview-driven PRD creation. Explores your codebase, asks targeted questions, outputs a step-by-step implementation plan.",
  },
  {
    step: "2",
    command: "/start-work",
    title: "Build",
    detail: "Begin or resume implementation from a PRD. Follows plan steps sequentially, enforces type safety, runs quality gates.",
  },
  {
    step: "3",
    command: "/handoff",
    title: "Handoff",
    detail: "Save session progress for continuity. Captures completed steps, current state, decisions, and insights for the next session.",
  },
  {
    step: "4",
    command: "/start-review",
    title: "Review",
    detail: "Run quality gates and review the diff. Checks lint, typecheck, tests plus code quality, logic, patterns, and security.",
  },
  {
    step: "5",
    command: "/start-pr",
    title: "Ship",
    detail: "Commit changes and create a PR with conventional commit messages, pre-commit hooks, and gh CLI integration.",
  },
]

const features = [
  {
    label: "End-to-end type safety",
    detail: "Types flow from database schema through server actions to client components. Prisma generates from your DB, next-ts-api types your API routes, varlock validates env vars — all at compile time.",
  },
  {
    label: "Agentic coding flows",
    detail: "Built-in skills for plan-driven development. Your AI coding assistant understands your project conventions, runs quality gates, and follows structured workflows out of the box.",
  },
  {
    label: "Production tooling",
    detail: "ESLint, Prettier, strict TypeScript, Husky pre-commit hooks, and optional extras for Prisma, auth, CI/CD — all wired up from the first commit.",
  },
]

const quickStart = [
  { cmd: "bun run dev", note: "Start the dev server" },
  { cmd: "bun run build", note: "Production build" },
  { cmd: "bun run typecheck", note: "Verify types" },
  { cmd: "bun run env:check", note: "Validate environment" },
]

export default function Page() {
  return (
    <main className="min-h-svh bg-background">
      <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-24 px-6 py-12 sm:py-20">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-foreground text-xs font-bold text-background">
              DS
            </div>
            <span className="text-sm font-medium tracking-tight">ds-start</span>
          </div>
          <span className="font-mono text-[11px] text-muted-foreground">
            press <kbd className="rounded border px-1 py-0.5 text-[10px]">d</kbd> to
            toggle theme
          </span>
        </header>

        {/* Hero */}
        <section className="flex flex-col gap-6">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            AI-native &middot; type-safe &middot; production-ready
          </p>
          <h1 className="text-[clamp(2rem,5vw,3.25rem)] leading-[1.1] font-semibold tracking-tight text-balance">
            Ship faster with types from DB&nbsp;to&nbsp;UI and AI that knows your&nbsp;codebase.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            ds-start scaffolds a Next.js app with end-to-end type safety, agentic coding
            flows, and production tooling. No boilerplate cleanup&nbsp;needed.
          </p>
        </section>

        {/* Stack */}
        <section className="flex flex-col gap-6">
          <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Built with
          </h2>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-4">
            {stack.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2.5 bg-card px-4 py-5 transition-colors hover:bg-accent"
              >
                <span className="text-foreground">{item.icon}</span>
                <span className="text-center font-mono text-[11px] text-muted-foreground">
                  {item.name}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="flex flex-col gap-6">
          <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Why ds-start
          </h2>
          <div className="grid gap-px overflow-hidden rounded-2xl border bg-border">
            {features.map((f) => (
              <div key={f.label} className="bg-card px-6 py-5">
                <p className="text-sm font-medium">{f.label}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {f.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Agentic Workflow */}
        <section className="flex flex-col gap-6">
          <div>
            <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Agentic coding flow
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Built-in skills that guide your AI assistant through a structured development
              cycle.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {agenticFlow.map((item) => (
              <Card key={item.command} className="overflow-hidden">
                <CardContent className="flex gap-4 p-0">
                  <div className="flex w-12 shrink-0 items-center justify-center bg-muted font-mono text-xs text-muted-foreground">
                    {item.step}
                  </div>
                  <div className="flex flex-1 flex-col gap-1 py-4 pr-5">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">{item.title}</span>
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                        {item.command}
                      </code>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Quick start */}
        <section className="flex flex-col gap-6">
          <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Quick start
          </h2>
          <div className="rounded-2xl border bg-card">
            <div className="divide-y divide-border">
              {quickStart.map((s) => (
                <div
                  key={s.cmd}
                  className="flex items-baseline justify-between gap-4 px-6 py-4"
                >
                  <code className="font-mono text-sm">{s.cmd}</code>
                  <span className="text-sm text-muted-foreground">{s.note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="flex flex-wrap gap-3">
          <Button asChild>
            <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
              Next.js docs
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="https://ui.shadcn.com/docs" target="_blank" rel="noopener noreferrer">
              shadcn/ui docs
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://github.com/zahinafsar/next-ts-api"
              target="_blank"
              rel="noopener noreferrer"
            >
              next-ts-api docs
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="https://varlock.dev" target="_blank" rel="noopener noreferrer">
              varlock docs
            </a>
          </Button>
        </section>

        {/* Footer */}
        <footer className="border-t pt-6 pb-4">
          <p className="font-mono text-[11px] text-muted-foreground">
            Scaffolded with ds-start. Edit{" "}
            <code className="rounded bg-muted px-1 py-0.5">app/page.tsx</code> to get
            started.
          </p>
        </footer>
      </div>
    </main>
  )
}
