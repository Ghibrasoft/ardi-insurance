import { SelectableCard } from "./selectable-card";

interface RadioCardProps {
  title: string;
  selected: boolean;
  description: string;
  children?: React.ReactNode;
  onClick: () => void;
}

export const RadioCard = ({
  title,
  selected,
  children,
  description,
  onClick,
}: RadioCardProps) => {
  return (
    <SelectableCard selected={selected} onClick={onClick}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-900">{title}</span>
        <div
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
              ${selected ? "border-blue-500 bg-blue-500" : "border-gray-300"}
            `}
        >
          {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-3">{description}</p>

      {children}
    </SelectableCard>
  );
};
