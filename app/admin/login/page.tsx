"use client";

import { FormEvent, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Eye, EyeOff, ArrowRight, Shield } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin/news";

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || "ورود ناموفق بود.");
      }

      router.replace(from.startsWith("/admin") ? from : "/admin/news");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "خطا در ورود."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 text-amber-400 shadow-xl shadow-slate-900/20">
          <Shield size={32} />
        </div>
        <h1 className="text-2xl font-black text-slate-900 md:text-3xl">
          ورود به پنل مدیریت
        </h1>
        <p className="mt-2 text-sm leading-7 text-slate-500">
          برای دسترسی به مدیریت اخبار، رمز عبور را وارد کنید.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/50 md:p-8"
      >
        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {error}
          </div>
        )}

        <label className="mb-2 block text-sm font-bold text-slate-700">
          رمز عبور
        </label>

        <div className="relative">
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Lock size={18} />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            autoComplete="current-password"
            placeholder="رمز عبور ادمین"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pr-12 pl-12 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label={showPassword ? "مخفی کردن رمز" : "نمایش رمز"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading || !password}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-slate-900 to-slate-800 py-3.5 text-sm font-black text-white shadow-lg shadow-slate-900/20 transition hover:from-amber-600 hover:to-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <>
              ورود به پنل
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 transition hover:text-amber-600"
        >
          <ArrowRight size={16} />
          بازگشت به سایت
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-100 via-slate-50 to-white px-4 py-12"
    >
      <Suspense
        fallback={
          <div className="text-center text-sm font-bold text-slate-500">
            در حال بارگذاری...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </main>
  );
}
