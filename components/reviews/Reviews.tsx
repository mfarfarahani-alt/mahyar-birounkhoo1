"use client";

import { FormEvent, useEffect, useState } from "react";
import { MessageSquareQuote, Send, Star, CheckCircle, UserRound } from "lucide-react";

type Review = {
  id: string;
  name: string;
  rating: number;
  review: string;
  service?: string;
  createdAt?: string;
};

const ratingLabels = ["", "ضعیف", "قابل قبول", "خوب", "خیلی خوب", "عالی"];

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    rating: 5,
    review: "",
    service: "",
  });

  async function loadReviews() {
    try {
      setLoadingReviews(true);
      const response = await fetch("/api/reviews?_=" + Date.now(), {
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || "دریافت نظرات با مشکل مواجه شد.");
      }
      setReviews(Array.isArray(data?.reviews) ? data.reviews : []);
    } catch (err) {
      console.error("Reviews loading error:", err);
      setReviews([]);
    } finally {
      setLoadingReviews(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  async function submitReview(event: FormEvent) {
    event.preventDefault();
    setSuccess("");
    setError("");

    const name = form.name.trim();
    const review = form.review.trim();

    if (!name || !review) {
      setError("لطفاً نام و متن نظر را وارد کنید.");
      return;
    }

    if (name.length > 80 || review.length > 1000) {
      setError("طول نام یا متن نظر بیش از حد مجاز است.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          rating: form.rating,
          review,
          service: form.service,
        }),
      });

      const data = await response.json();

      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || "ثبت نظر انجام نشد.");
      }

      setForm({
        name: "",
        rating: 5,
        review: "",
        service: "",
      });
      setSuccess(
        "نظر شما با موفقیت ثبت شد و پس از بررسی مدیریت در سایت نمایش داده می‌شود."
      );
    } catch (err) {
      console.error("Review submit error:", err);
      setError(
        err instanceof Error ? err.message : "ثبت نظر با مشکل مواجه شد."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="reviews"
      dir="rtl"
      className="border-t border-slate-100 bg-white px-5 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700">
            <MessageSquareQuote size={17} />
            نظرات مراجعان
          </span>
          <h2 className="mt-5 text-3xl font-black text-[#0b1f3a] md:text-4xl">
            تجربه دانش‌آموزان و خانواده‌ها
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            اگر از خدمات مشاوره استفاده کرده‌اید، تجربه خود را با ما و سایر
            دانش‌آموزان به اشتراک بگذارید.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            {loadingReviews ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-44 animate-pulse rounded-3xl border border-slate-200 bg-slate-50"
                  />
                ))}
              </div>
            ) : reviews.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                <UserRound className="mx-auto text-slate-400" size={32} />
                <h3 className="mt-4 text-lg font-black text-slate-800">
                  هنوز نظری منتشر نشده است
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-500">
                  اولین تجربه خود را ثبت کنید تا پس از تأیید مدیریت در این بخش
                  نمایش داده شود.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {reviews.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="font-black text-slate-900">
                          {item.name}
                        </h3>
                        {item.service && (
                          <span className="mt-1 inline-block text-xs font-bold text-slate-500">
                            {item.service}
                          </span>
                        )}
                      </div>
                      <div
                        className="flex items-center gap-0.5 text-amber-500"
                        aria-label={`امتیاز ${item.rating} از 5`}
                      >
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            size={15}
                            fill={index < item.rating ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-5 text-sm leading-8 text-slate-600">
                      «{item.review}»
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={submitReview}
            className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8"
          >
            <h3 className="text-xl font-black text-[#0b1f3a]">
              نظر خود را ثبت کنید
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-500">
              نظرات قبل از انتشار توسط مدیریت بررسی می‌شوند.
            </p>

            <label className="mt-6 block text-sm font-bold text-slate-700">
              نام و نام خانوادگی *
              <input
                value={form.name}
                onChange={(e) =>
                  setForm((previous) => ({ ...previous, name: e.target.value }))
                }
                maxLength={80}
                placeholder="نام شما"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
              />
            </label>

            <div className="mt-5">
              <span className="block text-sm font-bold text-slate-700">
                امتیاز شما
              </span>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex rounded-2xl border border-slate-200 bg-white p-2">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const value = index + 1;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setForm((previous) => ({ ...previous, rating: value }))
                        }
                        className="rounded-lg p-1.5 transition hover:bg-amber-50"
                        aria-label={`${ratingLabels[value]}، ${value} از 5`}
                      >
                        <Star
                          size={22}
                          className={
                            value <= form.rating
                              ? "text-amber-500"
                              : "text-slate-300"
                          }
                          fill={value <= form.rating ? "currentColor" : "none"}
                        />
                      </button>
                    );
                  })}
                </div>
                <span className="text-xs font-bold text-slate-500">
                  {ratingLabels[form.rating]}
                </span>
              </div>
            </div>

            <label className="mt-5 block text-sm font-bold text-slate-700">
              نوع خدمت
              <select
                value={form.service}
                onChange={(e) =>
                  setForm((previous) => ({
                    ...previous,
                    service: e.target.value,
                  }))
                }
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
              >
                <option value="">انتخاب کنید</option>
                <option value="مشاوره تحصیلی">مشاوره تحصیلی</option>
                <option value="برنامه‌ریزی کنکور">برنامه‌ریزی کنکور</option>
                <option value="هدایت تحصیلی">هدایت تحصیلی</option>
                <option value="انتخاب رشته">انتخاب رشته</option>
                <option value="آزمون‌های خودشناسی">آزمون‌های خودشناسی</option>
              </select>
            </label>

            <label className="mt-5 block text-sm font-bold text-slate-700">
              متن نظر *
              <textarea
                value={form.review}
                onChange={(e) =>
                  setForm((previous) => ({
                    ...previous,
                    review: e.target.value,
                  }))
                }
                maxLength={1000}
                rows={5}
                placeholder="تجربه خود را بنویسید..."
                className="mt-2 w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm leading-7 text-slate-900 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
              />
              <span className="mt-1 block text-left text-xs text-slate-400">
                {form.review.length}/1000
              </span>
            </label>

            {error && (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold leading-7 text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold leading-7 text-emerald-700">
                <CheckCircle className="mt-0.5 shrink-0" size={20} />
                <span>{success}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="site-primary-button mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 font-black shadow-lg transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={18} />
              {submitting ? "در حال ثبت..." : "ثبت نظر"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
