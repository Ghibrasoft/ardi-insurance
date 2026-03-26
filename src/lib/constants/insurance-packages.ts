export type PackageIdType = "basic" | "standard" | "premium";

export interface InsurancePackage {
  id: PackageIdType;
  name: string;
  description: string;
  coverages: string[];
  baseRatePercent: number;
}

export const PACKAGES: InsurancePackage[] = [
  {
    id: "basic",
    name: "Basic",
    description: "საბაზისო დაცვა",
    coverages: ["ფარავს მესამე პირის მიმართ ზიანს", "მინიმალური ფასი"],
    baseRatePercent: 1.2,
  },
  {
    id: "standard",
    name: "Standard",
    description: "გაფართოებული დაცვა",
    coverages: [
      "ფარავს მესამე პირის მიმართ ზიანს",
      "ფარავს ქურდობას",
      "ფარავს მინების დაზიანებას",
    ],
    baseRatePercent: 1.8,
  },
  {
    id: "premium",
    name: "Premium",
    description: "სრული დაცვა",
    coverages: [
      "ფარავს ყველაფერს რაც Standard-შია",
      "ფარავს სტიქიურ მოვლენებს",
      "ფარავს საკუთარი ავტომობილის დაზიანებას",
    ],
    baseRatePercent: 2.5,
  },
];
