"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function PercentagePage() {
  const [total, setTotal] = useState("");
  const [correct, setCorrect] = useState("");
  const [wrong, setWrong] = useState("");
  const [blank, setBlank] = useState("");
  const [negative, setNegative] = useState(true);

  const result = useMemo(() => {
    const t = Number(total);
    const c = Number(correct);
    const w = Number(wrong);

    if (!t || t <= 0) return null;

    const answered = c + w;

    if (c < 0 || w < 0 || answered > t) {
      return null;
    }

    const unanswered = t - answered;

    const percentage = negative
      ? ((c * 3 - w) / (t * 3)) * 100
      : (c / t) * 100;

    return {
      percentage,
      unanswered,
    };
  }, [total, correct, wrong, negative]);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 px-5 py-16"
    >
      <div className="mx-auto max-w-4xl">

        {/* عنوان */}
        <div className="text-center">
          <span className="inline-block rounded-full bg-amber-50 px-5 py-2 text-sm font-bold text-amber-700">
            ابزار آموزشی
          </span>

          <h1 className="mt-6 text-3xl font-black text-slate-900 md:text-5xl">
            درصدگیر آزمون و تست
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
            درصد پاسخگویی خود را در آزمون‌ها و تست‌ها محاسبه کنید؛
            با امکان محاسبه درصد با نمره منفی یا بدون نمره منفی.
          </p>
        </div>

        {/* کارت اصلی */}
        <section className="mt-12 rounded-3xl bg-white p-6 shadow-xl sm:p-8">

          {/* تعداد سوالات */}
          <div className="grid gap-5 sm:grid-cols-2">

            <div>
              <label className="mb-2 block font-bold text-slate-800">
                تعداد کل سوالات
              </label>

              <input
                type="number"
                min="1"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                placeholder="مثلاً 50"
                className="w-full rounded-xl border border-slate-200 px-4 py-4 outline-none transition focus:border-amber-500"
              />
            </div>

            {/* درست */}
            <div>
              <label className="mb-2 block font-bold text-slate-800">
                تعداد پاسخ‌های صحیح
              </label>

              <input
                type="number"
                min="0"
                value={correct}
                onChange={(e) => setCorrect(e.target.value)}
                placeholder="مثلاً 35"
                className="w-full rounded-xl border border-slate-200 px-4 py-4 outline-none transition focus:border-amber-500"
              />
            </div>

            {/* غلط */}
            <div>
              <label className="mb-2 block font-bold text-slate-800">
                تعداد پاسخ‌های غلط
              </label>

              <input
                type="number"
                min="0"
                value={wrong}
                onChange={(e) => setWrong(e.target.value)}
                placeholder="مثلاً 10"
                className="w-full rounded-xl border border-slate-200 px-4 py-4 outline-none transition focus:border-amber-500"
              />
            </div>

            {/* بدون پاسخ */}
            <div>
              <label className="mb-2 block font-bold text-slate-800">
                تعداد نزده
              </label>

              <div className="flex min-h-[58px] items-center rounded-xl border border-slate-200 bg-slate-50 px-4 font-bold text-slate-700">
                {result ? result.unanswered : "—"}
              </div>
            </div>

          </div>

          {/* نمره منفی */}
          <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">

            <label className="flex cursor-pointer items-center gap-4">

              <input
                type="checkbox"
                checked={negative}
                onChange={(e) => setNegative(e.target.checked)}
                className="h-5 w-5 accent-amber-500"
              />

              <div>
                <div className="font-black text-slate-900">
                  محاسبه با نمره منفی
                </div>

                <div className="mt-1 text-sm text-slate-500">
                  هر ۳ پاسخ غلط، یک پاسخ صحیح را خنثی می‌کند.
                </div>
              </div>

            </label>
          </div>

          {/* نتیجه */}
          <div className="mt-8 rounded-3xl bg-slate-900 p-8 text-center text-white">

            <div className="text-sm font-bold text-amber-400">
              درصد آزمون
            </div>

            <div className="mt-3 text-5xl font-black">
              {result
                ? `${result.percentage.toFixed(2)}٪`
                : "—"}
            </div>

            {result && (
              <div className="mt-5 text-sm text-slate-300">
                {negative
                  ? "درصد با احتساب نمره منفی محاسبه شده است."
                  : "درصد بدون احتساب نمره منفی محاسبه شده است."}
              </div>
            )}

          </div>

          {/* توضیح */}
          <div className="mt-8 rounded-2xl bg-amber-50 p-5 text-sm leading-8 text-amber-900">
            <strong>فرمول محاسبه:</strong>

            <br />

            {negative
              ? "درصد = ((تعداد صحیح × ۳) − تعداد غلط) ÷ (تعداد کل × ۳) × ۱۰۰"
              : "درصد = تعداد صحیح ÷ تعداد کل × ۱۰۰"}
          </div>

        </section>

        {/* لینک برگشت */}
        <div className="mt-8 text-center">

          <Link
            href="/"
            className="inline-flex rounded-xl bg-slate-900 px-7 py-3 font-bold text-white transition hover:bg-amber-500"
          >
            بازگشت به صفحه اصلی
          </Link>

        </div>

      </div>
    </main>
  );
}