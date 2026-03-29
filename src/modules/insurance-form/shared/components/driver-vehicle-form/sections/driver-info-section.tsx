import { FormField } from "../../../../../../components/ui/form-field";
import { Input } from "../../../../../../components/ui/input";
import { SectionCard } from "../../../../../../components/ui/section-card";
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

interface Props extends UseDriverVehicleFormControllerType {
  data: IDriverVehicleFormData;
  errors: IDriverVehicleFormErrors;
}

const DRIVER_INFO_FORM_FIELDS = [
  { key: InsuranceFormFieldNames.FIRST_NAME, required: true },
  { key: InsuranceFormFieldNames.LAST_NAME, required: true },
  {
    key: InsuranceFormFieldNames.PERSONAL_ID,
    required: true,
    maskVariant: "numeric",
    maxLength: 11,
  },
  {
    key: InsuranceFormFieldNames.PHONE,
    required: true,
    phonePrefix: "995",
    maskVariant: "phone",
  },
  {
    key: InsuranceFormFieldNames.DATE_OF_BIRTH,
    required: true,
    type: "date",
  },
] as const;

export const DriverInfoSection = ({ data, errors, controller }: Props) => {
  const { handleDriverInfoChange, handleDriverInfoBlur } = controller;

  return (
    <SectionCard
      title="მძღოლის ინფორმაცია"
      description="შეიყვანეთ მძღოლის პირადი მონაცემები"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DRIVER_INFO_FORM_FIELDS.map((field) => {
          const { key, ...inputProps } = field;
          const error = errors.driver[key as keyof typeof errors.driver];

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
                placeholder={INSURANCE_FORM_FIELD_PLACEHOLDERS[key]}
                value={data.driver[key as keyof typeof data.driver]}
                onBlur={() => handleDriverInfoBlur(key)}
                onChange={(e) => handleDriverInfoChange(key, e.target.value)}
                {...inputProps}
              />
            </FormField>
          );
        })}
      </div>
    </SectionCard>
  );
};
