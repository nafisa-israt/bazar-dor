
"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

export default function SortProducts({ products }) {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const items = [...products];

    if (sort === "low-high") {
      return items.sort((a, b) => a.today - b.today);
    }

    if (sort === "high-low") {
      return items.sort((a, b) => b.today - a.today);
    }

    return items;
  }, [products, sort]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-600">
          মোট {products.length}টি পণ্য
        </p>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-green-600"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low-high">দাম: কম থেকে বেশি</option>
          <option value="high-low">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-gray-50 py-16 text-center">
          <p className="text-4xl">🛒</p>
          <h3 className="mt-4 text-lg font-semibold text-gray-800">
            এই category-তে কোনো পণ্য পাওয়া যায়নি
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            অন্য category দেখে নিতে পারো।
          </p>
        </div>
      )}
    </div>
  );
}
