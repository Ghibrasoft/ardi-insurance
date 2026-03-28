import { useCallback, useState } from "react";
import type {
  IDriverInfo,
  IDriverVehicleFormData,
  IDriverVehicleFormErrors,
  IVehicleInfo,
} from "../../insurance-form-types";
import { checkPlateNumber } from "../../../../../lib/utils/check-plate-number";
import {
  validateDriverField,
  validateVehicleField,
} from "../../utils/validation";

interface IPlateState {
  isFound: boolean;
  isLoading: boolean;
  error: string | null;
}

interface UseDriverVehicleFormControllerProps {
  data: IDriverVehicleFormData;
  errors: IDriverVehicleFormErrors;
  onChange: (data: IDriverVehicleFormData) => void;
  onErrorsChange: (errors: IDriverVehicleFormErrors) => void;
}

export type UseDriverVehicleFormControllerType = {
  controller: ReturnType<typeof useDriverVehicleFormController>;
};

export const useDriverVehicleFormController = ({
  data,
  errors,
  onChange,
  onErrorsChange,
}: UseDriverVehicleFormControllerProps) => {
  const [plateState, setPlateState] = useState<IPlateState>({
    isFound: false,
    isLoading: false,
    error: null,
  });

  // Driver handlers
  const handleDriverInfoBlur = useCallback(
    <K extends keyof IDriverInfo>(field: K) => {
      const error = validateDriverField(field, data.driver[field]);
      onErrorsChange({
        ...errors,
        driver: { ...errors.driver, [field]: error },
      });
    },
    [data.driver, errors, onErrorsChange]
  );
  const handleDriverInfoChange = useCallback(
    (field: keyof IDriverInfo, value: string) => {
      onChange({ ...data, driver: { ...data.driver, [field]: value } });

      const error = validateDriverField(
        field,
        value as IDriverInfo[typeof field]
      );
      if (!error) {
        onErrorsChange({
          ...errors,
          driver: { ...errors.driver, [field]: undefined },
        });
      }
    },
    [data, errors, onChange, onErrorsChange]
  );

  // Vehicle handlers
  const handleVehicleInfoBlur = useCallback(
    <K extends keyof IVehicleInfo>(field: K) => {
      const error = validateVehicleField(field, data.vehicle[field]);
      onErrorsChange({
        ...errors,
        vehicle: { ...errors.vehicle, [field]: error },
      });
    },
    [data.vehicle, errors, onErrorsChange]
  );
  const handleVehicleInfoChange = useCallback(
    (field: keyof IVehicleInfo, value: string | number | null) => {
      onChange({ ...data, vehicle: { ...data.vehicle, [field]: value } });

      const error = validateVehicleField(
        field,
        value as IVehicleInfo[typeof field]
      );
      if (!error) {
        onErrorsChange({
          ...errors,
          vehicle: { ...errors.vehicle, [field]: undefined },
        });
      }
    },
    [data, errors, onChange, onErrorsChange]
  );

  const handlePlateNumberChange = useCallback(
    (value: string) => {
      setPlateState({ isFound: false, isLoading: false, error: null });
      onChange({
        ...data,
        vehicle: {
          ...data.vehicle,
          plateNumber: value,
          ...(value.trim() === ""
            ? { make: "", model: "", year: null, marketValue: null }
            : {}),
        },
      });
    },
    [data, onChange]
  );
  const handlePlateLookup = useCallback(async () => {
    if (!data.vehicle.plateNumber.trim()) return;

    setPlateState({ isFound: false, isLoading: true, error: null });

    try {
      const result = await checkPlateNumber(data.vehicle.plateNumber);

      if (result) {
        onChange({
          ...data,
          vehicle: {
            ...data.vehicle,
            make: result.make,
            model: result.model,
            year: result.year,
          },
        });

        onErrorsChange({
          ...errors,
          vehicle: {
            ...errors.vehicle,
            plateNumber: undefined,
            make: undefined,
            model: undefined,
            year: undefined,
          },
        });

        setPlateState({ isFound: true, isLoading: false, error: null });
      } else {
        setPlateState({
          isFound: false,
          isLoading: false,
          error: "ავტომობილი ვერ მოიძებნა.",
        });
      }
    } catch {
      setPlateState({
        isFound: false,
        isLoading: false,
        error: "დაფიქსირდა შეცდომა. სცადეთ თავიდან.",
      });
    }
  }, [data, errors, onChange, onErrorsChange]);
  const handlePlateKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handlePlateLookup();
      }
    },
    [handlePlateLookup]
  );

  return {
    plateState,
    handlePlateLookup,
    handlePlateKeyDown,
    handleDriverInfoBlur,
    handleVehicleInfoBlur,
    handleDriverInfoChange,
    handleVehicleInfoChange,
    handlePlateNumberChange,
  };
};
