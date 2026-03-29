import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils/cn";

type ButtonVariant = "primary" | "outlined" | "ghost";
type ButtonBtnColor = "default" | "secondary" | "error" | "success";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: ButtonVariant;
  btnColor?: ButtonBtnColor;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-(--color-primary) text-white hover:bg-(--color-primary-hover) disabled:bg-(--color-primary-ring)",
  outlined:
    "bg-(--color-surface) text-(--color-text-primary) border border-(--color-border) hover:bg-(--color-bg) disabled:text-(--color-text-secondary)",
  ghost:
    "text-(--color-text-primary) hover:bg-(--color-bg) disabled:text-(--color-text-secondary)",
};

const COLOR_SCHEME_STYLES: Record<
  ButtonBtnColor,
  Partial<Record<ButtonVariant, string>>
> = {
  default: {},
  secondary: {
    primary:
      "bg-(--color-secondary) text-white hover:bg-(--color-secondary-hover) disabled:bg-(--color-secondary-light)",
    outlined:
      "bg-(--color-surface) text-(--color-secondary) border border-(--color-secondary) hover:bg-(--color-secondary-light) disabled:text-(--color-text-secondary)",
    ghost:
      "text-(--color-secondary) hover:bg-(--color-secondary-light) disabled:text-(--color-text-secondary)",
  },
  error: {
    primary:
      "bg-(--color-error) text-white hover:bg-(--color-error-hover) disabled:bg-(--color-error-light)",
    outlined:
      "bg-(--color-error-light) text-(--color-error) border border-(--color-error) hover:bg-(--color-error-light) disabled:text-(--color-text-secondary)",
    ghost:
      "text-(--color-error) hover:bg-(--color-error-light) disabled:text-(--color-text-secondary)",
  },
  success: {
    primary:
      "bg-(--color-success) text-white hover:bg-(--color-success-hover) disabled:bg-(--color-success-light)",
    outlined:
      "bg-(--color-surface) text-(--color-success) border border-(--color-success) hover:bg-(--color-success-light) disabled:text-(--color-text-secondary)",
    ghost:
      "text-(--color-success) hover:bg-(--color-success-light) disabled:text-(--color-text-secondary)",
  },
};

export function Button({
  disabled,
  children,
  className = "",
  isLoading = false,
  variant = "primary",
  btnColor = "default",
  ...props
}: ButtonProps) {
  const variantStyle =
    COLOR_SCHEME_STYLES[btnColor][variant] ?? VARIANT_STYLES[variant];

  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "px-4 py-2.5 rounded-lg text-sm font-medium",
        "transition-all duration-150 cursor-pointer",
        "disabled:cursor-not-allowed disabled:pointer-events-none",
        variantStyle,
        className
      )}
      {...props}
    >
      {isLoading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
