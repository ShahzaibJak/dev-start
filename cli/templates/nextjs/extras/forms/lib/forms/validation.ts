import { z } from "zod";

import type {
  FieldConfigMap,
  FormField,
} from "./types";

type ZodShape = Record<string, z.ZodTypeAny>;

/**
 * Safely extract a numeric property from a field config object.
 * Uses duck-typing to avoid type assertion on the union config type.
 */
function configNum(config: FieldConfigMap[keyof FieldConfigMap] | undefined, key: string): number | undefined {
  if (config && key in config) {
    const val = (config as Record<string, unknown>)[key]; // type-ok
    return typeof val === "number" ? val : undefined;
  }
  return undefined;
}

function configStr(config: FieldConfigMap[keyof FieldConfigMap] | undefined, key: string): string | undefined {
  if (config && key in config) {
    const val = (config as Record<string, unknown>)[key]; // type-ok
    return typeof val === "string" ? val : undefined;
  }
  return undefined;
}

function buildFieldSchema(field: FormField): z.ZodTypeAny {
  const cfg = field.config;

  switch (field.type) {
    case "text":
    case "textarea":
    case "password": {
      let schema = z.string();
      const minLen = configNum(cfg, "minLength");
      const maxLen = configNum(cfg, "maxLength");
      if (minLen !== undefined) schema = schema.min(minLen, `Must be at least ${String(minLen)} characters`);
      if (maxLen !== undefined) schema = schema.max(maxLen, `Must be at most ${String(maxLen)} characters`);
      return schema;
    }
    case "email": {
      return z.string().email("Invalid email address");
    }
    case "url": {
      return z.string().url("Invalid URL");
    }
    case "select":
    case "radio": {
      return z.string().min(1, "Please select an option");
    }
    case "number": {
      let schema = z.coerce.number();
      const min = configNum(cfg, "min");
      const max = configNum(cfg, "max");
      if (min !== undefined) schema = schema.min(min, `Must be at least ${String(min)}`);
      if (max !== undefined) schema = schema.max(max, `Must be at most ${String(max)}`);
      return schema;
    }
    case "checkbox":
    case "switch": {
      return z.boolean();
    }
    case "date": {
      let schema = z.coerce.date();
      const minDate = configStr(cfg, "minDate");
      const maxDate = configStr(cfg, "maxDate");
      if (minDate !== undefined) schema = schema.min(new Date(minDate), `Date must be after ${minDate}`);
      if (maxDate !== undefined) schema = schema.max(new Date(maxDate), `Date must be before ${maxDate}`);
      return schema;
    }
    default: {
      return z.string();
    }
  }
}

/**
 * Generates a zod schema from a `FormField[]` config.
 * Required fields use the raw schema; optional fields are wrapped with `.optional()`.
 */
export function buildFormSchema(fields: ReadonlyArray<FormField>): z.ZodObject<ZodShape> {
  const shape: ZodShape = {};

  for (const field of fields) {
    const base = buildFieldSchema(field);
    shape[field.id] = field.required ? base : base.optional();
  }

  return z.object(shape);
}
