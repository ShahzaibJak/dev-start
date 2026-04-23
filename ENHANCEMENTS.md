# Enhancements

Tracked from [roadmap](web/app/roadmap/page.tsx). Priorities based on user impact and dependency order.

## Priority (do first)

- [ ] **Billing & Subscriptions** — Stripe integration with subscription management, usage-based billing, customer portal, and webhook handling. _Why first: monetization is the #1 thing users need from a starter kit._
- [ ] **Drizzle ORM** — Alternative to Prisma with a more SQL-like approach. Same type-safe integration, different philosophy. _Why first: broadens appeal to a large segment of the TS ecosystem._
- [x] **Clerk Auth** — Drop-in authentication alternative to Better Auth. Pre-built components, webhooks, and organization support. _Why first: low effort, high value — Clerk handles the hard parts._

## Next up

- [ ] **Organizations & Multi-tenancy** — Team workspaces, role-based access control, and tenant isolation. Built on top of the auth layer with Prisma/Drizzle schema extensions.
- [ ] **Email Templates** — React Email integration for transactional emails (welcome, password reset, invitations, billing receipts). Type-safe and previewable.
- [ ] **Monorepo Templates** — Turborepo-based monorepo starter with shared packages, multiple apps, and coordinated tooling.

## Exploring

- [ ] **Background Jobs** — Job queue integration for async processing (email sending, webhook delivery, data pipelines). Considering Trigger.dev and BullMQ.
- [ ] **Real-time & WebSockets** — Live updates, presence, and collaboration features. Evaluating Ably, Pusher, and PartyKit.
- [ ] **Admin Dashboard** — Internal tools template for managing users, viewing analytics, and handling support. Auto-generated from Prisma/Drizzle schema.
