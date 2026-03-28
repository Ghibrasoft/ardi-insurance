import { useLocalStorage } from "../../../../hooks/use-local-storage";
import type { IQuoteSummary } from "../insurance-form-types";

const HISTORY_KEY = "ardi_quote_history";

export function useQuoteHistory() {
  const [history, setHistory, clearQuoteHistory] = useLocalStorage<
    IQuoteSummary[]
  >(HISTORY_KEY, []);

  const saveQuoteHistory = (quote: IQuoteSummary) => {
    const updated = [quote, ...history].slice(0, 5);
    setHistory(updated);
  };

  const deleteQuoteFromHistory = (index: number) => {
    setHistory(history.filter((_, i) => i !== index));
  };

  return {
    history,
    saveQuoteHistory,
    clearQuoteHistory,
    deleteQuoteFromHistory,
  };
}
