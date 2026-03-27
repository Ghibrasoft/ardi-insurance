import { ADDONS } from "../../../../../lib/constants/insurance-addons";
import { PACKAGES } from "../../../../../lib/constants/insurance-packages";
import type { IQuoteSummary } from "../../insurance-form-types";

interface UseStepThreeControllerProps {
  quote: IQuoteSummary | null;
}
export const useStepThreeController = ({
  quote,
}: UseStepThreeControllerProps) => {
  const pkg = PACKAGES.find((p) => p.id === quote?.packageId)!;
  const selectedAddons = ADDONS.filter((a) => quote?.addons.includes(a.id));

  return {
    pkg,
    selectedAddons,
  };
};
