import { type InputHTMLAttributes, useCallback, useMemo } from "react";
import { cn } from "../../lib/utils/cn";

type MaskVariant = "plate-number" | "phone";

const maskFunctions: Record<MaskVariant, (value: string) => string> = {
  "plate-number": (value: string) => {
    const upper = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    let masked = "";
    let letterCount = 0;
    let digitCount = 0;

    for (let i = 0; i < upper.length; i++) {
      const char = upper[i];
      const isLetter = /[A-Z]/.test(char);
      const isDigit = /[0-9]/.test(char);

      // positions 0,1 → letters
      if (letterCount < 2 && isLetter) {
        masked += char;
        letterCount++;
        if (letterCount === 2) masked += "-";
      }
      // positions 3,4,5 → digits
      else if (letterCount === 2 && digitCount < 3 && isDigit) {
        masked += char;
        digitCount++;
        if (digitCount === 3) masked += "-";
      }
      // positions 7,8 → letters
      else if (digitCount === 3 && isLetter && masked.length < 9) {
        masked += char;
      }
    }

    return masked;
  },

  phone: (value: string) => {
    const digits = value.replace(/\D/g, "");
    const local = digits.startsWith("995") ? digits.slice(3) : digits;

    if (local.length === 0) return "+(995) ";

    const part1 = local.slice(0, 3);
    const part2 = local.slice(3, 6);
    const part3 = local.slice(6, 9);

    let masked = `+(995) ${part1}`;
    if (local.length > 3) masked += ` ${part2}`;
    if (local.length > 6) masked += ` ${part3}`;

    return masked;
  },
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  clearable?: boolean;
  maskVariant?: MaskVariant;
}

export function Input({
  value,
  error,
  maskVariant,
  className = "",
  clearable = true,
  onFocus,
  onChange,
  ...props
}: InputProps) {
  const isEmpty = !value || value === "";
  const maxLength = useMemo(
    () =>
      maskVariant === "plate-number"
        ? 9
        : maskVariant === "phone"
        ? 18
        : props.maxLength,
    [maskVariant, props.maxLength]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (maskVariant) {
        e.target.value = maskFunctions[maskVariant](e.target.value);
      }
      onChange?.(e);
    },
    [maskVariant, onChange]
  );

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      // auto-insert prefix for phone
      if (maskVariant === "phone" && !e.target.value) {
        e.target.value = "+(995) ";
        onChange?.(e as unknown as React.ChangeEvent<HTMLInputElement>);
      }
      onFocus?.(e);
    },
    [maskVariant, onChange, onFocus]
  );

  const handleClear = useCallback(() => {
    const e = {
      target: { value: "" },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onChange?.(e);
  }, [onChange]);

  return (
    <div className="relative w-full">
      <input
        {...props}
        value={value}
        className={cn(
          "w-full px-3 py-2.5 rounded-lg border text-sm cursor-text",
          "bg-white placeholder:text-gray-400",
          "outline-none transition-all duration-150",
          "disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
          props.type === "date" && isEmpty ? "text-gray-400" : "text-gray-900",
          value ? "pr-8" : "",
          className
        )}
        maxLength={maxLength}
        onFocus={handleFocus}
        onChange={handleChange}
      />
      {clearable && value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          ×
        </button>
      )}
    </div>
  );
}
