import { Button } from "../../../../../components/ui/button";
import { SummaryRow } from "../../../../../components/ui/summary-row";
import { formatDate } from "../../../../../lib/utils/format-date";
import { formatPrice } from "../../../../../lib/utils/format-price";
import type { IQuoteSummary } from "../../insurance-form-types";
import { StepFourHeader } from "./step-four-header";

interface StepFourProps {
  quote: IQuoteSummary | null;
}

export const StepFour = ({ quote }: StepFourProps) => {
  const handlePrint = () => {
    window.print();
  };

  if (!quote) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <StepFourHeader />

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
          <SummaryRow
            label="დამატებითი ოფციები"
            value={quote.addons.join(", ")}
          />
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

      {/* Actions */}
      <Button onClick={handlePrint} className="sm:w-fit w-full">
        PDF / ამობეჭდვა
      </Button>
    </div>
  );
};
