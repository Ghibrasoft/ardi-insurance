import { useCallback, useState } from "react";
import {
  InsuranceFormStepsEnum,
  type IQuoteSummary,
  type IStepOneData,
  type IStepOneErrors,
  type IStepTwoData,
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
  const [stepOneErrors, setStepOneErrors] = useState<IStepOneErrors>({
    driver: {},
    vehicle: {},
  });

  const handleCalculateQuote = useCallback(() => {
    const { startDate, endDate } = getPolicyDates();
    const { annualPremium, monthlyPremium } = calculatePremium({
      addons: collectedData.stepTwoData.addons,
      packageId: collectedData.stepTwoData.packageId,
      vehicleYear: collectedData.stepOneData.vehicle.year!,
      dateOfBirth: collectedData.stepOneData.driver.dateOfBirth,
      marketValue: collectedData.stepOneData.vehicle.marketValue!,
    });

    const newQuote: IQuoteSummary = {
      driver: collectedData.stepOneData.driver,
      vehicle: collectedData.stepOneData.vehicle,
      addons: collectedData.stepTwoData.addons,
      packageId: collectedData.stepTwoData.packageId,
      endDate,
      startDate,
      annualPremium,
      monthlyPremium,
    };

    setQuote(newQuote);
  }, [collectedData]);

  const handleSubmitStepOne = useCallback((data: IStepOneData) => {
    setCollectedData((prev) => ({ ...prev, stepOneData: data }));
  }, []);
  const handleStepOneErrorsChange = useCallback((errors: IStepOneErrors) => {
    setStepOneErrors(errors);
  }, []);

  const handleSubmitStepTwo = useCallback((data: IStepTwoData) => {
    setCollectedData((prev) => ({ ...prev, stepTwoData: data }));
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < 3)
      setCurrentStep((prev) => (prev + 1) as InsuranceFormStepsEnum);
  }, [currentStep]);

  const handleNextClick = useCallback(() => {
    if (currentStep === 1) {
      const driverErrors = validateDriverInfo(collectedData.stepOneData.driver);
      const vehicleErrors = validateVehicleInfo(
        collectedData.stepOneData.vehicle
      );
      setStepOneErrors({ driver: driverErrors, vehicle: vehicleErrors });
      const isValid =
        Object.keys(driverErrors).length === 0 &&
        Object.keys(vehicleErrors).length === 0;

      if (isValid) handleNext();
      return;
    }

    if (currentStep === 2) {
      handleCalculateQuote();
      setCurrentStep(3);
    }
  }, [currentStep, collectedData, handleNext, handleCalculateQuote]);

  const handleBack = () => {
    if (currentStep > 1)
      setCurrentStep((prev) => (prev - 1) as InsuranceFormStepsEnum);
  };

  const handleSubmit = async () => {
    setFormState({ error: null, isLoading: true, isSubmitSucceed: false });

    const readyParams = {
      ...collectedData,
      stepOneData: {
        ...collectedData.stepOneData,
        driver: {
          ...collectedData.stepOneData.driver,
          phone:
            "+" + collectedData.stepOneData.driver.phone.replace(/[^0-9]/g, ""),
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
    stepOneErrors,
    handleBack,
    handleSubmit,
    handleNextClick,
    handleSubmitStepOne,
    handleSubmitStepTwo,
    handleStepOneErrorsChange,
  };
};
