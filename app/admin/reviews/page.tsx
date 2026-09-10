"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  MessageSquareQuote,
  CheckCircle2,
  XCircle,
  Trash2,
  RefreshCw,
  Search,
  Filter,
  LayoutDashboard,
  ArrowRight,
  LogOut,
  CalendarCheck,
  ClipboardList,
  Newspaper,
  Star,
} from "lucide-react";

type ReviewItem = {
  id: string;
  rowNumber?: number;
  createdAt: string;
  name: string;
  rating: number;
  review: string;
  service: string;
  status: string;
};

const STATUSES = [
  { key: "همه", label: "همه" },
  { key: "pending", label: "در انتظار" },
  { key: "approved", label: "تأیید شده" },
  { key: "rejected", label: "رد شده" },
];

function statusLabel(value: string) {
  const normalized = String(value || "").toLowerCase();
  if (normalized === "approved") return "تأیید شده";
  if (normalized === "rejected") return "رد شده";
  return "در انتظار";
}

function statusStyle(value: string) {
  const normalized = String(value || "").toLowerCase();
  if (normalized === "approved") {
    return "bg-emerald-50 text-emerald-700";
  }
  if (normalized === "rejected") {
    return "bg-red-50 text-red-700";
  }
  return "bg-amber-50 text-amber-700";
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
  }).format(date);
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
      const response = await fetch("/api/admin/reviews?_=" + Date.now(), {
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || "دریافت نظرات انجام نشد.");
      }

      const items = Array.isArray(data?.reviews) ? data.reviews : [];
      setReviews(
        items
          .map((item: any) => ({
            id: String(item?.id || item?.rowNumber || ""),
            rowNumber: item?.rowNumber ? Number(item.rowNumber) : undefined,
            createdAt: String(item?.createdAt || ""),
            name: String(item?.name || ""),
            rating: Math.min(5, Math.max(1, Number(item?.rating) || 0)),
            review: String(item?.review || ""),
            service: String(item?.service || ""),
            status: String(item?.status || "pending").toLowerCase(),
          }))
          .filter((item: ReviewItem) => item.id && item.name && item.review)
      );
    } catch (err) {
      console.error("Admin reviews loading error:", err);
      setError(err instanceof Error ? err.message : "دریافت نظرات با مشکل مواجه شد.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  const filteredReviews = useMemo(() => {
    const q = search
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")
      .toLowerCase()
      .trim();

    return reviews.filter((item) => {
      if (
        selectedStatus !== "همه" &&
        item.status !== selectedStatus
      ) {
        return false;
      }

      if (!q) return true;

      return [item.name, item.review, item.service]
        .join(" ")
        .replace(/ي/g, "ی")
        .replace(/ك/g, "ک")
        .toLowerCase()
        .includes(q);
    });
  }, [reviews, selectedStatus, search]);

  const statistics = useMemo(() => {
    return {
      total: reviews.length,
      pending: reviews.filter((item) => item.status === "pending").length,
      approved: reviews.filter((item) => item.status === "approved").length,
      rejected: reviews.filter((item) => item.status === "rejected").length,
    };
  }, [reviews]);

  async function runAction(item: ReviewItem, action: string) {
    const labels: Record<string, string> = {
      approve: "تأیید",
      reject: "رد",
      delete: "حذف",
    };

    if (
      action === "delete" &&
      !window.confirm("آیا از حذف دائمی این نظر مطمئن هستید؟")
    ) {
      return;
    }

    try {
      setActionLoading(item.id + "-" + action);
      setError("");
      setMessage("");

      const response = await fetch("/api/admin/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, id: item.id }),
      });

      const data = await response.json();

      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || "عملیات انجام نشد.");
      }

      if (action === "delete") {
        setReviews((current) => current.filter((review) => review.id !== item.id));
      } else {
        setReviews((current) =>
          current.map((review) =>
            review.id === item.id
              ? { ...review, status: action === "approve" ? "approved" : "rejected" }
              : review
          )
        );
      }

      setMessage(`نظر با موفقیت ${labels[action]} شد.`);
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
    } catch {}
    window.location.href = "/admin/login";
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white"
    >
      <div className="border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-amber-400">
              <LayoutDashboard size={20} />
            </div>
            <div>
              <div className="text-sm font-black text-slate-900">پنل مدیریت</div>
              <div className="text-xs text-slate-500">مهیار بیرون‌خو</div>
            </div>
          </div>

          <div className="w-full overflow-x-auto pb-0.5 lg:w-auto lg:max-w-[calc(100vw-360px)]">
            <nav className="flex min-w-max items-center justify-start gap-2 lg:justify-end" aria-label="منوی مدیریت">
            <Link href="/admin/reservations" className="admin-nav-link shrink-0">
              <CalendarCheck size={16} />
              <span>رزروها</span>
            </Link>
            <Link href="/admin/assessments" className="admin-nav-link shrink-0">
              <ClipboardList size={16} />
              <span>آزمون‌ها</span>
            </Link>
            <Link href="/admin/news" className="admin-nav-link shrink-0">
              <Newspaper size={16} />
              <span>اخبار</span>
            </Link>
            <Link href="/" className="admin-nav-link shrink-0">
              <ArrowRight size={16} />
              <span className="hidden sm:inline">بازگشت به سایت</span>
              <span className="sm:hidden">سایت</span>
            </Link>
            <button
              type="button"
              onClick={loadReviews}
              disabled={loading}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-slate-800 disabled:opacity-60 sm:px-4 sm:text-sm"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              <span className="hidden sm:inline">بروزرسانی</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50 sm:px-4 sm:text-sm"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">خروج</span>
            </button>
            </nav>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
            <MessageSquareQuote size={14} />
            مدیریت نظرات
          </span>
          <h1 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
            نظرات ثبت‌شده کاربران
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
            نظرات از Google Sheet خوانده می‌شوند و فقط نظرات تأییدشده در سایت
            نمایش داده خواهند شد.
          </p>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["کل نظرات", statistics.total, "text-slate-900"],
            ["در انتظار", statistics.pending, "text-amber-700"],
            ["تأیید شده", statistics.approved, "text-emerald-700"],
            ["رد شده", statistics.rejected, "text-red-700"],
          ].map(([label, value, color]) => (
            <div
              key={String(label)}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
            >
              <div className="text-sm font-bold text-slate-500">{label}</div>
              <div className={`mt-3 text-3xl font-black ${color}`}>
                {value}
              </div>
            </div>
          ))}
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
              placeholder="جستجو در نام، نظر، نوع خدمت..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 pr-12 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
            />
            <Search
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {STATUSES.map((status) => (
              <button
                key={status.key}
                type="button"
                onClick={() => setSelectedStatus(status.key)}
                className={
                  selectedStatus === status.key
                    ? "rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-white shadow-md shadow-amber-500/20"
                    : "rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
                }
              >
                {status.label}
              </button>
            ))}
          </div>
        </section>

        {!loading && (
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="font-bold text-slate-500">
              {filteredReviews.length} نظر
            </span>
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

        {loading ? (
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 border-b border-slate-100 px-4 py-4 last:border-b-0 sm:px-5"
              >
                <div className="h-4 w-4 animate-pulse rounded-full bg-slate-200" />
                <div className="h-4 flex-1 animate-pulse rounded bg-slate-200" />
              </div>
            ))}
          </section>
        ) : filteredReviews.length === 0 ? (
          <div className="rounded-3xl border border-slate-200/80 bg-white px-6 py-16 text-center shadow-sm">
            <MessageSquareQuote className="mx-auto text-slate-400" size={36} />
            <h2 className="mt-5 text-xl font-black text-slate-900">
              نظری پیدا نشد
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
              با فیلترهای فعلی نظری وجود ندارد.
            </p>
          </div>
        ) : (
          <section className="space-y-4">
            {filteredReviews.map((item) => {
              const busy = actionLoading !== null;
              return (
                <article
                  key={item.id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-black text-slate-900">{item.name}</h3>
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${statusStyle(item.status)}`}>
                          {statusLabel(item.status)}
                        </span>
                        {item.service && (
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">
                            {item.service}
                          </span>
                        )}
                        <span className="text-xs text-slate-400">
                          {formatDate(item.createdAt)}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            size={16}
                            fill={index < item.rating ? "currentColor" : "none"}
                          />
                        ))}
                        <span className="mr-1 text-xs font-bold text-slate-500">
                          {item.rating} از 5
                        </span>
                      </div>

                      <p className="mt-4 whitespace-pre-wrap text-sm leading-8 text-slate-600">
                        {item.review}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-2 lg:max-w-xs lg:justify-end">
                      {item.status !== "approved" && (
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => runAction(item, "approve")}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                        >
                          <CheckCircle2 size={15} />
                          {actionLoading === item.id + "-approve" ? "..." : "تأیید"}
                        </button>
                      )}
                      {item.status !== "rejected" && (
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => runAction(item, "reject")}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-red-700 disabled:opacity-50"
                        >
                          <XCircle size={15} />
                          {actionLoading === item.id + "-reject" ? "..." : "رد"}
                        </button>
                      )}
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => runAction(item, "delete")}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-3.5 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        <Trash2 size={15} />
                        {actionLoading === item.id + "-delete" ? "..." : "حذف"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>

      <style jsx>{`
        .admin-nav-link {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          border: 1px solid rgb(226 232 240);
          background: white;
          border-radius: 0.75rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: rgb(71 85 105);
          transition: all 0.2s;
        }
        .admin-nav-link:hover {
          border-color: rgb(252 211 77);
          color: rgb(180 83 9);
        }
        @media (min-width: 640px) {
          .admin-nav-link {
            padding-left: 1rem;
            padding-right: 1rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </main>
  );
}
