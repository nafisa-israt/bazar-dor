
import Link from "next/link";

export default function Navbar({ categories = [] }) {
  const today = new Date().toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-7xl px-5">

        <div className="flex flex-wrap items-center justify-between gap-4 py-5">

          <Link href="/" className="flex items-center gap-3">
            <span className="text-4xl">🛒</span>

            <div>
              <h1 className="text-2xl font-extrabold text-green-800">
                বাজার দর
              </h1>
              <p className="text-xs text-gray-500">{today}</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="rounded-lg border border-green-700 px-4 py-2 text-sm font-semibold text-green-800 hover:bg-green-50"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
            >
              সাইন আপ
            </Link>
          </div>

        </div>

        <nav className="flex gap-6 overflow-x-auto border-t border-gray-100 py-4">
          <Link
            href="/"
            className="shrink-0 font-semibold text-green-700"
          >
            সব পণ্য
          </Link>

          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="shrink-0 text-sm font-medium text-gray-600 transition hover:text-green-700"
            >
              {category.icon} {category.nameBn}
            </Link>
          ))}
        </nav>

      </div>
    </header>
  );
}
