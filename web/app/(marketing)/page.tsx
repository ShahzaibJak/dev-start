import Link from "next/link"
import { ChevronDownIcon } from "lucide-react"
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
    title: "Composable modules",
    description:
      "Add auth, email, payments, forms, and more at scaffold time or bolt them onto an existing project later.",
  },
  {
    title: "Agent-ready workflows",
    description:
      "Built-in skills give Claude, Codex, and other coding agents project context from the first prompt.",
  },
  {
    title: "Open and composable",
    description:
      "You own the code. Modules compose freely, conventions are explicit, and nothing is hidden behind abstractions.",
  },
] satisfies ReadonlyArray<{ title: string; description: string }>

const faqs = [
  {
    question: "What is ds-start?",
    answer:
      "The composable Next.js app kit: a production-ready foundation, composable modules, and agent workflows.",
  },
  {
    question: "Why not just ask Claude or Codex?",
    answer:
      "You should. ds-start gives them a better starting point so they can work on product features instead of recreating auth, email, forms, uploads, CI, deploys, and project conventions.",
  },
  {
    question: "What are modules?",
    answer:
      "Modules are pre-integrated app features that compose with the foundation and follow the same conventions as the rest of the project.",
  },
] satisfies ReadonlyArray<{ question: string; answer: string }>

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
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Start with the foundation every app needs, so your AI agent can build
          what makes yours different.
        </p>

        <div className="w-full max-w-md">
          <CodeBlock>npx ds-start init my-app</CodeBlock>
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

      {/* FAQ */}
      <section className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Details
          </h2>
          <div className="mt-4 divide-y rounded-lg border">
            {faqs.map((item) => (
              <details key={item.question} className="group px-4 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-medium marker:hidden">
                  <span>{item.question}</span>
                  <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
