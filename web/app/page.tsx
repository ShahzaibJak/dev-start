import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CodeBlock } from "@/components/code-block"

const highlights = [
  {
    title: "Production-ready foundation",
    description:
      "Strict TypeScript, oxlint, Husky pre-commit hooks, and end-to-end type safety — all wired up from commit one.",
  },
  {
    title: "Installable modules",
    description:
      "Add auth, email, payments, forms, and more at scaffold time or bolt them onto an existing project later.",
  },
  {
    title: "Agent-ready workflows",
    description:
      "Built-in skills for plan-driven development. Your coding agent follows structured workflows out of the box.",
  },
  {
    title: "Open and composable",
    description:
      "You own the code. Modules compose freely, conventions are explicit, and nothing is hidden behind abstractions.",
  },
] satisfies ReadonlyArray<{ title: string; description: string }>

export default function HomePage(): React.ReactNode {
  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero */}
      <section className="flex flex-col items-center gap-6 pb-16 pt-16 text-center sm:gap-8 sm:pb-24 sm:pt-32">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          composable &middot; type-safe &middot; agent-ready
        </p>
        <h1 className="max-w-4xl text-[clamp(1.75rem,5vw,3.5rem)] leading-[1.1] font-semibold tracking-tight text-balance">
          The composable Next.js app kit.
          <br />
          Production-ready from commit one.
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Start from a production-ready foundation or add vetted modules to an
          existing app. Agent workflows built in.
        </p>

        <div className="w-full max-w-md space-y-3">
          <div>
            <p className="mb-1.5 text-xs text-muted-foreground">New project</p>
            <CodeBlock>npx ds-start init my-app</CodeBlock>
          </div>
          <div>
            <p className="mb-1.5 text-xs text-muted-foreground">Add a module</p>
            <CodeBlock>npx ds-start add email</CodeBlock>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/docs">Get Started</Link>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://github.com/shahzaibjak/dev-start"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="pb-16 sm:pb-24">
        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map((item) => (
            <Card key={item.title}>
              <CardContent className="p-6">
                <h3 className="text-sm font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
