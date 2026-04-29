import Link from "next/link"
import {
  BlocksIcon,
  BotIcon,
  CheckCircle2Icon,
  ChevronDownIcon,
  Code2Icon,
  Layers3Icon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CodeBlock } from "@/components/code-block"

const features = [
  {
    title: "Production-ready foundation",
    description:
      "Next.js, TypeScript, quality gates, env validation, CI, and deployment conventions wired in.",
    icon: Layers3Icon,
  },
  {
    title: "Composable modules",
    description:
      "Add pre-integrated auth, email, forms, uploads, billing, and more without starting from scratch.",
    icon: BlocksIcon,
  },
  {
    title: "Agent workflows",
    description:
      "Plans, reviews, handoffs, and conventions give Claude, Codex, and other agents useful context.",
    icon: BotIcon,
  },
  {
    title: "Open code",
    description:
      "You own the generated code. Modules compose freely, and the conventions stay visible.",
    icon: Code2Icon,
  },
] satisfies ReadonlyArray<{
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}>

const proofPoints = [
  "Foundation",
  "Modules",
  "Agent workflows",
] satisfies ReadonlyArray<string>

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
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative border-b">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:32px_32px] opacity-35" />
        <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-muted/70 to-transparent" />

        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 pt-16 pb-14 text-center sm:gap-7 sm:pt-28 sm:pb-20">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            composable &middot; production-ready &middot; agent workflows
          </p>
          <h1 className="max-w-4xl text-[clamp(2.25rem,6vw,4.75rem)] leading-none font-semibold tracking-tight text-balance">
            The composable Next.js app kit.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Start with the foundation every app needs, so your AI agent can
            build what makes yours different.
          </p>

          <div className="w-full max-w-md rounded-xl border bg-background/90 p-2 shadow-sm backdrop-blur">
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

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {proofPoints.map((item) => (
              <div
                key={item}
                className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs text-muted-foreground shadow-sm"
              >
                <CheckCircle2Icon className="size-3" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Features
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              The app baseline AI agents should not have to rebuild.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              A short overview of the foundation, modules, and workflows. The
              dedicated features page goes deeper.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/features">Explore Features</Link>
          </Button>
        </div>
        <div
          className="grid gap-4 overflow-x-auto pb-2"
          style={{ gridTemplateColumns: "repeat(4, minmax(14rem, 1fr))" }}
        >
          {features.map((item) => (
            <Card key={item.title} className="min-w-56">
              <CardContent className="p-5">
                <div className="mb-4 flex size-9 items-center justify-center rounded-md border bg-muted/50">
                  <item.icon className="size-4 text-muted-foreground" />
                </div>
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
      <section className="mx-auto max-w-5xl px-6 pb-16 sm:pb-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Details
          </p>
          <div className="mt-4 divide-y rounded-lg border bg-card shadow-sm">
            {faqs.map((item) => (
              <details key={item.question} className="group px-5 py-5">
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
