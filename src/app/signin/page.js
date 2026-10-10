"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reason = params.get("reason");

    if (reason === "login-required") {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "login-required" });
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (email === "" || password === "") {
      toast.error("ইমেইল ও পাসওয়ার্ড দুটোই দিন");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({
      email: email,
      password: password,
    });
    setLoading(false);

    if (error) {
      toast.error("ইমেইল বা পাসওয়ার্ড ভুল হয়েছে");
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <div className="text-center mb-5">
        <h1 className="text-2xl font-bold">সাইন ইন</h1>
        <p className="text-xs text-gray-500 mt-1">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="bg-[#fafcfa] border border-[#e3ebe5] rounded-2xl p-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm block mb-1">ইমেইল</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input input-bordered w-full bg-white"
            />
          </div>

          <div>
            <label className="text-sm block mb-1">পাসওয়ার্ড</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="input input-bordered w-full bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn bg-green-700 hover:bg-green-800 text-white border-none"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>
        </form>

        <div className="divider text-xs text-gray-500 my-4">অথবা</div>

        <SocialButtons />

        <p className="text-sm text-center mt-4">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="text-green-700 font-medium">
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <p className="text-center mt-5">
        <Link href="/" className="text-xs text-gray-500 hover:underline">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}