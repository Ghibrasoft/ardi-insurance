export const QuoteSummaryHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 py-5">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
        <span className="text-3xl text-green-600 font-bold">✓</span>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          პოლისი წარმატებით შეიქმნა 🎉
        </h2>
        <p className="text-gray-500 mt-2">
          თქვენი დაზღვევა აქტიურია! დეტალები იხილეთ ქვემოთ.
        </p>
      </div>
    </div>
  );
};
