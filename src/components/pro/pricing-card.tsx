import { TickIcon } from "@/icons/tick";
import { apps } from "@/lib/pro/apps";

interface Promotion {
  name: string;
  originalPrice: number;
  finalPrice: number;
  purchaseUrl: string;
  discountPercentage: number;
}

interface SalesData {
  count?: number;
}

interface PricingCardProps {
  activePromotion: Promotion;
  salesData: SalesData;
}

const productFeatures = [
  `${Object.keys(apps).length + 1} Themes`,
  "6 Variants",
  "4 Hand-picked Fonts",
  "1 Productivity E-book",
  "1 Bonus Screencast",
  "Design Files",
  "Wallpapers",
  "Constant updates",
  "Support included",
  "Discord Community",
  "License for 3 computers"
] as const;

const formatPriceDisplay = (price: number): string => {
  return `$${price.toFixed(0)}`;
};

const formatSalesCount = (count?: number): string => {
  if (!count) return "6,000";
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();
};

export const PricingCard = ({
  activePromotion,
  salesData
}: PricingCardProps) => (
  <div id="pricing">
    <div className="header">
      <h3>Become a Vampire</h3>
      <p>
        Join <code>{formatSalesCount(salesData?.count)} developers</code> using
        Dracula PRO every day.
      </p>
    </div>
    <div className="wrapper">
      <div className="price">
        <span>{activePromotion.name}</span>
        <h3 className="base">
          {formatPriceDisplay(activePromotion.originalPrice)}
        </h3>
        <h3 className="promo">
          {formatPriceDisplay(activePromotion.finalPrice)}
        </h3>
      </div>
      <span className="info">One-time payment</span>
      <ul className="features">
        {productFeatures.map((feature) => (
          <li key={feature}>
            <TickIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <a href={activePromotion.purchaseUrl} className="action primary">
        Buy Dracula PRO
      </a>
    </div>
    <div className="info">
      <p>30 days refund (no Q/A)</p>
      <p>Support response time: up to 5 business days.</p>
      <p>
        <a href="mailto:support@draculatheme.com">Contact us</a> to get a{" "}
        <em>Team License</em> to share with your team.
      </p>
    </div>
  </div>
);
