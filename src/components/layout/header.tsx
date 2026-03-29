import { useDarkMode } from "../../hooks/use-dark-mode";
import Logo from "../common/logo";

export function Header() {
  const { isDark, toggle } = useDarkMode();

  return (
    <header className="bg-(--color-surface) border-b border-(--color-border) sticky shadow-sm top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo width={50} height={50} className="text-[#077a61]" />
        </div>
        <button
          onClick={toggle}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-(--color-text-secondary) hover:bg-(--color-bg) transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}
