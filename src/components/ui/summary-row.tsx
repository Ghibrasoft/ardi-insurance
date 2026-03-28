import { cn } from "../../lib/utils/cn";

interface SummaryRowProps {
  label: string;
  value?: string | number | null;
  highlight?: boolean;
}

export function SummaryRow({ label, value, highlight }: SummaryRowProps) {
  const computedValue =
    value === null || value === undefined || value.toString().trim() === ""
      ? "N/A"
      : String(value);

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-1">
      <span className="text-gray-500">{label}:</span>
      <span
        className={cn(
          "sm:text-right text-left",
          highlight
            ? "font-bold text-blue-600 text-base"
            : "font-medium text-gray-900"
        )}
      >
        {computedValue}
      </span>
    </div>
  );
}
