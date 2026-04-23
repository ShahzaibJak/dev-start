---
name: next-ts-api
description: "Guide for using next-ts-api to build type-safe API routes and clients in Next.js App Router projects. Use this skill whenever the user wants to set up, configure, or work with next-ts-api, or when they ask about type-safe API clients for Next.js, end-to-end type safety for API routes, auto-generated API types in Next.js, or typed fetch clients. Also trigger when the user mentions 'next-ts-api', 'NextApiRequest from next-ts-api', 'createNextFetchApi', or wants to add type-safe API calls to a Next.js App Router project. If the user is building a Next.js app and asks how to make their API routes type-safe without mentioning a specific library, this skill is a strong candidate."
---

# next-ts-api

A TypeScript library that provides **end-to-end type safety** for Next.js App Router API routes. It auto-generates TypeScript types from your route handlers so that your API client knows the exact shape of every request and response at compile time.

## Why it exists

Next.js Server Actions give you type safety for mutations, but traditional API routes (`app/api/**/route.ts`) have no built-in type coverage. next-ts-api closes that gap: you write normal route handlers, and a Next.js plugin scans them to generate a single `ApiRoutes` type. A typed fetch wrapper (`createNextFetchApi`) then enforces that type across every call site — wrong paths, wrong methods, wrong bodies, or wrong response shapes are all caught by TypeScript before the code runs.

## Installation

```bash
# pick your package manager
npm install next-ts-api
yarn add next-ts-api
pnpm add next-ts-api
```

## Setup (two steps)

### 1. Register the Next.js plugin

```js
// next.config.js
const { nextTsApi } = require("next-ts-api/config");
const withNextTsApi = nextTsApi();

const nextConfig = {
  // ... your existing config
};

export default withNextTsApi(nextConfig);
```

The plugin accepts optional configuration:

| Option    | Description                                  | Default                 |
|-----------|----------------------------------------------|-------------------------|
| `dir`     | Directory to scan for API route handlers     | auto-detected           |
| `outDir`  | Where to write the generated type file       | `types/`                |
| `outFile` | Name of the generated type file              | `next-ts-api.ts`        |

### 2. Create the typed API client

```ts
// lib/api.ts
import { createNextFetchApi } from "next-ts-api";
import type { ApiRoutes } from "../types/next-ts-api";

export const api = createNextFetchApi<ApiRoutes>();
```

`createNextFetchApi` optionally takes `{ baseUrl?: string }` if your API lives at a different origin.

That's it — the plugin generates `types/next-ts-api.ts` automatically during build (and in dev mode when routes change). Import `api` anywhere you need a typed fetch call.

## Writing route handlers

Use `NextApiRequest<Body>` from `next-ts-api` instead of the plain `Request` type. This is what the plugin reads to infer the request body type.

```ts
// app/api/hello/route.ts
import { NextApiRequest } from "next-ts-api";

export async function GET() {
  return Response.json({ message: "Hello World!" });
}

export async function POST(request: NextApiRequest<{ name: string }>) {
  const body = await request.json(); // body is { name: string }
  return Response.json({ message: `Hello ${body.name}!` });
}
```

Key points:
- Always import `NextApiRequest` from `next-ts-api`, never from Next.js itself — the plugin relies on this import to extract types.
- Export one function per HTTP method you want to support (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`).
- Return `Response.json(...)` so the plugin can infer the response type.

## Calling the API (client side)

```ts
import { api } from "@/lib/api";

// GET — no body needed
const data = await api("hello", { method: "GET" });
// data is typed as { message: string }

// POST — body is required and typed
const res = await api("hello", {
  method: "POST",
  body: { name: "John" },
});
```

The `api` function signature:

```
api(path, options) → Promise<ResponseType>
```

| Parameter          | Description                                           |
|--------------------|-------------------------------------------------------|
| `path`             | Route path (without `/api/` prefix)                   |
| `options.method`   | HTTP method (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`) |
| `options.body`     | Request body (type-checked against the route handler) |
| `options.params`   | Path parameters for dynamic routes                    |
| `options.query`    | Query string parameters                               |
| `options.headers`  | Additional headers (`HeadersInit`)                    |

TypeScript will error if you pass a body to a route that doesn't expect one, use a method the route doesn't export, or pass the wrong shape.

## Generated types structure

The auto-generated `ApiRoutes` type maps every route to its methods, and each method to its body, response, params, and query types:

```ts
type ApiRoutes = {
  [path: string]: {
    [method in "GET" | "POST" | "PUT" | "DELETE" | "PATCH"]?: {
      body?: unknown;
      response: unknown;
      params?: Record<string, string>;
      query?: Record<string, string>;
    };
  };
};
```

You never edit this file manually — the plugin regenerates it.

## Full example: Todo CRUD

See `references/todo-example.md` for a complete Todo list API with all CRUD operations and the corresponding client-side usage.

## Common patterns

### Dynamic route parameters

For a route at `app/api/todos/[id]/route.ts`, the generated type will include a `params` field. Use it like:

```ts
const result = await api("todos/[id]", {
  method: "DELETE",
  params: { id: "abc123" },
});
```

### Query parameters

```ts
const todos = await api("todos", {
  method: "GET",
  query: { completed: "true" },
});
```

### Custom base URL

```ts
export const api = createNextFetchApi<ApiRoutes>({
  baseUrl: "https://api.example.com",
});
```

## Troubleshooting

- **Types not updating?** — Make sure the Next.js plugin is registered in `next.config.js`. In dev mode, types regenerate when route files change. Run a fresh build if types seem stale.
- **`Cannot find module '../types/next-ts-api'`** — Run `next build` (or start dev server) at least once so the plugin generates the type file. Add `types/next-ts-api.ts` to `.gitignore` if you prefer to regenerate on each machine.
- **Body type is `unknown`** — You're probably using `Request` instead of `NextApiRequest<YourBodyType>` from `next-ts-api`. The plugin can only infer types from its own `NextApiRequest` generic.
