
            


import { Suspense } from "react";
import { getProducts, getCategories } from "@/lib/api";

import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

function LoadingProducts() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="h-64 animate-pulse rounded-2xl bg-gray-200"
        />
      ))}
    </div>
  );
}

async function HomeContent() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const risers = products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <Navbar categories={categories} />

      <PriceTicker products={products} />

      <Hero />

      <main className="mx-auto max-w-7xl px-5 py-16">

        {/* Price Increased */}
        <section className="mb-16">

          <div className="mb-7">
            <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
              আজ দাম বেড়েছে
              <span className="ml-2 text-green-600">▲</span>
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              যেসব পণ্যের দাম আজ বৃদ্ধি পেয়েছে।
            </p>
          </div>

          {risers.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {risers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              বর্তমানে কোনো পণ্যের দাম বাড়েনি।
            </p>
          )}

        </section>

        {/* Price Decreased */}
        <section className="mb-16">

          <div className="mb-7">
            <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
              আজ দাম কমেছে
              <span className="ml-2 text-red-500">▼</span>
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              যেসব পণ্যের দাম আজ কমেছে।
            </p>
          </div>

          {fallers.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {fallers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              বর্তমানে কোনো পণ্যের দাম কমেনি।
            </p>
          )}

        </section>

        {/* All Products */}
        <section id="সব-পণ্য" className="scroll-mt-8">

          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
              সব পণ্য
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              নিত্যপ্রয়োজনীয় {products.length}টি পণ্যের
              আজকের বাজারদর এক নজরে দেখুন।
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingProducts />}>
      <HomeContent />
    </Suspense>
  );
}
