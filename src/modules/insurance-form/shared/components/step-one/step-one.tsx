import type { IStepOneData, IStepOneErrors } from "../../insurance-form-types";
import { useStepOneController } from "./use-step-one-controller";
import { VehicleInfoFormSection } from "./vehicle-info-form-section";
import { DriverInfoFormSection } from "./driver-info-form-section";

interface StepOneProps {
  data: IStepOneData;
  errors: IStepOneErrors;
  onChange: (data: IStepOneData) => void;
  onErrorsChange: (errors: IStepOneErrors) => void;
}

export const StepOne = ({
  data,
  errors,
  onChange,
  onErrorsChange,
}: StepOneProps) => {
  const controller = useStepOneController({
    data,
    errors,
    onChange,
    onErrorsChange,
  });

  return (
    <div className="flex flex-col gap-6">
      <DriverInfoFormSection
        data={data}
        errors={errors}
        controller={controller}
      />

      <VehicleInfoFormSection
        data={data}
        errors={errors}
        controller={controller}
      />
    </div>
  );
};
