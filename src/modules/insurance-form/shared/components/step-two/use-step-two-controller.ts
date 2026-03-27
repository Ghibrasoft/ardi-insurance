import type { AddonIdType } from "../../../../../lib/constants/insurance-addons";
import type { PackageIdType } from "../../../../../lib/constants/insurance-packages";
import type { IStepTwoData } from "../../insurance-form-types";

interface UseStepTwoControllerProps {
  data: IStepTwoData;
  onChange: (data: IStepTwoData) => void;
}

export const useStepTwoController = ({
  data,
  onChange,
}: UseStepTwoControllerProps) => {
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
