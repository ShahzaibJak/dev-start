import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Agentic Workflow",
  description:
    "Built-in skills that guide your AI assistant through a structured development cycle.",
}

const steps = [
  {
    number: "1",
    command: "/start-prd",
    title: "Plan",
    description:
      "Interview-driven PRD creation. Explores your codebase, asks targeted questions about scope, edge cases, and integration points, then outputs a step-by-step implementation plan with acceptance criteria.",
  },
  {
    number: "2",
    command: "/start-work",
    title: "Build",
    description:
      "Begin or resume implementation from a PRD. Follows plan steps sequentially, enforces strict type safety, and verifies acceptance criteria after each step. Supports session continuity via handoff files.",
  },
  {
    number: "3",
    command: "/handoff",
    title: "Handoff",
    description:
      "Save session progress for continuity across sessions. Captures completed steps, current state, key decisions, gotchas, and modified files so the next session picks up without losing context.",
  },
  {
    number: "4",
    command: "/start-review",
    title: "Review",
    description:
      "Run quality gates and review the diff. Checks lint, typecheck, and tests, then does a thorough code review covering logic, patterns, security, and performance. Read-only — no code modifications.",
  },
  {
    number: "5",
    command: "/start-pr",
    title: "Ship",
    description:
      "Commit changes and create a PR with conventional commit messages, pre-commit hooks, and gh CLI integration. Generates a PR description with summary, test plan, and change context.",
  },
] satisfies ReadonlyArray<{
  number: string
  command: string
  title: string
  description: string
}>

const domainSkills = [
  {
    command: "/next-ts-api",
    title: "Type-safe API Routes",
    description:
      "Guides you through creating end-to-end type-safe API routes and clients using next-ts-api. Auto-generates TypeScript types from route handlers.",
  },
  {
    command: "/vercel-react-best-practices",
    title: "React Performance",
    description:
      "64 rules from Vercel Engineering for React and Next.js performance optimization. Covers rendering, data fetching, caching, and bundle size.",
  },
  {
    command: "/frontend-design",
    title: "Frontend Design",
    description:
      "Create distinctive, production-grade frontend interfaces with high design quality. Generates creative, polished code that avoids generic AI aesthetics.",
  },
] satisfies ReadonlyArray<{
  command: string
  title: string
  description: string
}>

export default function WorkflowPage(): React.ReactNode {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        Agentic Workflow
      </h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Every project scaffolded with ds-start ships with built-in skills that
        guide your AI coding assistant through a structured development cycle.
      </p>

      {/* Flow steps */}
      <section className="mt-12">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Development Cycle
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          {steps.map((step) => (
            <Card key={step.command}>
              <CardContent className="p-4 sm:p-0 sm:flex sm:gap-4">
                <div className="hidden sm:flex w-12 shrink-0 items-center justify-center bg-muted font-mono text-sm text-muted-foreground">
                  {step.number}
                </div>
                <div className="flex flex-1 flex-col gap-1 sm:py-4 sm:pr-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground sm:hidden">
                      {step.number}.
                    </span>
                    <span className="text-sm font-medium">{step.title}</span>
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                      {step.command}
                    </code>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:mt-0">
                    {step.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mt-16">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          How It Works
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Skills are prompt files that ship inside your scaffolded project.
            When you invoke a skill (e.g. type{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              /start-prd
            </code>{" "}
            in Claude Code), your AI assistant loads the skill&apos;s instructions
            and follows the defined workflow.
          </p>
          <p>
            Plans are saved as markdown files in{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              .claude/plans/
            </code>{" "}
            and handoffs in{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              .claude/handoffs/
            </code>
            . This means your project state is always version-controlled and
            portable between sessions.
          </p>
        </div>
      </section>

      {/* Domain skills */}
      <section className="mt-16">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Domain Skills
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Specialized skills for common development tasks.
        </p>
        <div className="mt-4 grid gap-4">
          {domainSkills.map((skill) => (
            <div
              key={skill.command}
              className="rounded-lg border p-5"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{skill.title}</span>
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                  {skill.command}
                </code>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
