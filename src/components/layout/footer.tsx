export function Footer() {
  return (
    <footer className="bg-(--color-surface) border-t border-(--color-border) py-6">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm text-(--color-text-secondary)">
          © {new Date().getFullYear()} Your Insurance Company. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
