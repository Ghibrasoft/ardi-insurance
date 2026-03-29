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
            ? "border-(--color-primary) bg-(--color-primary-light)"
            : "border-(--color-border) bg-(--color-surface) hover:border-(--color-primary)"
        }
      `}
    >
      {children}
    </button>
  );
}
