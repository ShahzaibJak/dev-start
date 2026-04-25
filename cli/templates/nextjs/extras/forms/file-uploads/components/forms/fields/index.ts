import type { ComponentType } from "react";
import type { FieldProps, FieldType } from "@/lib/forms/types";
import { TextField } from "./text-field";
import { TextareaField } from "./textarea-field";
import { SelectField } from "./select-field";
import { CheckboxField } from "./checkbox-field";
import { RadioField } from "./radio-field";
import { SwitchField } from "./switch-field";
import { DateField } from "./date-field";
import { FileField } from "./file-field";

export const defaultComponentMap: Record<
  FieldType,
  ComponentType<FieldProps>
> = {
  text: TextField,
  textarea: TextareaField,
  email: TextField,
  number: TextField,
  password: TextField,
  url: TextField,
  select: SelectField,
  checkbox: CheckboxField,
  radio: RadioField,
  switch: SwitchField,
  date: DateField,
  file: FileField,
};

export { TextField } from "./text-field";
export { TextareaField } from "./textarea-field";
export { SelectField } from "./select-field";
export { CheckboxField } from "./checkbox-field";
export { RadioField } from "./radio-field";
export { SwitchField } from "./switch-field";
export { DateField } from "./date-field";
export { FileField } from "./file-field";
