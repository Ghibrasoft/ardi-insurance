import {
  MOCK_PLATES,
  type IPlateCheckResult,
} from "../../modules/insurance-form/shared/api/insurance-form-mock";
import { DELAY_MS, sleep } from "./sleep";

export async function checkPlateNumber(
  plate: string
): Promise<IPlateCheckResult | null> {
  await sleep(DELAY_MS);
  const normalized = plate.trim().toUpperCase();

  return MOCK_PLATES[normalized] ?? null;
}
