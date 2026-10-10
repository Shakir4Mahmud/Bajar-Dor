export default function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-200 bg-[#f7faf7]">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-gray-600">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="text-sm text-gray-600 md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}