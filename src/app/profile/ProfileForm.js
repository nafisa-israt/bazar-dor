
"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfileForm({ user }) {
  const [name, setName] = useState(user.name || "");
  const [loading, setLoading] = useState(false);

const handleUpdate = async (e) => {
  e.preventDefault();
  console.log("Update button clicked!");

    if (!name.trim()) {
      toast.error("নাম লিখতে হবে");
      return;
    }

    setLoading(true);

    try {
const result = await authClient.updateUser({
  name: name.trim(),
});

console.log("Updated user data:", result.data);

if (result.error) {
  toast.error(result.error.message || "Profile update failed");
  return;
}

toast.success("Profile সফলভাবে update হয়েছে!");

      if (error) {
        toast.error(error.message || "Profile update করা যায়নি");
        return;
      }

      toast.success("Profile সফলভাবে update হয়েছে!");
    } catch (error) {
      toast.error(error.message || "কিছু একটা সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-green-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <Link href="/" className="text-sm text-green-700 hover:underline">
          ← হোম পেজ
        </Link>

        <div className="mt-6 text-center">
          <div className="text-6xl">👤</div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            তোমার account information
          </p>
        </div>

        <form onSubmit={handleUpdate} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              তোমার নাম
            </label>

            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={user.email}
              disabled
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800 disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </main>
  );
}
