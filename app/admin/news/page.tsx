"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Trash2,
  RefreshCw,
  Newspaper,
  Clock,
  CheckCircle,
  Ban,
  ExternalLink,
  Search,
  Filter,
  LayoutDashboard,
  ArrowRight,
  LogOut,
} from "lucide-react";

type NewsItem = {
  id: string;
  rowNumber?: number;
  date: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  category: string;
  sourceUrl: string;
  status: string;
  image: string;
  slug: string;
};

const CATEGORIES = [
  "همه",
  "کنکور",
  "سازمان سنجش",
  "آموزش و پرورش",
  "انتخاب رشته",
  "نتایج",
  "اطلاعیه",
  "برنامه مطالعاتی",
];

function normalizeStatus(value: string) {
  return String(value || "").trim().toLowerCase();
}

function formatDate(value: string) {
  if (!value) return "—";

  const normalized = value.replace(/\//g, "-");
  const date = new Date(normalized);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getStatusLabel(status: string) {
  const value = normalizeStatus(status);
  if (value === "approved") return "منتشر شده";
  if (value === "rejected") return "رد شده";
  if (value === "pending") return "در انتظار";
  return status || "نامشخص";
}

function getStatusStyle(status: string) {
  const value = normalizeStatus(status);
  if (value === "approved")
    return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
  if (value === "rejected")
    return "bg-red-50 text-red-700 ring-1 ring-red-200";
  if (value === "pending")
    return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
  return "bg-slate-100 text-slate-600 ring-1 ring-slate-200";
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [selectedStatus, setSelectedStatus] = useState("همه");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadNews() {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const response = await fetch(
        "/api/admin/news?all=1&_=" + Date.now(),
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const text = await response.text();
      let data: any;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("پاسخ سرور معتبر نیست.");
      }

      if (!response.ok || data?.success === false) {
        throw new Error(
          data?.message || "دریافت اخبار با خطا مواجه شد."
        );
      }

      const items = Array.isArray(data?.news) ? data.news : [];

      const normalized: NewsItem[] = items
        .map((item: any) => ({
          id: String(item?.id || item?.rowNumber || ""),
          rowNumber: item?.rowNumber ? Number(item.rowNumber) : undefined,
          date: String(item?.date || ""),
          title: String(item?.title || "").trim(),
          summary: String(item?.summary || "").trim(),
          content: String(item?.content || "").trim(),
          source: String(item?.source || "").trim(),
          category: String(item?.category || "").trim(),
          sourceUrl: String(item?.sourceUrl || "").trim(),
          status: String(item?.status || "pending").trim(),
          image: String(item?.image || "").trim(),
          slug: String(item?.slug || "").trim(),
        }))
        .filter((item: NewsItem) => item.id && item.title);

      setNews(normalized);
    } catch (err) {
      console.error("Admin news loading error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "دریافت اخبار با مشکل مواجه شد."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNews();
  }, []);

  const filteredNews = useMemo(() => {
    const q = search
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")
      .toLowerCase()
      .trim();

    return news.filter((item) => {
      const categoryMatch =
        selectedCategory === "همه" ||
        item.category.trim() === selectedCategory;

      const statusMatch =
        selectedStatus === "همه" ||
        normalizeStatus(item.status) ===
          normalizeStatus(selectedStatus);

      if (!categoryMatch || !statusMatch) return false;

      if (!q) return true;

      const hay = [
        item.title,
        item.summary,
        item.source,
        item.category,
      ]
        .join(" ")
        .replace(/ي/g, "ی")
        .replace(/ك/g, "ک")
        .toLowerCase();

      return hay.includes(q);
    });
  }, [news, selectedCategory, selectedStatus, search]);

  const statistics = useMemo(() => {
    const approved = news.filter(
      (i) => normalizeStatus(i.status) === "approved"
    ).length;
    const pending = news.filter(
      (i) => normalizeStatus(i.status) === "pending"
    ).length;
    const rejected = news.filter(
      (i) => normalizeStatus(i.status) === "rejected"
    ).length;

    return { total: news.length, approved, pending, rejected };
  }, [news]);

  async function runAction(
    item: NewsItem,
    action: "approve" | "reject" | "delete"
  ) {
    const labels = {
      approve: "تأیید و انتشار",
      reject: "رد کردن",
      delete: "حذف دائمی",
    };

    const confirmed = window.confirm(
      `آیا از ${labels[action]} این خبر مطمئن هستید؟`
    );
    if (!confirmed) return;

    try {
      setActionLoading(item.id + "-" + action);
      setError("");
      setMessage("");

      const response = await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          id: item.id,
        }),
      });

      const text = await response.text();
      let data: any;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("پاسخ سرور معتبر نیست.");
      }

      if (!response.ok || data?.success === false) {
        throw new Error(
          data?.message || "عملیات انجام نشد."
        );
      }

      if (action === "delete") {
        setNews((current) =>
          current.filter((n) => n.id !== item.id)
        );
        setMessage("خبر با موفقیت حذف شد.");
      } else {
        const newStatus =
          action === "approve" ? "approved" : "rejected";
        setNews((current) =>
          current.map((n) =>
            n.id === item.id ? { ...n, status: newStatus } : n
          )
        );
        setMessage(
          action === "approve"
            ? "خبر تأیید و منتشر شد."
            : "خبر رد شد."
        );
      }
    } catch (err) {
      console.error("News action error:", err);
      setError(
        err instanceof Error ? err.message : "عملیات انجام نشد."
      );
    } finally {
      setActionLoading(null);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // ignore
    }
    window.location.href = "/admin/login";
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white"
    >
      <div className="border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-amber-400">
              <LayoutDashboard size={20} />
            </div>
            <div>
              <div className="text-sm font-black text-slate-900">
                پنل مدیریت
              </div>
              <div className="text-xs text-slate-500">
                مهیار بیرون‌خو
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-amber-300 hover:text-amber-700 sm:inline-flex"
            >
              <ArrowRight size={16} />
              بازگشت به سایت
            </Link>
            <button
              type="button"
              onClick={loadNews}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              <RefreshCw
                size={16}
                className={loading ? "animate-spin" : ""}
              />
              بروزرسانی
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">خروج</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
            <Newspaper size={14} />
            مدیریت محتوا
          </span>
          <h1 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
            پنل مدیریت اخبار
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-7 text-slate-500">
            اخبار کنکور، سازمان سنجش و آموزش و پرورش را بررسی،
            تأیید یا رد کنید.
          </p>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500">کل اخبار</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <Newspaper size={18} />
              </div>
            </div>
            <div className="mt-3 text-3xl font-black text-slate-900">
              {statistics.total}
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-amber-700">در انتظار</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <Clock size={18} />
              </div>
            </div>
            <div className="mt-3 text-3xl font-black text-amber-700">
              {statistics.pending}
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-emerald-700">منتشر شده</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <CheckCircle size={18} />
              </div>
            </div>
            <div className="mt-3 text-3xl font-black text-emerald-700">
              {statistics.approved}
            </div>
          </div>

          <div className="rounded-2xl border border-red-200/60 bg-gradient-to-br from-red-50 to-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-red-700">رد شده</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <Ban size={18} />
              </div>
            </div>
            <div className="mt-3 text-3xl font-black text-red-700">
              {statistics.rejected}
            </div>
          </div>
        </section>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold leading-7 text-red-700">
            ⚠️ {error}
          </div>
        )}
        {message && (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-bold leading-7 text-emerald-700">
            ✓ {message}
          </div>
        )}

        <section className="mb-6 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm md:p-6">
          <div className="mb-5 flex items-center gap-2 text-slate-800">
            <Filter size={18} />
            <h2 className="text-base font-black">فیلتر و جستجو</h2>
          </div>

          <div className="relative mb-5">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجو در عنوان، خلاصه، منبع..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 pr-12 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
            />
            <Search
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {[
              { key: "همه", label: "همه وضعیت‌ها" },
              { key: "pending", label: "در انتظار" },
              { key: "approved", label: "منتشر شده" },
              { key: "rejected", label: "رد شده" },
            ].map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setSelectedStatus(s.key)}
                className={
                  selectedStatus === s.key
                    ? "rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-white shadow-md shadow-amber-500/20"
                    : "rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
                }
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-bold text-white"
                    : "rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                }
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {!loading && (
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="font-bold text-slate-500">
              {filteredNews.length} خبر
            </span>
            {(search ||
              selectedCategory !== "همه" ||
              selectedStatus !== "همه") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("همه");
                  setSelectedStatus("همه");
                }}
                className="font-bold text-amber-600 hover:text-amber-700"
              >
                پاک کردن فیلترها
              </button>
            )}
          </div>
        )}

        {loading && (
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 border-b border-slate-100 px-4 py-3.5 last:border-b-0 sm:px-5"
              >
                <div className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-slate-200" />
                <div className="h-4 flex-1 animate-pulse rounded bg-slate-200" />
                <div className="hidden h-6 w-16 shrink-0 animate-pulse rounded-full bg-slate-100 sm:block" />
                <div className="h-8 w-20 shrink-0 animate-pulse rounded-xl bg-slate-100" />
              </div>
            ))}
          </section>
        )}

        {!loading && (
          <section>
            {filteredNews.length === 0 ? (
              <div className="rounded-3xl border border-slate-200/80 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
                  📰
                </div>
                <h2 className="mt-5 text-xl font-black text-slate-900">
                  خبری پیدا نشد
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
                  با فیلترهای فعلی خبری وجود ندارد. فیلترها را تغییر
                  دهید یا اخبار جدید را از منابع دریافت کنید.
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="divide-y divide-slate-100">
                  {filteredNews.map((item) => {
                    const status = normalizeStatus(item.status);
                    const isBusy = actionLoading !== null;

                    return (
                      <div
                        key={item.id}
                        className="flex flex-col gap-3 px-4 py-3.5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:gap-3 sm:px-5"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start gap-2.5">
                            <span className="mt-1.5 shrink-0 text-amber-500">●</span>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-sm font-bold leading-6 text-slate-900 sm:text-[15px]">
                                {item.title}
                              </h3>
                              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                                <span
                                  className={
                                    "rounded-full px-2 py-0.5 text-[11px] font-bold " +
                                    getStatusStyle(item.status)
                                  }
                                >
                                  {getStatusLabel(item.status)}
                                </span>
                                {item.source && (
                                  <span className="font-medium text-slate-500">
                                    {item.source}
                                  </span>
                                )}
                                {item.category && (
                                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-500">
                                    {item.category}
                                  </span>
                                )}
                                <span>{formatDate(item.date)}</span>
                                {item.sourceUrl && (
                                  <a
                                    href={item.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-700"
                                  >
                                    <ExternalLink size={12} />
                                    منبع
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex shrink-0 flex-wrap items-center gap-1.5 sm:justify-end">
                          {status !== "approved" && (
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => runAction(item, "approve")}
                              className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                            >
                              <CheckCircle2 size={14} />
                              {actionLoading === item.id + "-approve"
                                ? "..."
                                : "تأیید"}
                            </button>
                          )}

                          {status !== "rejected" && (
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => runAction(item, "reject")}
                              className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-red-700 disabled:opacity-50"
                            >
                              <XCircle size={14} />
                              {actionLoading === item.id + "-reject"
                                ? "..."
                                : "رد"}
                            </button>
                          )}

                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => runAction(item, "delete")}
                            className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                          >
                            <Trash2 size={14} />
                            {actionLoading === item.id + "-delete"
                              ? "..."
                              : "حذف"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}