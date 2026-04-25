# Zustand (Client State)

Lightweight client state management with [Zustand](https://zustand.docs.pmnd.rs/). Provider-free, TypeScript-first, with Redux DevTools support.

## Usage

### Reading state in components

```tsx
import { useCounterStore } from "@/lib/stores";

function Counter() {
  const count = useCounterStore((s) => s.count);
  const increment = useCounterStore((s) => s.increment);

  return <button onClick={increment}>{count}</button>;
}
```

Always use selectors — `(s) => s.count` — so the component only re-renders when that slice changes.

### Creating a new store

Add a file to `lib/stores/` and re-export from `lib/stores/index.ts`:

```ts
// lib/stores/cart.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CartState {
  items: string[];
  addItem: (item: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  devtools(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      clear: () => set({ items: [] }),
    }),
    { name: "cart" },
  ),
);
```

### Devtools

Stores are visible in [Redux DevTools](https://github.com/reduxjs/redux-devtools) by their `name` parameter. Devtools middleware is automatically excluded in production builds.

## Key Files

| File | Purpose |
|---|---|
| `lib/stores/counter.ts` | Example store — replace or remove once you have real stores |
| `lib/stores/index.ts` | Barrel export for all stores |

## Resources

- [Zustand documentation](https://zustand.docs.pmnd.rs/)
- [Zustand middleware](https://zustand.docs.pmnd.rs/middlewares/devtools)
