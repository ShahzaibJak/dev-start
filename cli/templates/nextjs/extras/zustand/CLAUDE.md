# Project Instructions

## Zustand (Client State)

- `lib/stores/` — One file per store, each exports a typed hook (e.g., `useCounterStore`)
- Pattern: `create` with `devtools` middleware, named stores for Redux DevTools identification
- Zustand is provider-free — no context wrapper or layout changes needed
- Use selectors for performance: `useCounterStore((s) => s.count)` re-renders only when `count` changes
- Keep stores small and focused — split by domain (e.g., `cart.ts`, `ui.ts`, `auth.ts`)
- Re-export all store hooks from `lib/stores/index.ts`
