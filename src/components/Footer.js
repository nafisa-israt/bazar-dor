
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 py-10 md:flex-row">

        <div>
          <Link href="/" className="text-2xl font-bold">
            🛒 বাজার দর
          </Link>

          <p className="mt-3 text-sm text-green-200">
            প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>

        <p className="max-w-md text-sm leading-7 text-green-200 md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে
          পরিবর্তিত হতে পারে।
        </p>

      </div>

      <div className="border-t border-green-800 py-4 text-center text-xs text-green-300">
        © {new Date().getFullYear()} Bazar Dor. All rights reserved.
      </div>
    </footer>
  );
}
