"use client";

import { useState, useCallback, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LayoutProps } from "@/lib/forms/types";

function MultistepLayout({
  schema,
  componentMap,
  disabled,
}: LayoutProps): React.ReactElement {
  const { control, trigger, formState } = useFormContext();
  const [currentStep, setCurrentStep] = useState(0);
  const steps = useMemo(() => schema.steps ?? [], [schema.steps]);
  const totalSteps = steps.length;
  const isLast = currentStep === totalSteps - 1;
  const submitLabel = schema.settings?.submitLabel ?? "Submit";
  const showProgressBar = schema.settings?.showProgressBar ?? false;

  const currentStepDef = steps[currentStep];
  const stepFieldIds = currentStepDef?.fieldIds ?? [];
  const stepFields = schema.fields.filter((f) => stepFieldIds.includes(f.id));

  const handleNext = useCallback(async (): Promise<void> => {
    const ids = steps[currentStep]?.fieldIds ?? [];
    const valid = await trigger(ids);
    if (valid && currentStep < steps.length - 1) {
      setCurrentStep((i) => i + 1);
    }
  }, [currentStep, steps, trigger]);

  const handleBack = useCallback((): void => {
    setCurrentStep((i) => Math.max(0, i - 1));
  }, []);

  return (
    <div>
      {/* Step indicators */}
      <div className="mb-6 flex gap-2">
        {steps.map((step, index) => (
          <div key={step.label ?? index} className="flex flex-1 flex-col gap-1">
            <div
              className={cn(
                "h-1 rounded-full",
                index <= currentStep ? "bg-primary" : "bg-muted",
              )}
            />
            {step.label ? (
              <span
                className={cn(
                  "text-xs",
                  index === currentStep
                    ? "font-medium text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
            ) : null}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      {showProgressBar ? (
        <div className="mb-4 text-sm text-muted-foreground">
          Step {currentStep + 1} of {totalSteps}
        </div>
      ) : null}

      {/* Fields */}
      <FieldGroup>
        {stepFields.map((fieldDef) => {
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
      </FieldGroup>

      {/* Navigation */}
      <div className="mt-6 flex gap-2">
        {currentStep > 0 ? (
          <Button type="button" variant="outline" onClick={handleBack}>
            Previous
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

export { MultistepLayout };
