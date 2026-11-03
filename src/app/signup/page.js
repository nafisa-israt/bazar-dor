

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("Password কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Account তৈরি করা যায়নি");
        return;
      }

      toast.success("Account সফলভাবে তৈরি হয়েছে!");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "কিছু একটা সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (provider) => {
    setSocialLoading(provider);

    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch (error) {
      toast.error(error.message || "Sign Up করা যায়নি");
      setSocialLoading("");
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
            Account তৈরি করো
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            বাজার দর-এর সঙ্গে যুক্ত হও
          </p>
        </div>

        <form onSubmit={handleSignup} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              তোমার নাম
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="তোমার নাম লিখো"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

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
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !!socialLoading}
            className="w-full rounded-xl bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800 disabled:opacity-60"
          >
            {loading ? "Account তৈরি হচ্ছে..." : "Sign Up"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-400">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="space-y-3">
          <button
            type="button"
            disabled={loading || !!socialLoading}
            onClick={() => handleSocialSignup("google")}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
          >
            <span className="text-xl font-bold text-blue-600">G</span>
            {socialLoading === "google"
              ? "Google-এ যাচ্ছি..."
              : "Continue with Google"}
          </button>

          <button
            type="button"
            disabled={loading || !!socialLoading}
            onClick={() => handleSocialSignup("github")}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
          >
            <span className="text-xl">⌘</span>
            {socialLoading === "github"
              ? "GitHub-এ যাচ্ছি..."
              : "Continue with GitHub"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          আগে থেকেই account আছে?{" "}
          <Link href="/signin" className="font-semibold text-green-700">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
