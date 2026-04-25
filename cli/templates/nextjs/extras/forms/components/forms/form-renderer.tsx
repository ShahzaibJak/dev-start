"use client";

import { useEffect, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { buildFormSchema } from "@/lib/forms/validation";
import { defaultComponentMap } from "@/components/forms/fields";
import { ClassicLayout } from "@/components/forms/layouts/classic-layout";
import { ConversationalLayout } from "@/components/forms/layouts/conversational-layout";
import { MultistepLayout } from "@/components/forms/layouts/multistep-layout";
import type { ComponentMap, FormSchema } from "@/lib/forms/types";

interface FormRendererProps {
  schema: FormSchema;
  onSubmit: (values: Record<string, unknown>) => void | Promise<void>;
  componentMap?: ComponentMap;
  validationSchema?: z.ZodObject<z.ZodRawShape>;
  defaultValues?: Record<string, unknown>;
  errors?: Record<string, string>;
  disabled?: boolean;
}

function FormRenderer({
  schema,
  onSubmit,
  componentMap: userComponentMap,
  validationSchema,
  defaultValues,
  errors,
  disabled,
}: FormRendererProps): React.ReactElement {
  const mergedComponentMap = useMemo(
    () => ({ ...defaultComponentMap, ...userComponentMap }),
    [userComponentMap],
  );

  const zodSchema = useMemo(
    () => validationSchema ?? buildFormSchema(schema.fields),
    [validationSchema, schema.fields],
  );

  const computedDefaults = useMemo(() => {
    const defaults: Record<string, unknown> = {};
    for (const field of schema.fields) {
      if (field.defaultValue !== undefined) {
        defaults[field.id] = field.defaultValue;
      } else if (field.type === "checkbox" || field.type === "switch") {
        defaults[field.id] = false;
      } else {
        defaults[field.id] = undefined;
      }
    }
    return { ...defaults, ...defaultValues };
  }, [schema.fields, defaultValues]);

  const form = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: computedDefaults,
  });

  // Apply external errors
  useEffect(() => {
    if (!errors) return;
    for (const [fieldId, message] of Object.entries(errors)) {
      form.setError(fieldId, { type: "server", message });
    }
  }, [errors, form]);

  const viewMode = schema.viewMode ?? "classic";

  const Layout =
    viewMode === "conversational"
      ? ConversationalLayout
      : viewMode === "multistep"
        ? MultistepLayout
        : ClassicLayout;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(values as Record<string, unknown>),
        )}
        noValidate
      >
        <Layout
          schema={schema}
          componentMap={mergedComponentMap}
          disabled={disabled}
        />
      </form>
    </FormProvider>
  );
}

export { FormRenderer };
export type { FormRendererProps };
