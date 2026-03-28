import type { AddonIdType } from "../../../lib/constants/insurance-addons";
import type { PackageIdType } from "../../../lib/constants/insurance-packages";

export enum InsuranceFormStepsEnum {
  ONE = 1,
  TWO = 2,
  THREE = 3,
}

export interface IDriverInfo {
  firstName: string;
  lastName: string;
  personalId: string;
  dateOfBirth: string;
  phone: string;
}

export interface IVehicleInfo {
  plateNumber: string;
  make: string;
  model: string;
  year: number | null;
  marketValue: number | null;
}

export interface IDriverVehicleFormData {
  driver: IDriverInfo;
  vehicle: IVehicleInfo;
}

export interface InsurancePlanSelectionData {
  packageId: PackageIdType;
  addons: AddonIdType[];
}

export interface IQuoteSummary {
  driver: IDriverInfo;
  vehicle: IVehicleInfo;
  packageId: PackageIdType;
  addons: AddonIdType[];
  annualPremium: number;
  monthlyPremium: number;
  startDate: string;
  endDate: string;
}

export interface IPlateCheckResult {
  make: string;
  model: string;
  year: number;
}

export type FieldErrorsType<T> = Partial<Record<keyof T, string>>;

export interface IDriverVehicleFormErrors {
  driver: FieldErrorsType<IDriverInfo>;
  vehicle: FieldErrorsType<IVehicleInfo>;
}
