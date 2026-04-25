import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "Docs",
  description: "CLI reference for ds-start — scaffold new projects and add modules to existing ones.",
}

const flags = [
  {
    flag: "--prisma",
    description: "Add Prisma 6 ORM with PostgreSQL and typed JSONB.",
  },
  {
    flag: "--auth",
    description:
      "Add Better Auth with email/password, Google OAuth, and route protection. Requires --prisma.",
  },
  {
    flag: "--clerk",
    description:
      "Add Clerk managed authentication with pre-built components and route protection. No database required.",
  },
  {
    flag: "--stripe",
    description:
      "Add Stripe billing with subscription management, customer portal, and webhooks. Requires --auth or --clerk.",
  },
  {
    flag: "--email",
    description:
      "Add transactional email with Resend and React Email templates.",
  },
  {
    flag: "--file-uploads",
    description:
      "Add S3-compatible file uploads with presigned URLs. Works with AWS S3, Cloudflare R2, MinIO, Backblaze B2.",
  },
  {
    flag: "--zustand",
    description:
      "Add Zustand client state management with typed stores and devtools middleware.",
  },
  {
    flag: "--forms",
    description:
      "Add JSON-driven form renderer with classic, conversational, and multistep view modes.",
  },
  {
    flag: "--github-workflows",
    description:
      "Add GitHub Actions CI pipeline with lint, typecheck, build, and secret scanning.",
  },
  {
    flag: "--vercel-deploy",
    description:
      "Add Vercel CD pipeline with preview and production deploys. Implies --github-workflows.",
  },
  {
    flag: "-y, --yes",
    description: "Skip interactive prompts and use defaults (no extras).",
  },
] satisfies ReadonlyArray<{ flag: string; description: string }>

const initExamples = [
  { label: "Minimal", command: "npx ds-start init my-app" },
  { label: "Full stack", command: "npx ds-start init my-app --prisma --auth --stripe --email --github-workflows" },
  { label: "Clerk stack", command: "npx ds-start init my-app --clerk --stripe --email --file-uploads" },
  { label: "API-focused", command: "npx ds-start init my-app --prisma --github-workflows" },
  { label: "Everything", command: "npx ds-start init my-app --prisma --auth --stripe --email --file-uploads --zustand --forms --github-workflows --vercel-deploy" },
  { label: "Skip prompts", command: "npx ds-start init my-app -y" },
] satisfies ReadonlyArray<{ label: string; command: string }>

const addExamples = [
  { label: "Email module", command: "npx ds-start add email" },
  { label: "File uploads module", command: "npx ds-start add file-uploads" },
  { label: "Zustand state management", command: "npx ds-start add zustand" },
  { label: "Forms module", command: "npx ds-start add forms" },
  { label: "CI pipeline", command: "npx ds-start add github-workflows" },
  { label: "Vercel CD", command: "npx ds-start add vercel-deploy" },
] satisfies ReadonlyArray<{ label: string; command: string }>

export default function DocsPage(): React.ReactNode {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Documentation</h1>
      <p className="mt-2 text-muted-foreground">
        Scaffold new projects and add modules to existing ones.
      </p>

      {/* Quick Start */}
      <section className="mt-12">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Quick Start
        </h2>
        <div className="mt-4 space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium">New project</p>
            <CodeBlock>npx ds-start init my-app</CodeBlock>
            <p className="mt-2 text-sm text-muted-foreground">
              Scaffolds a new Next.js project in the <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">my-app</code> directory
              with the full foundation. You&apos;ll be prompted to select optional modules.
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Add a module</p>
            <CodeBlock>npx ds-start add email</CodeBlock>
            <p className="mt-2 text-sm text-muted-foreground">
              Run from inside a supported Next.js project to install a module. Auto-merges package.json, .gitignore, and .env.schema. Prompts only for real file conflicts.
            </p>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="mt-12">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Installation
        </h2>
        <div className="mt-4 space-y-3">
          <p className="text-sm text-muted-foreground">
            No installation required. Run directly with npx:
          </p>
          <CodeBlock>npx ds-start init my-app</CodeBlock>
          <p className="text-sm text-muted-foreground">
            Or install globally:
          </p>
          <CodeBlock>npm install -g ds-start</CodeBlock>
        </div>
      </section>

      {/* Command Reference */}
      <section className="mt-12">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Command Reference
        </h2>
        <div className="mt-4 space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium">Scaffold a new project</p>
            <CodeBlock copyable={false}>{`npx ds-start init <project-name> [flags]`}</CodeBlock>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Add a module to an existing project</p>
            <CodeBlock copyable={false}>{`npx ds-start add <module>`}</CodeBlock>
            <p className="mt-2 text-sm text-muted-foreground">
              Run from inside a supported Next.js project to install a module.
              Detects conflicts, merges package.json / .gitignore / .env.schema automatically,
              and prompts for resolution on file-level conflicts. Dependencies are not auto-installed.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Best experience on ds-start projects and compatible App Router projects.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Available modules:{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">email</code>{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">file-uploads</code>{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">zustand</code>{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">forms</code>{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">github-workflows</code>{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">vercel-deploy</code>
            </p>
          </div>
        </div>
      </section>

      {/* Flags */}
      <section className="mt-12">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Flags
        </h2>
        <div className="mt-4 rounded-lg border divide-y">
          {flags.map((item) => (
            <div
              key={item.flag}
              className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-baseline sm:gap-4"
            >
              <code className="shrink-0 font-mono text-sm font-medium">
                {item.flag}
              </code>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Examples */}
      <section className="mt-12">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Examples
        </h2>
        <div className="mt-4 space-y-4">
          <p className="text-sm font-medium">Scaffold a new project</p>
          {initExamples.map((ex) => (
            <div key={ex.label}>
              <p className="mb-2 text-sm text-muted-foreground">{ex.label}</p>
              <CodeBlock>{ex.command}</CodeBlock>
            </div>
          ))}
        </div>
        <div className="mt-8 space-y-4">
          <p className="text-sm font-medium">Add modules to an existing project</p>
          {addExamples.map((ex) => (
            <div key={ex.label}>
              <p className="mb-2 text-sm text-muted-foreground">{ex.label}</p>
              <CodeBlock>{ex.command}</CodeBlock>
            </div>
          ))}
        </div>
      </section>

      {/* After Scaffolding */}
      <section className="mt-12">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          After Scaffolding
        </h2>
        <div className="mt-4 space-y-3">
          <CodeBlock>{`cd my-app
bun run env:check    # Validate environment
bun run dev          # Start dev server
bun run build        # Production build
bun run typecheck    # Verify types
bun run lint         # Lint code`}</CodeBlock>
        </div>
      </section>
    </div>
  )
}
