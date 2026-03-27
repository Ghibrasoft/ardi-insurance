import { SectionCard } from "../../../../components/ui/section-card";
import { ADDONS } from "../../../../lib/constants/insurance-addons";
import { PACKAGES } from "../../../../lib/constants/insurance-packages";
import {
  calculatePremium,
  getPolicyDates,
} from "../../../../lib/utils/calculations";
import { formatDate } from "../../../../lib/utils/format-date";
import { formatPrice } from "../../../../lib/utils/format-price";
import type { IStepOneData, IStepTwoData } from "../insurance-form-types";

interface StepThreeProps {
  step1Data: IStepOneData;
  step2Data: IStepTwoData;
}

export const StepThree = ({ step1Data, step2Data }: StepThreeProps) => {
  const pkg = PACKAGES.find((p) => p.id === step2Data.packageId)!;
  const selectedAddons = ADDONS.filter((a) => step2Data.addons.includes(a.id));
  const { startDate, endDate } = getPolicyDates();

  const { annualPremium, monthlyPremium } = calculatePremium({
    addons: step2Data.addons,
    packageId: step2Data.packageId,
    vehicleYear: step1Data.vehicle.year!,
    dateOfBirth: step1Data.driver.dateOfBirth,
    marketValue: step1Data.vehicle.marketValue!,
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Driver */}
      <SectionCard title="მძღოლის ინფორმაცია">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <SummaryRow
            label="სახელი და გვარი"
            value={`${step1Data.driver.firstName} ${step1Data.driver.lastName}`}
          />
          <SummaryRow
            label="პირადი ნომერი"
            value={step1Data.driver.personalId}
          />
          <SummaryRow
            label="დაბადების თარიღი"
            value={step1Data.driver.dateOfBirth}
          />
          <SummaryRow label="ტელეფონი" value={`${step1Data.driver.phone}`} />
        </div>
      </SectionCard>

      {/* Vehicle */}
      <SectionCard title="ავტომობილის ინფორმაცია">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <SummaryRow
            label="სახელმწიფო ნომერი"
            value={step1Data.vehicle.plateNumber}
          />
          <SummaryRow
            label="მარკა / მოდელი"
            value={`${step1Data.vehicle.make} ${step1Data.vehicle.model}`}
          />
          <SummaryRow label="გამოშვების წელი" value={step1Data.vehicle.year} />
          <SummaryRow
            label="საბაზრო ღირებულება"
            value={`${formatPrice(step1Data.vehicle.marketValue ?? 0)} ₾`}
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

      {/* Premium */}
      <SectionCard title="პრემია">
        <div className="flex flex-col gap-3 text-sm">
          <SummaryRow label="პოლისის დაწყება" value={formatDate(startDate)} />
          <SummaryRow label="პოლისის დასრულება" value={formatDate(endDate)} />
          <div className="border-t border-gray-100 pt-3 mt-1 flex flex-col gap-2">
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
  const display =
    value === null || value === undefined || value.toString().trim() === ""
      ? "N/A"
      : String(value);

  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-500">{label}</span>
      <span
        className={
          highlight
            ? "font-bold text-blue-600 text-base"
            : "font-medium text-gray-900"
        }
      >
        {display}
      </span>
    </div>
  );
}
