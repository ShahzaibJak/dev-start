# Forms

JSON-driven form renderer with classic, conversational, and multistep view modes. Built on shadcn Form components (react-hook-form + zod).

## Quick Start

```tsx
import { FormRenderer } from "@/components/forms/form-renderer";
import type { FormSchema } from "@/lib/forms/types";

const schema: FormSchema = {
  fields: [
    { id: "name", type: "text", label: "Name", required: true },
    { id: "email", type: "email", label: "Email", required: true },
  ],
};

<FormRenderer schema={schema} onSubmit={(values) => console.log(values)} />;
```

## View Modes

### Classic (default)

All fields visible at once in a vertical stack.

```tsx
const schema: FormSchema = {
  viewMode: "classic",
  fields: [
    /* ... */
  ],
};
```

### Conversational

One field at a time with next/back navigation.

```tsx
const schema: FormSchema = {
  viewMode: "conversational",
  fields: [
    /* ... */
  ],
};
```

### Multistep

Fields grouped into steps with step indicators.

```tsx
const schema: FormSchema = {
  viewMode: "multistep",
  fields: [
    { id: "name", type: "text", label: "Name", required: true },
    { id: "email", type: "email", label: "Email", required: true },
    { id: "message", type: "textarea", label: "Message", required: true },
  ],
  steps: [
    { label: "Contact Info", fieldIds: ["name", "email"] },
    { label: "Details", fieldIds: ["message"] },
  ],
  settings: { showProgressBar: true },
};
```

## Field Types

| Type       | Config Options                        |
| ---------- | ------------------------------------- |
| `text`     | `placeholder`, `minLength`, `maxLength` |
| `textarea` | `placeholder`, `minLength`, `maxLength`, `rows` |
| `email`    | `placeholder`                         |
| `number`   | `placeholder`, `min`, `max`, `step`   |
| `password` | `placeholder`, `minLength`, `maxLength` |
| `url`      | `placeholder`                         |
| `select`   | `options`, `placeholder`              |
| `radio`    | `options`                             |
| `checkbox` | `checkboxLabel`                       |
| `switch`   | `switchLabel`                         |
| `date`     | `minDate`, `maxDate`                  |

## Custom Field Components

Override any field type's rendering via the `componentMap` prop:

```tsx
import type { FieldProps } from "@/lib/forms/types";

function MyCustomInput({ field, fieldDef, error }: FieldProps) {
  return <input {...field} placeholder={fieldDef.label} />;
}

<FormRenderer
  schema={schema}
  onSubmit={handleSubmit}
  componentMap={{ text: MyCustomInput }}
/>;
```

## Custom Validation

Pass your own zod schema for advanced validation (cross-field rules, transforms):

```tsx
import { z } from "zod";

const validationSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

<FormRenderer
  schema={schema}
  onSubmit={handleSubmit}
  validationSchema={validationSchema}
/>;
```

## Key Files

| File | Purpose |
| ---- | ------- |
| `lib/forms/types.ts` | All type definitions |
| `lib/forms/validation.ts` | Zod schema auto-generation |
| `components/forms/form-renderer.tsx` | Main `<FormRenderer>` component |
| `components/forms/fields/` | Field type components + `defaultComponentMap` |
| `components/forms/layouts/` | Layout components for each view mode |
