export const QuoteSummaryHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 py-5">
      <div
        className="w-16 h-16 flex items-center justify-center rounded-full"
        style={{
          backgroundColor: "var(--color-success-light)",
        }}
      >
        <span
          className="text-3xl font-bold"
          style={{ color: "var(--color-success)" }}
        >
          ✓
        </span>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-(--color-text-primary)">
          პოლისი წარმატებით შეიქმნა 🎉
        </h2>
        <p className="mt-2" style={{ color: "var(--color-text-secondary)" }}>
          თქვენი დაზღვევა აქტიურია! დეტალები იხილეთ ქვემოთ.
        </p>
      </div>
    </div>
  );
};
