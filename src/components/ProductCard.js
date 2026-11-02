
import Link from "next/link";

function bnNumber(value) {
  return Number(value).toLocaleString("bn-BD");
}

function getUnit(unit) {
  const units = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
  };

  return units[unit] || `প্রতি ${unit}`;
}

export default function ProductCard({ product }) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-center justify-between">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-4xl">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isUp
              ? "bg-green-100 text-green-700"
              : isDown
              ? "bg-red-100 text-red-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
          {bnNumber(Math.abs(product.change?.pct || 0))}%
        </span>

      </div>

      <div className="mt-5">

        <p className="text-xs font-medium text-green-700">
          {product.categoryNameBn}
        </p>

        <h3 className="mt-1 text-lg font-bold text-gray-800 transition group-hover:text-green-700">
          {product.nameBn}
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          {getUnit(product.unit)}
        </p>

      </div>

      <div className="mt-5 flex items-end justify-between border-t border-gray-100 pt-4">

        <div>
          <p className="text-xs text-gray-400">
            আজকের দাম
          </p>

          <p className="mt-1 text-2xl font-extrabold text-gray-900">
            {bnNumber(product.today)}
            <span className="ml-1 text-sm font-medium text-gray-500">
              টাকা
            </span>
          </p>
        </div>

        <span className="text-sm font-semibold text-green-700">
          বিস্তারিত →
        </span>

      </div>
    </Link>
  );
}
