"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

// নাম আপডেটের ফর্ম
function UpdateForm({ user }) {
  const router = useRouter();
  const [newName, setNewName] = useState(user.name);
  const [loading, setLoading] = useState(false);

  async function handleUpdate(event) {
    event.preventDefault();

    const trimmedName = newName.trim();

    if (trimmedName === "") {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }
    if (trimmedName === user.name) {
      toast.error("নতুন কোনো নাম দেওয়া হয়নি");
      return;
    }

    setLoading(true);
    const { error } = await authClient.updateUser({
      name: trimmedName,
    });
    setLoading(false);

    if (error) {
      toast.error("তথ্য আপডেট করা যায়নি, আবার চেষ্টা করুন");
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <div className="bg-[#fafcfa] border border-[#e3ebe5] rounded-2xl p-4 sm:p-6">
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <div>
          <label className="text-sm block mb-1">নাম</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="আপনার নাম লিখুন"
            className="input input-bordered w-full bg-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn bg-green-700 hover:bg-green-800 text-white border-none shadow-md"
        >
          {loading ? "অপেক্ষা করুন..." : "তথ্য আপডেট করুন"}
        </button>
      </form>
    </div>
  );
}

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // সাইন ইন না থাকলে সাইন ইন পেজে পাঠিয়ে দেবে
  useEffect(() => {
    if (!isPending && !session) {
      toast.error("তথ্য আপডেট করতে আগে সাইন ইন করুন", { id: "login-required" });
      router.push("/signin");
    }
  }, [isPending, session, router]);

  // ডাটা আসা পর্যন্ত স্কেলেটন
  if (isPending || !session) {
    return (
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="skeleton h-8 w-56 mb-2"></div>
        <div className="skeleton h-4 w-64 mb-6"></div>
        <div className="skeleton h-44 w-full rounded-2xl"></div>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="mb-5">
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <p className="text-sm text-gray-500 mt-1">
          নিচের ঘরে আপনার নতুন নাম লিখুন।
        </p>
      </div>

      <UpdateForm user={user} />

      <p className="text-center mt-5">
        <Link href="/profile" className="text-xs text-gray-500 hover:underline">
          ← প্রোফাইলে ফিরে যান
        </Link>
      </p>
    </div>
  );
}