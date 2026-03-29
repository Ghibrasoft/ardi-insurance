export type AddonIdType = "roadside" | "replacement_car" | "zero_deductible";
export interface IAddon {
  id: AddonIdType;
  label: string;
  description: string;
  flatFee?: number;
  percentFee?: number;
}

export const ADDONS: IAddon[] = [
  {
    id: "roadside",
    label: "Roadside Assistance",
    description: "გამართვის სამსახური გზაზე",
    flatFee: 40,
  },
  {
    id: "replacement_car",
    label: "Replacement Car",
    description: "სათადარიგო ავტომობილი",
    flatFee: 90,
  },
  {
    id: "zero_deductible",
    label: "0% Deductible",
    description: "ფრანშიზის გარეშე",
    percentFee: 0.15,
  },
];
