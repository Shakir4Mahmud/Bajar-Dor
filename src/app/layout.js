import { Suspense } from "react";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import NavbarLoader from "@/components/NavbarLoader";
import PriceTicker from "@/components/PriceTicker";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-theme="light">
      <body className={hindSiliguri.className + " bg-[#eef4ef] min-h-screen"}>
        <Toaster />

        <Suspense
          fallback={<div className="skeleton h-24 w-full rounded-none"></div>}
        >
          <NavbarLoader />
        </Suspense>

        <Suspense
          fallback={<div className="skeleton h-10 w-full rounded-none"></div>}
        >
          <PriceTicker />
        </Suspense>

        {children}
      </body>
    </html>
  );
}
