"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // সাইন ইন না থাকলে সাইন ইন পেজে পাঠিয়ে দেবে
  useEffect(() => {
    if (!isPending && !session) {
      toast.error("প্রোফাইল দেখতে আগে সাইন ইন করুন", { id: "login-required" });
      router.push("/signin");
    }
  }, [isPending, session, router]);

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  // ডাটা আসা পর্যন্ত স্কেলেটন
  if (isPending || !session) {
    return (
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="skeleton h-8 w-48 mb-2"></div>
        <div className="skeleton h-4 w-64 mb-6"></div>
        <div className="skeleton h-28 w-full rounded-2xl mb-4"></div>
        <div className="skeleton h-56 w-full rounded-2xl"></div>
      </div>
    );
  }

  const user = session.user;
  const firstLetter = user.name.charAt(0);

  let avatar;
  if (user.image) {
    avatar = (
      <img
        src={user.image}
        alt={user.name}
        referrerPolicy="no-referrer"
        className="w-16 h-16 rounded-xl object-cover shrink-0"
      />
    );
  } else {
    avatar = (
      <div className="w-16 h-16 rounded-xl bg-green-700 text-white flex items-center justify-center text-2xl font-semibold shrink-0">
        {firstLetter}
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="mb-5">
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-gray-500 mt-1">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* প্রোফাইল কার্ড */}
        <div className="bg-[#fafcfa] border border-[#e3ebe5] rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            {avatar}
            <div className="min-w-0">
              <p className="font-semibold text-lg truncate">{user.name}</p>
              <p className="text-sm text-gray-500 break-all">{user.email}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="btn btn-sm bg-white border-red-400 text-red-600 hover:bg-red-50"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            সাইন আউট
          </button>
        </div>

        {/* তথ্য কার্ড */}
        <div className="bg-[#fafcfa] border border-[#e3ebe5] rounded-2xl p-4 sm:p-6">
          <h2 className="font-semibold mb-4">তথ্য</h2>

          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm text-gray-500">নাম</p>
              <p className="font-medium">{user.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">ইমেইল</p>
              <p className="font-medium break-all">{user.email}</p>
            </div>

            <Link
              href="/profile/update"
              className="btn bg-green-700 hover:bg-green-800 text-white border-none shadow-md"
            >
              আপডেট
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}