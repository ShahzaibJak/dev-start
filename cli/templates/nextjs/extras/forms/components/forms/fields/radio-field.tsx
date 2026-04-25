"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import type { FieldProps } from "@/lib/forms/types";

function RadioField({
  field,
  fieldDef,
  error,
}: FieldProps): React.ReactElement {
  const options =
    fieldDef.config && "options" in fieldDef.config
      ? (fieldDef.config.options ?? [])
      : [];

  return (
    <FieldSet>
      <FieldLegend variant="label">{fieldDef.label}</FieldLegend>
      {fieldDef.helperText && !error ? (
        <FieldDescription>{fieldDef.helperText}</FieldDescription>
      ) : null}
      <RadioGroup
        value={field.value ?? ""}
        onValueChange={field.onChange}
        aria-invalid={error ? true : undefined}
      >
        {options.map((option) => (
          <Field key={option.value} orientation="horizontal">
            <RadioGroupItem
              id={`${fieldDef.id}-${option.value}`}
              value={option.value}
            />
            <Label htmlFor={`${fieldDef.id}-${option.value}`}>
              {option.label}
            </Label>
          </Field>
        ))}
      </RadioGroup>
      {error ? <FieldError>{error}</FieldError> : null}
    </FieldSet>
  );
}

export { RadioField };
