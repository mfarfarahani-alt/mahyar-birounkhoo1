"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";

const menuItems = [
  { title: "خانه", href: "/" },
  { title: "درباره من", href: "/#about" },
  { title: "خدمات مشاوره", href: "/#services" },
  { title: "آزمون‌های خودشناسی", href: "/assessments" },
  { title: "درصدگیر آزمون", href: "/percentage" },
  { title: "رتبه‌های برتر", href: "/#results" },
  { title: "اخبار", href: "/news" },
  { title: "وبلاگ", href: "/#blog" },
  { title: "تماس با ما", href: "/#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] backdrop-blur-xl"
    >
      <div className="mx-auto flex min-h-[4.5rem] max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* لوگو و نام */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-amber-200/80 shadow-md shadow-amber-500/10 ring-2 ring-amber-50 transition group-hover:border-amber-300 sm:h-14 sm:w-14">
            <Image
              src="/images/logo.png"
              alt="لوگوی مهیار بیرون‌خو"
              fill
              sizes="56px"
              className="object-cover"
              priority
            />
          </div>

          <div>
            <div className="text-base font-black tracking-tight text-slate-900 sm:text-lg">
              مهیار بیرون‌خو
            </div>

            <div className="mt-0.5 text-xs font-semibold text-amber-600 sm:text-sm">
              مشاور تحصیلی و کنکور
            </div>
          </div>
        </Link>

        {/* منوی دسکتاپ */}
        <div className="hidden items-center gap-1 lg:flex">
          <nav className="flex items-center gap-1">
            {menuItems.map((item) => {
              const isHighlight =
                item.href === "/percentage" || item.href === "/news";

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`relative whitespace-nowrap rounded-lg px-3 py-2 text-sm font-bold transition-all duration-200 ${
                    isHighlight
                      ? "text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* رزرو مشاوره */}
          <a
            href="/#reservation"
            className="mr-3 flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-l from-amber-500 to-amber-600 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-amber-500/25 transition-all duration-300 hover:from-amber-600 hover:to-amber-700 hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5"
          >
            <Phone size={16} strokeWidth={2.5} />
            رزرو مشاوره
          </a>
        </div>

        {/* دکمه موبایل */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700 lg:hidden"
          aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* منوی موبایل */}
      {isOpen && (
        <div className="border-t border-slate-100 bg-white/95 px-5 py-5 shadow-inner backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1.5">
            {menuItems.map((item) => {
              const isHighlight =
                item.href === "/percentage" || item.href === "/news";

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-xl px-4 py-3 text-right text-sm font-bold transition ${
                    isHighlight
                      ? "bg-amber-50 text-amber-700"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}

            {/* رزرو مشاوره */}
            <a
              href="/#reservation"
              onClick={() => setIsOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-amber-500 to-amber-600 px-5 py-3.5 font-black text-white shadow-lg shadow-amber-500/25 transition hover:from-amber-600 hover:to-amber-700"
            >
              <Phone size={18} />
              رزرو مشاوره
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
