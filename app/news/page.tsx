"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type NewsItem = {
  id: string;
  rowNumber?: number;
  title: string;
  summary: string;
  content?: string;
  source: string;
  category: string;
  sourceUrl?: string;
  status: string;
  image?: string;
  date: string;
  slug?: string;
};

const DEFAULT_CATEGORIES = [
  "همه اخبار",
  "کنکور",
  "سازمان سنجش",
  "آموزش و پرورش",
  "انتخاب رشته",
  "نتایج",
  "اطلاعیه",
  "برنامه مطالعاتی",
];

function formatDate(value: string) {
  if (!value) {
    return "";
  }

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

  return `/news/${encodeURIComponent(value)}`;
}

function normalizeSearchText(value: string) {
  return String(value || "")
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\u200c/g, "")
    .toLowerCase()
    .trim();
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);

  const [selectedCategory, setSelectedCategory] =
    useState("همه اخبار");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadNews() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/news", {
          method: "GET",
          cache: "no-store",
        });

        const text = await response.text();

        let data: any;

        try {
          data = JSON.parse(text);
        } catch {
          console.error("News API response:", text);

          throw new Error(
            "پاسخ دریافت‌شده از API معتبر نیست."
          );
        }

        if (!response.ok || data?.success === false) {
          throw new Error(
            data?.message ||
              "دریافت اخبار با خطا مواجه شد."
          );
        }

        const items = Array.isArray(data?.news)
          ? data.news
          : [];

        const approvedNews: NewsItem[] = items
          .filter(
            (item: any) =>
              String(item?.status || "")
                .trim()
                .toLowerCase() === "approved"
          )
          .map((item: any) => ({
            id: String(
              item?.id ||
                item?.rowNumber ||
                ""
            ),

            rowNumber: item?.rowNumber
              ? Number(item.rowNumber)
              : undefined,

            title: String(
              item?.title || ""
            ).trim(),

            summary: String(
              item?.summary || ""
            ).trim(),

            content: String(
              item?.content || ""
            ).trim(),

            source: String(
              item?.source || ""
            ).trim(),

            category: String(
              item?.category || ""
            ).trim(),

            sourceUrl: String(
              item?.sourceUrl || ""
            ).trim(),

            status: String(
              item?.status || ""
            )
              .trim()
              .toLowerCase(),

            image: String(
              item?.image || ""
            ).trim(),

            date: String(
              item?.date || ""
            ).trim(),

            slug: String(
              item?.slug || ""
            ).trim(),
          }))
          .filter(
            (item: NewsItem) =>
              item.id &&
              item.title
          );

        if (mounted) {
          setNews(approvedNews);
        }
      } catch (err) {
        console.error(
          "News loading error:",
          err
        );

        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "دریافت اخبار با مشکل مواجه شد."
          );

          setNews([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadNews();

    return () => {
      mounted = false;
    };
  }, []);

  // ==========================================================
  // دسته‌بندی‌ها
  // ==========================================================

  const categories = useMemo(() => {
    const dynamicCategories = news
      .map((item) => item.category.trim())
      .filter(Boolean);

    return Array.from(
      new Set([
        ...DEFAULT_CATEGORIES,
        ...dynamicCategories,
      ])
    );
  }, [news]);

  // ==========================================================
  // فیلتر اخبار
  // ==========================================================

  const filteredNews = useMemo(() => {
    const normalizedSearch =
      normalizeSearchText(search);

    return news.filter((item) => {
      // ------------------------------
      // فیلتر دسته‌بندی
      // ------------------------------

      const categoryMatch =
        selectedCategory === "همه اخبار" ||
        normalizeSearchText(
          item.category
        ) ===
          normalizeSearchText(
            selectedCategory
          );

      if (!categoryMatch) {
        return false;
      }

      // ------------------------------
      // فیلتر جستجو
      // ------------------------------

      if (!normalizedSearch) {
        return true;
      }

      const searchableText = [
        item.title,
        item.summary,
        item.content || "",
        item.source,
        item.category,
      ]
        .map(normalizeSearchText)
        .join(" ");

      return searchableText.includes(
        normalizedSearch
      );
    });
  }, [
    news,
    selectedCategory,
    search,
  ]);

  // ==========================================================
  // پاک کردن فیلترها
  // ==========================================================

  function clearFilters() {
    setSearch("");
    setSelectedCategory("همه اخبار");
  }

  // ==========================================================
  // Render
  // ==========================================================

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">

        {/* ====================================================
            Header
        ==================================================== */}

        <header className="mx-auto max-w-4xl text-center">

          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-5 py-2 text-sm font-bold text-amber-700">
            📰 اخبار کنکور و آموزش و پرورش
          </span>

          <h1 className="mt-5 text-3xl font-black leading-[1.7] tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            آخرین اخبار و اطلاعیه‌ها
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-8 text-slate-600 sm:text-base">
            جدیدترین اخبار کنکور، سازمان سنجش، آموزش و پرورش،
            انتخاب رشته، نتایج آزمون‌ها و مهم‌ترین
            اطلاعیه‌های تحصیلی را در این بخش دنبال کنید.
          </p>

        </header>

        {/* ====================================================
            Search
        ==================================================== */}

        {!loading && !error && (
          <section className="mx-auto mt-10 max-w-3xl">

            <div className="relative">

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="جستجو در عنوان، خلاصه، منبع و دسته‌بندی..."
                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 pl-12 text-sm font-medium text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
              />

              <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                🔎
              </div>

            </div>

          </section>
        )}

        {/* ====================================================
            Categories
        ==================================================== */}

        {!loading && !error && (
          <section className="mt-6">

            <div className="flex flex-wrap justify-center gap-2.5">

              {categories.map(
                (category) => {
                  const active =
                    selectedCategory ===
                    category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() =>
                        setSelectedCategory(
                          category
                        )
                      }
                      className={[
                        "rounded-xl px-4 py-2.5 text-sm font-bold transition",
                        active
                          ? "bg-slate-950 text-white shadow-sm"
                          : "border border-slate-200 bg-white text-slate-700 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700",
                      ].join(" ")}
                    >
                      {category}
                    </button>
                  );
                }
              )}

            </div>

          </section>
        )}

        {/* ====================================================
            Error
        ==================================================== */}

        {error && (
          <section className="mx-auto mt-10 max-w-3xl">

            <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-5 text-center text-sm font-bold leading-7 text-red-700">

              <div className="text-3xl">
                ⚠️
              </div>

              <p className="mt-3">
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
                className="mt-5 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
              >
                تلاش مجدد
              </button>

            </div>

          </section>
        )}

        {/* ====================================================
            Loading
        ==================================================== */}

        {loading && (
          <section className="mt-10">

            <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              {Array.from({
                length: 8,
              }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-5 py-4"
                >

                  <div className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-slate-200" />

                  <div className="h-4 flex-1 animate-pulse rounded-lg bg-slate-200" />

                  <div className="h-5 w-16 shrink-0 animate-pulse rounded-full bg-slate-100" />

                </div>
              ))}

            </div>

          </section>
        )}

        {/* ====================================================
            News
        ==================================================== */}

        {!loading && !error && (
          <section className="mt-10">

            {/* Result header */}

            {filteredNews.length > 0 && (
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <h2 className="text-xl font-black text-slate-950">
                    {selectedCategory}
                  </h2>

                  <div className="mt-2 h-1 w-10 rounded-full bg-amber-500" />

                </div>

                <div className="flex items-center gap-2">

                  {search && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-amber-300 hover:text-amber-700"
                    >
                      پاک کردن فیلتر
                    </button>
                  )}

                  <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-500 shadow-sm ring-1 ring-slate-100">
                    {filteredNews.length} خبر
                  </span>

                </div>

              </div>
            )}

            {/* ==================================================
                Empty
            ================================================== */}

            {filteredNews.length === 0 ? (

              <div className="rounded-3xl border border-slate-200/80 bg-white px-6 py-14 text-center shadow-md">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 text-4xl">
                  📰
                </div>

                <h2 className="mt-6 text-2xl font-black text-slate-950">
                  خبری برای نمایش وجود ندارد
                </h2>

                <p className="mx-auto mt-3 max-w-xl leading-8 text-slate-500">
                  {search
                    ? "خبر مورد نظر شما در میان اخبار منتشرشده پیدا نشد."
                    : "در حال حاضر خبر تأییدشده‌ای در این دسته‌بندی وجود ندارد."}
                </p>

                {(search ||
                  selectedCategory !==
                    "همه اخبار") && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-6 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-amber-500"
                  >
                    مشاهده همه اخبار
                  </button>
                )}

              </div>

            ) : (

              /* ==================================================
                 لیست خطی اخبار
              ================================================== */

              <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">

                {filteredNews.map(
                  (item) => (

                    <Link
                      key={item.id}
                      href={getNewsHref(
                        item
                      )}
                      className="group flex items-center gap-3 px-4 py-4 transition hover:bg-slate-50 sm:px-5"
                    >

                      <span className="shrink-0 text-amber-500">●</span>

                      <span className="min-w-0 flex-1 truncate text-sm font-bold text-slate-950 transition group-hover:text-amber-600 sm:text-[15px]">
                        {item.title}
                      </span>

                      <span className="hidden shrink-0 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 sm:inline-block">
                        {item.category || "اخبار"}
                      </span>

                      <span className="hidden shrink-0 text-xs font-medium text-slate-400 md:inline-block">
                        {formatDate(item.date)}
                      </span>

                      <span className="shrink-0 text-slate-300 transition group-hover:-translate-x-1 group-hover:text-amber-600">←</span>

                    </Link>
                  )
                )}

              </div>
            )}

          </section>
        )}

        {/* ====================================================
            Bottom CTA
        ==================================================== */}

        <section className="mt-14 overflow-hidden rounded-3xl bg-slate-950 px-6 py-10 text-center text-white shadow-sm md:px-10">

          <div className="mx-auto max-w-2xl">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl">
              🔔
            </div>

            <h2 className="mt-5 text-2xl font-black md:text-3xl">
              اخبار مهم کنکور را از دست ندهید
            </h2>

            <p className="mt-4 leading-8 text-slate-300">
              اخبار و اطلاعیه‌های مهم پس از
              بررسی و تأیید مدیریت در این بخش
              منتشر خواهند شد.
            </p>

          </div>

        </section>

      </div>
    </main>
  );
}