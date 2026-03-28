import { Button } from "../../../../components/ui/button";

interface InsuranceFormHeaderProps {
  isFormSucceed: boolean;
  onReset: () => void;
}
export const InsuranceFormHeader = ({
  isFormSucceed,
  onReset,
}: InsuranceFormHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">ავტოდაზღვევა</h1>
        <p className="text-sm text-gray-500 mt-1">
          შეავსეთ ფორმა შეთავაზების მისაღებად
        </p>
      </div>

      {isFormSucceed && (
        <Button variant="primary" onClick={onReset} className="w-full sm:w-fit">
          ახალი შეთავაზება
        </Button>
      )}
    </div>
  );
};
