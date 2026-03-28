import { useCallback, useState } from "react";
import {
  InsuranceFormStepsEnum,
  type IQuoteSummary,
  type IDriverVehicleFormData,
  type IDriverVehicleFormErrors,
  type InsurancePlanSelectionData,
} from "./shared/insurance-form-types";
import { INSURANCE_FORM_DEFAULT_VALUES } from "./insurance-form-config";
import { submitInsuranceForm } from "./shared/api/insurance-form-mock";
import {
  validateDriverInfo,
  validateVehicleInfo,
} from "./shared/utils/validation";
import { calculatePremium, getPolicyDates } from "../../lib/utils/calculations";

interface IFormState {
  error: string | null;
  isLoading: boolean;
  isSubmitSucceed: boolean;
}

export const useInsuranceFormController = () => {
  const [formState, setFormState] = useState<IFormState>({
    error: null,
    isLoading: false,
    isSubmitSucceed: false,
  });
  const [quote, setQuote] = useState<IQuoteSummary | null>(null);
  const [currentStep, setCurrentStep] = useState<InsuranceFormStepsEnum>(
    InsuranceFormStepsEnum.ONE
  );
  const [collectedData, setCollectedData] = useState(
    INSURANCE_FORM_DEFAULT_VALUES
  );
  const [driverVehicleErrors, setDriverVehicleErrors] =
    useState<IDriverVehicleFormErrors>({
      driver: {},
      vehicle: {},
    });

  const handleCalculateQuote = useCallback(() => {
    const { startDate, endDate } = getPolicyDates();
    const { annualPremium, monthlyPremium } = calculatePremium({
      addons: collectedData.insurancePlanSelectionData.addons,
      packageId: collectedData.insurancePlanSelectionData.packageId,
      vehicleYear: collectedData.driverVehicleData.vehicle.year!,
      dateOfBirth: collectedData.driverVehicleData.driver.dateOfBirth,
      marketValue: collectedData.driverVehicleData.vehicle.marketValue!,
    });

    const newQuote: IQuoteSummary = {
      driver: collectedData.driverVehicleData.driver,
      vehicle: collectedData.driverVehicleData.vehicle,
      addons: collectedData.insurancePlanSelectionData.addons,
      packageId: collectedData.insurancePlanSelectionData.packageId,
      endDate,
      startDate,
      annualPremium,
      monthlyPremium,
    };

    setQuote(newQuote);
  }, [collectedData]);

  const handleSubmitDriverVehicleForm = useCallback(
    (data: IDriverVehicleFormData) => {
      setCollectedData((prev) => ({ ...prev, driverVehicleData: data }));
    },
    []
  );
  const handleDriverVehicleErrorsChange = useCallback(
    (errors: IDriverVehicleFormErrors) => {
      setDriverVehicleErrors(errors);
    },
    []
  );

  const handleSubmitInsurancePlanSelection = useCallback(
    (data: InsurancePlanSelectionData) => {
      setCollectedData((prev) => ({
        ...prev,
        insurancePlanSelectionData: data,
      }));
    },
    []
  );

  const handleNext = useCallback(() => {
    if (currentStep === InsuranceFormStepsEnum.ONE) {
      const driverErrors = validateDriverInfo(
        collectedData.driverVehicleData.driver
      );
      const vehicleErrors = validateVehicleInfo(
        collectedData.driverVehicleData.vehicle
      );
      setDriverVehicleErrors({ driver: driverErrors, vehicle: vehicleErrors });
      const isValid =
        Object.keys(driverErrors).length === 0 &&
        Object.keys(vehicleErrors).length === 0;

      if (isValid)
        setCurrentStep((prev) => (prev + 1) as InsuranceFormStepsEnum);
      return;
    }

    if (currentStep === InsuranceFormStepsEnum.TWO) {
      handleCalculateQuote();
      setCurrentStep(InsuranceFormStepsEnum.THREE);
    }
  }, [currentStep, collectedData, handleCalculateQuote]);

  const handleBack = useCallback(() => {
    if (currentStep > 1)
      setCurrentStep((prev) => (prev - 1) as InsuranceFormStepsEnum);
  }, [currentStep]);

  const handleSubmit = async () => {
    setFormState({ error: null, isLoading: true, isSubmitSucceed: false });

    const readyParams = {
      ...collectedData,
      driverVehicleData: {
        ...collectedData.driverVehicleData,
        driver: {
          ...collectedData.driverVehicleData.driver,
          phone:
            "+" +
            collectedData.driverVehicleData.driver.phone.replace(/[^0-9]/g, ""),
        },
      },
    };
    try {
      await submitInsuranceForm(readyParams);

      setFormState({ error: null, isLoading: false, isSubmitSucceed: true });
    } catch {
      setFormState({
        error: "დაფიქსირდა შეცდომა. სცადეთ თავიდან.",
        isLoading: false,
        isSubmitSucceed: false,
      });
    }
  };

  return {
    quote,
    formState,
    currentStep,
    collectedData,
    driverVehicleErrors,
    handleBack,
    handleNext,
    handleSubmit,
    handleSubmitDriverVehicleForm,
    handleSubmitInsurancePlanSelection,
    handleDriverVehicleErrorsChange,
  };
};
