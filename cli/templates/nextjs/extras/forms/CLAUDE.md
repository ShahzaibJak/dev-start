# Project Instructions

## Forms

- `lib/forms/types.ts` — All form system types: `FieldType`, `FormField`, `FormSchema`, `FieldProps`, `ComponentMap`
- `lib/forms/validation.ts` — `buildFormSchema()` auto-generates zod validation from field config
- `components/forms/form-renderer.tsx` — Main entry point: `<FormRenderer schema={...} onSubmit={...} />`
- `components/forms/fields/` — One component per field type, barrel-exported with `defaultComponentMap`
- `components/forms/layouts/` — `ClassicLayout`, `ConversationalLayout`, `MultistepLayout`
- Three view modes: `classic` (default, all fields visible), `conversational` (one at a time), `multistep` (grouped steps)
- Override field rendering via `componentMap` prop: `<FormRenderer componentMap={{ text: MyCustomInput }} />`
- For advanced validation, pass `validationSchema` prop with your own zod schema (skips auto-generation)
- Field types: `text`, `textarea`, `email`, `number`, `password`, `url`, `select`, `checkbox`, `radio`, `switch`, `date`
- Do not import react-hook-form directly in pages — use `<FormRenderer>` which handles form setup internally
