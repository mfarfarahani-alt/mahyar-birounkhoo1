"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Newspaper, CalendarDays } from "lucide-react";

type NewsItem = {
  id: string;
  rowNumber?: number;
  title: string;
  summary?: string;
  content?: string;
  source?: string;
  category?: string;
  date?: string;
  slug?: string;
  image?: string;
  sourceUrl?: string;
  status?: string;
};

function formatDate(value?: string) {
  if (!value) return "";

  const normalized = value.replace(/\//g, "-");
  const date = new Date(normalized);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function getNewsHref(item: NewsItem) {
  const value =
    item.slug && item.slug.trim()
      ? item.slug.trim()
      : item.id;

  return "/news/" + encodeURIComponent(value);
}

async function fetchNews(): Promise<NewsItem[]> {
  try {
    const response = await fetch("/api/news", {
      method: "GET",
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      console.error("News API error:", response.status);
      return [];
    }

    const data = await response.json();

    if (data?.success === false) {
      console.error("News API message:", data?.message);
      return [];
    }

    const items = Array.isArray(data?.news) ? data.news : [];

    return items
      .filter(
        (item: any) =>
          String(item?.status || "")
            .trim()
            .toLowerCase() === "approved"
      )
      .map(
        (item: any): NewsItem => ({
          id: String(item?.id || item?.rowNumber || ""),
          rowNumber: item?.rowNumber
            ? Number(item.rowNumber)
            : undefined,
          title: String(item?.title || "").trim(),
          summary: String(item?.summary || "").trim(),
          content: String(item?.content || "").trim(),
          source: String(item?.source || "").trim(),
          category: String(item?.category || "").trim(),
          date: String(item?.date || "").trim(),
          slug: String(item?.slug || "").trim(),
          image: String(item?.image || "").trim(),
          sourceUrl: String(item?.sourceUrl || "").trim(),
          status: String(item?.status || "").trim(),
        })
      )
      .filter((item: NewsItem) => item.title)
      .slice(0, 6);
  } catch (error) {
    console.error("HomeNews fetch error:", error);
    return [];
  }
}

export default function HomeNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const items = await fetchNews();
      if (mounted) {
        setNews(items);
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      id="news"
      dir="rtl"
      className="bg-gradient-to-b from-slate-50 via-white to-slate-50 px-5 py-20 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="text-right">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700">
              <Newspaper size={16} />
              اخبار و اطلاعیه‌ها
            </span>

            <h2 className="mt-5 text-3xl font-black leading-[1.5] text-slate-900 md:text-4xl">
              اخبار کنکور و{" "}
              <span className="text-amber-600">آموزش و پرورش</span>
            </h2>

            <p className="mt-4 max-w-2xl leading-8 text-slate-600">
              آخرین اخبار، اطلاعیه‌های سازمان سنجش، تغییرات کنکور و
              رویدادهای مهم آموزشی را از منابع معتبر دنبال کنید.
            </p>
          </div>

          <Link
            href="/news"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-l from-slate-900 to-slate-800 px-5 py-3 font-bold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:from-amber-500 hover:to-amber-600 hover:shadow-amber-500/20"
          >
            مشاهده همه اخبار
            <ArrowLeft size={18} />
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-md"
              >
                <div className="aspect-[16/10] animate-pulse bg-slate-200" />
                <div className="space-y-4 p-6">
                  <div className="h-4 w-24 animate-pulse rounded-lg bg-slate-200" />
                  <div className="h-6 w-4/5 animate-pulse rounded-lg bg-slate-200" />
                  <div className="h-4 w-full animate-pulse rounded-lg bg-slate-100" />
                  <div className="h-4 w-3/4 animate-pulse rounded-lg bg-slate-100" />
                  <div className="mt-4 h-10 w-28 animate-pulse rounded-xl bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* News Grid */}
        {!loading && news.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-md shadow-slate-200/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-200/60 hover:shadow-xl hover:shadow-amber-500/10"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 text-5xl text-white/80">
                      📰
                    </div>
                  )}

                  {item.category && (
                    <span className="absolute right-3 top-3 rounded-lg bg-white/95 px-3 py-1 text-xs font-bold text-amber-700 shadow-sm backdrop-blur-sm">
                      {item.category}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6 text-right">
                  <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-400">
                    <CalendarDays size={14} />
                    {formatDate(item.date) || "بدون تاریخ"}
                  </div>

                  <h3 className="line-clamp-2 text-lg font-black leading-8 text-slate-900 transition group-hover:text-amber-700">
                    {item.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-slate-600">
                    {item.summary ||
                      item.content ||
                      "برای مطالعه جزئیات بیشتر روی ادامه خبر کلیک کنید."}
                  </p>

                  {item.source && (
                    <div className="mt-3 text-xs text-slate-400">
                      منبع: {item.source}
                    </div>
                  )}

                  <div className="mt-5">
                    <Link
                      href={getNewsHref(item)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-amber-500"
                    >
                      ادامه خبر
                      <ArrowLeft size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && news.length === 0 && (
          <div className="mt-12 rounded-3xl border border-slate-200/80 bg-white px-6 py-16 text-center shadow-md">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-50 text-4xl">
              📰
            </div>

            <h3 className="mt-6 text-2xl font-black text-slate-900">
              فعلاً خبری برای نمایش وجود ندارد
            </h3>

            <p className="mx-auto mt-3 max-w-xl leading-8 text-slate-500">
              اخبار مربوط به کنکور، سازمان سنجش و آموزش و پرورش پس از
              ثبت و تأیید در این بخش نمایش داده می‌شوند.
            </p>

            <Link
              href="/news"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-amber-500 to-amber-600 px-6 py-3 font-bold text-white shadow-lg shadow-amber-500/25 transition hover:from-amber-600 hover:to-amber-700"
            >
              صفحه اخبار
              <ArrowLeft size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
