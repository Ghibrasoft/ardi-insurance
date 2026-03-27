import { SectionCard } from "../../../../../components/ui/section-card";
import { FormField } from "../../../../../components/ui/form-field";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import {
  INSURANCE_FORM_FIELD_PLACEHOLDERS,
  INSURANCE_FORM_FIELD_LABELS,
  InsuranceFormFieldNames,
} from "../../../insurance-form-config";
import type { IStepOneData, IStepOneErrors } from "../../insurance-form-types";
import { useStepOneController } from "./use-step-one-controller";

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
  const {
    plateState,
    handlePlateLookup,
    handleDriverInfoBlur,
    handleVehicleInfoBlur,
    handleDriverInfoChange,
    handleVehicleInfoChange,
    handlePlateNumberChange,
  } = useStepOneController({ data, errors, onChange, onErrorsChange });

  return (
    <div className="flex flex-col gap-6">
      {/* Driver Section */}
      <SectionCard
        title="მძღოლის ინფორმაცია"
        description="შეიყვანეთ მძღოლის პირადი მონაცემები"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label={
              INSURANCE_FORM_FIELD_LABELS[InsuranceFormFieldNames.FIRST_NAME]
            }
            error={errors.driver.firstName}
            required
          >
            <Input
              name={InsuranceFormFieldNames.FIRST_NAME}
              placeholder={
                INSURANCE_FORM_FIELD_PLACEHOLDERS[
                  InsuranceFormFieldNames.FIRST_NAME
                ]
              }
              value={data.driver.firstName}
              error={!!errors.driver.firstName}
              onChange={(e) =>
                handleDriverInfoChange(
                  InsuranceFormFieldNames.FIRST_NAME,
                  e.target.value
                )
              }
              onBlur={() =>
                handleDriverInfoBlur(InsuranceFormFieldNames.FIRST_NAME)
              }
            />
          </FormField>

          <FormField
            label={
              INSURANCE_FORM_FIELD_LABELS[InsuranceFormFieldNames.LAST_NAME]
            }
            error={errors.driver.lastName}
            required
          >
            <Input
              name={InsuranceFormFieldNames.LAST_NAME}
              placeholder={
                INSURANCE_FORM_FIELD_PLACEHOLDERS[
                  InsuranceFormFieldNames.LAST_NAME
                ]
              }
              value={data.driver.lastName}
              error={!!errors.driver.lastName}
              onChange={(e) =>
                handleDriverInfoChange(
                  InsuranceFormFieldNames.LAST_NAME,
                  e.target.value
                )
              }
              onBlur={() =>
                handleDriverInfoBlur(InsuranceFormFieldNames.LAST_NAME)
              }
            />
          </FormField>

          <FormField
            label={
              INSURANCE_FORM_FIELD_LABELS[InsuranceFormFieldNames.PERSONAL_ID]
            }
            error={errors.driver.personalId}
            required
          >
            <Input
              name={InsuranceFormFieldNames.PERSONAL_ID}
              placeholder={
                INSURANCE_FORM_FIELD_PLACEHOLDERS[
                  InsuranceFormFieldNames.PERSONAL_ID
                ]
              }
              maxLength={11}
              value={data.driver.personalId}
              error={!!errors.driver.personalId}
              onChange={(e) =>
                handleDriverInfoChange(
                  InsuranceFormFieldNames.PERSONAL_ID,
                  e.target.value
                )
              }
              onBlur={() =>
                handleDriverInfoBlur(InsuranceFormFieldNames.PERSONAL_ID)
              }
            />
          </FormField>

          <FormField
            label={
              INSURANCE_FORM_FIELD_LABELS[InsuranceFormFieldNames.DATE_OF_BIRTH]
            }
            error={errors.driver.dateOfBirth}
            required
          >
            <Input
              name={InsuranceFormFieldNames.DATE_OF_BIRTH}
              type="date"
              value={data.driver.dateOfBirth}
              error={!!errors.driver.dateOfBirth}
              onChange={(e) =>
                handleDriverInfoChange(
                  InsuranceFormFieldNames.DATE_OF_BIRTH,
                  e.target.value
                )
              }
              onBlur={() =>
                handleDriverInfoBlur(InsuranceFormFieldNames.DATE_OF_BIRTH)
              }
            />
          </FormField>

          <FormField
            label={INSURANCE_FORM_FIELD_LABELS[InsuranceFormFieldNames.PHONE]}
            error={errors.driver.phone}
            required
          >
            <Input
              name={InsuranceFormFieldNames.PHONE}
              placeholder={
                INSURANCE_FORM_FIELD_PLACEHOLDERS[InsuranceFormFieldNames.PHONE]
              }
              value={data.driver.phone}
              error={!!errors.driver.phone}
              onChange={(e) =>
                handleDriverInfoChange(
                  InsuranceFormFieldNames.PHONE,
                  e.target.value
                )
              }
              onBlur={() => handleDriverInfoBlur(InsuranceFormFieldNames.PHONE)}
            />
          </FormField>
        </div>
      </SectionCard>

      {/* Vehicle Section */}
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
                value={data.vehicle.plateNumber}
                error={!!errors.vehicle.plateNumber || !!plateState.error}
                onChange={(e) => handlePlateNumberChange(e.target.value)}
                onBlur={() =>
                  handleVehicleInfoBlur(InsuranceFormFieldNames.PLATE_NUMBER)
                }
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
                  disabled={!data.vehicle.plateNumber.trim()}
                  onClick={handlePlateLookup}
                >
                  ძებნა
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
                name={InsuranceFormFieldNames.MAKE}
                placeholder={
                  INSURANCE_FORM_FIELD_PLACEHOLDERS[
                    InsuranceFormFieldNames.MAKE
                  ]
                }
                value={data.vehicle.make}
                error={!!errors.vehicle.make}
                onChange={(e) =>
                  handleVehicleInfoChange(
                    InsuranceFormFieldNames.MAKE,
                    e.target.value
                  )
                }
                onBlur={() =>
                  handleVehicleInfoBlur(InsuranceFormFieldNames.MAKE)
                }
              />
            </FormField>

            <FormField
              label={INSURANCE_FORM_FIELD_LABELS[InsuranceFormFieldNames.MODEL]}
              error={errors.vehicle.model}
              required
            >
              <Input
                name={InsuranceFormFieldNames.MODEL}
                placeholder={
                  INSURANCE_FORM_FIELD_PLACEHOLDERS[
                    InsuranceFormFieldNames.MODEL
                  ]
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
                name={InsuranceFormFieldNames.YEAR}
                type="number"
                placeholder={
                  INSURANCE_FORM_FIELD_PLACEHOLDERS[
                    InsuranceFormFieldNames.YEAR
                  ]
                }
                value={data.vehicle.year ?? ""}
                error={!!errors.vehicle.year}
                onChange={(e) =>
                  handleVehicleInfoChange(
                    InsuranceFormFieldNames.YEAR,
                    e.target.value ? Number(e.target.value) : null
                  )
                }
                onBlur={() =>
                  handleVehicleInfoBlur(InsuranceFormFieldNames.YEAR)
                }
              />
            </FormField>

            <FormField
              label={
                INSURANCE_FORM_FIELD_LABELS[
                  InsuranceFormFieldNames.MARKET_VALUE
                ]
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
    </div>
  );
};
