"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown, Percent, Timer, BookOpen } from "lucide-react";
import { useState } from "react";

const menuItems = [
  { title: "خانه", href: "/" },
  { title: "درباره من", href: "/#about" },
  { title: "برنامه‌ریزی", href: "/planning" },
  { title: "انتخاب رشته", href: "/major-selection" },
  { title: "آزمون‌ها", href: "/assessments" },
  { title: "اخبار", href: "/news" },
  { title: "تماس", href: "/#contact" },
];

const konkurTools = [
  {
    title: "محاسبه درصد",
    href: "/percentage",
    icon: Percent,
    description: "محاسبه درصد آزمون با یا بدون نمره منفی",
  },
  {
    title: "روزشمار کنکور",
    href: "/#konkur-countdown",
    icon: Timer,
    description: "شمارش معکوس تا آزمون‌های کنکور ۱۴۰۶",
  },
  {
    title: "آرشیو سوالات کنکور",
    href: "/exam-archive",
    icon: BookOpen,
    description: "دفترچه سوالات و پاسخنامه سال‌های اخیر، آماده دانلود",
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

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
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="truncate text-sm font-black text-white sm:text-base">
                مهیار بیرون‌خو
              </span>
              <span
                dir="ltr"
                style={{ fontFamily: "'Brush Script MT', 'Segoe Script', cursive" }}
                className="truncate text-sm italic tracking-wide text-amber-400/90 sm:text-base"
              >
                Mahyar Bironkhu
              </span>
            </div>
            <div className="mt-0.5 text-[11px] font-bold text-amber-400 sm:text-xs">
              مشاور تحصیلی و کنکور
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          <nav className="flex items-center gap-1">
            {menuItems.slice(0, 4).map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-lg px-3 py-2 text-[13px] font-bold text-slate-200 transition hover:bg-white/5 hover:text-amber-400"
              >
                {item.title}
              </Link>
            ))}

            {/* منوی کشویی ابزار کنکور */}
            <div
              className="relative"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button
                type="button"
                onClick={() => setToolsOpen((prev) => !prev)}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-bold text-slate-200 transition hover:bg-white/5 hover:text-amber-400"
                aria-expanded={toolsOpen}
              >
                ابزار کنکور
                <ChevronDown
                  size={14}
                  className={`transition-transform ${toolsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {toolsOpen && (
                <div className="absolute right-0 top-full z-50 w-72 rounded-2xl border border-white/10 bg-[#0e1b33] p-2 shadow-2xl">
                  {konkurTools.map((tool) => {
                    const Icon = tool.icon;

                    return (
                      <Link
                        key={tool.title}
                        href={tool.href}
                        onClick={() => setToolsOpen(false)}
                        className="flex items-start gap-3 rounded-xl px-3 py-3 transition hover:bg-white/5"
                      >
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 text-amber-400">
                          <Icon size={17} />
                        </div>

                        <div>
                          <div className="text-[13px] font-bold text-white">
                            {tool.title}
                          </div>
                          <div className="mt-0.5 text-[11px] leading-5 text-slate-400">
                            {tool.description}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {menuItems.slice(4).map((item) => (
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
            {menuItems.slice(0, 4).map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3 text-right text-sm font-bold text-slate-100 transition hover:bg-amber-500/10 hover:text-amber-400"
              >
                {item.title}
              </Link>
            ))}

            {/* منوی ابزار کنکور - موبایل */}
            <button
              type="button"
              onClick={() => setMobileToolsOpen((prev) => !prev)}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-right text-sm font-bold text-slate-100 transition hover:bg-amber-500/10 hover:text-amber-400"
              aria-expanded={mobileToolsOpen}
            >
              ابزار کنکور
              <ChevronDown
                size={16}
                className={`transition-transform ${mobileToolsOpen ? "rotate-180" : ""}`}
              />
            </button>

            {mobileToolsOpen && (
              <div className="mb-1 mr-2 flex flex-col gap-1 border-r border-amber-400/20 pr-3">
                {konkurTools.map((tool) => {
                  const Icon = tool.icon;

                  return (
                    <Link
                      key={tool.title}
                      href={tool.href}
                      onClick={() => {
                        setIsOpen(false);
                        setMobileToolsOpen(false);
                      }}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[13px] font-bold text-slate-300 transition hover:bg-amber-500/10 hover:text-amber-400"
                    >
                      <Icon size={15} />
                      {tool.title}
                    </Link>
                  );
                })}
              </div>
            )}

            {menuItems.slice(4).map((item) => (
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
