import { Button } from "../../../../../components/ui/button";
import { FormField } from "../../../../../components/ui/form-field";
import { Input } from "../../../../../components/ui/input";
import { SectionCard } from "../../../../../components/ui/section-card";
import {
  INSURANCE_FORM_FIELD_LABELS,
  INSURANCE_FORM_FIELD_PLACEHOLDERS,
  InsuranceFormFieldNames,
} from "../../../insurance-form-config";
import type { IStepOneData, IStepOneErrors } from "../../insurance-form-types";
import { PLATE_NUMBER_REGEX } from "../../utils/validation";
import type { UseStepOneControllerType } from "./use-step-one-controller";

interface IVehicleInfoFormSectionProps extends UseStepOneControllerType {
  data: IStepOneData;
  errors: IStepOneErrors;
}

export const VehicleInfoFormSection = ({
  data,
  errors,
  controller,
}: IVehicleInfoFormSectionProps) => {
  const {
    plateState,
    handlePlateLookup,
    handlePlateKeyDown,
    handleVehicleInfoBlur,
    handleVehicleInfoChange,
    handlePlateNumberChange,
  } = controller;

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
          <FormField
            label={INSURANCE_FORM_FIELD_LABELS[InsuranceFormFieldNames.MAKE]}
            error={errors.vehicle.make}
            required
          >
            <Input
              disabled
              clearable={false}
              name={InsuranceFormFieldNames.MAKE}
              placeholder={
                INSURANCE_FORM_FIELD_PLACEHOLDERS[InsuranceFormFieldNames.MAKE]
              }
              value={data.vehicle.make}
              error={!!errors.vehicle.make}
              onChange={(e) =>
                handleVehicleInfoChange(
                  InsuranceFormFieldNames.MAKE,
                  e.target.value
                )
              }
              onBlur={() => handleVehicleInfoBlur(InsuranceFormFieldNames.MAKE)}
            />
          </FormField>

          <FormField
            label={INSURANCE_FORM_FIELD_LABELS[InsuranceFormFieldNames.MODEL]}
            error={errors.vehicle.model}
            required
          >
            <Input
              disabled
              clearable={false}
              name={InsuranceFormFieldNames.MODEL}
              placeholder={
                INSURANCE_FORM_FIELD_PLACEHOLDERS[InsuranceFormFieldNames.MODEL]
              }
              value={data.vehicle.model}
              error={!!errors.vehicle.model}
              onChange={(e) =>
                handleVehicleInfoChange(
                  InsuranceFormFieldNames.MODEL,
                  e.target.value
                )
              }
              onBlur={() =>
                handleVehicleInfoBlur(InsuranceFormFieldNames.MODEL)
              }
            />
          </FormField>

          <FormField
            label={INSURANCE_FORM_FIELD_LABELS[InsuranceFormFieldNames.YEAR]}
            error={errors.vehicle.year}
            required
          >
            <Input
              disabled
              clearable={false}
              name={InsuranceFormFieldNames.YEAR}
              type="number"
              placeholder={
                INSURANCE_FORM_FIELD_PLACEHOLDERS[InsuranceFormFieldNames.YEAR]
              }
              value={data.vehicle.year ?? ""}
              error={!!errors.vehicle.year}
              onChange={(e) =>
                handleVehicleInfoChange(
                  InsuranceFormFieldNames.YEAR,
                  e.target.value ? Number(e.target.value) : null
                )
              }
              onBlur={() => handleVehicleInfoBlur(InsuranceFormFieldNames.YEAR)}
            />
          </FormField>

          <FormField
            label={
              INSURANCE_FORM_FIELD_LABELS[InsuranceFormFieldNames.MARKET_VALUE]
            }
            error={errors.vehicle.marketValue}
            required
          >
            <Input
              name={InsuranceFormFieldNames.MARKET_VALUE}
              type="number"
              placeholder={
                INSURANCE_FORM_FIELD_PLACEHOLDERS[
                  InsuranceFormFieldNames.MARKET_VALUE
                ]
              }
              value={data.vehicle.marketValue ?? ""}
              error={!!errors.vehicle.marketValue}
              onChange={(e) =>
                handleVehicleInfoChange(
                  InsuranceFormFieldNames.MARKET_VALUE,
                  e.target.value ? Number(e.target.value) : null
                )
              }
              onBlur={() =>
                handleVehicleInfoBlur(InsuranceFormFieldNames.MARKET_VALUE)
              }
            />
          </FormField>
        </div>
      </div>
    </SectionCard>
  );
};
