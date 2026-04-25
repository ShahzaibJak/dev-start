import type { ComponentType, ControllerRenderProps, FieldValues } from "./react-hook-form-types";

// ── Field Types ──────────────────────────────────────────────────────
export type FieldType =
  | "text"
  | "textarea"
  | "email"
  | "number"
  | "password"
  | "url"
  | "select"
  | "checkbox"
  | "radio"
  | "switch"
  | "date";

// ── Select / Radio Options ───────────────────────────────────────────
export interface SelectOption {
  label: string;
  value: string;
}

// ── Per-type Config Interfaces ───────────────────────────────────────
export interface TextFieldConfig {
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
}

export interface TextareaFieldConfig {
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  rows?: number;
}

export interface EmailFieldConfig {
  placeholder?: string;
}

export interface NumberFieldConfig {
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface PasswordFieldConfig {
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
}

export interface UrlFieldConfig {
  placeholder?: string;
}

export interface SelectFieldConfig {
  options: SelectOption[];
  placeholder?: string;
}

export interface RadioFieldConfig {
  options: SelectOption[];
}

export interface CheckboxFieldConfig {
  checkboxLabel?: string;
}

export interface SwitchFieldConfig {
  switchLabel?: string;
}

export interface DateFieldConfig {
  minDate?: string;
  maxDate?: string;
}

// ── Field Type → Config Map ──────────────────────────────────────────
export interface FieldConfigMap {
  text: TextFieldConfig;
  textarea: TextareaFieldConfig;
  email: EmailFieldConfig;
  number: NumberFieldConfig;
  password: PasswordFieldConfig;
  url: UrlFieldConfig;
  select: SelectFieldConfig;
  radio: RadioFieldConfig;
  checkbox: CheckboxFieldConfig;
  switch: SwitchFieldConfig;
  date: DateFieldConfig;
}

// ── Form Field (discriminated by type) ───────────────────────────────
export interface FormField<T extends FieldType = FieldType> {
  id: string;
  type: T;
  label: string;
  helperText?: string;
  required?: boolean;
  config?: FieldConfigMap[T];
  defaultValue?: T extends "checkbox" | "switch"
    ? boolean
    : T extends "number"
      ? number
      : T extends "date"
        ? Date
        : string;
}

// ── View Modes ───────────────────────────────────────────────────────
export type ViewMode = "classic" | "conversational" | "multistep";

// ── Multistep Definitions ────────────────────────────────────────────
export interface FormStep {
  label?: string;
  fieldIds: string[];
}

// ── Form Settings ────────────────────────────────────────────────────
export interface FormSettings {
  submitLabel?: string;
  showProgressBar?: boolean;
}

// ── Form Schema (top-level config) ───────────────────────────────────
export interface FormSchema {
  fields: FormField[];
  viewMode?: ViewMode;
  steps?: FormStep[];
  settings?: FormSettings;
}

// ── Field Component Props ────────────────────────────────────────────
export interface FieldProps {
  field: ControllerRenderProps<FieldValues, string>;
  fieldDef: FormField;
  error?: string;
}

// ── Component Map ────────────────────────────────────────────────────
export type ComponentMap = Partial<Record<FieldType, ComponentType<FieldProps>>>;

// ── Layout Props (shared across all layouts) ─────────────────────────
export interface LayoutProps {
  schema: FormSchema;
  componentMap: Record<FieldType, ComponentType<FieldProps>>;
  disabled?: boolean;
}
