interface SectionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function SectionCard({
  title,
  description,
  children,
}: SectionCardProps) {
  return (
    <div className="bg-(--color-surface) rounded-xl border border-(--color-border) shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-(--color-border) bg-(--color-bg)">
        <h2 className="text-base font-semibold text-(--color-text-primary)">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-(--color-text-secondary) mt-0.5">
            {description}
          </p>
        )}
      </div>
      <div className="px-6 py-6">{children}</div>
    </div>
  );
}
