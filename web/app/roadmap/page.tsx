import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { toolLogos } from "@/lib/tool-logos"

export const metadata: Metadata = {
  title: "Roadmap",
  description: "What's coming next for ds-start.",
}

interface RoadmapItem {
  title: string
  description: string
  status: "shipped" | "coming-soon" | "planned" | "exploring"
}

const shipped = [
  {
    title: "Email (Resend + React Email)",
    description:
      "Lightweight email extra with Resend for delivery and React Email for type-safe, previewable templates. Transactional emails — welcome, password reset, invitations — ready out of the box.",
    status: "shipped",
  },
  {
    title: "File Uploads (S3-Compatible)",
    description:
      "File upload extra with presigned URLs and type-safe config. Works with any S3-compatible store — AWS S3, Cloudflare R2, MinIO, Backblaze B2.",
    status: "shipped",
  },
  {
    title: "Billing & Subscriptions",
    description:
      "Stripe integration with subscription management, customer portal, and webhook handling. Works with both Better Auth and Clerk.",
    status: "shipped",
  },
  {
    title: "Form Renderer",
    description:
      "JSON-driven form renderer with classic, conversational, and multistep view modes. Config-driven fields, auto-generated zod validation, and an overridable component map. Built on shadcn Form components.",
    status: "shipped",
  },
] satisfies ReadonlyArray<RoadmapItem>

const comingSoon = [
  {
    title: "Drizzle ORM",
    description:
      "Alternative to Prisma for teams that prefer a more SQL-like ORM. Same type-safe integration, different philosophy.",
    status: "coming-soon",
  },
  {
    title: "Monorepo Templates",
    description:
      "Turborepo-based monorepo starter with shared packages, multiple apps, and coordinated tooling. Same agent-ready workflows across the entire repo.",
    status: "coming-soon",
  },
] satisfies ReadonlyArray<RoadmapItem>

const planned = [
  {
    title: "Organizations & Multi-tenancy",
    description:
      "Team workspaces, role-based access control, and tenant isolation. Built on top of the auth layer with Prisma/Drizzle schema extensions.",
    status: "planned",
  },
] satisfies ReadonlyArray<RoadmapItem>

const exploring = [
  {
    title: "Background Jobs",
    description:
      "Job queue integration for async processing — email sending, webhook delivery, data pipelines. Considering Trigger.dev and BullMQ.",
    status: "exploring",
  },
  {
    title: "Real-time & WebSockets",
    description:
      "Live updates, presence, and collaboration features. Evaluating Ably, Pusher, and PartyKit.",
    status: "exploring",
  },
  {
    title: "Admin Dashboard",
    description:
      "Internal tools template for managing users, viewing analytics, and handling support. Auto-generated from your Prisma/Drizzle schema.",
    status: "exploring",
  },
] satisfies ReadonlyArray<RoadmapItem>

const statusLabels = {
  shipped: "Shipped",
  "coming-soon": "Coming Soon",
  planned: "Planned",
  exploring: "Exploring",
} satisfies Record<RoadmapItem["status"], string>

function RoadmapSection({
  title,
  items,
}: {
  title: string
  items: ReadonlyArray<RoadmapItem>
}): React.ReactNode {
  return (
    <section className="mt-12">
      <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
        {title}
      </h2>
      <div className="mt-4 grid gap-4">
        {items.map((item) => (
          <Card key={item.title}>
            <CardContent className="flex items-start gap-4 p-6">
              {toolLogos[item.title] ? (
                <img
                  src={toolLogos[item.title]}
                  alt=""
                  width={24}
                  height={24}
                  className="mt-0.5 shrink-0 rounded-sm dark:invert"
                />
              ) : null}
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-medium">{item.title}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[10px] ${
                      item.status === "shipped"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {statusLabels[item.status]}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default function RoadmapPage(): React.ReactNode {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Roadmap</h1>
      <p className="mt-2 text-muted-foreground">
        What&apos;s coming next for ds-start. This is a living document — priorities
        shift based on what people actually need.
      </p>

      <RoadmapSection title="Recently Shipped" items={shipped} />
      <RoadmapSection title="Coming Soon" items={comingSoon} />
      <RoadmapSection title="Planned" items={planned} />
      <RoadmapSection title="Exploring" items={exploring} />

      {/* Feedback */}
      <section className="mt-16 rounded-lg border p-6">
        <p className="text-sm text-muted-foreground">
          Have a feature request or want to bump something up the list? Open an
          issue on{" "}
          <a
            href="https://github.com/shahzaibjak/dev-start/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline"
          >
            GitHub
          </a>
          .
        </p>
      </section>
    </div>
  )
}
