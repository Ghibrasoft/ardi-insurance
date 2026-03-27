import { useCallback, useState } from "react";
import type {
  IDriverInfo,
  IStepOneData,
  IStepOneErrors,
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

interface UseStepOneControllerProps {
  data: IStepOneData;
  errors: IStepOneErrors;
  onChange: (data: IStepOneData) => void;
  onErrorsChange: (errors: IStepOneErrors) => void;
}

export const useStepOneController = ({
  data,
  errors,
  onChange,
  onErrorsChange,
}: UseStepOneControllerProps) => {
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
    },
    [data, onChange]
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
    },
    [data, onChange]
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
  }, [data, onChange]);
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
