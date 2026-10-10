import Image from "next/image";
import Link from "next/link";
import heroImage from "@/img/bazar-hero.png";
import TodayDate from "@/components/TodayDate";
export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-5 pb-6">
      <div className="bg-[#f9fcfa] border border-[#dfe8e1] rounded-[22px] px-5 py-6 sm:px-8 sm:py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-6 sm:gap-8">
        <div className="w-full sm:flex-1">
          <p className="inline-block bg-[#e0f3e7] text-[#07833e] text-xs font-medium px-3 py-1 rounded-full mb-3">
            <TodayDate />
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#202b23] leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-sm text-gray-500 leading-relaxed mt-4 max-w-xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, ঊর্ধ্ব-সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="/#সব-পণ্য"
            className="inline-flex items-center justify-center mt-6
            bg-green-700 hover:bg-green-800 text-white text-sm font-semibold
            px-5 py-2.5 rounded-lg shadow-md transition-colors"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        <div className="w-full sm:w-[230px] md:w-[260px] flex justify-center shrink-0">
          <Image
            src={heroImage}
            alt="বাজারের তাজা পণ্য"
            width={260}
            height={200}
            priority
            className="w-[190px] sm:w-[220px] md:w-[250px] h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
