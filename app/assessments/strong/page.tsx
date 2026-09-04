"use client";

import { useState } from "react";
import Link from "next/link";

type StrongType = "Realistic" | "Investigative" | "Artistic" | "Social" | "Enterprising" | "Conventional";

type Question = {
  text: string;
  type: StrongType;
};

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwqdva3YX0BihDGOj_g0JRLUj_UmzKObvAKU1iIk5YGn0LbEF3XkI1yAfsTDlIpfnAWGg/exec";

const questions: Question[] = [
  { text: "از کار کردن با ابزار و تجهیزات فنی لذت می‌برم.", type: "Realistic" },
  { text: "از تحقیق و پیدا کردن پاسخ مسائل پیچیده لذت می‌برم.", type: "Investigative" },
  { text: "از طراحی، نقاشی یا فعالیت‌های خلاقانه لذت می‌برم.", type: "Artistic" },
  { text: "از آموزش دادن و کمک کردن به دیگران لذت می‌برم.", type: "Social" },
  { text: "از رهبری گروه و متقاعد کردن دیگران لذت می‌برم.", type: "Enterprising" },
  { text: "از مرتب کردن اطلاعات و کارهای دقیق اداری لذت می‌برم.", type: "Conventional" },

  { text: "ساختن یا تعمیر وسایل برایم جذاب است.", type: "Realistic" },
  { text: "حل مسائل علمی و منطقی برایم جذاب است.", type: "Investigative" },
  { text: "نوشتن داستان یا تولید محتوای خلاقانه را دوست دارم.", type: "Artistic" },
  { text: "از کار گروهی و ارتباط با افراد مختلف لذت می‌برم.", type: "Social" },
  { text: "به مدیریت پروژه‌ها و تصمیم‌گیری علاقه دارم.", type: "Enterprising" },
  { text: "از برنامه‌ریزی و سازمان‌دهی اطلاعات لذت می‌برم.", type: "Conventional" },

  { text: "کارهای عملی و فنی را به کارهای کاملاً نظری ترجیح می‌دهم.", type: "Realistic" },
  { text: "دوست دارم درباره موضوعات علمی بیشتر بدانم.", type: "Investigative" },
  { text: "به موسیقی، هنر و فعالیت‌های زیبایی‌شناختی علاقه دارم.", type: "Artistic" },
  { text: "از مشورت دادن و حمایت از دیگران لذت می‌برم.", type: "Social" },
  { text: "دوست دارم مسئولیت یک گروه را بر عهده بگیرم.", type: "Enterprising" },
  { text: "از کار با اعداد، جدول‌ها و اطلاعات منظم لذت می‌برم.", type: "Conventional" },

  { text: "کار با ماشین‌آلات یا تجهیزات برایم جذاب است.", type: "Realistic" },
  { text: "از آزمایش کردن و کشف روش‌های جدید لذت می‌برم.", type: "Investigative" },
  { text: "دوست دارم ایده‌های خودم را به شکل خلاقانه بیان کنم.", type: "Artistic" },
  { text: "از برقراری ارتباط و همکاری با دیگران انرژی می‌گیرم.", type: "Social" },
  { text: "به کسب‌وکار، فروش و مذاکره علاقه دارم.", type: "Enterprising" },
  { text: "دوست دارم کارها را مرحله‌به‌مرحله و منظم انجام دهم.", type: "Conventional" },
];

const options = [
  { value: 1, label: "اصلاً علاقه ندارم" },
  { value: 2, label: "کم علاقه‌ام" },
  { value: 3, label: "تاحدی علاقه دارم" },
  { value: 4, label: "علاقه دارم" },
  { value: 5, label: "خیلی علاقه دارم" },
];

const typeNames: Record<StrongType, string> = {
  Realistic: "واقع‌گرا و عملی",
  Investigative: "تحقیقاتی و علمی",
  Artistic: "هنری و خلاق",
  Social: "اجتماعی و یاری‌رسان",
  Enterprising: "کارآفرین و مدیریتی",
  Conventional: "منظم و سازمان‌یافته",
};

