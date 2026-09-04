"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";

const menuItems = [
  { title: "خانه", href: "/" },
  { title: "درباره من", href: "/#about" },
  { title: "خدمات", href: "/#services" },
  { title: "رتبه‌ها", href: "/#results" },
  { title: "آزمون‌ها", href: "/assessments" },
  { title: "اخبار", href: "/news" },
  { title: "تماس", href: "/#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header dir="rtl" className="site-header sticky top-0 z-50 border-b shadow-lg">
      <div className="mx-auto flex min-h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Link href="/" onClick={() => setIsOpen(false)} className="flex min-w-0 items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-amber-400/50 bg-[#111d36] sm:h-14 sm:w-14">
            <Image
              src="/images/logo.png"
              alt="لوگوی مهیار بیرون‌خو"
              fill
              sizes="56px"
              className="object-cover"
              priority
            />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-black text-white sm:text-base">
              مهیار بیرون‌خو
            </div>
            <div className="mt-0.5 text-[11px] font-bold text-amber-400 sm:text-xs">
              مشاور تحصیلی و کنکور
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          <nav className="flex items-center gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-lg px-3 py-2 text-[13px] font-bold text-slate-200 transition hover:bg-white/5 hover:text-amber-400"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <a
            href="/#reservation"
            className="site-gold-button mr-2 flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black shadow-md shadow-amber-500/15 transition"
          >
            <Phone size={16} />
            رزرو مشاوره
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl border border-white/15 p-2.5 text-white transition hover:border-amber-400 hover:text-amber-400 xl:hidden"
          aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="site-mobile-menu border-t px-5 py-4 xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3 text-right text-sm font-bold text-slate-100 transition hover:bg-amber-500/10 hover:text-amber-400"
              >
                {item.title}
              </Link>
            ))}
            <a
              href="/#reservation"
              onClick={() => setIsOpen(false)}
              className="site-gold-button mt-2 flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-black transition"
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
