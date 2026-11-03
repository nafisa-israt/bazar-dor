
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

import {
  getCategories,
  getProducts,
} from "@/lib/api";

import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";

function bn(value) {
  return Number(value ?? 0).toLocaleString("bn-BD");
}

function getUnit(unit) {
  const units = {
    kg: "কেজি",
    liter: "লিটার",
    litre: "লিটার",
    piece: "টি",
    pcs: "টি",
    dozen: "ডজন",
  };

  return units[unit] || unit;
}

function ProductLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="h-8 w-56 animate-pulse rounded bg-gray-200" />
      <div className="mt-8 h-80 animate-pulse rounded-2xl bg-gray-100" />
    </main>
  );
}

async function ProductContent({ params }) {
  const { slug } = await params;

  // Check user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect if user is not logged in
  if (!session) {
    redirect(`/signin?callbackURL=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const [categories, products] = await Promise.all([
  getCategories(),
  getProducts(),
]);

const product = products.find((item) => item.slug === slug);

if (!product) {
  notFound();
}

  const category = categories.find(
    (item) => item.slug === product.category
  );

  const markets = product.markets || [];

  const lowestPrice = markets.length
    ? Math.min(...markets.map((item) => Number(item.min)))
    : 0;

  const highestPrice = markets.length
    ? Math.max(...markets.map((item) => Number(item.max)))
    : 0;

  const averagePrice = markets.length
    ? markets.reduce(
        (total, item) =>
          total + (Number(item.min) + Number(item.max)) / 2,
        0
      ) / markets.length
    : 0;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <>
      <Navbar categories={categories} />
      <PriceTicker products={products} />

      <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-12">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-green-700 hover:underline"
        >
          ← সব পণ্যে ফিরে যাও
        </Link>

        {/* Product summary */}
        <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-10">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="flex min-h-64 items-center justify-center rounded-2xl bg-green-50">
              <span className="text-8xl">
                {product.image || product.categoryIcon || "🛒"}
              </span>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-green-700">
                {category?.icon} {category?.nameBn || product.categoryNameBn}
              </p>

              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {product.nameBn}
              </h1>

              <p className="mt-3 text-gray-500">
                প্রতি {getUnit(product.unit)}-এর বর্তমান বাজার দর
              </p>

              <div className="mt-8">
                <p className="text-sm text-gray-500">আজকের দাম</p>

                <p className="mt-1 text-4xl font-bold text-green-800">
                  ৳{bn(product.today)}
                </p>

                <span className="text-sm text-gray-500">
                  প্রতি {getUnit(product.unit)}
                </span>
              </div>

              <div
                className={`mt-5 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                  isUp
                    ? "bg-red-50 text-red-600"
                    : isDown
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {isUp ? "▲ দাম বেড়েছে" : isDown ? "▼ দাম কমেছে" : "— দাম অপরিবর্তিত"}
                {" "}
                {bn(Math.abs(product.change?.pct || 0))}%
              </div>
            </div>
          </div>
        </section>

        {/* Price history */}
        <section className="mt-10">
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            📊 দামের তুলনা
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { title: "আজকের দাম", value: product.today },
              { title: "গতকালের দাম", value: product.yesterday },
              { title: "গত সপ্তাহের দাম", value: product.lastWeek },
              { title: "গত মাসের দাম", value: product.lastMonth },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-100 bg-white p-5"
              >
                <p className="text-sm text-gray-500">{item.title}</p>
                <p className="mt-3 text-xl font-bold text-gray-900">
                  ৳{bn(item.value)}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  প্রতি {getUnit(product.unit)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Market summary */}
        <section className="mt-10">
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            🏪 বাজারদরের সারসংক্ষেপ
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-green-50 p-5">
              <p className="text-sm text-gray-600">সর্বনিম্ন দাম</p>
              <p className="mt-2 text-2xl font-bold text-green-800">
                ৳{bn(lowestPrice)}
              </p>
            </div>

            <div className="rounded-2xl bg-blue-50 p-5">
              <p className="text-sm text-gray-600">গড় দাম</p>
              <p className="mt-2 text-2xl font-bold text-blue-800">
                ৳{bn(averagePrice)}
              </p>
            </div>

            <div className="rounded-2xl bg-orange-50 p-5">
              <p className="text-sm text-gray-600">সর্বোচ্চ দাম</p>
              <p className="mt-2 text-2xl font-bold text-orange-800">
                ৳{bn(highestPrice)}
              </p>
            </div>
          </div>
        </section>

        {/* Market list */}
        <section className="mt-10">
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            📍 বিভিন্ন বাজারের দাম
          </h2>

          {markets.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
              {markets.map((market, index) => (
                <div
                  key={`${market.market}-${index}`}
                  className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5 last:border-b-0"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {market.market}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {market.division}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      ৳{bn(market.min)} – ৳{bn(market.max)}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      প্রতি {getUnit(product.unit)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-gray-50 p-6 text-center text-gray-500">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>

        <p className="mt-8 text-xs text-gray-400">
          * বাজারদরগুলো নির্দেশনামূলক। স্থান ও সময়ভেদে দাম পরিবর্তিত হতে পারে।
        </p>
      </main>

      <Footer />
    </>
  );
}

export default function ProductPage({ params }) {
  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductContent params={params} />
    </Suspense>
  );
}
