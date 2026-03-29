import { Divider } from "../../../../components/ui/divider";
import { SectionCard } from "../../../../components/ui/section-card";
import { SummaryRow } from "../../../../components/ui/summary-row";
import { ADDONS } from "../../../../lib/constants/insurance-addons";
import { PACKAGES } from "../../../../lib/constants/insurance-packages";
import { formatDate } from "../../../../lib/utils/format-date";
import { formatPrice } from "../../../../lib/utils/format-price";
import type { IQuoteSummary } from "../insurance-form-types";
import { QuoteSummary } from "./quote-summary/quote-summary";

interface PolicySummaryProps {
  isFormSucceed: boolean;
  quote: IQuoteSummary | null;
}

export const PolicySummary = ({ quote, isFormSucceed }: PolicySummaryProps) => {
  if (!quote) return <p>შეცდომა მონაცემების ჩატვირთვისას. სცადეთ თავიდან.</p>;

  if (isFormSucceed) return <QuoteSummary quote={quote} />;

  const pkg = PACKAGES.find((p) => p.id === quote.packageId)!;
  const selectedAddons = ADDONS.filter((a) => quote.addons.includes(a.id));
  const displayAddons = selectedAddons.map((a) => a.label).join(", ");

  return (
    <div className="flex flex-col gap-6">
      {/* Driver */}
      <SectionCard title="მძღოლის ინფორმაცია">
        <div className="flex flex-col sm:flex-row gap-3 text-sm relative">
          <div className="flex-1 flex flex-col gap-2">
            <SummaryRow
              label="სახელი და გვარი"
              value={`${quote.driver.firstName} ${quote.driver.lastName}`}
            />
            <SummaryRow label="პირადი ნომერი" value={quote.driver.personalId} />
          </div>

          <Divider direction="vertical" flexItem className="hidden sm:block" />

          <div className="flex-1 flex flex-col gap-2">
            <SummaryRow
              label="დაბადების თარიღი"
              value={formatDate(quote.driver.dateOfBirth)}
            />
            <SummaryRow label="ტელეფონი" value={quote.driver.phone} />
          </div>
        </div>
      </SectionCard>

      {/* Vehicle */}
      <SectionCard title="ავტომობილის ინფორმაცია">
        <div className="flex flex-col sm:flex-row gap-3 text-sm relative">
          <div className="flex-1 flex flex-col gap-2">
            <SummaryRow
              label="სახელმწიფო ნომერი"
              value={quote.vehicle.plateNumber}
            />
            <SummaryRow
              label="მარკა / მოდელი"
              value={`${quote.vehicle.make} ${quote.vehicle.model}`}
            />
          </div>

          <Divider direction="vertical" flexItem className="hidden sm:block" />

          <div className="flex-1 flex flex-col gap-2">
            <SummaryRow label="გამოშვების წელი" value={quote.vehicle.year} />
            <SummaryRow
              label="საბაზრო ღირებულება"
              value={`${formatPrice(quote.vehicle.marketValue ?? 0)} ₾`}
            />
          </div>
        </div>
      </SectionCard>

      {/* Package + addons */}
      <SectionCard title="არჩეული პაკეტი">
        <div className="flex flex-col gap-3 text-sm">
          <SummaryRow label="პაკეტი" value={pkg.name} />
          <SummaryRow label="დამატებითი ოფციები" value={displayAddons} />
        </div>
      </SectionCard>

      {/* Bonus */}
      <SectionCard title="პრემია">
        <div className="flex flex-col gap-3 text-sm">
          <SummaryRow
            label="პოლისის დაწყება"
            value={formatDate(quote.startDate)}
          />
          <SummaryRow
            label="პოლისის დასრულება"
            value={formatDate(quote.endDate)}
          />
          <SummaryRow
            label="წლიური პრემია"
            value={`${formatPrice(quote.annualPremium ?? 0)} ₾`}
            highlight
          />
          <SummaryRow
            label="თვიური გადახდა"
            value={`${formatPrice(quote.monthlyPremium ?? 0)} ₾`}
            highlight
          />
        </div>
      </SectionCard>
    </div>
  );
};
