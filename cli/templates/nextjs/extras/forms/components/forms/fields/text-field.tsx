"use client";

import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import type { FieldProps } from "@/lib/forms/types";

/**
 * Handles text, email, password, url, and number field types.
 * Uses HTML input type to differentiate behavior.
 */
function TextField({ field, fieldDef, error }: FieldProps): React.ReactElement {
  const inputType =
    fieldDef.type === "number"
      ? "number"
      : fieldDef.type === "email"
        ? "email"
        : fieldDef.type === "password"
          ? "password"
          : fieldDef.type === "url"
            ? "url"
            : "text";

  const placeholder =
    fieldDef.config && "placeholder" in fieldDef.config
      ? (fieldDef.config.placeholder ?? undefined)
      : undefined;

  const step =
    fieldDef.type === "number" &&
    fieldDef.config &&
    "step" in fieldDef.config
      ? fieldDef.config.step
      : undefined;

  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor={fieldDef.id}>{fieldDef.label}</FieldLabel>
      <Input
        id={fieldDef.id}
        type={inputType}
        placeholder={placeholder}
        step={step}
        aria-invalid={error ? true : undefined}
        {...field}
        value={field.value ?? ""}
        onChange={(e) => {
          if (fieldDef.type === "number") {
            const val = e.target.value;
            field.onChange(val === "" ? undefined : Number(val));
          } else {
            field.onChange(e.target.value);
          }
        }}
      />
      {fieldDef.helperText && !error ? (
        <FieldDescription>{fieldDef.helperText}</FieldDescription>
      ) : null}
      {error ? <FieldError>{error}</FieldError> : null}
    </Field>
  );
}

export { TextField };
