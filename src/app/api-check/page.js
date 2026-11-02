

import { Suspense } from "react";
import { getProducts, getCategories } from "@/lib/api";

async function ApiCheckData() {
  let products = [];
  let categories = [];
  let error = "";

  try {
    [products, categories] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return (
      <p className="rounded-lg bg-red-100 p-4 text-red-700">
        API Error: {error}
      </p>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">

        <div className="rounded-xl bg-green-100 p-6">
          <h2 className="text-xl font-bold text-green-800">
            Total Products
          </h2>
          <p className="mt-2 text-4xl font-bold">
            {products.length}
          </p>
        </div>

        <div className="rounded-xl bg-blue-100 p-6">
          <h2 className="text-xl font-bold text-blue-800">
            Total Categories
          </h2>
          <p className="mt-2 text-4xl font-bold">
            {categories.length}
          </p>
        </div>

      </div>

      <h2 className="mb-3 mt-10 text-xl font-bold">
        Product Sample
      </h2>

      <pre className="overflow-x-auto rounded-xl bg-gray-900 p-5 text-sm text-green-300">
        {JSON.stringify(products.slice(0, 2), null, 2)}
      </pre>

      <h2 className="mb-3 mt-8 text-xl font-bold">
        Category Sample
      </h2>

      <pre className="overflow-x-auto rounded-xl bg-gray-900 p-5 text-sm text-green-300">
        {JSON.stringify(categories.slice(0, 2), null, 2)}
      </pre>
    </>
  );
}

export default function ApiCheckPage() {
  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-6 text-3xl font-bold">
          Bazar Dor API Test
        </h1>

        <Suspense
          fallback={
            <p className="rounded-lg bg-gray-100 p-5">
              Loading API data...
            </p>
          }
        >
          <ApiCheckData />
        </Suspense>

      </div>
    </main>
  );
}
