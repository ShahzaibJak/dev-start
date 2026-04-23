# Project Instructions

## Database (Prisma)
- Schema lives in `prisma/schema.prisma`. Run `bun run db:generate` after schema changes.
- Use `bun run db:migrate -- --name <name>` to create migrations.
- Import `prisma` from `@/lib/prisma` — never instantiate `PrismaClient` directly.
- Use String IDs with `@default(cuid())` for new models (matches auth patterns).
- For JSONB columns, annotate with `/// [TypeName]` above the `Json` field, then declare the matching type in the `PrismaJson` namespace in `types/prisma-json.d.ts`.
- `prisma-json-types-generator` enforces typed JSON — untyped `Json` fields resolve to `unknown`.
