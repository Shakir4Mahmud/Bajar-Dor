"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import logo from "@/img/logo-icon.png";
import { getBanglaDate } from "@/lib/helpers";
import { authClient } from "@/lib/auth-client";

export default function Navbar({ categories }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  let user = null;
  if (session) {
    user = session.user;
  }

  function isActive(slug) {
    const categoryPath = "/category/" + slug;
    if (pathname === categoryPath) {
      return true;
    }
    return false;
  }

  function closeDropdown() {
    const activeElement = document.activeElement;
    if (activeElement) {
      activeElement.blur();
    }
  }

  async function handleSignOut() {
    closeDropdown();
    await authClient.signOut();
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  let authSection;

  if (isPending) {
    authSection = <div className="skeleton h-9 w-32 rounded-lg"></div>;
  } else if (user) {
    const firstLetter = user.name.charAt(0);

    let avatar;
    if (user.image) {
      avatar = (
        <img
          src={user.image}
          alt={user.name}
          referrerPolicy="no-referrer"
          className="w-9 h-9 rounded-full object-cover"
        />
      );
    } else {
      avatar = (
        <div className="w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center font-semibold">
          {firstLetter}
        </div>
      );
    }

    authSection = (
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="flex items-center gap-2 cursor-pointer"
        >
          {avatar}
          <span className="hidden sm:inline text-sm font-medium">
            {user.name}
          </span>
          <span className="text-[10px] text-gray-500">▼</span>
        </div>

        <div
          tabIndex={0}
          className="dropdown-content bg-white rounded-2xl shadow-xl border border-gray-100 w-56 p-4 mt-3 z-50"
        >
          <div className="pb-3 border-b border-gray-100">
            <p className="font-semibold text-sm">{user.name}</p>
            <p className="text-xs text-gray-500 break-all">{user.email}</p>
          </div>

          <div className="pt-2 flex flex-col gap-1">
            <Link
              href="/profile"
              onClick={closeDropdown}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm hover:bg-gray-50"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              আমার প্রোফাইল
            </Link>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 text-left"
            >
              <svg
                width="16"
                height="16"
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
        </div>
      </div>
    );
  } else {
    authSection = (
      <div className="flex items-center gap-1 sm:gap-2">
        <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
          সাইন ইন
        </Link>
        <Link
          href="/signup"
          className="btn btn-sm sm:btn-md bg-green-700 hover:bg-green-800 text-white border-none shadow-md"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">

        <div className="flex items-center justify-between gap-2 py-3">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <Image
              src={logo}
              alt="বাজার দর"
              width={40}
              height={40}
              className="rounded-xl shrink-0 bg-green-700 p-1"
            />
            <div className="min-w-0">
              <p className="font-bold text-base sm:text-lg leading-tight">
                বাজার দর
              </p>
              <p
                className="text-[11px] sm:text-xs text-gray-500 truncate"
                suppressHydrationWarning
              >
                {getBanglaDate()}
              </p>
            </div>
          </Link>

          {authSection}
        </div>

        <nav className="flex flex-wrap items-center justify-start gap-1 pb-3">
          {categories.map((category) => {
            const active = isActive(category.slug);

            let linkClass =
              "flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm whitespace-nowrap border border-transparent hover:bg-green-50";
            if (active) {
              linkClass =
                "flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm whitespace-nowrap border border-green-300 bg-green-100 text-green-800 font-semibold";
            }

            return (
              <Link
                key={category.id}
                href={"/category/" + category.slug}
                className={linkClass}
              >
                <span>{category.icon}</span>
                <span>{category.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}