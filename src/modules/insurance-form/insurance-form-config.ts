import type {
  IDriverVehicleFormData,
  InsurancePlanSelectionData,
} from "./shared/insurance-form-types";

export enum InsuranceFormFieldNames {
  // Driver & Vehicle Form
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  PERSONAL_ID = "personalId",
  DATE_OF_BIRTH = "dateOfBirth",
  PHONE = "phone",

  // Insurance Plan Selection
  PLATE_NUMBER = "plateNumber",
  MAKE = "make",
  MODEL = "model",
  YEAR = "year",
  MARKET_VALUE = "marketValue",
}

const DRIVER_AND_VEHICLE_DATA: IDriverVehicleFormData = {
  driver: {
    [InsuranceFormFieldNames.FIRST_NAME]: "",
    [InsuranceFormFieldNames.LAST_NAME]: "",
    [InsuranceFormFieldNames.PERSONAL_ID]: "",
    [InsuranceFormFieldNames.DATE_OF_BIRTH]: "",
    [InsuranceFormFieldNames.PHONE]: "",
  },
  vehicle: {
    [InsuranceFormFieldNames.PLATE_NUMBER]: "",
    [InsuranceFormFieldNames.MAKE]: "",
    [InsuranceFormFieldNames.MODEL]: "",
    [InsuranceFormFieldNames.YEAR]: null,
    [InsuranceFormFieldNames.MARKET_VALUE]: null,
  },
};

const INSURANCE_PLAN_SELECTION_DATA: InsurancePlanSelectionData = {
  packageId: "basic",
  addons: [],
};

export const INSURANCE_FORM_DEFAULT_VALUES = {
  driverVehicleData: DRIVER_AND_VEHICLE_DATA,
  insurancePlanSelectionData: INSURANCE_PLAN_SELECTION_DATA,
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
  [InsuranceFormFieldNames.PHONE]: "+(995) 5XX XXX XXX",
  [InsuranceFormFieldNames.PLATE_NUMBER]: "AB-123-CD",
  [InsuranceFormFieldNames.MAKE]: "მარკა",
  [InsuranceFormFieldNames.MODEL]: "მოდელი",
  [InsuranceFormFieldNames.YEAR]: "წელი",
  [InsuranceFormFieldNames.MARKET_VALUE]: "25000",
};
