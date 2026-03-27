import { FormField } from "../../../../../components/ui/form-field";
import { Input } from "../../../../../components/ui/input";
import { SectionCard } from "../../../../../components/ui/section-card";

import {
  INSURANCE_FORM_FIELD_LABELS,
  INSURANCE_FORM_FIELD_PLACEHOLDERS,
  InsuranceFormFieldNames,
} from "../../../insurance-form-config";

import type { IStepOneData, IStepOneErrors } from "../../insurance-form-types";
import type { UseStepOneControllerType } from "./use-step-one-controller";

interface Props extends UseStepOneControllerType {
  data: IStepOneData;
  errors: IStepOneErrors;
}

const DRIVER_INFO_FORM_FIELDS = [
  { key: InsuranceFormFieldNames.FIRST_NAME, required: true },
  { key: InsuranceFormFieldNames.LAST_NAME, required: true },
  { key: InsuranceFormFieldNames.PERSONAL_ID, required: true, maxLength: 11 },
  {
    key: InsuranceFormFieldNames.DATE_OF_BIRTH,
    required: true,
    type: "date",
  },
  {
    key: InsuranceFormFieldNames.PHONE,
    required: true,
    maskVariant: "phone",
  },
] as const;

export const DriverInfoFormSection = ({ data, errors, controller }: Props) => {
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
