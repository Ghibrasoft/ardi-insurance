import { SectionCard } from "../../../../../components/ui/section-card";
import { SummaryRow } from "../../../../../components/ui/summary-row";
import { formatDate } from "../../../../../lib/utils/format-date";
import { formatPrice } from "../../../../../lib/utils/format-price";
import type { IQuoteSummary } from "../../insurance-form-types";
import { StepFour } from "../step-four/step-four";
import { useStepThreeController } from "./use-step-three-controller";

interface StepThreeProps {
  isFormSucceed: boolean;
  quote: IQuoteSummary | null;
}

export const StepThree = ({ quote, isFormSucceed }: StepThreeProps) => {
  const { pkg, selectedAddons } = useStepThreeController({
    quote,
  });

  if (isFormSucceed) return <StepFour quote={quote} />;

  return (
    <div className="flex flex-col gap-6">
      {/* Driver */}
      <SectionCard title="მძღოლის ინფორმაცია">
        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <SummaryRow
            label="სახელი და გვარი"
            value={`${quote?.driver.firstName} ${quote?.driver.lastName}`}
          />
          <SummaryRow label="პირადი ნომერი" value={quote?.driver.personalId} />
          <SummaryRow
            label="დაბადების თარიღი"
            value={quote?.driver.dateOfBirth}
          />
          <SummaryRow label="ტელეფონი" value={`${quote?.driver.phone}`} />
        </div>
      </SectionCard>

      {/* Vehicle */}
      <SectionCard title="ავტომობილის ინფორმაცია">
        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <SummaryRow
            label="სახელმწიფო ნომერი"
            value={quote?.vehicle.plateNumber}
          />
          <SummaryRow
            label="მარკა / მოდელი"
            value={`${quote?.vehicle.make} ${quote?.vehicle.model}`}
          />
          <SummaryRow label="გამოშვების წელი" value={quote?.vehicle.year} />
          <SummaryRow
            label="საბაზრო ღირებულება"
            value={`${formatPrice(quote?.vehicle.marketValue ?? 0)} ₾`}
          />
        </div>
      </SectionCard>

      {/* Package + addons */}
      <SectionCard title="არჩეული პაკეტი">
        <div className="flex flex-col gap-3 text-sm">
          <SummaryRow label="პაკეტი" value={pkg.name} />
          {selectedAddons.length > 0 && (
            <SummaryRow
              label="დამატებითი ოფციები"
              value={selectedAddons.map((a) => a.label).join(", ")}
            />
          )}
        </div>
      </SectionCard>

      {/* Bonus */}
      <SectionCard title="პრემია">
        <div className="flex flex-col gap-3 text-sm">
          <SummaryRow
            label="პოლისის დაწყება"
            value={formatDate(quote?.startDate)}
          />
          <SummaryRow
            label="პოლისის დასრულება"
            value={formatDate(quote?.endDate)}
          />
          <SummaryRow
            label="წლიური პრემია"
            value={`${formatPrice(quote?.annualPremium ?? 0)} ₾`}
            highlight
          />
          <SummaryRow
            label="თვიური გადახდა"
            value={`${formatPrice(quote?.monthlyPremium ?? 0)} ₾`}
            highlight
          />
        </div>
      </SectionCard>
    </div>
  );
};
