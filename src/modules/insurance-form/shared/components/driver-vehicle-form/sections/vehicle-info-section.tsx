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
import { FormField } from "../../../../../../components/ui/form-field";
import { Input } from "../../../../../../components/ui/input";
import { Button } from "../../../../../../components/ui/button";
import { PLATE_NUMBER_REGEX } from "../../../utils/validation";

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
    handlePlateLookup,
    handlePlateKeyDown,
    handleVehicleInfoBlur,
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
        <FormField
          label={
            INSURANCE_FORM_FIELD_LABELS[InsuranceFormFieldNames.PLATE_NUMBER]
          }
          error={plateState.error ?? errors.vehicle.plateNumber}
          required
        >
          <div className="flex gap-2">
            <Input
              name={InsuranceFormFieldNames.PLATE_NUMBER}
              placeholder={
                INSURANCE_FORM_FIELD_PLACEHOLDERS[
                  InsuranceFormFieldNames.PLATE_NUMBER
                ]
              }
              maskVariant="plate-number"
              value={data.vehicle.plateNumber}
              error={!!errors.vehicle.plateNumber || !!plateState.error}
              onChange={(e) => handlePlateNumberChange(e.target.value)}
              onBlur={() =>
                handleVehicleInfoBlur(InsuranceFormFieldNames.PLATE_NUMBER)
              }
              onKeyDown={handlePlateKeyDown}
            />
            {plateState.isFound ? (
              <div className="shrink-0 w-10 h-10 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center text-green-500">
                ✓
              </div>
            ) : (
              <Button
                variant="secondary"
                className="shrink-0"
                isLoading={plateState.isLoading}
                disabled={
                  !PLATE_NUMBER_REGEX.test(data.vehicle.plateNumber.trim())
                }
                onClick={handlePlateLookup}
              >
                {!plateState.isLoading && "🔍"}
              </Button>
            )}
          </div>
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VEHICLE_INFO_FORM_FIELDS.map((field) => {
            const { key, ...inputProps } = field;
            const error = errors.vehicle[key];
            const rawValue = data.vehicle[key];
            const displayValue =
              rawValue === 0 || rawValue === null ? "" : String(rawValue);

            return (
              <FormField
                key={key}
                label={INSURANCE_FORM_FIELD_LABELS[key]}
                error={error}
                required={field.required}
              >
                <Input
                  name={key}
                  error={!!error}
                  value={displayValue}
                  placeholder={INSURANCE_FORM_FIELD_PLACEHOLDERS[key]}
                  onChange={handleVehicleFieldChange(key)}
                  onBlur={() => handleVehicleInfoBlur(key)}
                  {...inputProps}
                />
              </FormField>
            );
          })}
        </div>
      </div>
    </SectionCard>
  );
};
