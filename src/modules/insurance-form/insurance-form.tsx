import { Stepper } from "../../components/layout/stepper";
import { Button } from "../../components/ui/button";
import { StepOne } from "./shared/components/step-one/step-one";
import { StepThree } from "./shared/components/step-three";
import { StepTwo } from "./shared/components/step-two";
import { useInsuranceFormController } from "./use-insurance-form-controller";

export default function InsuranceForm() {
  const {
    formState,
    currentStep,
    collectedData,
    handleNext,
    handleBack,
    handleSubmit,
    handleSubmitStepOne,
    handleSubmitStepTwo,
  } = useInsuranceFormController();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-10 px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">ავტოდაზღვევა</h1>
          <p className="text-sm text-gray-500 mt-1">
            შეავსეთ ფორმა შეთავაზების მისაღებად
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <Stepper currentStep={currentStep} />

          {/* Step content */}
          <div className="p-6">
            {currentStep === 1 && (
              <StepOne
                data={collectedData.stepOneData}
                onChange={handleSubmitStepOne}
              />
            )}
            {currentStep === 2 && (
              <StepTwo
                data={collectedData.stepTwoData}
                onChange={handleSubmitStepTwo}
              />
            )}
            {currentStep === 3 && (
              <StepThree
                step1Data={collectedData.stepOneData}
                step2Data={collectedData.stepTwoData}
              />
            )}
          </div>

          {/* Navigation */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <Button
              variant="secondary"
              disabled={currentStep === 1 || formState.isLoading}
              onClick={handleBack}
            >
              ← უკან
            </Button>

            {currentStep < 3 ? (
              <Button onClick={handleNext}>შემდეგი →</Button>
            ) : (
              <Button isLoading={formState.isLoading} onClick={handleSubmit}>
                დადასტურება ✓
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
