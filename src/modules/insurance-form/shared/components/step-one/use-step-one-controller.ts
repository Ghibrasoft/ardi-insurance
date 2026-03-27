import { useState } from "react";
import type {
  IDriverInfo,
  IStepOneData,
  IVehicleInfo,
} from "../../insurance-form-types";
import { checkPlateNumber } from "../../../../../lib/utils/check-plate-number";

interface IPlateState {
  isFound: boolean;
  isLoading: boolean;
  error: string | null;
}
interface UseStepOneControllerProps {
  data: IStepOneData;
  onChange: (data: IStepOneData) => void;
}

export const useStepOneController = ({
  data,
  onChange,
}: UseStepOneControllerProps) => {
  const [plateState, setPlateState] = useState<IPlateState>({
    error: null,
    isFound: false,
    isLoading: false,
  });

  const handlePlateNumberChange = (value: string) => {
    setPlateState({ isFound: false, isLoading: false, error: null });
    onChange({
      ...data,
      vehicle: { ...data.vehicle, plateNumber: value },
    });
  };

  const handlePlateLookup = async () => {
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
  };

  const handleDriverChange = (field: keyof IDriverInfo, value: string) => {
    onChange({
      ...data,
      driver: { ...data.driver, [field]: value },
    });
  };

  const handleVehicleChange = (
    field: keyof IVehicleInfo,
    value: string | number | null
  ) => {
    onChange({
      ...data,
      vehicle: { ...data.vehicle, [field]: value },
    });
  };

  return {
    plateState,
    handlePlateLookup,
    handleDriverChange,
    handleVehicleChange,
    handlePlateNumberChange,
  };
};
