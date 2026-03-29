import { Button } from "../../../../components/ui/button";

interface InsuranceFormNavigationProps {
  isLoading: boolean;
  currentStep: number;
  isFormDirty: boolean;
  handleBack: () => void;
  handleNext: () => void;
  handleSubmit: () => void;
  handleClearForm: () => void;
}
export const InsuranceFormNavigation = ({
  isLoading,
  isFormDirty,
  currentStep,
  handleBack,
  handleNext,
  handleSubmit,
  handleClearForm,
}: InsuranceFormNavigationProps) => {
  return (
    <div className="px-6 py-4 border-t border-(--color-border) bg-(--color-bg) flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-2">
      <Button
        variant="ghost"
        btnColor="error"
        disabled={!isFormDirty}
        onClick={handleClearForm}
      >
        გასუფთავება
      </Button>

      <div className="flex flex-col-reverse sm:flex-row gap-2">
        <Button
          variant="outlined"
          disabled={currentStep === 1 || isLoading}
          onClick={handleBack}
        >
          ← უკან
        </Button>

        {currentStep < 3 ? (
          <Button onClick={handleNext}>შემდეგი →</Button>
        ) : (
          <Button isLoading={isLoading} onClick={handleSubmit}>
            დადასტურება ✓
          </Button>
        )}
      </div>
    </div>
  );
};
