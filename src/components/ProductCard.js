import Link from "next/link";
import {
  toBengaliNumber,
  getUnitText,
  formatPercent,
} from "@/lib/helpers";

export default function ProductCard({ product }) {
  let arrow = "—";
  let badgeClass = "bg-gray-100 text-gray-500";

  if (product.change.dir === "up") {
    arrow = "▲";
    badgeClass = "bg-red-50 text-red-600";
  }
  if (product.change.dir === "down") {
    arrow = "▼";
    badgeClass = "bg-green-50 text-green-600";
  }

  return (
    <Link
      href={"/product/" + product.slug}
      className="block bg-[#fafcfa] border border-[#e3ebe5] rounded-2xl p-3.5 hover:shadow-md hover:-translate-y-0.5 transition"
    >
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-2xl shrink-0">
          {product.image}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm truncate">{product.nameBn}</p>
          <p className="text-[11px] text-gray-500">
            {getUnitText(product.unit)}
          </p>
        </div>
      </div>

      <p className="text-[11px] text-gray-500 mt-3">আজকের দাম</p>
      <div className="flex items-center justify-between mt-0.5">
        <p>
          <span className="text-lg font-bold">
            {toBengaliNumber(product.today)}
          </span>
          <span className="text-sm text-gray-700"> টাকা</span>
        </p>
        <span
          className={
            "text-[11px] font-semibold px-2 py-0.5 rounded-full " + badgeClass
          }
        >
          {arrow} {formatPercent(product.change.pct)}%
        </span>
      </div>
    </Link>
  );
}