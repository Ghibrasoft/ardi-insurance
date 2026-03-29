import type { IQuoteSummary } from "../../insurance-form-types";
import { QuoteCard } from "./quote-card";
import { QuoteSummaryHeader } from "./quote-summary-header";

interface QuoteSummaryProps {
  quote: IQuoteSummary;
}

export const QuoteSummary = ({ quote }: QuoteSummaryProps) => {
  return (
    <div className="flex flex-col gap-4">
      <QuoteSummaryHeader />

      <QuoteCard quote={quote} />
    </div>
  );
};
