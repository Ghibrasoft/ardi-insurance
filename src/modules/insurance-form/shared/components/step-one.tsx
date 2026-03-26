import { SectionCard } from "../../../../components/ui/section-card";
import { FormField } from "../../../../components/ui/form-field";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import {
  INSURANCE_FORM_FIELD_PLACEHOLDERS,
  INSURANCE_FORM_FIELD_LABELS,
  InsuranceFormFieldNames,
} from "../../insurance-form-config";
import type { IStepOneData } from "../insurance-form-types";

interface StepOneProps {
  data: IStepOneData;
  onChange: (data: IStepOneData) => void;
}

export const StepOne = ({ data, onChange }: StepOneProps) => {
  const handleDriverChange = (field: string, value: string) => {
    onChange({
      ...data,
      driver: { ...data.driver, [field]: value },
    });
  };

  const handleVehicleChange = (
    field: string,
    value: string | number | null
  ) => {
    onChange({
      ...data,
      vehicle: { ...data.vehicle, [field]: value },
    });
  };

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
              onChange={(e) =>
                handleDriverChange(
                  InsuranceFormFieldNames.FIRST_NAME,
                  e.target.value
                )
              }
            />
          </FormField>

          <FormField
            label={
              INSURANCE_FORM_FIELD_LABELS[InsuranceFormFieldNames.LAST_NAME]
            }
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
              onChange={(e) =>
                handleDriverChange(
                  InsuranceFormFieldNames.LAST_NAME,
                  e.target.value
                )
              }
            />
          </FormField>

          <FormField
            label={
              INSURANCE_FORM_FIELD_LABELS[InsuranceFormFieldNames.PERSONAL_ID]
            }
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
              onChange={(e) =>
                handleDriverChange(
                  InsuranceFormFieldNames.PERSONAL_ID,
                  e.target.value
                )
              }
            />
          </FormField>

          <FormField
            label={
              INSURANCE_FORM_FIELD_LABELS[InsuranceFormFieldNames.DATE_OF_BIRTH]
            }
            required
          >
            <Input
              name={InsuranceFormFieldNames.DATE_OF_BIRTH}
              placeholder={
                INSURANCE_FORM_FIELD_PLACEHOLDERS[
                  InsuranceFormFieldNames.DATE_OF_BIRTH
                ]
              }
              type="date"
              value={data.driver.dateOfBirth}
              onChange={(e) =>
                handleDriverChange(
                  InsuranceFormFieldNames.DATE_OF_BIRTH,
                  e.target.value
                )
              }
            />
          </FormField>

          <FormField
            label={INSURANCE_FORM_FIELD_LABELS[InsuranceFormFieldNames.PHONE]}
            required
          >
            <Input
              name={InsuranceFormFieldNames.PHONE}
              placeholder={
                INSURANCE_FORM_FIELD_PLACEHOLDERS[InsuranceFormFieldNames.PHONE]
              }
              value={data.driver.phone}
              onChange={(e) =>
                handleDriverChange(
                  InsuranceFormFieldNames.PHONE,
                  e.target.value
                )
              }
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
          {/* Plate lookup */}
          <FormField
            label={
              INSURANCE_FORM_FIELD_LABELS[InsuranceFormFieldNames.PLATE_NUMBER]
            }
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
                onChange={(e) =>
                  handleVehicleChange(
                    InsuranceFormFieldNames.PLATE_NUMBER,
                    e.target.value
                  )
                }
              />
              <Button variant="secondary" className="shrink-0">
                ძებნა
              </Button>
            </div>
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label={INSURANCE_FORM_FIELD_LABELS[InsuranceFormFieldNames.MAKE]}
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
                onChange={(e) =>
                  handleVehicleChange(
                    InsuranceFormFieldNames.MAKE,
                    e.target.value
                  )
                }
              />
            </FormField>

            <FormField
              label={INSURANCE_FORM_FIELD_LABELS[InsuranceFormFieldNames.MODEL]}
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
                onChange={(e) =>
                  handleVehicleChange(
                    InsuranceFormFieldNames.MODEL,
                    e.target.value
                  )
                }
              />
            </FormField>

            <FormField
              label={INSURANCE_FORM_FIELD_LABELS[InsuranceFormFieldNames.YEAR]}
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
                onChange={(e) =>
                  handleVehicleChange(
                    InsuranceFormFieldNames.YEAR,
                    e.target.value ? Number(e.target.value) : null
                  )
                }
              />
            </FormField>

            <FormField
              label={
                INSURANCE_FORM_FIELD_LABELS[
                  InsuranceFormFieldNames.MARKET_VALUE
                ]
              }
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
                onChange={(e) =>
                  handleVehicleChange(
                    InsuranceFormFieldNames.MARKET_VALUE,
                    e.target.value ? Number(e.target.value) : null
                  )
                }
              />
            </FormField>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};
