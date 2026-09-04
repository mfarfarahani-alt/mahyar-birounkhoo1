"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ClipboardList,
  Trash2,
  RefreshCw,
  Phone,
  User,
  Search,
  Filter,
  LayoutDashboard,
  ArrowRight,
  LogOut,
  Newspaper,
  CalendarCheck,
  ChevronDown,
  Award,
} from "lucide-react";

type AssessmentItem = {
  id: string;
  rowNumber?: number;
  createdAt: string;
  name: string;
  phone: string;
  testType: string;
  result: string;
  detail: string;
};

const TEST_TYPES = ["همه", "MBTI", "Holland", "Strong"];

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
  }).format(date);
}

function parseScores(detail: string): Record<string, number> | null {
  if (!detail) return null;
  try {
    const parsed = JSON.parse(detail);
    if (parsed && typeof parsed.scores === "object" && parsed.scores) {
      return parsed.scores as Record<string, number>;
    }
    return null;
  } catch {
    return null;
  }
}

export default function AdminAssessmentsPage() {
  const [assessments, setAssessments] = useState<AssessmentItem[]>([]);
  const [selectedType, setSelectedType] = useState("همه");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadAssessments() {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const response = await fetch(
        "/api/admin/assessments?_=" + Date.now(),
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
          data?.message || "دریافت نتایج آزمون‌ها با خطا مواجه شد."
        );
      }

      const items = Array.isArray(data?.assessments)
        ? data.assessments
        : [];

      const normalized: AssessmentItem[] = items
        .map((item: any) => ({
          id: String(item?.id || item?.rowNumber || ""),
          rowNumber: item?.rowNumber
            ? Number(item.rowNumber)
            : undefined,
          createdAt: String(item?.createdAt || "").trim(),
          name: String(item?.name || "").trim(),
          phone: String(item?.phone || "").trim(),
          testType: String(item?.testType || "").trim(),
          result: String(item?.result || "").trim(),
          detail: String(item?.detail || "").trim(),
        }))
        .filter((item: AssessmentItem) => item.id && item.name);

      normalized.reverse();

      setAssessments(normalized);
    } catch (err) {
      console.error("Admin assessments loading error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "دریافت نتایج آزمون‌ها با مشکل مواجه شد."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAssessments();
  }, []);

  const filteredAssessments = useMemo(() => {
    const q = search
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")
      .toLowerCase()
      .trim();

    return assessments.filter((item) => {
      const typeMatch =
        selectedType === "همه" ||
        item.testType.trim().toLowerCase() ===
          selectedType.toLowerCase();

      if (!typeMatch) return false;

      if (!q) return true;

      const hay = [item.name, item.phone, item.result]
        .join(" ")
        .replace(/ي/g, "ی")
        .replace(/ك/g, "ک")
        .toLowerCase();

      return hay.includes(q);
    });
  }, [assessments, selectedType, search]);

  const statistics = useMemo(() => {
    const byType: Record<string, number> = {};
    assessments.forEach((item) => {
      const key = item.testType || "نامشخص";
      byType[key] = (byType[key] || 0) + 1;
    });
    return { total: assessments.length, byType };
  }, [assessments]);

  async function runDelete(item: AssessmentItem) {
    const confirmed = window.confirm(
      "آیا از حذف دائمی این نتیجه آزمون مطمئن هستید؟"
    );
    if (!confirmed) return;

    try {
      setActionLoading(item.id + "-delete");
      setError("");
      setMessage("");

      const response = await fetch("/api/admin/assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
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
        throw new Error(data?.message || "عملیات انجام نشد.");
      }

      setAssessments((current) =>
        current.filter((a) => a.id !== item.id)
      );
      setMessage("نتیجه آزمون با موفقیت حذف شد.");
    } catch (err) {
      console.error("Assessment delete error:", err);
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
              href="/admin/reservations"
              className="hidden items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-amber-300 hover:text-amber-700 sm:inline-flex"
            >
              <CalendarCheck size={16} />
              رزروها
            </Link>
            <Link
              href="/admin/news"
              className="hidden items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-amber-300 hover:text-amber-700 sm:inline-flex"
            >
              <Newspaper size={16} />
              اخبار
            </Link>
            <Link
              href="/"
              className="hidden items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-amber-300 hover:text-amber-700 sm:inline-flex"
            >
              <ArrowRight size={16} />
              بازگشت به سایت
            </Link>
            <button
              type="button"
              onClick={loadAssessments}
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
            <ClipboardList size={14} />
            مدیریت آزمون‌ها
          </span>
          <h1 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
            افرادی که آزمون شخصیت‌شناسی داده‌اند
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-7 text-slate-500">
            نتایج آزمون‌های MBTI، هالند و استرانگ را که کاربران در
            سایت تکمیل کرده‌اند مشاهده کنید.
          </p>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500">کل آزمون‌ها</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <ClipboardList size={18} />
              </div>
            </div>
            <div className="mt-3 text-3xl font-black text-slate-900">
              {statistics.total}
            </div>
          </div>

          {TEST_TYPES.filter((t) => t !== "همه").map((type) => (
            <div
              key={type}
              className="rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-amber-700">{type}</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Award size={18} />
                </div>
              </div>
              <div className="mt-3 text-3xl font-black text-amber-700">
                {statistics.byType[type] || 0}
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
              placeholder="جستجو در نام، شماره تماس، نتیجه..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 pr-12 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
            />
            <Search
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {TEST_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={
                  selectedType === type
                    ? "rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-white shadow-md shadow-amber-500/20"
                    : "rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
                }
              >
                {type}
              </button>
            ))}
          </div>
        </section>

        {!loading && (
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="font-bold text-slate-500">
              {filteredAssessments.length} نتیجه
            </span>
            {(search || selectedType !== "همه") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedType("همه");
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
            {filteredAssessments.length === 0 ? (
              <div className="rounded-3xl border border-slate-200/80 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
                  🧭
                </div>
                <h2 className="mt-5 text-xl font-black text-slate-900">
                  نتیجه‌ای پیدا نشد
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
                  با فیلترهای فعلی نتیجه‌ای وجود ندارد. فیلترها را
                  تغییر دهید یا منتظر آزمون‌های جدید بمانید.
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="divide-y divide-slate-100">
                  {filteredAssessments.map((item) => {
                    const isBusy = actionLoading !== null;
                    const scores = parseScores(item.detail);
                    const isExpanded = expandedId === item.id;

                    return (
                      <div key={item.id} className="px-4 py-3.5 sm:px-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start gap-2.5">
                              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                                <User size={14} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="text-sm font-bold leading-6 text-slate-900 sm:text-[15px]">
                                  {item.name}
                                </h3>
                                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                                  <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700 ring-1 ring-amber-200">
                                    {item.testType || "نامشخص"}
                                  </span>
                                  <span className="font-bold text-slate-600">
                                    نتیجه: {item.result || "—"}
                                  </span>
                                  <a
                                    href={`tel:${item.phone}`}
                                    dir="ltr"
                                    className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-700"
                                  >
                                    <Phone size={12} />
                                    {item.phone}
                                  </a>
                                  <span>{formatDate(item.createdAt)}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex shrink-0 items-center gap-1.5 sm:justify-end">
                            {scores && (
                              <button
                                type="button"
                                onClick={() =>
                                  setExpandedId(
                                    isExpanded ? null : item.id
                                  )
                                }
                                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-amber-300 hover:text-amber-700"
                              >
                                <ChevronDown
                                  size={14}
                                  className={
                                    "transition " +
                                    (isExpanded ? "rotate-180" : "")
                                  }
                                />
                                جزئیات نمرات
                              </button>
                            )}

                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => runDelete(item)}
                              className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                            >
                              <Trash2 size={14} />
                              {actionLoading === item.id + "-delete"
                                ? "..."
                                : "حذف"}
                            </button>
                          </div>
                        </div>

                        {isExpanded && scores && (
                          <div className="mt-3 flex flex-wrap gap-2 rounded-xl bg-slate-50 p-3">
                            {Object.entries(scores).map(([key, value]) => (
                              <span
                                key={key}
                                className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200"
                              >
                                {key}: {String(value)}
                              </span>
                            ))}
                          </div>
                        )}
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
