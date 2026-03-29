import { FormInputField } from "../../../../../../components/ui/form-input-field";
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
          const { key, required, ...inputProps } = field;
          const error = errors.driver[key as keyof typeof errors.driver];
          const value = data.driver[key as keyof typeof data.driver];

          return (
            <FormInputField
              key={key}
              name={key}
              value={value}
              error={error}
              hasError={!!error}
              required={required}
              label={INSURANCE_FORM_FIELD_LABELS[key]}
              placeholder={INSURANCE_FORM_FIELD_PLACEHOLDERS[key]}
              {...inputProps}
              onBlur={() => handleDriverInfoBlur(key)}
              onChange={(e) => handleDriverInfoChange(key, e.target.value)}
            />
          );
        })}
      </div>
    </SectionCard>
  );
};
