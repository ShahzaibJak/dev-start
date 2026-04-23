# Todo CRUD Example

A complete example showing next-ts-api used to build a typed Todo list API with full CRUD operations.

## Data model

```ts
interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
```

## API routes

### `app/api/todos/route.ts`

```ts
import { NextApiRequest } from "next-ts-api";

const todos: Todo[] = [];

// GET /api/todos?completed=true
export async function GET(
  request: NextApiRequest<never, { completed?: string }>
) {
  const completed = request.nextUrl.searchParams.get("completed");
  const filtered = completed
    ? todos.filter((t) => t.completed === (completed === "true"))
    : todos;
  return Response.json(filtered);
}

// POST /api/todos — create a new todo
export async function POST(
  request: NextApiRequest<{ title: string }>
) {
  const { title } = await request.json();
  const todo: Todo = {
    id: crypto.randomUUID(),
    title,
    completed: false,
  };
  todos.push(todo);
  return Response.json(todo);
}

// PUT /api/todos — update an existing todo
export async function PUT(
  request: NextApiRequest<{ id: string; title: string; completed: boolean }>
) {
  const body = await request.json();
  const index = todos.findIndex((t) => t.id === body.id);
  if (index === -1) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  todos[index] = { ...todos[index], ...body };
  return Response.json(todos[index]);
}
```

### `app/api/todos/[id]/route.ts`

```ts
import { NextApiRequest } from "next-ts-api";

// DELETE /api/todos/:id
export async function DELETE(
  _request: NextApiRequest,
  { params }: { params: { id: string } }
) {
  // remove from your data store by params.id
  return Response.json({ success: true });
}
```

## Client setup

```ts
// lib/api.ts
import { createNextFetchApi } from "next-ts-api";
import type { ApiRoutes } from "../types/next-ts-api";

export const api = createNextFetchApi<ApiRoutes>();
```

## Client usage (React component)

```tsx
"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Fetch todos (optionally filtered)
  async function fetchTodos() {
    const data = await api("todos", {
      method: "GET",
      query: { completed: "false" },
    });
    setTodos(data);
  }

  // Create a new todo
  async function createTodo(title: string) {
    const newTodo = await api("todos", {
      method: "POST",
      body: { title },
    });
    setTodos((prev) => [...prev, newTodo]);
  }

  // Update an existing todo
  async function updateTodo(todo: Todo) {
    const updated = await api("todos", {
      method: "PUT",
      body: { id: todo.id, title: todo.title, completed: !todo.completed },
    });
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  // Delete a todo
  async function deleteTodo(id: string) {
    await api("todos/[id]", {
      method: "DELETE",
      params: { id },
    });
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todos</h1>
      <button onClick={() => createTodo("New task")}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? "line-through" : "none" }}
              onClick={() => updateTodo(todo)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```
