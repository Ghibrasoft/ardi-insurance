import { Stepper } from "../../components/layout/stepper";
import { InsuranceFormHeader } from "./shared/components/insurance-form-header";
import { InsuranceFormNavigation } from "./shared/components/insurance-form-navigation";
import { StepFour } from "./shared/components/step-four/step-four";
import { StepOne } from "./shared/components/step-one/step-one";
import { StepThree } from "./shared/components/step-three/step-three";
import { StepTwo } from "./shared/components/step-two/step-two";
import { InsuranceFormStepsEnum } from "./shared/insurance-form-types";
import { useInsuranceFormController } from "./use-insurance-form-controller";

export default function InsuranceForm() {
  const {
    quote,
    formState,
    currentStep,
    stepOneErrors,
    collectedData,
    handleBack,
    handleSubmit,
    handleNextClick,
    handleSubmitStepOne,
    handleSubmitStepTwo,
    handleStepOneErrorsChange,
  } = useInsuranceFormController();

  const renderFormContent = (step: InsuranceFormStepsEnum) => {
    switch (step) {
      case InsuranceFormStepsEnum.ONE:
        return (
          <StepOne
            errors={stepOneErrors}
            data={collectedData.stepOneData}
            onChange={handleSubmitStepOne}
            onErrorsChange={handleStepOneErrorsChange}
          />
        );

      case InsuranceFormStepsEnum.TWO:
        return (
          <StepTwo
            data={collectedData.stepTwoData}
            onChange={handleSubmitStepTwo}
          />
        );

      case InsuranceFormStepsEnum.THREE:
        return (
          <StepThree
            stepOneData={collectedData.stepOneData}
            stepTwoData={collectedData.stepTwoData}
          />
        );

      default:
        return <StepFour quote={quote} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-10 px-4">
        <InsuranceFormHeader />

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <Stepper currentStep={currentStep} />

          <div className="p-6">{renderFormContent(currentStep)}</div>

          {currentStep === InsuranceFormStepsEnum.FOUR && (
            <InsuranceFormNavigation
              currentStep={currentStep}
              isLoading={formState.isLoading}
              handleBack={handleBack}
              handleSubmit={handleSubmit}
              handleNextClick={handleNextClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}
