---
name: forms
description: Build and configure forms using the FormRenderer component, define FormSchema configs, choose view modes (classic, conversational, multistep), override field components via componentMap, add custom validation with zod schemas, and work with all 11 field types. Use when users mention form, form renderer, FormRenderer, form schema, add a form, form field, or view mode.
---

# Form System Guide

## Architecture

The form system is config-driven. You define a `FormSchema` with fields, pass it to `<FormRenderer>`, and the renderer handles layout, validation, and field rendering.

```
lib/forms/types.ts          → Type definitions
lib/forms/validation.ts     → Zod schema auto-generation
components/forms/
  form-renderer.tsx          → Main entry point
  fields/                   → Field type components
    text-field.tsx           → text, email, password, url, number
    textarea-field.tsx       → textarea
    select-field.tsx         → select
    checkbox-field.tsx       → checkbox
    radio-field.tsx          → radio
    switch-field.tsx         → switch
    date-field.tsx           → date
    index.ts                 → defaultComponentMap
  layouts/
    classic-layout.tsx       → All fields visible
    conversational-layout.tsx → One field at a time
    multistep-layout.tsx     → Grouped steps
```

## Basic Usage

```tsx
import { FormRenderer } from "@/components/forms/form-renderer";
import type { FormSchema } from "@/lib/forms/types";

const schema: FormSchema = {
  fields: [
    { id: "name", type: "text", label: "Name", required: true, config: { placeholder: "Your name" } },
    { id: "email", type: "email", label: "Email", required: true },
    { id: "role", type: "select", label: "Role", config: { options: [{ label: "Admin", value: "admin" }, { label: "User", value: "user" }] } },
  ],
};

<FormRenderer schema={schema} onSubmit={(values) => console.log(values)} />
```

## Field Types Reference

| Type       | Zod Schema         | Config Interface       | Key Config Props                        |
| ---------- | ------------------ | ---------------------- | --------------------------------------- |
| `text`     | `z.string()`       | `TextFieldConfig`      | `placeholder`, `minLength`, `maxLength` |
| `textarea` | `z.string()`       | `TextareaFieldConfig`  | `placeholder`, `minLength`, `maxLength`, `rows` |
| `email`    | `z.string().email()` | `EmailFieldConfig`   | `placeholder`                           |
| `number`   | `z.coerce.number()` | `NumberFieldConfig`   | `placeholder`, `min`, `max`, `step`     |
| `password` | `z.string()`       | `PasswordFieldConfig`  | `placeholder`, `minLength`, `maxLength` |
| `url`      | `z.string().url()`  | `UrlFieldConfig`      | `placeholder`                           |
| `select`   | `z.string()`       | `SelectFieldConfig`    | `options: SelectOption[]`, `placeholder` |
| `radio`    | `z.string()`       | `RadioFieldConfig`     | `options: SelectOption[]`               |
| `checkbox` | `z.boolean()`      | `CheckboxFieldConfig`  | `checkboxLabel`                         |
| `switch`   | `z.boolean()`      | `SwitchFieldConfig`    | `switchLabel`                           |
| `date`     | `z.coerce.date()`  | `DateFieldConfig`      | `minDate`, `maxDate` (ISO strings)      |

## View Modes

### Classic (default)
All fields rendered in a vertical stack. Best for short forms.

```tsx
{ viewMode: "classic", fields: [...] }
```

### Conversational
One field at a time. Enter key advances. Back button navigates. Shows progress counter.

```tsx
{ viewMode: "conversational", fields: [...] }
```

### Multistep
Fields grouped by `steps`. Step indicators show progress. Validates per step.

```tsx
{
  viewMode: "multistep",
  fields: [...],
  steps: [
    { label: "Step 1", fieldIds: ["name", "email"] },
    { label: "Step 2", fieldIds: ["message"] },
  ],
  settings: { showProgressBar: true },
}
```

## Adding a Custom Field Type

1. Create a component that accepts `FieldProps`:

```tsx
import type { FieldProps } from "@/lib/forms/types";

function ColorField({ field, fieldDef, error }: FieldProps) {
  return <input type="color" {...field} />;
}
```

2. Pass it via `componentMap`:

```tsx
<FormRenderer
  schema={schema}
  onSubmit={handleSubmit}
  componentMap={{ text: ColorField }}  // overrides text field rendering
/>
```

## Custom Zod Validation

For cross-field validation, conditional rules, or transforms, pass your own schema:

```tsx
import { z } from "zod";

const schema = z.object({
  password: z.string().min(8),
  confirm: z.string(),
}).refine((d) => d.password === d.confirm, {
  message: "Passwords must match",
  path: ["confirm"],
});

<FormRenderer schema={formSchema} validationSchema={schema} onSubmit={handleSubmit} />
```

## FormRenderer Props

| Prop               | Type                                    | Description                              |
| ------------------ | --------------------------------------- | ---------------------------------------- |
| `schema`           | `FormSchema`                            | Field definitions, view mode, steps      |
| `onSubmit`         | `(values: Record<string, unknown>) => void \| Promise<void>` | Submit handler |
| `componentMap`     | `ComponentMap`                          | Partial override of field components     |
| `validationSchema` | `z.ZodObject<...>`                      | User-provided zod schema (skips auto-gen)|
| `defaultValues`    | `Record<string, unknown>`               | Initial field values                     |
| `errors`           | `Record<string, string>`                | External/server errors by field ID       |
| `disabled`         | `boolean`                               | Disables submit button                   |

## Rules

- Always define `FormSchema` as a typed constant — do not construct it dynamically at render time.
- Do not import `react-hook-form` directly in pages. Use `<FormRenderer>` which handles form setup.
- For select/radio fields, always provide `options` in the config.
- For multistep, every field ID must appear in exactly one step's `fieldIds`.
