import { getProducts } from "@/lib/api";
import ProductCard from "./ProductCard";
import { toBengaliNumber } from "@/lib/helpers";

export default async function ProductSections() {
  const products = await getProducts();

  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const gridClass = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4";

  return (
    <div className="max-w-6xl mx-auto px-4 pb-10">
      {/* Section A */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">
          <span className="text-red-600">▲</span> আজ দাম বেড়েছে
        </h2>
        <div className={gridClass}>
          {risers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Section B */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">
          <span className="text-green-600">▼</span> আজ দাম কমেছে
        </h2>
        <div className={gridClass}>
          {fallers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Section C */}
      <section id="সব-পণ্য" className="scroll-mt-32">
        <h2 className="text-2xl font-bold">সব পণ্য</h2>
        <p className="text-sm text-gray-500 mt-1 mb-4">
          মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <div className={gridClass}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
