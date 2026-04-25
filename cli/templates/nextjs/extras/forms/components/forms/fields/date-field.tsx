"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import type { FieldProps } from "@/lib/forms/types";

function DateField({
  field,
  fieldDef,
  error,
}: FieldProps): React.ReactElement {
  const minDateStr =
    fieldDef.config && "minDate" in fieldDef.config
      ? fieldDef.config.minDate
      : undefined;
  const maxDateStr =
    fieldDef.config && "maxDate" in fieldDef.config
      ? fieldDef.config.maxDate
      : undefined;
  const minDate = minDateStr ? new Date(minDateStr) : undefined;
  const maxDate = maxDateStr ? new Date(maxDateStr) : undefined;

  const selected = field.value instanceof Date ? field.value : undefined;

  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor={fieldDef.id}>{fieldDef.label}</FieldLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={fieldDef.id}
            variant="outline"
            aria-invalid={error ? true : undefined}
            className={cn(
              "w-full justify-start text-left font-normal",
              !selected && "text-muted-foreground",
            )}
          >
            <CalendarIcon data-icon="inline-start" />
            {selected ? format(selected, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={(date) => field.onChange(date)}
            disabled={(date) => {
              if (minDate && date < minDate) return true;
              if (maxDate && date > maxDate) return true;
              return false;
            }}
          />
        </PopoverContent>
      </Popover>
      {fieldDef.helperText && !error ? (
        <FieldDescription>{fieldDef.helperText}</FieldDescription>
      ) : null}
      {error ? <FieldError>{error}</FieldError> : null}
    </Field>
  );
}

export { DateField };
