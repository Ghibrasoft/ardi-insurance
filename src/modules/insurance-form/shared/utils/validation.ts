import type {
  IDriverInfo,
  IVehicleInfo,
  FieldErrorsType,
} from "../insurance-form-types";

// Helpers
function getAge(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

function isValidGeorgianPhone(phone: string): boolean {
  const cleaned = phone.replace(/\s+/g, "");
  return /^(\+995|0)5\d{8}$/.test(cleaned);
}

// Field-level validators
export const driverValidators: {
  [K in keyof IDriverInfo]?: (value: IDriverInfo[K]) => string | undefined;
} = {
  firstName: (v) => (!v.trim() ? "სახელი სავალდებულოა" : undefined),
  lastName: (v) => (!v.trim() ? "გვარი სავალდებულოა" : undefined),
  personalId: (v) => {
    if (!v.trim()) return "პირადი ნომერი სავალდებულოა";
    if (!/^\d{11}$/.test(v)) return "პირადი ნომერი უნდა იყოს 11 ციფრი";
  },
  dateOfBirth: (v) => {
    if (!v) return "დაბადების თარიღი სავალდებულოა";
    if (getAge(v) < 18) return "მძღოლი უნდა იყოს მინიმუმ 18 წლის";
  },
  phone: (v) => {
    if (!v.trim()) return "ტელეფონი სავალდებულოა";
    if (!isValidGeorgianPhone(v))
      return "ტელეფონის ფორმატი არასწორია (+995 5XX XXX XXX)";
  },
};

export const vehicleValidators: {
  [K in keyof IVehicleInfo]?: (value: IVehicleInfo[K]) => string | undefined;
} = {
  plateNumber: (v) =>
    !v.trim() ? "სახელმწიფო ნომერი სავალდებულოა" : undefined,
  make: (v) => (!v.trim() ? "მარკა სავალდებულოა" : undefined),
  model: (v) => (!v.trim() ? "მოდელი სავალდებულოა" : undefined),
  year: (v) => {
    if (v === null) return "გამოშვების წელი სავალდებულოა";
    if (v > new Date().getFullYear())
      return "გამოშვების წელი არ შეიძლება იყოს მომავალში";
    if (v < 1900) return "გამოშვების წელი არასწორია";
  },
  marketValue: (v) => {
    if (v === null) return "საბაზრო ღირებულება სავალდებულოა";
    if (v <= 0) return "საბაზრო ღირებულება უნდა იყოს დადებითი რიცხვი";
  },
};

// Single field validation
export function validateDriverField<K extends keyof IDriverInfo>(
  field: K,
  value: IDriverInfo[K]
): string | undefined {
  return driverValidators[field]?.(value);
}

export function validateVehicleField<K extends keyof IVehicleInfo>(
  field: K,
  value: IVehicleInfo[K]
): string | undefined {
  return vehicleValidators[field]?.(value);
}

// Full form validation
export function validateDriverInfo(
  driver: IDriverInfo
): FieldErrorsType<IDriverInfo> {
  const errors: FieldErrorsType<IDriverInfo> = {};
  (Object.keys(driverValidators) as (keyof IDriverInfo)[]).forEach((field) => {
    const error = validateDriverField(field, driver[field]);
    if (error) errors[field] = error;
  });
  return errors;
}

export function validateVehicleInfo(
  vehicle: IVehicleInfo
): FieldErrorsType<IVehicleInfo> {
  const errors: FieldErrorsType<IVehicleInfo> = {};
  (Object.keys(vehicleValidators) as (keyof IVehicleInfo)[]).forEach(
    (field) => {
      const error = validateVehicleField(field, vehicle[field]);
      if (error) errors[field] = error;
    }
  );
  return errors;
}
