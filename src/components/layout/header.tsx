import Logo from "../common/logo";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky shadow-sm top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo width={50} height={50} className="text-[#077a61]" />
        </div>

        <div>theme switcher here...</div>
      </div>
    </header>
  );
}
