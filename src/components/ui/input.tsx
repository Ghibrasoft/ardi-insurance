import { type InputHTMLAttributes, useCallback, useMemo } from "react";
import { cn } from "../../lib/utils/cn";

type MaskVariant = "plate-number" | "phone" | "numeric";

const maskFunctions: Record<
  MaskVariant,
  (value: string, phonePrefix?: string) => string
> = {
  "plate-number": (value: string) => {
    const upper = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    let masked = "";
    let letterCount = 0;
    let digitCount = 0;

    for (let i = 0; i < upper.length; i++) {
      const char = upper[i];
      const isLetter = /[A-Z]/.test(char);
      const isDigit = /[0-9]/.test(char);

      if (letterCount < 2 && isLetter) {
        masked += char;
        letterCount++;
        if (letterCount === 2) masked += "-";
      } else if (letterCount === 2 && digitCount < 3 && isDigit) {
        masked += char;
        digitCount++;
        if (digitCount === 3) masked += "-";
      } else if (digitCount === 3 && isLetter && masked.length < 9) {
        masked += char;
      }
    }

    return masked;
  },

  phone: (value: string, phonePrefix = "995") => {
    const digits = value.replace(/\D/g, "");

    const local = digits.startsWith(phonePrefix)
      ? digits.slice(phonePrefix.length)
      : digits;

    const validated =
      local.startsWith("5") || local === ""
        ? local
        : local.replace(/^[^5]*/, "");

    const part1 = validated.slice(0, 3);
    const part2 = validated.slice(3, 6);
    const part3 = validated.slice(6, 9);

    let masked = `+${phonePrefix}`;
    if (part1) masked += ` ${part1}`;
    if (part2) masked += ` ${part2}`;
    if (part3) masked += ` ${part3}`;

    return masked;
  },

  numeric: (value: string) => value.replace(/\D+/g, ""),
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  clearable?: boolean;
  maskVariant?: MaskVariant;
  phonePrefix?: string;
}

export function Input({
  value,
  error,
  maskVariant,
  className = "",
  clearable = true,
  phonePrefix = "995",
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
        const maskedValue = maskFunctions[maskVariant](
          e.target.value,
          phonePrefix
        );
        e.target.value = maskedValue;
      }
      onChange?.(e);
    },
    [maskVariant, phonePrefix, onChange]
  );

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (
        maskVariant === "phone" &&
        (!e.target.value || e.target.value === "+")
      ) {
        e.target.value = `+${phonePrefix}`;
        onChange?.(e as unknown as React.ChangeEvent<HTMLInputElement>);
      }
      onFocus?.(e);
    },
    [maskVariant, phonePrefix, onFocus, onChange]
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
          "disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed disabled:pointer-events-none",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            : "border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100",
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
