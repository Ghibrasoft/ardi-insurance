interface SelectableCardProps {
  selected: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

export function SelectableCard({
  selected,
  children,
  onClick,
}: SelectableCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
          w-full text-left px-4 py-4 rounded-xl border-2 transition-all duration-150
          ${
            selected
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 bg-white hover:border-gray-300"
          }
        `}
    >
      {children}
    </button>
  );
}
