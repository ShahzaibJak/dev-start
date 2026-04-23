import { Button } from "@/components/ui/button"

const stack = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS 4",
  "shadcn/ui",
  "next-ts-api",
]

const features = [
  {
    label: "Type-safe API layer",
    detail:
      "API routes generate TypeScript types automatically. The client catches wrong paths, methods, and payloads at compile time.",
  },
  {
    label: "AI-ready project structure",
    detail:
      "CLAUDE.md, quality gates, and conventions are wired in from the start so AI tools understand your codebase immediately.",
  },
  {
    label: "Production tooling included",
    detail:
      "ESLint, Prettier, strict TypeScript, and optional extras for Prisma, auth, CI, and pre-commit hooks.",
  },
]

const quickStart = [
  { cmd: "bun run dev", note: "Start the dev server" },
  { cmd: "bun run build", note: "Production build" },
  { cmd: "bun run typecheck", note: "Verify types" },
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
            <span className="text-sm font-medium tracking-tight">Dev-Start</span>
          </div>
          <span className="font-mono text-[11px] text-muted-foreground">
            press <kbd className="rounded border px-1 py-0.5 text-[10px]">d</kbd> to
            toggle theme
          </span>
        </header>

        {/* Hero */}
        <section className="flex flex-col gap-6">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            AI-native starter template
          </p>
          <h1 className="text-[clamp(2rem,5vw,3.25rem)] leading-[1.1] font-semibold tracking-tight text-balance">
            Start building with everything wired&nbsp;in.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Dev-Start scaffolds a production-grade Next.js app with type-safe APIs, AI
            workflow integration, and modern tooling. No boilerplate cleanup needed.
          </p>

          {/* Stack badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {stack.map((item) => (
              <span
                key={item}
                className="rounded-md border bg-muted/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="flex flex-col gap-6">
          <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            What ships with the base
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
            <a href="https://nextjs.org/docs">Next.js docs</a>
          </Button>
          <Button asChild variant="outline">
            <a href="https://ui.shadcn.com/docs">shadcn/ui docs</a>
          </Button>
          <Button asChild variant="outline">
            <a href="https://github.com/zahinafsar/next-ts-api">next-ts-api docs</a>
          </Button>
        </section>

        {/* Footer */}
        <footer className="border-t pt-6 pb-4">
          <p className="font-mono text-[11px] text-muted-foreground">
            Scaffolded with devstart. Edit{" "}
            <code className="rounded bg-muted px-1 py-0.5">app/page.tsx</code> to get
            started.
          </p>
        </footer>
      </div>
    </main>
  )
}
