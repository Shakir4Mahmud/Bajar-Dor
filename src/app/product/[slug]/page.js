import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/api";
import {
  toBengaliNumber,
  convertToBengaliDigits,
  getUnitText,
  formatPercent,
} from "@/lib/helpers";

function formatPrice(number) {
  if (Number.isInteger(number)) {
    return toBengaliNumber(number);
  }
  return convertToBengaliDigits(number.toFixed(2));
}

function DetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="skeleton h-4 w-48 mb-4"></div>
      <div className="skeleton h-36 w-full rounded-2xl mb-4"></div>
      <div className="skeleton h-64 w-full rounded-2xl"></div>
    </div>
  );
}

async function ProductDetails({ params }) {
  const { slug } = await params;

  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets;

  const allMins = markets.map((m) => m.min);
  const allMaxes = markets.map((m) => m.max);
  const allAverages = markets.map((m) => (m.min + m.max) / 2);

  const minPrice = Math.min(...allMins);
  const maxPrice = Math.max(...allMaxes);

  let total = 0;
  for (let i = 0; i < allAverages.length; i++) {
    total = total + allAverages[i];
  }
  const averagePrice = total / allAverages.length;

  const difference = Math.abs(product.today - product.yesterday);
  let changeText = "গতকালের মতোই আছে";
  if (product.change.dir === "up") {
    changeText = "বেড়েছে";
  }
  if (product.change.dir === "down") {
    changeText = "কমেছে";
  }

  let arrow = "—";
  let badgeClass = "text-gray-500";
  if (product.change.dir === "up") {
    arrow = "▲";
    badgeClass = "text-red-600";
  }
  if (product.change.dir === "down") {
    arrow = "▼";
    badgeClass = "text-green-600";
  }

  const shortUnit = getUnitText(product.unit).replace("প্রতি ", "");

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 flex items-center gap-2 mb-4">
        <Link href="/" className="hover:underline">
          হোম
        </Link>
        <span>›</span>
        <Link
          href={"/category/" + product.category}
          className="hover:underline"
        >
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-gray-700">{product.nameBn}</span>
      </nav>

      <section className="bg-[#fafcfa] border border-[#e3ebe5] rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-100 flex items-center justify-center text-4xl shrink-0">
            {product.image}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">{product.nameBn}</h1>
            <p className="text-xs text-gray-500 mt-1">
              {getUnitText(product.unit)} · {product.categoryIcon}{" "}
              {product.categoryNameBn}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              গতকালের তুলনায় আজ দাম <b>{changeText}</b> ·{" "}
              {toBengaliNumber(difference)} টাকা
            </p>
          </div>
        </div>

        <div className="bg-[#eef4ef] rounded-xl px-5 py-3 text-center sm:min-w-[140px]">
          <p className="text-[11px] text-gray-500">আজকের দাম</p>
          <p className="text-3xl font-bold">{toBengaliNumber(product.today)}</p>
          <p className="text-[11px] text-gray-500">টাকা / {shortUnit}</p>
          <p className={"text-xs font-semibold mt-1 " + badgeClass}>
            {arrow} {formatPercent(product.change.pct)}%
          </p>
        </div>
      </section>

      <section className="bg-[#fafcfa] border border-[#e3ebe5] rounded-2xl p-4 sm:p-6">
        <h2 className="font-bold mb-3">দামের সারসংক্ষেপ</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="border border-[#e3ebe5] rounded-xl p-3.5 bg-white">
            <p className="text-[11px] text-gray-500">সর্বনিম্ন দাম</p>
            <p className="mt-1">
              <span className="text-2xl font-bold text-green-600">
                {formatPrice(minPrice)}
              </span>
              <span className="text-xs text-green-600"> টাকা</span>
            </p>
            <p className="text-[11px] text-gray-500 mt-1">
              সবচেয়ে কম দামের বাজারে
            </p>
          </div>

          <div className="border border-[#e3ebe5] rounded-xl p-3.5 bg-white">
            <p className="text-[11px] text-gray-500">সর্বাধিক দাম</p>
            <p className="mt-1">
              <span className="text-2xl font-bold text-red-600">
                {formatPrice(maxPrice)}
              </span>
              <span className="text-xs text-red-600"> টাকা</span>
            </p>
            <p className="text-[11px] text-gray-500 mt-1">
              সবচেয়ে বেশি দামের বাজারে
            </p>
          </div>

          <div className="border border-[#e3ebe5] rounded-xl p-3.5 bg-white">
            <p className="text-[11px] text-gray-500">গড় দাম</p>
            <p className="mt-1">
              <span className="text-2xl font-bold">
                {formatPrice(averagePrice)}
              </span>
              <span className="text-xs"> টাকা</span>
            </p>
            <p className="text-[11px] text-gray-500 mt-1">
              {getUnitText(product.unit)}-এর হিসাবে
            </p>
          </div>
        </div>

        <h2 className="font-bold mb-3">বাজারভিত্তিক আজকের দাম</h2>

        <div className="border border-[#e3ebe5] rounded-xl overflow-x-auto bg-white">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-xs text-gray-500 bg-gray-50">
                <th className="text-left font-medium px-4 py-3">বাজার</th>
                <th className="text-left font-medium px-4 py-3">বিভাগ</th>
                <th className="text-right font-medium px-4 py-3">সর্বনিম্ন</th>
                <th className="text-right font-medium px-4 py-3">সর্বাধিক</th>
                <th className="text-right font-medium px-4 py-3">গড়</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((item, index) => {
                const average = (item.min + item.max) / 2;

                let rowClass = "";
                if (index % 2 === 1) {
                  rowClass = "bg-gray-50";
                }

                return (
                  <tr key={item.market} className={rowClass}>
                    <td className="px-4 py-3 font-medium">{item.market}</td>
                    <td className="px-4 py-3 text-gray-600">{item.division}</td>
                    <td className="px-4 py-3 text-right">
                      {formatPrice(item.min)} টাকা
                    </td>
                    <td className="px-4 py-3 text-right">
                      {formatPrice(item.max)} টাকা
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      {formatPrice(average)} টাকা
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default function ProductPage({ params }) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <ProductDetails params={params} />
    </Suspense>
  );
}
