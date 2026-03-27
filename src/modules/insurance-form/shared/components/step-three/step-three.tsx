import { SectionCard } from "../../../../../components/ui/section-card";
import { formatDate } from "../../../../../lib/utils/format-date";
import { formatPrice } from "../../../../../lib/utils/format-price";
import type { IStepOneData, IStepTwoData } from "../../insurance-form-types";
import { useStepThreeController } from "./use-step-three-controller";

interface StepThreeProps {
  stepOneData: IStepOneData;
  stepTwoData: IStepTwoData;
}

export const StepThree = ({ stepOneData, stepTwoData }: StepThreeProps) => {
  const {
    pkg,
    endDate,
    startDate,
    annualPremium,
    monthlyPremium,
    selectedAddons,
  } = useStepThreeController({
    stepOneData,
    stepTwoData,
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Driver */}
      <SectionCard title="მძღოლის ინფორმაცია">
        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <SummaryRow
            label="სახელი და გვარი"
            value={`${stepOneData.driver.firstName} ${stepOneData.driver.lastName}`}
          />
          <SummaryRow
            label="პირადი ნომერი"
            value={stepOneData.driver.personalId}
          />
          <SummaryRow
            label="დაბადების თარიღი"
            value={stepOneData.driver.dateOfBirth}
          />
          <SummaryRow label="ტელეფონი" value={`${stepOneData.driver.phone}`} />
        </div>
      </SectionCard>

      {/* Vehicle */}
      <SectionCard title="ავტომობილის ინფორმაცია">
        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <SummaryRow
            label="სახელმწიფო ნომერი"
            value={stepOneData.vehicle.plateNumber}
          />
          <SummaryRow
            label="მარკა / მოდელი"
            value={`${stepOneData.vehicle.make} ${stepOneData.vehicle.model}`}
          />
          <SummaryRow
            label="გამოშვების წელი"
            value={stepOneData.vehicle.year}
          />
          <SummaryRow
            label="საბაზრო ღირებულება"
            value={`${formatPrice(stepOneData.vehicle.marketValue ?? 0)} ₾`}
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
          <SummaryRow label="პოლისის დაწყება" value={formatDate(startDate)} />
          <SummaryRow label="პოლისის დასრულება" value={formatDate(endDate)} />
          <SummaryRow
            label="წლიური პრემია"
            value={`${formatPrice(annualPremium)} ₾`}
            highlight
          />
          <SummaryRow
            label="თვიური გადახდა"
            value={`${formatPrice(monthlyPremium)} ₾`}
            highlight
          />
        </div>
      </SectionCard>
    </div>
  );
};

interface SummaryRowProps {
  label: string;
  value?: string | number | null;
  highlight?: boolean;
}

function SummaryRow({ label, value, highlight }: SummaryRowProps) {
  const computedValue =
    value === null || value === undefined || value.toString().trim() === ""
      ? "N/A"
      : String(value);

  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-500">{label}:</span>
      <span
        className={
          highlight
            ? "font-bold text-blue-600 text-base"
            : "font-medium text-gray-900"
        }
      >
        {computedValue}
      </span>
    </div>
  );
}
