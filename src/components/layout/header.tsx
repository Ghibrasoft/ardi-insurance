import Logo from "../common/logo";
import ToggleTheme from "../ui/theme-toggle";

export function Header() {
  return (
    <header className="bg-(--color-surface) border-b border-(--color-border) sticky shadow-sm top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo width={50} height={50} className="text-[#077a61]" />
        </div>

        <ToggleTheme />
      </div>
    </header>
  );
}