const typeDescriptions: Record<StrongType, string> = {
  Realistic:
    "به فعالیت‌های عملی، فنی، ساختن، تعمیر کردن و کار با ابزار و تجهیزات علاقه دارید.",
  Investigative:
    "به تحقیق، تحلیل، حل مسئله، علوم و کشف موضوعات جدید علاقه بیشتری دارید.",
  Artistic:
    "به خلاقیت، هنر، طراحی، نوشتن و بیان ایده‌ها به شیوه‌های متفاوت علاقه دارید.",
  Social:
    "از آموزش، کمک کردن، ارتباط با دیگران و فعالیت‌های گروهی لذت می‌برید.",
  Enterprising:
    "به رهبری، مدیریت، مذاکره، کسب‌وکار و تأثیرگذاری بر دیگران علاقه دارید.",
  Conventional:
    "به نظم، برنامه‌ریزی، اطلاعات، اعداد و انجام دقیق و ساختاریافته کارها علاقه دارید.",
};

export default function StrongPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<StrongType[] | null>(null);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const answeredCount = Object.keys(answers).length;

  function selectAnswer(index: number, value: number) {
    setAnswers((previous) => ({
      ...previous,
      [index]: value,
    }));
  }

  async function calculateResult() {
    if (!name.trim()) {
      alert("لطفاً نام و نام خانوادگی را وارد کنید.");
      return;
    }

    if (!phone.trim()) {
      alert("لطفاً شماره موبایل را وارد کنید.");
      return;
    }

    if (answeredCount !== questions.length) {
      alert("لطفاً به همه سوالات پاسخ دهید.");
      return;
    }

    const scores: Record<StrongType, number> = {
      Realistic: 0,
      Investigative: 0,
      Artistic: 0,
      Social: 0,
      Enterprising: 0,
      Conventional: 0,
    };

    questions.forEach((question, index) => {
      scores[question.type] += answers[index] || 0;
    });

    const sorted = (Object.entries(scores) as [StrongType, number][])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([type]) => type);

    setResult(sorted);

    await saveResult(sorted, scores);
  }

  async function saveResult(
    resultTypes: StrongType[],
    scores: Record<StrongType, number>
  ) {
    setSaving(true);
    setSaved(false);

    const payload = {
      type: "assessment",
      name: name.trim(),
      phone: phone.trim(),
      testType: "Strong",
      result: resultTypes.map((type) => typeNames[type]).join(" | "),
      description: JSON.stringify({
        scores,
        resultTypes,
        resultNames: resultTypes.map((type) => typeNames[type]),
        answers,
      }),
    };

    try {
      /*
       * همان روش موفق MBTI:
       * JSON + no-cors تا از خطای CORS و پارس form جلوگیری شود.
       * به دلیل no-cors پاسخ خوانده نمی‌شود؛ اگر خطای شبکه نباشد، ارسال شده است.
       */
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      setSaved(true);
    } catch (error) {
      console.error("Strong save error:", error);

      setSaved(false);

      alert(
        "نتیجه آزمون محاسبه شد، اما ارسال اطلاعات به Google Sheets با مشکل مواجه شد."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 px-5 py-12"
    >
      <div className="mx-auto max-w-4xl">

        <div className="text-center">
          <span className="inline-block rounded-full bg-purple-50 px-5 py-2 text-sm font-bold text-purple-700">
            آزمون خودشناسی
          </span>

          <h1 className="mt-5 text-3xl font-black text-slate-900 md:text-5xl">
            ارزیابی علایق شغلی
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
            این ارزیابی با الهام از چارچوب علایق شغلی شش‌گانه طراحی شده
            و به شما کمک می‌کند زمینه‌های شغلی مورد علاقه خود را بهتر بشناسید.
          </p>
        </div>

        {!result && (
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-900">
              اطلاعات شما
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  نام و نام خانوادگی
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثلاً علی رضایی"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-purple-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  شماره موبایل
                </label>

                <input
                  type="tel"
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09123456789"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-right outline-none transition focus:border-purple-500"
                />
              </div>

            </div>
          </div>
        )}

        <div className="mt-10 rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700">
              میزان تکمیل آزمون
            </span>

            <span className="text-sm font-bold text-purple-600">
              {answeredCount} از {questions.length}
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-purple-600 transition-all"
              style={{
                width: `${(answeredCount / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {!result && (
          <div className="mt-8 space-y-5">

            {questions.map((question, index) => (
              <div
                key={index}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex gap-3">

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-black text-white">
                    {index + 1}
                  </span>

                  <h2 className="pt-1 text-lg font-black leading-8 text-slate-900">
                    {question.text}
                  </h2>

                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-5">

                  {options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        selectAnswer(index, option.value)
                      }
                      className={`rounded-xl border px-3 py-3 text-sm font-bold transition ${
                        answers[index] === option.value
                          ? "border-purple-600 bg-purple-600 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-purple-400 hover:bg-purple-50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}

                </div>
              </div>
            ))}

          </div>
        )}

        {!result && (
          <div className="mt-8 text-center">

            <button
              type="button"
              onClick={calculateResult}
              disabled={saving}
              className="rounded-2xl bg-slate-900 px-10 py-4 font-black text-white shadow-lg transition hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "در حال ثبت نتیجه..."
                : "مشاهده نتیجه آزمون"}
            </button>

          </div>
        )}

        {result && (
          <section className="mt-10 rounded-3xl bg-slate-900 p-8 text-center text-white">

            <span className="text-sm font-bold text-purple-400">
              نتیجه ارزیابی علایق شغلی
            </span>

            <h2 className="mt-4 text-3xl font-black">
              سه زمینه شغلی غالب شما
            </h2>

            <div className="mt-8 flex flex-wrap justify-center gap-4">

              {result.map((type) => (
                <div
                  key={type}
                  className="rounded-2xl bg-white px-6 py-5 text-slate-900"
                >
                  <div className="text-xl font-black">
                    {typeNames[type]}
                  </div>
                </div>
              ))}

            </div>

            <div className="mx-auto mt-8 max-w-2xl space-y-4">

              {result.map((type) => (
                <div
                  key={type}
                  className="rounded-2xl bg-slate-800 p-5 text-right"
                >
                  <h3 className="font-black text-purple-400">
                    {typeNames[type]}
                  </h3>

                  <p className="mt-2 leading-7 text-slate-300">
                    {typeDescriptions[type]}
                  </p>
                </div>
              ))}

            </div>

            <div className="mt-8">

              {saving && (
                <p className="text-sm text-amber-300">
                  در حال ذخیره نتیجه آزمون...
                </p>
              )}

              {saved && (
                <p className="font-bold text-green-400">
                  ✓ نتیجه آزمون با موفقیت ثبت شد.
                </p>
              )}

              {!saving && !saved && (
                <p className="text-sm text-red-300">
                  ذخیره نتیجه انجام نشد.
                </p>
              )}

            </div>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400">
              این ارزیابی برای شناخت اولیه علایق شغلی طراحی شده است.
              برای انتخاب رشته و تصمیم‌های مهم تحصیلی، بهتر است نتیجه
              در کنار شرایط فردی، توانایی‌ها و نظر مشاور بررسی شود.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                href="/#reservation"
                className="rounded-xl bg-amber-500 px-7 py-3 font-black text-white transition hover:bg-amber-600"
              >
                دریافت مشاوره
              </Link>

              <Link
                href="/assessments"
                className="rounded-xl border border-slate-600 px-7 py-3 font-bold text-white transition hover:bg-slate-800"
              >
                سایر آزمون‌ها
              </Link>

            </div>

          </section>
        )}

      </div>
    </main>
  );
}