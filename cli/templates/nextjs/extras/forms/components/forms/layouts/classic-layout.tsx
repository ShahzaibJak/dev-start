"use client";

import { Controller, useFormContext } from "react-hook-form";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import type { LayoutProps } from "@/lib/forms/types";

function ClassicLayout({
  schema,
  componentMap,
  disabled,
}: LayoutProps): React.ReactElement {
  const { control, formState } = useFormContext();
  const submitLabel = schema.settings?.submitLabel ?? "Submit";

  return (
    <FieldGroup>
      {schema.fields.map((fieldDef) => {
        const Component = componentMap[fieldDef.type];
        return (
          <Controller
            key={fieldDef.id}
            name={fieldDef.id}
            control={control}
            render={({ field, fieldState }) => (
              <Component
                field={field}
                fieldDef={fieldDef}
                error={fieldState.error?.message}
              />
            )}
          />
        );
      })}
      <Button
        type="submit"
        disabled={disabled ?? formState.isSubmitting}
      >
        {formState.isSubmitting ? "Submitting..." : submitLabel}
      </Button>
    </FieldGroup>
  );
}

export { ClassicLayout };
