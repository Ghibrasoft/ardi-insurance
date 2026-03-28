import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils/cn";

type ButtonVariant = "primary" | "outlined" | "ghost";
type ButtonBtnColor = "default" | "error";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: ButtonVariant;
  btnColor?: ButtonBtnColor;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
  outlined:
    "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-400",
  ghost: "text-gray-600 hover:bg-gray-100 disabled:text-gray-300",
};

const COLOR_SCHEME_STYLES: Record<
  ButtonBtnColor,
  Partial<Record<ButtonVariant, string>>
> = {
  default: {},
  error: {
    primary: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300",
    outlined:
      "bg-red-50 text-red-700 border border-red-300 hover:bg-red-100 disabled:bg-red-50 disabled:text-red-400",
    ghost: "text-red-600 hover:bg-red-50 disabled:text-red-300",
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
