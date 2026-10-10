"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { toBengaliNumber } from "@/lib/helpers";

export default function CategoryProducts({ products }) {
  const [sortType, setSortType] = useState("default");

  const sortedProducts = [...products];

  if (sortType === "low") {
    sortedProducts.sort((a, b) => a.today - b.today);
  }
  if (sortType === "high") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-5xl mb-3">🛒</p>
        <h2 className="text-xl font-bold">কোনো পণ্য পাওয়া যায়নি</h2>
        <p className="text-sm text-gray-500 mt-2">
          এই ক্যাটাগরিতে এখন কোনো পণ্য নেই।
        </p>
        <Link href="/" className="btn btn-primary mt-5">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-[#fafcfa] border border-[#e3ebe5] rounded-2xl px-4 py-4 flex items-center justify-end gap-3 mb-4">
        <label htmlFor="sort" className="text-sm text-gray-600">
          সাজান
        </label>
        <select
          id="sort"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="select select-sm bg-white border-gray-300"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low">দাম: কম থেকে বেশি</option>
          <option value="high">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="text-xs text-gray-500 mb-3">
        মোট {toBengaliNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}