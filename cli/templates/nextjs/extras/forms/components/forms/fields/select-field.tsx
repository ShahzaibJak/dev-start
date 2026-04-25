"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import type { FieldProps } from "@/lib/forms/types";

function SelectField({
  field,
  fieldDef,
  error,
}: FieldProps): React.ReactElement {
  const options =
    fieldDef.config && "options" in fieldDef.config
      ? (fieldDef.config.options ?? [])
      : [];
  const placeholder =
    fieldDef.config && "placeholder" in fieldDef.config
      ? (fieldDef.config.placeholder ?? "Select an option")
      : "Select an option";

  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor={fieldDef.id}>{fieldDef.label}</FieldLabel>
      <Select
        value={field.value ?? ""}
        onValueChange={field.onChange}
      >
        <SelectTrigger
          id={fieldDef.id}
          aria-invalid={error ? true : undefined}
          className="w-full"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {fieldDef.helperText && !error ? (
        <FieldDescription>{fieldDef.helperText}</FieldDescription>
      ) : null}
      {error ? <FieldError>{error}</FieldError> : null}
    </Field>
  );
}

export { SelectField };
