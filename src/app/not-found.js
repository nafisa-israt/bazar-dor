import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-green-50 px-4 text-center">
      <div className="mb-4 text-7xl">🔍</div>

      <h1 className="text-6xl font-extrabold text-green-800">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-bold text-gray-800">
        পেজটি খুঁজে পাওয়া যায়নি!
      </h2>

      <p className="mt-3 max-w-md text-gray-600">
        দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
        হয়তো পেজটি সরানো হয়েছে অথবা URL ভুল।
      </p>

      <Link
        href="/"
        className="mt-8 rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
      >
        🏠 হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}