import { SelectableCard } from "./selectable-card";

interface RadioCardProps {
  title: string;
  selected: boolean;
  description: string;
  children?: React.ReactNode;
  onClick: () => void;
}

export function RadioCard({
  title,
  selected,
  children,
  description,
  onClick,
}: RadioCardProps) {
  return (
    <SelectableCard selected={selected} onClick={onClick}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-(--color-text-primary)">
          {title}
        </span>

        <div
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
            ${
              selected
                ? "border-(--color-primary) bg-(--color-primary)"
                : "border-(--color-border)"
            }
          `}
        >
          {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
        </div>
      </div>

      <p className="text-xs text-(--color-text-secondary) mb-3">
        {description}
      </p>

      {children}
    </SelectableCard>
  );
}
