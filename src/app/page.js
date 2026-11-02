
            

import { ShoppingBasket, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-5 text-center">

        <div className="mb-5 flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
          <TrendingUp size={18} />
          বাংলাদেশের দৈনিক বাজারদর
        </div>

        <div className="mb-5 flex items-center gap-3">
          <ShoppingBasket size={42} className="text-green-700" />

          <h1 className="text-4xl font-bold text-green-800 md:text-6xl">
            বাজার দর
          </h1>
        </div>

        <p className="max-w-xl text-gray-600 md:text-lg">
          নিত্যপ্রয়োজনীয় পণ্যের বর্তমান দাম জানুন।
          বাজারের সঠিক তথ্য এখন এক জায়গায়।
        </p>

        <button className="mt-8 rounded-lg bg-green-700 px-7 py-3 font-semibold text-white transition hover:bg-green-800">
          Explore Products
        </button>

      </section>
    </main>
  );
}
