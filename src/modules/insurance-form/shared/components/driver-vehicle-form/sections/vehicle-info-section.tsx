import { useCallback } from "react";
import {
  INSURANCE_FORM_FIELD_LABELS,
  INSURANCE_FORM_FIELD_PLACEHOLDERS,
  InsuranceFormFieldNames,
} from "../../../../insurance-form-config";
import type {
  IDriverVehicleFormData,
  IDriverVehicleFormErrors,
} from "../../../insurance-form-types";
import type { UseDriverVehicleFormControllerType } from "../use-driver-vehicle-form-controller";
import { SectionCard } from "../../../../../../components/ui/section-card";
import { Button } from "../../../../../../components/ui/button";
import { PLATE_NUMBER_REGEX } from "../../../utils/validation";
import { FormInputField } from "../../../../../../components/ui/form-input-field";

interface Props extends UseDriverVehicleFormControllerType {
  data: IDriverVehicleFormData;
  errors: IDriverVehicleFormErrors;
}

const VEHICLE_INFO_FORM_FIELDS = [
  {
    key: InsuranceFormFieldNames.MAKE,
    required: true,
    disabled: true,
    clearable: false,
  },
  {
    key: InsuranceFormFieldNames.MODEL,
    required: true,
    disabled: true,
    clearable: false,
  },
  {
    key: InsuranceFormFieldNames.YEAR,
    required: true,
    disabled: true,
    clearable: false,
    maskVariant: "numeric",
  },
  {
    key: InsuranceFormFieldNames.MARKET_VALUE,
    required: true,
    maskVariant: "numeric",
  },
] as const;

export const VehicleInfoSection = ({ data, errors, controller }: Props) => {
  const {
    plateState,
    handlePlateKeyDown,
    handleVehicleInfoBlur,
    handlePlateNumberLookup,
    handleVehicleInfoChange,
    handlePlateNumberChange,
  } = controller;

  const handleVehicleFieldChange = useCallback(
    (key: InsuranceFormFieldNames) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value =
          (key === InsuranceFormFieldNames.YEAR ||
            key === InsuranceFormFieldNames.MARKET_VALUE) &&
          e.target.value !== ""
            ? Number(e.target.value)
            : e.target.value || null;

        handleVehicleInfoChange(key as keyof typeof data.vehicle, value);
      },
    [handleVehicleInfoChange, data]
  );

  return (
    <SectionCard
      title="ავტომობილის ინფორმაცია"
      description="შეიყვანეთ ავტომობილის მონაცემები"
    >
      <div className="flex flex-col gap-4">
        {/* Plate Number Field */}
        <div className="flex items-center gap-2">
          <FormInputField
            className="flex-1"
            name={InsuranceFormFieldNames.PLATE_NUMBER}
            label={
              INSURANCE_FORM_FIELD_LABELS[InsuranceFormFieldNames.PLATE_NUMBER]
            }
            placeholder={
              INSURANCE_FORM_FIELD_PLACEHOLDERS[
                InsuranceFormFieldNames.PLATE_NUMBER
              ]
            }
            required
            maskVariant="plate-number"
            value={data.vehicle.plateNumber}
            error={plateState.error ?? errors.vehicle.plateNumber}
            hasError={!!plateState.error || !!errors.vehicle.plateNumber}
            onChange={(e) => handlePlateNumberChange(e.target.value)}
            onBlur={() =>
              handleVehicleInfoBlur(InsuranceFormFieldNames.PLATE_NUMBER)
            }
            onKeyDown={handlePlateKeyDown}
          />

          <Button
            variant={plateState.isFound ? "primary" : "outlined"}
            btnColor={plateState.isFound ? "success" : "default"}
            className="shrink-0 self-end"
            isLoading={plateState.isLoading}
            disabled={
              !PLATE_NUMBER_REGEX.test(data.vehicle.plateNumber.trim()) ||
              plateState.isFound
            }
            onClick={handlePlateNumberLookup}
          >
            <span className="text-(--color-text-primary)">
              {plateState.isFound ? "✓" : "🔍"}
            </span>
          </Button>
        </div>

        {/* Vehicle Info Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VEHICLE_INFO_FORM_FIELDS.map((field) => {
            const { key, required, ...inputProps } = field;
            const error = errors.vehicle[key];
            const rawValue = data.vehicle[key];
            const displayValue =
              rawValue === 0 || rawValue === null ? "" : String(rawValue);

            return (
              <FormInputField
                key={key}
                name={key}
                error={error}
                hasError={!!error}
                required={required}
                value={displayValue}
                label={INSURANCE_FORM_FIELD_LABELS[key]}
                placeholder={INSURANCE_FORM_FIELD_PLACEHOLDERS[key]}
                onChange={handleVehicleFieldChange(key)}
                onBlur={() => handleVehicleInfoBlur(key)}
                {...inputProps}
              />
            );
          })}
        </div>
      </div>
    </SectionCard>
  );
};
