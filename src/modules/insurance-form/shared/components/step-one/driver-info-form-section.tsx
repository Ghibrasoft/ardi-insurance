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

interface IDriverInfoFormSectionProps extends UseStepOneControllerType {
  data: IStepOneData;
  errors: IStepOneErrors;
}

export const DriverInfoFormSection = ({
  data,
  errors,
  controller,
}: IDriverInfoFormSectionProps) => {
  const { handleDriverInfoBlur, handleDriverInfoChange } = controller;

  return (
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
          label={INSURANCE_FORM_FIELD_LABELS[InsuranceFormFieldNames.LAST_NAME]}
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
            maskVariant="phone"
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
  );
};
