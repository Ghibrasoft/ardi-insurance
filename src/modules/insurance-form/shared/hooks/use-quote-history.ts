import { useState } from "react";
import type { IQuoteSummary } from "../insurance-form-types";

const HISTORY_KEY = "ardi_quote_history";

export function useQuoteHistory() {
  const [history, setHistory] = useState<IQuoteSummary[]>(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const saveQuoteHistory = (quote: IQuoteSummary) => {
    const updated = [quote, ...history].slice(0, 5);
    setHistory(updated);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  };

  const deleteQuoteFromHistory = (index: number) => {
    const updated = history.filter((_, i) => i !== index);
    setHistory(updated);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  };

  const clearQuoteHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  return {
    history,
    saveQuoteHistory,
    clearQuoteHistory,
    deleteQuoteFromHistory,
  };
}
