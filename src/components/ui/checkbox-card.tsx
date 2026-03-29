import { SelectableCard } from "./selectable-card";

interface CheckboxCardProps {
  title: string;
  checked: boolean;
  description: string;
  rightContent?: React.ReactNode;
  onClick: () => void;
}

export function CheckboxCard({
  title,
  checked,
  description,
  rightContent,
  onClick,
}: CheckboxCardProps) {
  return (
    <SelectableCard selected={checked} onClick={onClick}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        </div>

        <div className="flex items-center gap-3">
          {rightContent}

          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center
                ${checked ? "border-teal-500 bg-teal-500" : "border-gray-300"}
              `}
          >
            {checked && <span className="text-white text-xs">✓</span>}
          </div>
        </div>
      </div>
    </SelectableCard>
  );
}
