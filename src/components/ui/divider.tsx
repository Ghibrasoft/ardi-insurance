import { cn } from "../../lib/utils/cn";

interface DividerProps {
  flexItem?: boolean;
  className?: string;
  direction?: "horizontal" | "vertical";
}

export function Divider({
  className,
  flexItem = false,
  direction = "horizontal",
}: DividerProps) {
  const baseStyles = "bg-gray-300";

  const orientationStyles =
    direction === "vertical"
      ? cn("w-px", flexItem ? "self-stretch" : "h-full", "mx-2")
      : cn("h-px", "w-full", "my-2");

  return <div className={cn(baseStyles, orientationStyles, className)} />;
}
