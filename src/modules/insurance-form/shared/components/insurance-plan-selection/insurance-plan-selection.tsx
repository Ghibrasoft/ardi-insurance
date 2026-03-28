import { CheckboxCard } from "../../../../../components/ui/checkbox-card";
import { RadioCard } from "../../../../../components/ui/radio-card";
import { SectionCard } from "../../../../../components/ui/section-card";
import { ADDONS } from "../../../../../lib/constants/insurance-addons";
import { PACKAGES } from "../../../../../lib/constants/insurance-packages";
import type { InsurancePlanSelectionData } from "../../insurance-form-types";
import { useInsurancePlanSelectionController } from "./use-insurance-plan-selection-controller";

interface InsurancePlanSelectionProps {
  data: InsurancePlanSelectionData;
  onChange: (data: InsurancePlanSelectionData) => void;
}

export const InsurancePlanSelection = ({
  data,
  onChange,
}: InsurancePlanSelectionProps) => {
  const { handleAddonToggle, handlePackageSelect } =
    useInsurancePlanSelectionController({
      data,
      onChange,
    });

  return (
    <div className="flex flex-col gap-6">
      {/* Packages */}
      <SectionCard
        title="დაზღვევის პაკეტი"
        description="აირჩიეთ თქვენთვის შესაფერისი პაკეტი"
      >
        <div className="flex flex-col gap-3">
          {PACKAGES.map((pkg) => (
            <RadioCard
              key={pkg.id}
              selected={data.packageId === pkg.id}
              onClick={() => handlePackageSelect(pkg.id)}
              title={pkg.name}
              description={pkg.description}
            >
              <ul className="flex flex-col gap-1">
                {pkg.coverages.map((coverage) => (
                  <li
                    key={coverage}
                    className="text-xs text-gray-600 flex items-center gap-1.5"
                  >
                    <span className="text-blue-500">✓</span>
                    {coverage}
                  </li>
                ))}
              </ul>
            </RadioCard>
          ))}
        </div>
      </SectionCard>

      {/* Addons */}
      <SectionCard
        title="დამატებითი ოფციები"
        description="აირჩიეთ დამატებითი სერვისები"
      >
        <div className="flex flex-col gap-3">
          {ADDONS.map((addon) => (
            <CheckboxCard
              key={addon.id}
              checked={data.addons.includes(addon.id)}
              onClick={() => handleAddonToggle(addon.id)}
              title={addon.label}
              description={addon.description}
              rightContent={
                <span className="text-sm font-semibold text-blue-600">
                  {addon.flatFee
                    ? `+${addon.flatFee} ₾`
                    : `+${addon.percentFee! * 100}%`}
                </span>
              }
            />
          ))}
        </div>
      </SectionCard>
    </div>
  );
};
