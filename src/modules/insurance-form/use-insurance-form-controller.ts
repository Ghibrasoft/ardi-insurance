import { useState } from "react";
import type {
  AppStepType,
  IStepOneData,
  IStepTwoData,
} from "./shared/insurance-form-types";
import { INSURANCE_FORM_DEFAULT_VALUES } from "./insurance-form-config";

export const useInsuranceFormController = () => {
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

  const handleSubmit = () => {
    console.log(collectedData);
  };

  return {
    currentStep,
    collectedData,
    handleNext,
    handleBack,
    handleSubmit,
    setCurrentStep,
    handleSubmitStepOne,
    handleSubmitStepTwo,
  };
};
