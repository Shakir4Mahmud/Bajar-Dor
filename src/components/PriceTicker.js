import { getProducts } from "@/lib/api";
import {
  toBengaliNumber,
  getShortUnitText,
  formatPercent,
} from "@/lib/helpers";

export default async function PriceTicker() {
  const products = await getProducts();

  const tickerItems = products.map((product) => {
    let arrow = "—";
    let colorClass = "text-gray-500";

    if (product.change.dir === "up") {
      arrow = "▲";
      colorClass = "text-red-600";
    }
    if (product.change.dir === "down") {
      arrow = "▼";
      colorClass = "text-green-600";
    }

    const priceText =
      toBengaliNumber(product.today) +
      " টাকা/" +
      getShortUnitText(product.unit);
    const percentText = arrow + " " + formatPercent(product.change.pct) + "%";

    return (
      <div
        key={product.id}
        className="flex items-center gap-2 px-5 py-2 border-r border-gray-200 whitespace-nowrap text-sm"
      >
        <span>{product.image}</span>
        <span className="font-semibold">{product.nameBn}</span>
        <span className="text-gray-600">{priceText}</span>
        <span className={"font-semibold " + colorClass}>{percentText}</span>
      </div>
    );
  });

  return (
    <div className="bg-white border-b border-gray-200 overflow-hidden">
      <div className="marquee-track">
        <div className="flex shrink-0">{tickerItems}</div>
        <div className="flex shrink-0">{tickerItems}</div>
      </div>
    </div>
  );
}