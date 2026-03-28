import { Button } from "../../../../../components/ui/button";
import { useQuoteHistory } from "../../hooks/use-quote-history";
import { QuoteCard } from "./quote-card";

export const QuoteHistoryList = () => {
  const { history, clearQuoteHistory, deleteQuoteFromHistory } =
    useQuoteHistory();

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-sm">შენახული ისტორია არ მოიძებნა</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            შეთავაზების ისტორია
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            თქვენი ბოლო {history.length} შეთავაზება
          </p>
        </div>
        <Button variant="ghost" btnColor="error" onClick={clearQuoteHistory}>
          გასუფთავება
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        {history.map((quote, ind) => (
          <QuoteCard
            key={ind}
            quote={quote}
            onDelete={() => deleteQuoteFromHistory(ind)}
          />
        ))}
      </div>
    </div>
  );
};
