import { SectionCard } from "../../../../components/ui/section-card";
import { ADDONS } from "../../../../lib/constants/insurance-addons";
import { PACKAGES } from "../../../../lib/constants/insurance-packages";
import type { IStepOneData, IStepTwoData } from "../insurance-form-types";

interface StepThreeProps {
  step1Data: IStepOneData;
  step2Data: IStepTwoData;
}

export const StepThree = ({ step1Data, step2Data }: StepThreeProps) => {
  const pkg = PACKAGES.find((p) => p.id === step2Data.packageId)!;
  const selectedAddons = ADDONS.filter((a) => step2Data.addons.includes(a.id));

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
          <SummaryRow label="ტელეფონი" value={step1Data.driver.phone} />
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
          <SummaryRow
            label="გამოშვების წელი"
            value={String(step1Data.vehicle.year)}
          />
          <SummaryRow
            label="საბაზრო ღირებულება"
            value={`${step1Data.vehicle.marketValue} ₾`}
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

      {/* Premium — placeholder until logic is wired */}
      <SectionCard title="პრემია">
        <div className="flex flex-col gap-3 text-sm">
          <SummaryRow label="პოლისის დაწყება" value="—" />
          <SummaryRow label="პოლისის დასრულება" value="—" />
          <div className="border-t border-gray-100 pt-3 mt-1 flex flex-col gap-2">
            <SummaryRow label="წლიური პრემია" value="— ₾" highlight />
            <SummaryRow label="თვიური გადახდა" value="— ₾" highlight />
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

interface SummaryRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

function SummaryRow({ label, value, highlight }: SummaryRowProps) {
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
        {value}
      </span>
    </div>
  );
}
