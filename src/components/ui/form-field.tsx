import { cn } from "../../lib/utils/cn";

export interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string; // add className
}

export function FormField({
  label,
  error,
  required,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="text-sm font-medium text-(--color-text-primary)">
        {label}
        {required && <span className="text-(--color-error) ml-0.5">*</span>}
      </label>

      {children}

      {error && (
        <p className="text-xs text-(--color-error) flex items-center gap-1">
          <span>⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}
