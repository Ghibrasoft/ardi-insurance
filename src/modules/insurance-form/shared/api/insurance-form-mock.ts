import { DELAY_MS, sleep } from "../../../../lib/utils/sleep";

export interface IPlateCheckResult {
  year: number;
  make: string;
  model: string;
}

export const MOCK_PLATES: Record<string, IPlateCheckResult> = {
  "AC-123-CA": { make: "BMW", model: "X5", year: 2019 },
  "AE-123-EA": { make: "Ford", model: "Focus", year: 2012 },
  "AB-123-BA": { make: "Honda", model: "Civic", year: 2018 },
  "AB-123-CD": { make: "Toyota", model: "Camry", year: 2020 },
  "AD-123-DA": { make: "Mercedes", model: "C200", year: 2015 },
};

export async function submitInsuranceForm(
  data: unknown
): Promise<{ success: boolean }> {
  await sleep(DELAY_MS);
  console.log("Submitted:", data);

  return { success: true };
}
