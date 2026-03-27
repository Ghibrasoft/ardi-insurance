import type { PackageIdType } from "../constants/insurance-packages";
import type { AddonIdType } from "../constants/insurance-addons";
import { PACKAGES } from "../constants/insurance-packages";
import { ADDONS } from "../constants/insurance-addons";

interface CalcParams {
  marketValue: number;
  vehicleYear: number;
  dateOfBirth: string;
  addons: AddonIdType[];
  packageId: PackageIdType;
}

function getAge(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

function getAgeMultiplier(dateOfBirth: string): number {
  const age = getAge(dateOfBirth);
  if (age >= 18 && age <= 25) return 1.2;
  if (age >= 61) return 1.15;
  return 1.0;
}

function getVehicleAgeMultiplier(vehicleYear: number): number {
  const currentYear = new Date().getFullYear();
  return currentYear - vehicleYear > 10 ? 1.1 : 1.0;
}

export function getPolicyDates(): { startDate: string; endDate: string } {
  const start = new Date();
  const end = new Date();
  end.setFullYear(end.getFullYear() + 1);
  return {
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
  };
}

export function calculatePremium(params: CalcParams): {
  annualPremium: number;
  monthlyPremium: number;
} {
  const { marketValue, packageId, addons, dateOfBirth, vehicleYear } = params;

  // 1. base rate
  const pkg = PACKAGES.find((p) => p.id === packageId)!;
  let annual = marketValue * (pkg.baseRatePercent / 100);

  // 2. age multiplier
  annual *= getAgeMultiplier(dateOfBirth);

  // 3. vehicle age multiplier
  annual *= getVehicleAgeMultiplier(vehicleYear);

  // 4. flat fee addons
  for (const addonId of addons) {
    const addon = ADDONS.find((a) => a.id === addonId);
    if (addon?.flatFee) annual += addon.flatFee;
  }

  // 5. percentage addon — 0% deductible applied last
  if (addons.includes("zero_deductible")) {
    const addon = ADDONS.find((a) => a.id === "zero_deductible");
    if (addon?.percentFee) annual *= 1 + addon.percentFee;
  }

  return {
    annualPremium: Math.round(annual * 100) / 100,
    monthlyPremium: Math.round((annual / 12) * 100) / 100,
  };
}
