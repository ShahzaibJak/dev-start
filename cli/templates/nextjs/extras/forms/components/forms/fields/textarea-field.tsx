"use client";

import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import type { FieldProps } from "@/lib/forms/types";

function TextareaField({
  field,
  fieldDef,
  error,
}: FieldProps): React.ReactElement {
  const rows =
    fieldDef.config && "rows" in fieldDef.config
      ? fieldDef.config.rows
      : undefined;

  const placeholder =
    fieldDef.config && "placeholder" in fieldDef.config
      ? (fieldDef.config.placeholder ?? undefined)
      : undefined;

  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor={fieldDef.id}>{fieldDef.label}</FieldLabel>
      <Textarea
        id={fieldDef.id}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={error ? true : undefined}
        {...field}
        value={field.value ?? ""}
        onChange={(e) => field.onChange(e.target.value)}
      />
      {fieldDef.helperText && !error ? (
        <FieldDescription>{fieldDef.helperText}</FieldDescription>
      ) : null}
      {error ? <FieldError>{error}</FieldError> : null}
    </Field>
  );
}

export { TextareaField };
