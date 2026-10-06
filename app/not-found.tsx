import type { Metadata } from "next";
import Link from "next/link";
import { Home, Phone, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "صفحه پیدا نشد",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main
      dir="rtl"
      className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-5 py-20"
    >
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto text-8xl font-black text-amber-500/90">۴۰۴</div>

        <h1 className="mt-6 text-2xl font-black text-slate-900 md:text-3xl">
          این صفحه پیدا نشد
        </h1>

        <p className="mx-auto mt-4 max-w-md leading-8 text-slate-600">
          ممکن است آدرس اشتباه وارد شده باشد یا این صفحه جابه‌جا شده باشد.
          می‌توانید از لینک‌های زیر به مسیر درست بازگردید.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-amber-500/20 transition hover:-translate-y-0.5 hover:bg-amber-600"
          >
            <Home size={18} />
            بازگشت به خانه
          </Link>

          <Link
            href="/exam-archive"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-700 transition hover:border-amber-300"
          >
            <Search size={18} />
            آرشیو سوالات کنکور
          </Link>

          <a
            href="/#reservation"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-700 transition hover:border-amber-300"
          >
            <Phone size={18} />
            رزرو مشاوره
          </a>
        </div>
      </div>
    </main>
  );
}
