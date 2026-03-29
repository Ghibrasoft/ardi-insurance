import { FormField, type FormFieldProps } from "./form-field";
import { Input, type InputProps } from "./input";

export type FormInputFieldProps = Omit<FormFieldProps, "children"> & InputProps;

/**
 * Combines FormField + Input.
 * Automatically links label → input using `name` as id for accessibility.
 */

export function FormInputField({
  name,
  label,
  error,
  required,
  ...inputProps
}: FormInputFieldProps) {
  return (
    <FormField label={label} error={error} required={required}>
      <Input id={name} name={name} {...inputProps} />
    </FormField>
  );
}
