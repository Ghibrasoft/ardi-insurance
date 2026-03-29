import type {
  IDriverVehicleFormData,
  IDriverVehicleFormErrors,
} from "../../insurance-form-types";
import { DriverInfoSection } from "./sections/driver-info-section";
import { VehicleInfoSection } from "./sections/vehicle-info-section";
import { useDriverVehicleFormController } from "./use-driver-vehicle-form-controller";

interface DriverVehicleFormProps {
  data: IDriverVehicleFormData;
  isPlateCheckedAndFound: boolean;
  errors: IDriverVehicleFormErrors;
  onChange: (data: IDriverVehicleFormData) => void;
  onErrorsChange: (errors: IDriverVehicleFormErrors) => void;
}

export const DriverVehicleForm = ({
  data,
  errors,
  isPlateCheckedAndFound,
  onChange,
  onErrorsChange,
}: DriverVehicleFormProps) => {
  const controller = useDriverVehicleFormController({
    data,
    errors,
    onChange,
    onErrorsChange,
  });

  return (
    <div className="flex flex-col gap-6">
      <DriverInfoSection data={data} errors={errors} controller={controller} />

      <VehicleInfoSection
        data={data}
        errors={errors}
        controller={controller}
        isPlateCheckedAndFound={isPlateCheckedAndFound}
      />
    </div>
  );
};
