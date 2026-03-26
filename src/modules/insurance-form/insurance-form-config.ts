import type { IStepOneData, IStepTwoData } from "./shared/insurance-form-types";

export enum InsuranceFormFieldNames {
  // Step one
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  PERSONAL_ID = "personalId",
  DATE_OF_BIRTH = "dateOfBirth",
  PHONE = "phone",

  // Step two
  PLATE_NUMBER = "plateNumber",
  MAKE = "make",
  MODEL = "model",
  YEAR = "year",
  MARKET_VALUE = "marketValue",
}

const STEP_ONE_DEFAULTS: IStepOneData = {
  driver: {
    firstName: "",
    lastName: "",
    personalId: "",
    dateOfBirth: "",
    phone: "",
  },
  vehicle: {
    plateNumber: "",
    make: "",
    model: "",
    year: null,
    marketValue: null,
  },
};

const STEP_TWO_DEFAULTS: IStepTwoData = {
  packageId: "basic",
  addons: [],
};

export const INSURANCE_FORM_DEFAULT_VALUES = {
  stepOneData: STEP_ONE_DEFAULTS,
  stepTwoData: STEP_TWO_DEFAULTS,
};

export const INSURANCE_FORM_FIELD_LABELS = {
  [InsuranceFormFieldNames.FIRST_NAME]: "სახელი",
  [InsuranceFormFieldNames.LAST_NAME]: "გვარი",
  [InsuranceFormFieldNames.PERSONAL_ID]: "პირადი ნომერი",
  [InsuranceFormFieldNames.DATE_OF_BIRTH]: "დაბადების რიცხვი",
  [InsuranceFormFieldNames.PHONE]: "ტელეფონის ნომერი",
  [InsuranceFormFieldNames.PLATE_NUMBER]: "სახელმწიფო ნომერი",
  [InsuranceFormFieldNames.MAKE]: "მარკა",
  [InsuranceFormFieldNames.MODEL]: "მოდელი",
  [InsuranceFormFieldNames.YEAR]: "გამოშვების წელი",
  [InsuranceFormFieldNames.MARKET_VALUE]: "საბაზრო ღირებულება (₾)",
};

export const INSURANCE_FORM_FIELD_PLACEHOLDERS = {
  [InsuranceFormFieldNames.FIRST_NAME]: "სახელი",
  [InsuranceFormFieldNames.LAST_NAME]: "გვარი",
  [InsuranceFormFieldNames.PERSONAL_ID]: "00000000000",
  [InsuranceFormFieldNames.DATE_OF_BIRTH]: "დდ/თთ/წწ",
  [InsuranceFormFieldNames.PHONE]: "+995 5XX XXX XXX",
  [InsuranceFormFieldNames.PLATE_NUMBER]: "AB-123-CD",
  [InsuranceFormFieldNames.MAKE]: "Toyota",
  [InsuranceFormFieldNames.MODEL]: "Camry",
  [InsuranceFormFieldNames.YEAR]: "2020",
  [InsuranceFormFieldNames.MARKET_VALUE]: "25000",
};
