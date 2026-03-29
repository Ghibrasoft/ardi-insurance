import { Footer } from "./footer";
import { Header } from "./header";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
