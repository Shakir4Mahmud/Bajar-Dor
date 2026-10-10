import { Suspense } from "react";
import Hero from "@/components/Hero";
import ProductSections from "@/components/ProductSections";
import ProductSkeleton from "@/components/ProductSkeleton";

export default function Home() {
  return (
    <main>
      <Hero />

      <Suspense fallback={<ProductSkeleton />}>
        <ProductSections />
      </Suspense>
    </main>
  );
}
