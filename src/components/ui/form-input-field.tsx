import { FormField, type FormFieldProps } from "./form-field";
import { Input, type InputProps } from "./input";

export type FormInputFieldProps = Omit<FormFieldProps, "children"> &
  InputProps & {
    actions?: React.ReactNode;
  };

/**
 * Combines FormField + Input.
 * Automatically links label → input using `name` as id for accessibility.
 */

export function FormInputField({
  name,
  label,
  error,
  actions,
  required,
  className,
  ...inputProps
}: FormInputFieldProps) {
  return (
    <FormField
      label={label}
      error={error}
      required={required}
      className={className}
    >
      <div className="flex items-center gap-2">
        <Input id={name} name={name} {...inputProps} />

        {actions}
      </div>
    </FormField>
  );
}
