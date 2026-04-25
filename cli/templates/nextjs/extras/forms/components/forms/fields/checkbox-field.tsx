"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import type { FieldProps } from "@/lib/forms/types";

function CheckboxField({
  field,
  fieldDef,
  error,
}: FieldProps): React.ReactElement {
  const checkboxLabel =
    fieldDef.config && "checkboxLabel" in fieldDef.config
      ? (fieldDef.config.checkboxLabel ?? fieldDef.label)
      : fieldDef.label;

  return (
    <Field
      orientation="horizontal"
      data-invalid={error ? true : undefined}
    >
      <Checkbox
        id={fieldDef.id}
        checked={field.value === true}
        onCheckedChange={field.onChange}
        aria-invalid={error ? true : undefined}
      />
      <FieldContent>
        <FieldLabel htmlFor={fieldDef.id}>{checkboxLabel}</FieldLabel>
        {fieldDef.helperText && !error ? (
          <FieldDescription>{fieldDef.helperText}</FieldDescription>
        ) : null}
        {error ? <FieldError>{error}</FieldError> : null}
      </FieldContent>
    </Field>
  );
}

export { CheckboxField };
