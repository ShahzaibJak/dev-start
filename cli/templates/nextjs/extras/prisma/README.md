# Prisma

Adds Prisma ORM with PostgreSQL, including typed JSONB support via `prisma-json-types-generator`.

## First-run Setup

```bash
# Set your DATABASE_URL in .env.schema
bun run env:check
bun run db:migrate -- --name init
bun run db:generate
```

## Key Files

| File | Purpose |
|---|---|
| `prisma/schema.prisma` | Database schema with starter `Event` model |
| `prisma.config.ts` | Prisma configuration |
| `lib/prisma.ts` | Shared `PrismaClient` instance for server-side usage |
| `types/prisma-json.d.ts` | `PrismaJson` namespace for typed JSONB columns |

## JSONB Type Safety

The `Event` model includes a `metadata` Json column annotated with `/// [EventMetadata]`. The `prisma-json-types-generator` reads these annotations and maps them to types in the `PrismaJson` namespace.

To add typed JSONB columns to new models:
1. Add a `Json` field to your model.
2. Annotate the line above with `/// [YourTypeName]`.
3. Declare `type YourTypeName = { ... }` in `PrismaJson` namespace in `types/prisma-json.d.ts`.
4. Run `bun run db:generate` to regenerate the client.

Untyped `Json` fields resolve to `unknown` (not `any`) thanks to `allowAny = false`.

## Next Steps

Import `prisma` from `@/lib/prisma` in Server Components, Route Handlers, or Server Actions.
