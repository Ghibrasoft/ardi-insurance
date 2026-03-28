import { describe, it, expect } from "vitest";
import { calculatePremium } from "../calculations";

const BASE_PARAMS = {
  packageId: "basic" as const,
  addons: [],
  dateOfBirth: "1990-01-01", // age ~35 → no surcharge
  vehicleYear: 2020, // < 10 years old → no surcharge
  marketValue: 10000,
};

describe("calculatePremium", () => {
  // Base rates
  describe("base rate by package", () => {
    it("basic = 1.2% of market value", () => {
      const { annualPremium } = calculatePremium({
        ...BASE_PARAMS,
        packageId: "basic",
      });
      expect(annualPremium).toBe(120);
    });

    it("standard = 1.8% of market value", () => {
      const { annualPremium } = calculatePremium({
        ...BASE_PARAMS,
        packageId: "standard",
      });
      expect(annualPremium).toBe(180);
    });

    it("premium = 2.5% of market value", () => {
      const { annualPremium } = calculatePremium({
        ...BASE_PARAMS,
        packageId: "premium",
      });
      expect(annualPremium).toBe(250);
    });
  });

  // Age multiplier
  describe("age surcharge", () => {
    it("age 18-25 adds 20%", () => {
      const dob = new Date();
      dob.setFullYear(dob.getFullYear() - 20);
      const { annualPremium } = calculatePremium({
        ...BASE_PARAMS,
        dateOfBirth: dob.toISOString().split("T")[0],
      });
      expect(annualPremium).toBe(144); // 120 * 1.2
    });

    it("age 26-60 adds 0%", () => {
      const { annualPremium } = calculatePremium({ ...BASE_PARAMS });
      expect(annualPremium).toBe(120); // no surcharge
    });

    it("age 61+ adds 15%", () => {
      const dob = new Date();
      dob.setFullYear(dob.getFullYear() - 65);
      const { annualPremium } = calculatePremium({
        ...BASE_PARAMS,
        dateOfBirth: dob.toISOString().split("T")[0],
      });
      expect(annualPremium).toBe(138); // 120 * 1.15
    });

    it("age exactly 18 adds 20%", () => {
      const dob = new Date();
      dob.setFullYear(dob.getFullYear() - 18);
      const { annualPremium } = calculatePremium({
        ...BASE_PARAMS,
        dateOfBirth: dob.toISOString().split("T")[0],
      });
      expect(annualPremium).toBe(144);
    });

    it("age exactly 61 adds 15%", () => {
      const dob = new Date();
      dob.setFullYear(dob.getFullYear() - 61);
      const { annualPremium } = calculatePremium({
        ...BASE_PARAMS,
        dateOfBirth: dob.toISOString().split("T")[0],
      });
      expect(annualPremium).toBe(138);
    });
  });

  // Vehicle age multiplier
  it("vehicle older than 10 years adds 10%", () => {
    const { annualPremium } = calculatePremium({
      ...BASE_PARAMS,
      vehicleYear: new Date().getFullYear() - 11, // 11 years → triggers
    });
    expect(annualPremium).toBe(132);
  });

  it("vehicle exactly 10 years old adds 0%", () => {
    const { annualPremium } = calculatePremium({
      ...BASE_PARAMS,
      vehicleYear: new Date().getFullYear() - 10, // exactly 10 → no surcharge
    });
    expect(annualPremium).toBe(120); // no surcharge
  });

  it("vehicle less than 10 years old adds 0%", () => {
    const { annualPremium } = calculatePremium({
      ...BASE_PARAMS,
      vehicleYear: new Date().getFullYear() - 5,
    });
    expect(annualPremium).toBe(120);
  });

  // Addons
  describe("addons", () => {
    it("roadside assistance adds 40 GEL flat", () => {
      const { annualPremium } = calculatePremium({
        ...BASE_PARAMS,
        addons: ["roadside"],
      });
      expect(annualPremium).toBe(160); // 120 + 40
    });

    it("replacement car adds 90 GEL flat", () => {
      const { annualPremium } = calculatePremium({
        ...BASE_PARAMS,
        addons: ["replacement_car"],
      });
      expect(annualPremium).toBe(210); // 120 + 90
    });

    it("zero deductible adds 15% of total", () => {
      const { annualPremium } = calculatePremium({
        ...BASE_PARAMS,
        addons: ["zero_deductible"],
      });
      expect(annualPremium).toBe(138); // 120 * 1.15
    });

    it("zero deductible applies after flat fees", () => {
      const { annualPremium } = calculatePremium({
        ...BASE_PARAMS,
        addons: ["roadside", "zero_deductible"],
      });
      expect(annualPremium).toBe(184); // (120 + 40) * 1.15
    });

    it("all addons combined", () => {
      const { annualPremium } = calculatePremium({
        ...BASE_PARAMS,
        addons: ["roadside", "replacement_car", "zero_deductible"],
      });
      expect(annualPremium).toBe(287.5); // (120 + 40 + 90) * 1.15
    });
  });

  // Monthly premium
  describe("monthly premium", () => {
    it("monthly = annual / 12 rounded to 2 decimals", () => {
      const { annualPremium, monthlyPremium } = calculatePremium({
        ...BASE_PARAMS,
      });
      expect(monthlyPremium).toBe(Math.round((annualPremium / 12) * 100) / 100);
    });
  });

  //  Combined
  describe("combined multipliers", () => {
    it("young driver + old vehicle + premium package", () => {
      const dob = new Date();
      dob.setFullYear(dob.getFullYear() - 22);
      const { annualPremium } = calculatePremium({
        packageId: "premium",
        addons: [],
        dateOfBirth: dob.toISOString().split("T")[0],
        vehicleYear: new Date().getFullYear() - 15,
        marketValue: 10000,
      });
      // 250 * 1.2 (age) * 1.1 (vehicle) = 330
      expect(annualPremium).toBe(330);
    });
  });
});
