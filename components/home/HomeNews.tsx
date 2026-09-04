"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NewsItem = {
  id: string;
  title: string;
  category?: string;
  source?: string;
  sourceUrl?: string;
  status?: string;
};

const ALLOWED_KEYWORDS = [
  "کنکور", "آزمون سراسری", "سازمان سنجش", "انتخاب رشته", "ثبت نام کنکور",
  "امتحان", "امتحانات", "امتحانات نهایی", "آموزش و پرورش",
  "دانشگاه فرهنگیان", "فرهنگیان", "تربیت معلم"
];

function isAllowedNews(item: NewsItem) {
  const text = `${item.title || ""} ${item.category || ""} ${item.source || ""}`.toLowerCase();
  return ALLOWED_KEYWORDS.some((keyword) => text.includes(keyword.toLowerCase()));
}

async function getNews(): Promise<NewsItem[]> {
  try {
    const response = await fetch("/api/news", { cache: "no-store" });
    if (!response.ok) return [];
    const data = await response.json();
    const items = Array.isArray(data?.news) ? data.news : [];

    return items
      .map((item: any) => ({
        id: String(item?.id || item?.rowNumber || ""),
        title: String(item?.title || "").trim(),
        category: String(item?.category || "").trim(),
        source: String(item?.source || "").trim(),
        sourceUrl: String(item?.sourceUrl || "").trim(),
        status: String(item?.status || "").trim(),
      }))
      .filter((item: NewsItem) =>
        Boolean(item.id && item.title && item.sourceUrl) &&
        (item.status || "").toLowerCase() === "approved" &&
        isAllowedNews(item)
      );
  } catch (error) {
    console.error("HomeNews loading error:", error);
    return [];
  }
}

export default function HomeNews() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    getNews().then((items) => setNews(items.slice(0, 12)));
  }, []);

  return (
    <section id="news" dir="rtl" className="bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 bg-[#0B1F3A] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#D4A72C]" />
            <h2 className="text-lg font-black text-white sm:text-xl">آخرین اخبار</h2>
            <span className="text-sm text-slate-300">کنکور، امتحانات و دانشگاه فرهنگیان</span>
          </div>
          <Link href="/news" className="text-sm font-bold text-[#D4A72C] transition hover:text-white">
            مشاهده همه اخبار ←
          </Link>
        </div>

        {news.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {news.map((item) => (
              <a
                key={item.id}
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-4 py-3 transition hover:bg-slate-50 sm:px-5"
              >
                <span className="shrink-0 text-[#D4A72C]">●</span>
                <span className="min-w-0 flex-1 truncate text-sm font-bold text-[#0B1F3A] transition group-hover:text-[#D4A72C] sm:text-[15px]">
                  {item.title}
                </span>
                <span className="hidden shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 sm:inline-block">
                  {item.source || item.category || "منبع خبر"}
                </span>
                <span className="shrink-0 text-slate-300 transition group-hover:-translate-x-1 group-hover:text-[#D4A72C]">←</span>
              </a>
            ))}
          </div>
        ) : (
          <div className="px-5 py-8 text-center text-sm font-medium text-slate-500">
            فعلاً خبر مرتبطی برای نمایش وجود ندارد.
          </div>
        )}
      </div>
    </section>
  );
}