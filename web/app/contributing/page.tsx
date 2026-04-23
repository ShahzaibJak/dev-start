import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "Contributing",
  description: "How to contribute to ds-start.",
}

const commitTypes = [
  { prefix: "feat:", description: "New feature" },
  { prefix: "fix:", description: "Bug fix" },
  { prefix: "docs:", description: "Documentation only" },
  { prefix: "refactor:", description: "Code change that neither fixes a bug nor adds a feature" },
  { prefix: "chore:", description: "Tooling, CI, dependencies" },
] satisfies ReadonlyArray<{ prefix: string; description: string }>

const codeConventions = [
  "TypeScript strict mode — no any, no type assertions, no @ts-ignore",
  "kebab-case for all files and directories",
  "Named exports for helpers and utilities",
  "Relative imports with .js extensions (ESM)",
  "oxlint for linting — no eslint-disable comments",
] satisfies ReadonlyArray<string>

export default function ContributingPage(): React.ReactNode {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Contributing</h1>
      <p className="mt-2 text-muted-foreground">
        Thanks for your interest in contributing to ds-start. Here&apos;s how to
        get started.
      </p>

      {/* Setup */}
      <section className="mt-12">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Development Setup
        </h2>
        <div className="mt-4 space-y-4">
          <div>
            <p className="text-sm font-medium">1. Fork and clone</p>
            <div className="mt-2">
              <CodeBlock>{`git clone https://github.com/<your-username>/dev-start.git
cd dev-start`}</CodeBlock>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">2. Install dependencies</p>
            <div className="mt-2">
              <CodeBlock>bun install</CodeBlock>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">3. Build and verify</p>
            <div className="mt-2">
              <CodeBlock>{`bun run build
bun run lint
bun run typecheck`}</CodeBlock>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="mt-12">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Making Changes
        </h2>
        <div className="mt-4 space-y-4">
          <div>
            <p className="text-sm font-medium">1. Create a branch from main</p>
            <div className="mt-2">
              <CodeBlock>git checkout -b feat/my-feature</CodeBlock>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">
              2. Run quality gates before committing
            </p>
            <div className="mt-2">
              <CodeBlock>{`bun run lint
bun run typecheck
bun run build`}</CodeBlock>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">
              3. Commit with conventional commits
            </p>
            <div className="mt-2">
              <CodeBlock>git commit -m &quot;feat: add cool new feature&quot;</CodeBlock>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">
              4. Push and open a pull request
            </p>
          </div>
        </div>
      </section>

      {/* Commit style */}
      <section className="mt-12">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Commit Style
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This project uses{" "}
          <a
            href="https://www.conventionalcommits.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            Conventional Commits
          </a>{" "}
          enforced by commitlint.
        </p>
        <div className="mt-4 rounded-lg border divide-y">
          {commitTypes.map((item) => (
            <div
              key={item.prefix}
              className="flex items-baseline gap-4 px-6 py-3"
            >
              <code className="shrink-0 font-mono text-sm font-medium">
                {item.prefix}
              </code>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Code conventions */}
      <section className="mt-12">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Code Conventions
        </h2>
        <ul className="mt-4 space-y-2">
          {codeConventions.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Changesets */}
      <section className="mt-12">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Changesets
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          If your PR changes user-facing behavior, add a changeset:
        </p>
        <div className="mt-3">
          <CodeBlock>bunx changeset</CodeBlock>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Commit the generated changeset file with your PR.
        </p>
      </section>

      {/* Link to full doc */}
      <section className="mt-12 rounded-lg border p-6">
        <p className="text-sm text-muted-foreground">
          For the full contributing guide including template changes and adding
          new extras, see{" "}
          <a
            href="https://github.com/shahzaibjak/dev-start/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline"
          >
            CONTRIBUTING.md
          </a>{" "}
          on GitHub.
        </p>
      </section>
    </div>
  )
}
