import { describe, it, expect } from "vitest";
import {
  validateDriverInfo,
  validateVehicleInfo,
  validateDriverField,
  validateVehicleField,
} from "../validation";
import type { IDriverInfo, IVehicleInfo } from "../../insurance-form-types";

// ─── Base valid data ──────────────────────────────────────────────────────────

const VALID_DRIVER: IDriverInfo = {
  firstName: "გიორგი",
  lastName: "მაისურაძე",
  personalId: "12345678901",
  dateOfBirth: "1990-01-01",
  phone: "+995 555 123 456",
};

const VALID_VEHICLE: IVehicleInfo = {
  plateNumber: "AB-123-CD",
  make: "Toyota",
  model: "Camry",
  year: 2020,
  marketValue: 25000,
};

// ─── Driver validation ────────────────────────────────────────────────────────

describe("validateDriverInfo", () => {
  it("returns no errors for valid driver", () => {
    const errors = validateDriverInfo(VALID_DRIVER);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  describe("firstName", () => {
    it("required — empty string fails", () => {
      const errors = validateDriverField("firstName", "");
      expect(errors).toBeTruthy();
    });

    it("required — whitespace only fails", () => {
      const errors = validateDriverField("firstName", "   ");
      expect(errors).toBeTruthy();
    });

    it("valid name passes", () => {
      const errors = validateDriverField("firstName", "გიორგი");
      expect(errors).toBeUndefined();
    });
  });

  describe("lastName", () => {
    it("required — empty string fails", () => {
      expect(validateDriverField("lastName", "")).toBeTruthy();
    });

    it("valid last name passes", () => {
      expect(validateDriverField("lastName", "მაისურაძე")).toBeUndefined();
    });
  });

  describe("personalId", () => {
    it("required — empty fails", () => {
      expect(validateDriverField("personalId", "")).toBeTruthy();
    });

    it("exactly 11 digits passes", () => {
      expect(validateDriverField("personalId", "12345678901")).toBeUndefined();
    });

    it("10 digits fails", () => {
      expect(validateDriverField("personalId", "234567890")).toBeTruthy();
    });

    it("12 digits fails", () => {
      expect(validateDriverField("personalId", "123456789012")).toBeTruthy();
    });

    it("11 chars with letters fails", () => {
      expect(validateDriverField("personalId", "1234567890A")).toBeTruthy();
    });
  });

  describe("dateOfBirth", () => {
    it("required — empty fails", () => {
      expect(validateDriverField("dateOfBirth", "")).toBeTruthy();
    });

    it("age exactly 18 passes", () => {
      const dob = new Date();
      dob.setFullYear(dob.getFullYear() - 18);
      expect(
        validateDriverField("dateOfBirth", dob.toISOString().split("T")[0])
      ).toBeUndefined();
    });

    it("age 17 fails", () => {
      const dob = new Date();
      dob.setFullYear(dob.getFullYear() - 17);
      expect(
        validateDriverField("dateOfBirth", dob.toISOString().split("T")[0])
      ).toBeTruthy();
    });

    it("age 35 passes", () => {
      expect(validateDriverField("dateOfBirth", "1990-01-01")).toBeUndefined();
    });
  });

  describe("phone", () => {
    it("required — empty fails", () => {
      expect(validateDriverField("phone", "")).toBeTruthy();
    });

    it("valid Georgian mobile passes", () => {
      expect(validateDriverField("phone", "+995 555 123 456")).toBeUndefined();
    });

    it("invalid format fails", () => {
      expect(validateDriverField("phone", "555123456")).toBeTruthy();
    });

    it("wrong country code fails", () => {
      expect(validateDriverField("phone", "+994 555 123 456")).toBeTruthy();
    });

    it("too short fails", () => {
      expect(validateDriverField("phone", "+995 555 123")).toBeTruthy();
    });
  });

  describe("full driver validation", () => {
    it("returns errors for all invalid fields", () => {
      const errors = validateDriverInfo({
        firstName: "",
        lastName: "",
        personalId: "",
        dateOfBirth: "",
        phone: "",
      });
      expect(Object.keys(errors)).toHaveLength(5);
    });
  });
});

// ─── Vehicle validation ───────────────────────────────────────────────────────

describe("validateVehicleInfo", () => {
  it("returns no errors for valid vehicle", () => {
    const errors = validateVehicleInfo(VALID_VEHICLE);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  describe("plateNumber", () => {
    it("required — empty fails", () => {
      expect(validateVehicleField("plateNumber", "")).toBeTruthy();
    });

    it("valid plate passes", () => {
      expect(validateVehicleField("plateNumber", "AB-123-CD")).toBeUndefined();
    });
  });

  describe("year", () => {
    it("null fails", () => {
      expect(validateVehicleField("year", null)).toBeTruthy();
    });

    it("current year passes", () => {
      expect(
        validateVehicleField("year", new Date().getFullYear())
      ).toBeUndefined();
    });

    it("future year fails", () => {
      expect(
        validateVehicleField("year", new Date().getFullYear() + 1)
      ).toBeTruthy();
    });

    it("year 1900 passes", () => {
      expect(validateVehicleField("year", 1900)).toBeUndefined();
    });

    it("year 1899 fails", () => {
      expect(validateVehicleField("year", 1899)).toBeTruthy();
    });
  });

  describe("marketValue", () => {
    it("null fails", () => {
      expect(validateVehicleField("marketValue", null)).toBeTruthy();
    });

    it("positive value passes", () => {
      expect(validateVehicleField("marketValue", 25000)).toBeUndefined();
    });

    it("zero fails", () => {
      expect(validateVehicleField("marketValue", 0)).toBeTruthy();
    });

    it("negative value fails", () => {
      expect(validateVehicleField("marketValue", -100)).toBeTruthy();
    });

    it("value of 1 passes", () => {
      expect(validateVehicleField("marketValue", 1)).toBeUndefined();
    });
  });

  describe("full vehicle validation", () => {
    it("returns errors for all invalid fields", () => {
      const errors = validateVehicleInfo({
        plateNumber: "",
        make: "",
        model: "",
        year: null,
        marketValue: null,
      });
      expect(Object.keys(errors).length).toBeGreaterThan(0);
    });
  });
});
