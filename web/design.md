# Web Design Patterns

Design language for the marketing site. Follow these patterns for all UI work in `web/app/(marketing)/`.

## Section Structure

Every marketing section is a full-bleed `relative overflow-hidden` wrapper with absolute background layers and a centered max-width container inside.

**Hero section** — grid + radial, both at stronger opacity:

```tsx
<section className="relative overflow-hidden border-b">
  <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[32px_32px] opacity-25" />
  <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_<X>%_<Y>%,var(--muted)_0%,transparent_55%)] opacity-80" />
  <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
    {/* content */}
  </div>
</section>
```

**Inner sections** — radial only, no grid:

```tsx
<section className="relative overflow-hidden border-b">
  <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_<X>%_<Y>%,var(--muted)_0%,transparent_55%)] opacity-70" />
  <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
    {/* content */}
  </div>
</section>
```

- The grid background is **hero-only** — it creates a strong entry point; repeating it on every section makes the page feel noisy
- Use `border-b` on all sections except the last one on the page
- The homepage hero uses `style={{ minHeight: "100svh" }}` and `flex items-center` to pin to full viewport height

## Radial Gradient Positions

Alternate the radial gradient anchor across sections to create visual flow down the page. Avoid repeating the same position in adjacent sections.

| Position label | Value |
|---|---|
| Top-right | `78% 0%` |
| Top-left | `15% 0%` |
| Bottom-right | `85% 100%` |
| Bottom-left | `15% 100%` |
| Center-right | `85% 50%` |
| Bottom-center | `50% 100%` |

## Cards and Containers

All cards and bordered containers use frosted depth instead of a flat `bg-card`:

```tsx
className="rounded-xl border bg-background/95 shadow-sm backdrop-blur"
```

For interactive tiles (links, clickable rows), add a hover state:

```tsx
className="... transition-colors hover:bg-muted/50"
```

Avoid using the shadcn `Card`/`CardContent` components in marketing sections — use plain divs for full control.

## Typography

- **Eyebrow labels**: `font-mono text-xs tracking-widest text-muted-foreground uppercase`
- **Page/section H1**: `font-semibold tracking-tight text-balance` with `style={{ fontSize: "clamp(...)", lineHeight: 1 }}`
  — always use inline `style` for font-size and line-height on headings; `fumadocs-ui/css/preset.css` overrides h1–h6 font styles at the tag level and Tailwind utility classes cannot win
- **Section H2**: same inline style pattern, smaller clamp range
- **Body/subheading**: `text-sm leading-relaxed text-muted-foreground sm:text-base`

## Container Width

Use `max-w-6xl` on every section container across all marketing pages — including prose-focused pages like About and Contributing. Do not use `max-w-3xl` on section containers. For prose body text that would be too wide to read at full container width, add a `max-w-3xl` constraint on the inner text element or wrapper div, not the section container itself.

## Spacing

- Section padding: `px-6 py-16 sm:py-20` (or `sm:py-24` for the homepage)
- Between section header and content: `mt-6` or `mb-8`
- Card grid gaps: `gap-4`
- Card internal padding: `p-5`
