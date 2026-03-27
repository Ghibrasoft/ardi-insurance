import { ADDONS } from "../../../../../lib/constants/insurance-addons";
import { PACKAGES } from "../../../../../lib/constants/insurance-packages";
import {
  calculatePremium,
  getPolicyDates,
} from "../../../../../lib/utils/calculations";
import type { IStepOneData, IStepTwoData } from "../../insurance-form-types";

interface UseStepThreeControllerProps {
  stepOneData: IStepOneData;
  stepTwoData: IStepTwoData;
}
export const useStepThreeController = ({
  stepOneData,
  stepTwoData,
}: UseStepThreeControllerProps) => {
  const pkg = PACKAGES.find((p) => p.id === stepTwoData.packageId)!;
  const selectedAddons = ADDONS.filter((a) =>
    stepTwoData.addons.includes(a.id)
  );
  const { startDate, endDate } = getPolicyDates();

  const { annualPremium, monthlyPremium } = calculatePremium({
    addons: stepTwoData.addons,
    packageId: stepTwoData.packageId,
    vehicleYear: stepOneData.vehicle.year!,
    dateOfBirth: stepOneData.driver.dateOfBirth,
    marketValue: stepOneData.vehicle.marketValue!,
  });

  return {
    pkg,
    endDate,
    startDate,
    annualPremium,
    monthlyPremium,
    selectedAddons,
  };
};
