import { useState } from "react";
import type {
  StepType,
  IStepOneData,
  IStepOneErrors,
  IStepTwoData,
} from "./shared/insurance-form-types";
import { INSURANCE_FORM_DEFAULT_VALUES } from "./insurance-form-config";
import { submitInsuranceForm } from "./shared/api/insurance-form-mock";
import {
  validateDriverInfo,
  validateVehicleInfo,
} from "./shared/utils/validation";

interface IFormState {
  error: string | null;
  isLoading: boolean;
}

export const useInsuranceFormController = () => {
  const [formState, setFormState] = useState<IFormState>({
    error: null,
    isLoading: false,
  });
  const [currentStep, setCurrentStep] = useState<StepType>(1);
  const [collectedData, setCollectedData] = useState(
    INSURANCE_FORM_DEFAULT_VALUES
  );
  const [stepOneErrors, setStepOneErrors] = useState<IStepOneErrors>({
    driver: {},
    vehicle: {},
  });

  const handleSubmitStepOne = (data: IStepOneData) => {
    setCollectedData((prev) => ({ ...prev, stepOneData: data }));
  };

  const handleSubmitStepTwo = (data: IStepTwoData) => {
    setCollectedData((prev) => ({ ...prev, stepTwoData: data }));
  };

  const handleNextClick = () => {
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
      handleNext();
    }
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((prev) => (prev + 1) as StepType);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as StepType);
  };

  const handleSubmit = async () => {
    setFormState({ error: null, isLoading: true });

    try {
      await submitInsuranceForm(collectedData);
      setFormState({ error: null, isLoading: false });
    } catch {
      setFormState({
        error: "დაფიქსირდა შეცდომა. სცადეთ თავიდან.",
        isLoading: false,
      });
    }
  };

  return {
    formState,
    currentStep,
    collectedData,
    stepOneErrors,
    handleBack,
    handleSubmit,
    handleNextClick,
    setStepOneErrors,
    handleSubmitStepOne,
    handleSubmitStepTwo,
  };
};
