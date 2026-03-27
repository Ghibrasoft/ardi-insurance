import { useState } from "react";
import type {
  AppStepType,
  IStepOneData,
  IStepTwoData,
} from "./shared/insurance-form-types";
import { INSURANCE_FORM_DEFAULT_VALUES } from "./insurance-form-config";
import { submitInsuranceForm } from "./shared/api/insurance-form-mock";

interface IFormState {
  error: string | null;
  isLoading: boolean;
}
export const useInsuranceFormController = () => {
  const [formState, setFormState] = useState<IFormState>({
    error: null,
    isLoading: false,
  });
  const [currentStep, setCurrentStep] = useState<AppStepType>(1);
  const [collectedData, setCollectedData] = useState(
    INSURANCE_FORM_DEFAULT_VALUES
  );

  const handleSubmitStepOne = (data: IStepOneData) => {
    setCollectedData((prev) => ({
      ...prev,
      stepOneData: data,
    }));
  };

  const handleSubmitStepTwo = (data: IStepTwoData) => {
    setCollectedData((prev) => ({
      ...prev,
      stepTwoData: data,
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((prev) => (prev + 1) as AppStepType);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as AppStepType);
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
    handleNext,
    handleBack,
    handleSubmit,
    handleSubmitStepOne,
    handleSubmitStepTwo,
  };
};
