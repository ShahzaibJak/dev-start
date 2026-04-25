"use client";

import { useState, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import type { LayoutProps } from "@/lib/forms/types";

function ConversationalLayout({
  schema,
  componentMap,
  disabled,
}: LayoutProps): React.ReactElement {
  const { control, trigger, formState } = useFormContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const fields = schema.fields;
  const total = fields.length;
  const isLast = currentIndex === total - 1;
  const submitLabel = schema.settings?.submitLabel ?? "Submit";

  const handleNext = useCallback(async (): Promise<void> => {
    const currentField = fields[currentIndex];
    if (!currentField) return;
    const valid = await trigger(currentField.id);
    if (valid && !isLast) {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, fields, isLast, trigger]);

  const handleBack = useCallback((): void => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent): void => {
      if (e.key === "Enter" && !isLast) {
        e.preventDefault();
        void handleNext();
      }
    },
    [handleNext, isLast],
  );

  const currentFieldDef = fields[currentIndex];
  if (!currentFieldDef) return <div />;

  const Component = componentMap[currentFieldDef.type];

  return (
    <div role="group" onKeyDown={handleKeyDown}>
      <div className="mb-4 text-sm text-muted-foreground">
        {currentIndex + 1} of {total}
      </div>

      <FieldGroup>
        <Controller
          key={currentFieldDef.id}
          name={currentFieldDef.id}
          control={control}
          render={({ field, fieldState }) => (
            <Component
              field={field}
              fieldDef={currentFieldDef}
              error={fieldState.error?.message}
            />
          )}
        />
      </FieldGroup>

      <div className="mt-6 flex gap-2">
        {currentIndex > 0 ? (
          <Button type="button" variant="outline" onClick={handleBack}>
            Back
          </Button>
        ) : null}

        {isLast ? (
          <Button
            type="submit"
            disabled={disabled ?? formState.isSubmitting}
          >
            {formState.isSubmitting ? "Submitting..." : submitLabel}
          </Button>
        ) : (
          <Button type="button" onClick={() => void handleNext()}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

export { ConversationalLayout };
