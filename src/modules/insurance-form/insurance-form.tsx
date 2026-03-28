import { Stepper } from "../../components/layout/stepper";
import { InsuranceFormHeader } from "./shared/components/insurance-form-header";
import { InsuranceFormNavigation } from "./shared/components/insurance-form-navigation";
import { DriverVehicleForm } from "./shared/components/driver-vehicle-form/driver-vehicle-form";
import { PolicySummary } from "./shared/components/policy-summary";
import { InsurancePlanSelection } from "./shared/components/insurance-plan-selection/insurance-plan-selection";
import { InsuranceFormStepsEnum } from "./shared/insurance-form-types";
import { useInsuranceFormController } from "./use-insurance-form-controller";
import { QuoteHistoryList } from "./shared/components/quote-summary/quote-history-list";

export default function InsuranceForm() {
  const {
    quote,
    formState,
    currentStep,
    collectedData,
    driverVehicleErrors,
    shouldRenderQuoteHistory,
    handleBack,
    handleNext,
    handleSubmit,
    handleClearForm,
    handleSubmitDriverVehicleForm,
    handleDriverVehicleErrorsChange,
    handleSubmitInsurancePlanSelection,
  } = useInsuranceFormController();

  const renderFormContent = (step: InsuranceFormStepsEnum) => {
    switch (step) {
      case InsuranceFormStepsEnum.ONE:
        return (
          <DriverVehicleForm
            errors={driverVehicleErrors}
            data={collectedData.driverVehicleData}
            onChange={handleSubmitDriverVehicleForm}
            onErrorsChange={handleDriverVehicleErrorsChange}
          />
        );

      case InsuranceFormStepsEnum.TWO:
        return (
          <InsurancePlanSelection
            data={collectedData.insurancePlanSelectionData}
            onChange={handleSubmitInsurancePlanSelection}
          />
        );

      default:
        return (
          <PolicySummary
            quote={quote}
            isFormSucceed={formState.isSubmitSucceed}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-10 px-4">
        <InsuranceFormHeader />

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <Stepper
            totalSteps={3}
            currentStep={currentStep}
            isFinished={formState.isSubmitSucceed}
          />

          <div className="p-6">{renderFormContent(currentStep)}</div>

          {!formState.isSubmitSucceed && (
            <InsuranceFormNavigation
              currentStep={currentStep}
              isLoading={formState.isLoading}
              handleBack={handleBack}
              handleNext={handleNext}
              handleSubmit={handleSubmit}
              handleClearForm={handleClearForm}
            />
          )}
        </div>
      </div>

      {shouldRenderQuoteHistory && (
        <div className="container mx-auto px-4 pb-10">
          <QuoteHistoryList />
        </div>
      )}
    </div>
  );
}
