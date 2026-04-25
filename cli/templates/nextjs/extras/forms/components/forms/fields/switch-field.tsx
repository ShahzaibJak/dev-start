"use client";

import { Switch } from "@/components/ui/switch";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import type { FieldProps } from "@/lib/forms/types";

function SwitchField({
  field,
  fieldDef,
  error,
}: FieldProps): React.ReactElement {
  const switchLabel =
    fieldDef.config && "switchLabel" in fieldDef.config
      ? (fieldDef.config.switchLabel ?? fieldDef.label)
      : fieldDef.label;

  return (
    <Field
      orientation="horizontal"
      data-invalid={error ? true : undefined}
    >
      <Switch
        id={fieldDef.id}
        checked={field.value === true}
        onCheckedChange={field.onChange}
        aria-invalid={error ? true : undefined}
      />
      <FieldContent>
        <FieldLabel htmlFor={fieldDef.id}>{switchLabel}</FieldLabel>
        {fieldDef.helperText && !error ? (
          <FieldDescription>{fieldDef.helperText}</FieldDescription>
        ) : null}
        {error ? <FieldError>{error}</FieldError> : null}
      </FieldContent>
    </Field>
  );
}

export { SwitchField };
