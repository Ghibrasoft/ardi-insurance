import Logo from "../common/logo";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Logo width={50} height={50} className="text-[#077a61]" />
        </div>
      </div>
    </header>
  );
}
