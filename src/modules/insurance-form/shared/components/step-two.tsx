import { SectionCard } from "../../../../components/ui/section-card";
import {
  ADDONS,
  type AddonIdType,
} from "../../../../lib/constants/insurance-addons";
import {
  PACKAGES,
  type PackageIdType,
} from "../../../../lib/constants/insurance-packages";
import type { IStepTwoData } from "../insurance-form-types";

interface StepTwoProps {
  data: IStepTwoData;
  onChange: (data: IStepTwoData) => void;
}

export const StepTwo = ({ data, onChange }: StepTwoProps) => {
  const handlePackageSelect = (packageId: PackageIdType) => {
    onChange({ ...data, packageId });
  };

  const handleAddonToggle = (addonId: AddonIdType) => {
    const exists = data.addons.includes(addonId);
    onChange({
      ...data,
      addons: exists
        ? data.addons.filter((a) => a !== addonId)
        : [...data.addons, addonId],
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Packages */}
      <SectionCard
        title="დაზღვევის პაკეტი"
        description="აირჩიეთ თქვენთვის შესაფერისი პაკეტი"
      >
        <div className="flex flex-col gap-3">
          {PACKAGES.map((pkg) => {
            const isSelected = data.packageId === pkg.id;
            return (
              <button
                key={pkg.id}
                onClick={() => handlePackageSelect(pkg.id)}
                className={`
                  w-full text-left px-4 py-4 rounded-xl border-2 transition-all duration-150
                  ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">
                    {pkg.name}
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                    ${
                      isSelected
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-3">{pkg.description}</p>
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
              </button>
            );
          })}
        </div>
      </SectionCard>

      {/* Addons */}
      <SectionCard
        title="დამატებითი ოფციები"
        description="აირჩიეთ დამატებითი სერვისები"
      >
        <div className="flex flex-col gap-3">
          {ADDONS.map((addon) => {
            const isChecked = data.addons.includes(addon.id);
            return (
              <button
                key={addon.id}
                onClick={() => handleAddonToggle(addon.id)}
                className={`
                  w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-150
                  ${
                    isChecked
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {addon.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {addon.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-blue-600">
                      {addon.flatFee
                        ? `+${addon.flatFee} ₾`
                        : `+${addon.percentFee! * 100}%`}
                    </span>
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                      ${
                        isChecked
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {isChecked && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
};
