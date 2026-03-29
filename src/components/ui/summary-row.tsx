import { cn } from "../../lib/utils/cn";

interface SummaryRowProps {
  label: string;
  value?: string | number | null;
  highlight?: boolean;
}

export function SummaryRow({
  label,
  value,
  highlight = false,
}: SummaryRowProps) {
  const computedValue =
    value === null || value === undefined || value.toString().trim() === ""
      ? "N/A"
      : String(value);

  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-0.5 sm:gap-4">
      <span className="text-(--color-text-secondary) whitespace-nowrap shrink-0">
        {label}:
      </span>
      <span
        className={cn(
          "min-w-0 flex-1 text-left sm:text-right wrap-break-word",
          highlight
            ? "font-bold text-teal-600 text-base"
            : "font-medium text-(--color-text-primary)"
        )}
      >
        {computedValue}
      </span>
    </div>
  );
}
