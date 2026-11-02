
"use client";

import { useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function Navbar({ categories = [] }) {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const today = useSyncExternalStore(
    () => () => {},
    () =>
      new Date().toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    () => ""
  );

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error("Sign out করা যায়নি!");
      return;
    }

    toast.success("সফলভাবে Sign out হয়েছে");
    router.refresh();
  };

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
            {!isPending && (
              <>
                {session?.user ? (
                  <>
          <Link
              href="/profile"
              className="text-sm font-semibold text-green-800 hover:text-green-600"
             >
             {session.user.name || session.user.email}
          </Link>

                    <button
                      onClick={handleSignOut}
                      className="rounded-lg border border-red-600 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      সাইন আউট
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </>
            )}
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
