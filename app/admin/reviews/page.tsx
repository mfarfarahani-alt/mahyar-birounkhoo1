"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Trash2,
  RefreshCw,
  Star,
  Clock,
  CheckCircle,
  Ban,
  Search,
  Filter,
  LayoutDashboard,
  ArrowRight,
  LogOut,
  CalendarCheck,
  ClipboardList,
  Newspaper,
  MessageSquareQuote,
} from "lucide-react";

type ReviewItem = {
  id: string;
  rowNumber?: number;
  createdAt: string;
  name: string;
  rating: number;
  service: string;
  review: string;
  status: string;
};

function normalizeStatus(value: string) {
  return String(value || "").trim().toLowerCase();
}

function formatDate(value: string) {
  if (!value) return "—";
  const normalized = value.replace(/\//g, "-");
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return value;
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

function Stars({ rating }: { rating: number }) {
  const n = Math.min(5, Math.max(1, Number(rating) || 5));
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-500" title={`${n} از ۵`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < n ? "fill-amber-400 text-amber-400" : "text-slate-300"}
        />
      ))}
    </span>
  );
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("همه");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadReviews() {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const response = await fetch(
        "/api/admin/reviews?_=" + Date.now(),
        { method: "GET", cache: "no-store" }
      );

      const text = await response.text();
      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("پاسخ سرور معتبر نیست.");
      }

      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || "دریافت نظرات با خطا مواجه شد.");
      }

      const items = Array.isArray(data?.reviews) ? data.reviews : [];

      const normalized: ReviewItem[] = items
        .map((item: any) => ({
          id: String(item?.id || item?.rowNumber || ""),
          rowNumber: item?.rowNumber ? Number(item.rowNumber) : undefined,
          createdAt: String(item?.createdAt || item?.date || ""),
          name: String(item?.name || "").trim(),
          rating: Math.min(5, Math.max(1, Number(item?.rating) || 5)),
          service: String(item?.service || "").trim(),
          review: String(item?.review || "").trim(),
          status: String(item?.status || "pending").trim(),
        }))
        .filter((item: ReviewItem) => item.id && item.name && item.review);

      setReviews(normalized);
    } catch (err) {
      console.error("Admin reviews loading error:", err);
      setError(
        err instanceof Error ? err.message : "دریافت نظرات با مشکل مواجه شد."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  const filtered = useMemo(() => {
    const q = search
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")
      .toLowerCase()
      .trim();

    return reviews.filter((item) => {
      const statusMatch =
        selectedStatus === "همه" ||
        normalizeStatus(item.status) === normalizeStatus(selectedStatus);
      if (!statusMatch) return false;
      if (!q) return true;
      const hay = [item.name, item.review, item.service]
        .join(" ")
        .replace(/ي/g, "ی")
        .replace(/ك/g, "ک")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [reviews, selectedStatus, search]);

  const statistics = useMemo(() => {
    const approved = reviews.filter((i) => normalizeStatus(i.status) === "approved").length;
    const pending = reviews.filter((i) => normalizeStatus(i.status) === "pending").length;
    const rejected = reviews.filter((i) => normalizeStatus(i.status) === "rejected").length;
    return { total: reviews.length, approved, pending, rejected };
  }, [reviews]);

  async function runAction(
    item: ReviewItem,
    action: "approve" | "reject" | "delete"
  ) {
    const labels = {
      approve: "تأیید و انتشار",
      reject: "رد کردن",
      delete: "حذف دائمی",
    };

    const confirmed = window.confirm(
      `آیا از ${labels[action]} این نظر مطمئن هستید؟`
    );
    if (!confirmed) return;

    try {
      setActionLoading(item.id + "-" + action);
      setError("");
      setMessage("");

      const response = await fetch("/api/admin/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, id: item.id }),
      });

      const text = await response.text();
      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("پاسخ سرور معتبر نیست.");
      }

      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || "عملیات انجام نشد.");
      }

      if (action === "delete") {
        setReviews((current) => current.filter((n) => n.id !== item.id));
        setMessage("نظر با موفقیت حذف شد.");
      } else {
        const newStatus = action === "approve" ? "approved" : "rejected";
        setReviews((current) =>
          current.map((n) =>
            n.id === item.id ? { ...n, status: newStatus } : n
          )
        );
        setMessage(
          action === "approve"
            ? "نظر تأیید و در سایت منتشر شد."
            : "نظر رد شد."
        );
      }
    } catch (err) {
      console.error("Review action error:", err);
      setError(err instanceof Error ? err.message : "عملیات انجام نشد.");
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
              <div className="text-sm font-black text-slate-900">پنل مدیریت</div>
              <div className="text-xs text-slate-500">مهیار بیرون‌خو</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <Link
              href="/admin/news"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-amber-300 hover:text-amber-700 sm:px-4 sm:text-sm"
            >
              <Newspaper size={16} />
              <span>اخبار</span>
            </Link>
            <Link
              href="/admin/assessments"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-amber-300 hover:text-amber-700 sm:px-4 sm:text-sm"
            >
              <ClipboardList size={16} />
              <span>آزمون‌ها</span>
            </Link>
            <Link
              href="/admin/reservations"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-amber-300 hover:text-amber-700 sm:px-4 sm:text-sm"
            >
              <CalendarCheck size={16} />
              <span>رزروها</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-amber-300 hover:text-amber-700 sm:px-4 sm:text-sm"
            >
              <ArrowRight size={16} />
              <span className="hidden sm:inline">بازگشت به سایت</span>
              <span className="sm:hidden">سایت</span>
            </Link>
            <button
              type="button"
              onClick={loadReviews}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-slate-800 disabled:opacity-60 sm:px-4 sm:text-sm"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              <span className="hidden sm:inline">بروزرسانی</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50 sm:px-4 sm:text-sm"
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
            <MessageSquareQuote size={14} />
            مدیریت محتوا
          </span>
          <h1 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
            پنل مدیریت نظرات
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-7 text-slate-500">
            نظرات کاربران را بررسی کنید. فقط نظرات تأییدشده در سایت نمایش داده
            می‌شوند.
          </p>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500">کل نظرات</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <MessageSquareQuote size={18} />
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
              placeholder="جستجو در نام، متن نظر، نوع خدمت..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 pr-12 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
            />
            <Search
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          <div className="flex flex-wrap gap-2">
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
        </section>

        {!loading && (
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="font-bold text-slate-500">{filtered.length} نظر</span>
            {(search || selectedStatus !== "همه") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
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
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 border-b border-slate-100 px-4 py-4 last:border-b-0 sm:px-5"
              >
                <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-slate-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </section>
        )}

        {!loading && (
          <section>
            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-slate-200/80 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
                  💬
                </div>
                <h2 className="mt-5 text-xl font-black text-slate-900">
                  نظری پیدا نشد
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
                  با فیلترهای فعلی نظری وجود ندارد یا هنوز نظری ثبت نشده است.
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="divide-y divide-slate-100">
                  {filtered.map((item) => {
                    const status = normalizeStatus(item.status);
                    const isBusy = actionLoading !== null;

                    return (
                      <div
                        key={item.id}
                        className="flex flex-col gap-3 px-4 py-4 transition hover:bg-slate-50 sm:flex-row sm:items-start sm:gap-4 sm:px-5"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-black text-slate-900">
                              {item.name}
                            </span>
                            <Stars rating={item.rating} />
                            <span
                              className={
                                "rounded-full px-2 py-0.5 text-[11px] font-bold " +
                                getStatusStyle(item.status)
                              }
                            >
                              {getStatusLabel(item.status)}
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-7 text-slate-700">
                            {item.review}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                            {item.service && (
                              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-500">
                                {item.service}
                              </span>
                            )}
                            <span>{formatDate(item.createdAt)}</span>
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
