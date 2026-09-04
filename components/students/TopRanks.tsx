"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Trophy, ArrowLeft, X, Shield } from "lucide-react";

export type RankItem = {
  file: string;
  field: string;
  year: string;
  note: string;
};

const ranks: RankItem[] = [
  { file: "rank_01.jpg", field: "علوم تجربی", year: "۱۴۰۴", note: "کارنامه نهایی فرهنگیان" },
  { file: "rank_02.jpg", field: "زبان‌های خارجی", year: "۱۴۰۴", note: "کارنامه نهایی فرهنگیان" },
  { file: "rank_03.jpg", field: "علوم انسانی", year: "۱۴۰۴", note: "کارنامه نهایی فرهنگیان" },
  { file: "rank_04.jpg", field: "علوم انسانی", year: "۱۴۰۴", note: "کارنامه نهایی فرهنگیان" },
  { file: "rank_05.jpg", field: "علوم انسانی", year: "۱۴۰۴", note: "کارنامه نهایی فرهنگیان" },
  { file: "rank_06.jpg", field: "علوم تجربی", year: "۱۴۰۴", note: "کارنامه نهایی فرهنگیان" },
  { file: "rank_07.jpg", field: "علوم تجربی", year: "۱۴۰۴", note: "کارنامه نهایی فرهنگیان" },
  { file: "rank_08.jpg", field: "علوم انسانی", year: "۱۴۰۴", note: "کارنامه نهایی فرهنگیان" },
];

type Props = {
  /** تعداد کارت‌های نمایشی در صفحه اصلی؛ اگر ندهید همه نمایش داده می‌شوند */
  limit?: number;
  showMoreLink?: boolean;
};

export default function TopRanks({ limit, showMoreLink = false }: Props) {
  const items = typeof limit === "number" ? ranks.slice(0, limit) : ranks;
  const [active, setActive] = useState<RankItem | null>(null);

  return (
    <section id="results" dir="rtl" className="site-section-light px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-kicker inline-flex items-center gap-2">
            <Trophy size={16} />
            افتخارات مشاوره‌ای
          </span>
          <h2 className="mt-5 text-3xl font-black text-[#0b1f3a] md:text-4xl">
            رتبه‌های برتر
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            نمونه‌ای از نتایج پذیرفته‌شدگان آزمون اختصاصی فرهنگیان که با برنامه‌ریزی و مشاوره مسیر موفقیت را طی کرده‌اند.
          </p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500">
            <Shield size={14} className="text-[#c99a2e]" />
            مشخصات شخصی دانش‌آموزان به‌منظور حفظ حریم خصوصی مخفی شده است.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <button
              key={item.file}
              type="button"
              onClick={() => setActive(item)}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-2.5 text-right shadow-lg transition duration-300 hover:-translate-y-1 hover:border-amber-400/60 hover:shadow-xl"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-50">
                <Image
                  src={`/images/ranks/${item.file}`}
                  alt={`${item.note} - ${item.field}`}
                  fill
                  sizes="(max-width: 639px) 92vw, (max-width: 1023px) 45vw, 30vw"
                  className="object-contain object-top p-1 transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="px-2 py-3">
                <div className="text-sm font-black text-[#0b1f3a]">{item.note}</div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-600">
                  <span className="rounded-lg bg-amber-50 px-2 py-1 text-amber-800">{item.field}</span>
                  <span className="rounded-lg bg-slate-100 px-2 py-1">{item.year}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {showMoreLink && ranks.length > (limit || 0) && (
          <div className="mt-10 flex justify-center">
            <Link
              href="/students"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0b1f3a] px-7 py-4 font-black text-white shadow-lg transition hover:bg-[#15365d]"
            >
              مشاهده همه رتبه‌ها
              <ArrowLeft size={18} />
            </Link>
          </div>
        )}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-h-[92vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute left-3 top-3 z-10 rounded-full bg-[#0b1f3a] p-2 text-white"
              aria-label="بستن"
            >
              <X size={18} />
            </button>
            <div className="relative mx-auto min-h-[50vh] w-full">
              <Image
                src={`/images/ranks/${active.file}`}
                alt={`${active.note} - ${active.field}`}
                width={900}
                height={1200}
                className="h-auto w-full rounded-xl object-contain"
              />
            </div>
            <div className="mt-3 px-2 pb-2 text-center">
              <div className="font-black text-[#0b1f3a]">{active.note}</div>
              <div className="mt-1 text-sm font-bold text-slate-600">
                {active.field} · {active.year}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
