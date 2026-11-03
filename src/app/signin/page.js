

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function SigninContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackURL = searchParams.get("callbackURL") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Sign in করা যায়নি");
        return;
      }

      toast.success("সফলভাবে Sign In হয়েছে!");
      router.push(callbackURL);
      router.refresh();
    } catch (error) {
      toast.error(error.message || "কিছু একটা সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    setGoogleLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL,
      });
    } catch (error) {
      toast.error(error.message || "Google Sign In করা যায়নি");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-green-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <Link href="/" className="text-sm text-green-700 hover:underline">
          ← হোম পেজ
        </Link>

        <div className="mt-6 text-center">
          <div className="text-5xl">🛒</div>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Welcome Back!
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            তোমার account-এ Sign In করো
          </p>
        </div>

        <form onSubmit={handleSignin} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="তোমার password"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full rounded-xl bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800 disabled:opacity-60"
          >
            {loading ? "Sign In হচ্ছে..." : "Sign In"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-400">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignin}
          disabled={loading || googleLoading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
        >
          <span className="text-xl font-bold text-blue-600">G</span>
          {googleLoading ? "Google-এ যাচ্ছি..." : "Continue with Google"}
        </button>

        <button
  type="button"
  onClick={async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: callbackURL,
    });
  }}
  className="mt-3 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
>
  <span className="text-xl">⌘</span>
  Continue with GitHub
</button>

        <p className="mt-6 text-center text-sm text-gray-600">
          নতুন account প্রয়োজন?{" "}
          <Link href="/signup" className="font-semibold text-green-700">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function SigninPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <SigninContent />
    </Suspense>
  );
}
