import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/api";
import { toBengaliNumber } from "@/lib/helpers";
import CategoryProducts from "@/components/CategoryProducts";

function CategorySkeleton() {
  const cards = [1, 2, 3, 4, 5, 6];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="skeleton h-24 w-full rounded-2xl mb-4"></div>
      <div className="skeleton h-16 w-full rounded-2xl mb-4"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((number) => (
          <div key={number} className="skeleton h-28 w-full rounded-2xl"></div>
        ))}
      </div>
    </div>
  );
}

async function CategoryContent({ params }) {
  const { slug } = await params;

  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);

  // ভুল slug হলে 404 page (সেখানে "হোম পেজে ফিরে যান" button আছে)
  if (!category) {
    notFound();
  }

  const products = await getProducts();
  const categoryProducts = products.filter((item) => item.category === slug);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* শিরোনাম + icon */}
      <div className="bg-[#fafcfa] border border-[#e3ebe5] rounded-2xl p-4 sm:p-5 flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl shrink-0">
          {category.icon}
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">{category.nameBn}</h1>
          <p className="text-xs text-gray-500">
            {toBengaliNumber(categoryProducts.length)}টি পণ্যের আজকের দাম ও
            পরিবর্তন
          </p>
        </div>
      </div>

      <CategoryProducts products={categoryProducts} />
    </div>
  );
}

export default function CategoryPage({ params }) {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}