import type { AddonIdType } from "../../../../../lib/constants/insurance-addons";
import type { PackageIdType } from "../../../../../lib/constants/insurance-packages";
import type { InsurancePlanSelectionData } from "../../insurance-form-types";

interface UseInsurancePlanSelectionControllerProps {
  data: InsurancePlanSelectionData;
  onChange: (data: InsurancePlanSelectionData) => void;
}

export const useInsurancePlanSelectionController = ({
  data,
  onChange,
}: UseInsurancePlanSelectionControllerProps) => {
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

  return {
    handleAddonToggle,
    handlePackageSelect,
  };
};
