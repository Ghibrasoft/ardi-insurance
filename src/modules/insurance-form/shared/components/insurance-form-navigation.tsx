import { Button } from "../../../../components/ui/button";

interface InsuranceFormNavigationProps {
  currentStep: number;
  isLoading: boolean;
  handleBack: () => void;
  handleNext: () => void;
  handleSubmit: () => void;
}
export const InsuranceFormNavigation = ({
  isLoading,
  currentStep,
  handleBack,
  handleNext,
  handleSubmit,
}: InsuranceFormNavigationProps) => {
  return (
    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-2">
      <Button
        variant="secondary"
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
  );
};
