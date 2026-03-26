import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error, className = "", ...props }: InputProps) {
  return (
    <input
      className={`
        w-full px-3 py-2.5 rounded-lg border text-sm
        bg-white text-gray-900 placeholder:text-gray-400
        outline-none transition-all duration-150
        ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        }
        disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    />
  );
}
