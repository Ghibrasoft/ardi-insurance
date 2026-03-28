import { SummaryRow } from "../../../../../components/ui/summary-row";
import type { IQuoteSummary } from "../../insurance-form-types";
import { formatDate } from "../../../../../lib/utils/format-date";
import { formatPrice } from "../../../../../lib/utils/format-price";
import { Button } from "../../../../../components/ui/button";
import { ADDONS } from "../../../../../lib/constants/insurance-addons";

interface IQuoteCardProps {
  quote: IQuoteSummary;
  onDelete?: () => void;
}
export const QuoteCard = ({ quote, onDelete }: IQuoteCardProps) => {
  const selectedAddons = ADDONS.filter((a) => quote.addons.includes(a.id));
  const displayAddons = selectedAddons.map((a) => a.label).join(", ");

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-sm rounded-xl p-4 text-sm text-left flex flex-col gap-2">
        <SummaryRow
          label="მძღოლი"
          value={`${quote.driver.firstName} ${quote.driver.lastName}`}
        />
        <SummaryRow
          label="ავტომობილი"
          value={`${quote.vehicle.make} ${quote.vehicle.model}`}
        />
        <SummaryRow label="პაკეტი" value={quote.packageId} />
        {quote.addons.length > 0 && (
          <SummaryRow label="დამატებითი ოფციები" value={displayAddons} />
        )}
        <SummaryRow
          label="წლიური პრემია"
          value={`${formatPrice(quote.annualPremium)} ₾`}
          highlight
        />
        <SummaryRow
          label="თვიური გადახდა"
          value={`${formatPrice(quote.monthlyPremium)} ₾`}
          highlight
        />
        <SummaryRow
          label="პერიოდი"
          value={`${formatDate(quote.startDate)} - ${formatDate(
            quote.endDate
          )}`}
        />
      </div>

      <div className="flex justify-end pt-2 border-t border-gray-100 gap-2">
        <Button onClick={handlePrint} className="sm:w-fit w-full">
          PDF / ამობეჭდვა
        </Button>

        {onDelete && (
          <Button variant="error" onClick={onDelete} className="text-xs">
            წაშლა
          </Button>
        )}
      </div>
    </div>
  );
};
