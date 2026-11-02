
export default function Hero() {
  return (
    <section className="overflow-hidden bg-[#edf5eb]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">

        <div>
          <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
            🌿 আপনার প্রতিদিনের বাজার সহযোগী
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-6xl">
            বাজারের সঠিক দাম,
            <span className="text-green-700">
              {" "}এখন হাতের মুঠোয়।
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-gray-600">
            চাল, ডাল, সবজি, মাছসহ নিত্যপ্রয়োজনীয় পণ্যের
            দৈনিক বাজারদর জানুন। বিভিন্ন বাজারের দাম
            তুলনা করুন এক জায়গায়।
          </p>

          <a
            href="#সব-পণ্য"
            className="mt-8 inline-block rounded-lg bg-green-700 px-7 py-3 font-semibold text-white shadow-lg transition hover:bg-green-800"
          >
            সব পণ্য দেখুন →
          </a>
        </div>

        <div className="relative flex min-h-72 items-center justify-center rounded-3xl bg-[#d8ead4] p-8">

          <div className="absolute right-8 top-8 h-20 w-20 rounded-full bg-green-200" />

          <div className="relative grid grid-cols-2 gap-5 text-center">

            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-3xl bg-white text-6xl shadow-md">
              🍚
              <span className="mt-2 text-sm font-semibold text-gray-700">
                চাল
              </span>
            </div>

            <div className="mt-8 flex h-32 w-32 flex-col items-center justify-center rounded-3xl bg-white text-6xl shadow-md">
              🥬
              <span className="mt-2 text-sm font-semibold text-gray-700">
                সবজি
              </span>
            </div>

            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-3xl bg-white text-6xl shadow-md">
              🐟
              <span className="mt-2 text-sm font-semibold text-gray-700">
                মাছ
              </span>
            </div>

            <div className="mt-8 flex h-32 w-32 flex-col items-center justify-center rounded-3xl bg-white text-6xl shadow-md">
              🥚
              <span className="mt-2 text-sm font-semibold text-gray-700">
                ডিম
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
