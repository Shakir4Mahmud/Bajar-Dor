import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold">৪০৪</h1>
      <p className="text-lg">দুঃখিত, এই পাতাটি খুঁজে পাওয়া যায়নি।</p>
      <Link href="/" className="btn btn-primary">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}