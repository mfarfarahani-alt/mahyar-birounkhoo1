import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="shadow-md bg-white">
      <div className="max-w-7xl mx-auto h-20 px-4 flex items-center justify-between">

        <div className="text-2xl font-bold text-blue-900">
          مهیار بیرون‌خو
        </div>

        <ul className="hidden md:flex gap-8 font-medium">

          <li><Link href="/">خانه</Link></li>

          <li><Link href="/about">درباره ما</Link></li>

          <li><Link href="/services">خدمات</Link></li>

          <li><Link href="/students">رتبه‌های برتر</Link></li>

          <li><Link href="/blog">وبلاگ</Link></li>

          <li><Link href="/contact">تماس</Link></li>

        </ul>

        <button className="bg-[var(--gold)] text-white px-5 py-2 rounded-xl">
          رزرو مشاوره
        </button>

      </div>
    </nav>
  );
}