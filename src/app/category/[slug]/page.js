
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getProductsByCategory } from "@/lib/api";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import SortProducts from "@/components/SortProducts";

function CategoryLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 h-8 w-48 animate-pulse rounded bg-gray-200" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-2xl bg-gray-100"
          />
        ))}
      </div>
    </main>
  );
}

async function CategoryContent({ params }) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProductsByCategory(slug),
  ]);

  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <>
      <Navbar categories={categories} />
      <PriceTicker products={products} />

      <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-12">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-green-700 hover:underline"
        >
          ← হোম পেজে ফিরে যাও
        </Link>

        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-green-700">
            পণ্যের তালিকা
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            {category.icon} {category.nameBn}
          </h1>

          <p className="mt-2 text-gray-500">
            {category.nameBn} category-এর সব পণ্যের আজকের বাজার দর।
          </p>
        </div>

        <SortProducts products={products} />
      </main>

      <Footer />
    </>
  );
}

export default function CategoryPage({ params }) {
  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}