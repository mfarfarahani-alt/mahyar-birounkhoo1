"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Clock,
  Phone,
  User,
  MapPin,
  Search,
  Filter,
  LayoutDashboard,
  ArrowRight,
  LogOut,
  Newspaper,
  ClipboardList,
} from "lucide-react";

type ReservationItem = {
  id: string;
  rowNumber?: number;
  createdAt: string;
  name: string;
  phone: string;
  grade: string;
  field: string;
  city: string;
  package: string;
  description: string;
  consultationType: string;
  date: string;
  time: string;
  status: string;
};

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
  }).format(date);
}

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("همه");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadReservations() {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const response = await fetch(
        "/api/admin/reservations?_=" + Date.now(),
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
          data?.message || "دریافت رزروها با خطا مواجه شد."
        );
      }

      const items = Array.isArray(data?.reservations)
        ? data.reservations
        : [];

      const normalized: ReservationItem[] = items
        .map((item: any) => ({
          id: String(item?.id || item?.rowNumber || ""),
          rowNumber: item?.rowNumber
            ? Number(item.rowNumber)
            : undefined,
          createdAt: String(item?.createdAt || item?.date || ""),
          name: String(item?.name || "").trim(),
          phone: String(item?.phone || "").trim(),
          grade: String(item?.grade || "").trim(),
          field: String(item?.field || "").trim(),
          city: String(item?.city || "").trim(),
          package: String(item?.package || "").trim(),
          description: String(item?.description || "").trim(),
          consultationType: String(
            item?.consultationType || ""
          ).trim(),
          date: String(item?.date || "").trim(),
          time: String(item?.time || "").trim(),
          status: String(item?.status || "pending")
            .trim()
            .toLowerCase(),
        }))
        .filter((item: ReservationItem) => item.id && item.name);

      // جدیدترین رزرو اول نمایش داده شود
      normalized.reverse();

      setReservations(normalized);
    } catch (err) {
      console.error("Admin reservations loading error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "دریافت رزروها با مشکل مواجه شد."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReservations();
  }, []);

  const filteredReservations = useMemo(() => {
    const q = search
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")
      .toLowerCase()
      .trim();

    return reservations.filter((item) => {
      const statusMatch =
        selectedStatus === "همه" ||
        normalizeStatus(item.status) ===
          normalizeStatus(selectedStatus);

      if (!statusMatch) return false;

      if (!q) return true;

      const hay = [
        item.name,
        item.phone,
        item.city,
        item.grade,
        item.field,
        item.package,
      ]
        .join(" ")
        .replace(/ي/g, "ی")
        .replace(/ك/g, "ک")
        .toLowerCase();

      return hay.includes(q);
    });
  }, [reservations, selectedStatus, search]);

  const statistics = useMemo(() => {
    const contacted = reservations.filter(
      (i) => normalizeStatus(i.status) === "contacted"
    ).length;
    const pending = reservations.filter(
      (i) => normalizeStatus(i.status) !== "contacted"
    ).length;

    return { total: reservations.length, contacted, pending };
  }, [reservations]);

  async function runAction(
    item: ReservationItem,
    action: "contacted" | "pending" | "delete"
  ) {
    const labels = {
      contacted: "علامت‌گذاری به‌عنوان «پیگیری شد»",
      pending: "بازگرداندن به «در انتظار پیگیری»",
      delete: "حذف دائمی",
    };

    const confirmed = window.confirm(
      `آیا از ${labels[action]} این رزرو مطمئن هستید؟`
    );
    if (!confirmed) return;

    try {
      setActionLoading(item.id + "-" + action);
      setError("");
      setMessage("");

      const response = await fetch("/api/admin/reservations", {
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
        throw new Error(data?.message || "عملیات انجام نشد.");
      }

      if (action === "delete") {
        setReservations((current) =>
          current.filter((r) => r.id !== item.id)
        );
        setMessage("رزرو با موفقیت حذف شد.");
      } else {
        const newStatus = action === "contacted" ? "contacted" : "pending";
        setReservations((current) =>
          current.map((r) =>
            r.id === item.id ? { ...r, status: newStatus } : r
          )
        );
        setMessage(
          action === "contacted"
            ? "رزرو به‌عنوان پیگیری‌شده علامت خورد."
            : "رزرو به‌عنوان در انتظار برگشت داده شد."
        );
      }
    } catch (err) {
      console.error("Reservation action error:", err);
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

          <div className="flex flex-wrap items-center justify-end gap-2">
            <Link
              href="/admin/assessments"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-amber-300 hover:text-amber-700 sm:px-4 sm:text-sm"
            >
              <ClipboardList size={16} />
              <span>آزمون‌ها</span>
            </Link>
            <Link
              href="/admin/news"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-amber-300 hover:text-amber-700 sm:px-4 sm:text-sm"
            >
              <Newspaper size={16} />
              <span>اخبار</span>
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
              onClick={loadReservations}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-slate-800 disabled:opacity-60 sm:px-4 sm:text-sm"
            >
              <RefreshCw
                size={16}
                className={loading ? "animate-spin" : ""}
              />
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
            <CalendarCheck size={14} />
            مدیریت رزروها
          </span>
          <h1 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
            افرادی که رزرو مشاوره ثبت کرده‌اند
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-7 text-slate-500">
            لیست کامل درخواست‌های رزرو مشاوره را مشاهده کنید و
            وضعیت پیگیری هرکدام را مشخص کنید.
          </p>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500">کل رزروها</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <CalendarCheck size={18} />
              </div>
            </div>
            <div className="mt-3 text-3xl font-black text-slate-900">
              {statistics.total}
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-amber-700">در انتظار پیگیری</span>
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
              <span className="text-sm font-bold text-emerald-700">پیگیری شده</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <div className="mt-3 text-3xl font-black text-emerald-700">
              {statistics.contacted}
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
              placeholder="جستجو در نام، شماره تماس، شهر..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 pr-12 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
            />
            <Search
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { key: "همه", label: "همه" },
              { key: "pending", label: "در انتظار پیگیری" },
              { key: "contacted", label: "پیگیری شده" },
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
            <span className="font-bold text-slate-500">
              {filteredReservations.length} رزرو
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
            {filteredReservations.length === 0 ? (
              <div className="rounded-3xl border border-slate-200/80 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
                  📅
                </div>
                <h2 className="mt-5 text-xl font-black text-slate-900">
                  رزروی پیدا نشد
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
                  با فیلترهای فعلی رزروی وجود ندارد. فیلترها را تغییر
                  دهید یا منتظر ثبت درخواست‌های جدید بمانید.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredReservations.map((item) => {
                  const status = normalizeStatus(item.status);
                  const isBusy = actionLoading !== null;
                  const isContacted = status === "contacted";

                  return (
                    <div
                      key={item.id}
                      className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-amber-200/60 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                            <User size={16} />
                          </div>
                          <div>
                            <div className="text-sm font-black text-slate-900">
                              {item.name}
                            </div>
                            <div className="text-xs text-slate-400">
                              {item.grade}
                              {item.field ? ` — ${item.field}` : ""}
                            </div>
                          </div>
                        </div>

                        <span
                          className={
                            "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold " +
                            (isContacted
                              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                              : "bg-amber-50 text-amber-700 ring-1 ring-amber-200")
                          }
                        >
                          {isContacted ? "پیگیری شد" : "در انتظار"}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-3 text-xs text-slate-500">
                        <a
                          href={`tel:${item.phone}`}
                          dir="ltr"
                          className="flex items-center gap-1.5 font-bold text-slate-700 hover:text-amber-600"
                        >
                          <Phone size={13} />
                          {item.phone}
                        </a>

                        {item.city && (
                          <div className="flex items-center gap-1.5">
                            <MapPin size={13} />
                            {item.city}
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          {item.package && (
                            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-600">
                              {item.package}
                            </span>
                          )}
                          {item.consultationType && (
                            <span>{item.consultationType}</span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 font-bold text-slate-700">
                          {item.date && <span>📅 {item.date}</span>}
                          {item.time && <span>🕐 {item.time}</span>}
                        </div>

                        {item.description && (
                          <p className="mt-1 line-clamp-2 leading-6 text-slate-500">
                            {item.description}
                          </p>
                        )}

                        <div className="mt-1 text-[11px] text-slate-400">
                          ثبت‌شده: {formatDate(item.createdAt)}
                        </div>
                      </div>

                      <div className="mt-1 flex items-center gap-1.5 border-t border-slate-100 pt-3">
                        {!isContacted ? (
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => runAction(item, "contacted")}
                            className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                          >
                            <CheckCircle2 size={14} />
                            {actionLoading === item.id + "-contacted"
                              ? "..."
                              : "پیگیری شد"}
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => runAction(item, "pending")}
                            className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-amber-200 bg-white px-3 py-1.5 text-xs font-bold text-amber-700 transition hover:bg-amber-50 disabled:opacity-50"
                          >
                            <Clock size={14} />
                            {actionLoading === item.id + "-pending"
                              ? "..."
                              : "برگردان به در انتظار"}
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
            )}
          </section>
        )}
      </div>
    </main>
  );
}
