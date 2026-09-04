"use client";

import { useState } from "react";
import Link from "next/link";

type HollandType = "R" | "I" | "A" | "S" | "E" | "C";

type Question = {
  text: string;
  type: HollandType;
};

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwqdva3YX0BihDGOj_g0JRLUj_UmzKObvAKU1iIk5YGn0LbEF3XkI1yAfsTDlIpfnAWGg/exec";

const questions: Question[] = [
  {
    text: "از کار کردن با ابزار و وسایل فنی لذت می‌برم.",
    type: "R",
  },
  {
    text: "دوست دارم درباره موضوعات علمی تحقیق کنم.",
    type: "I",
  },
  {
    text: "کمک کردن به دیگران برایم لذت‌بخش است.",
    type: "S",
  },
  {
    text: "از صحبت کردن با دیگران و حضور در جمع لذت می‌برم.",
    type: "E",
  },
  {
    text: "به فعالیت‌های هنری و خلاقانه علاقه دارم.",
    type: "A",
  },
  {
    text: "از انجام کارهای دقیق و منظم لذت می‌برم.",
    type: "C",
  },
  {
    text: "ساختن یا تعمیر کردن وسایل برایم جذاب است.",
    type: "R",
  },
  {
    text: "حل مسائل پیچیده ذهنی را دوست دارم.",
    type: "I",
  },
  {
    text: "دوست دارم به دوستان و همکلاسی‌هایم کمک کنم.",
    type: "S",
  },
  {
    text: "رهبری یک گروه برایم جذاب است.",
    type: "E",
  },
  {
    text: "نوشتن، طراحی یا تولید محتوای خلاقانه را دوست دارم.",
    type: "A",
  },
  {
    text: "کار با جدول، اعداد و اطلاعات منظم را دوست دارم.",
    type: "C",
  },
];

const options = [
  {
    value: 1,
    label: "اصلاً موافق نیستم",
  },
  {
    value: 2,
    label: "کمی موافقم",
  },
  {
    value: 3,
    label: "نظری ندارم",
  },
  {
    value: 4,
    label: "موافقم",
  },
  {
    value: 5,
    label: "کاملاً موافقم",
  },
];

const hollandNames: Record<HollandType, string> = {
  R: "واقع‌گرا",
  I: "جستجوگر",
  A: "هنری",
  S: "اجتماعی",
  E: "متهور",
  C: "قراردادی",
};

const hollandDescriptions: Record<HollandType, string> = {
  R: "به فعالیت‌های عملی، فنی، ساختن، تعمیر کردن و کار با ابزار و تجهیزات علاقه دارید.",
  I: "به تحقیق، تحلیل، حل مسئله، یادگیری و کشف موضوعات علمی علاقه دارید.",
  A: "به خلاقیت، هنر، طراحی، نوشتن و بیان ایده‌های جدید علاقه دارید.",
  S: "از کمک کردن، آموزش دادن، ارتباط با دیگران و فعالیت‌های اجتماعی لذت می‌برید.",
  E: "به رهبری، مدیریت، مذاکره، اثرگذاری و فعالیت‌های رقابتی علاقه دارید.",
  C: "به نظم، دقت، برنامه‌ریزی، اطلاعات، اعداد و انجام کارهای سازمان‌یافته علاقه دارید.",
};

export default function HollandPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<HollandType[] | null>(null);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const answeredCount = Object.keys(answers).length;

  function selectAnswer(index: number, value: number) {
    setAnswers((previous) => ({
      ...previous,
      [index]: value,
    }));

    setSaved(false);
  }

  function calculateScores() {
    const scores: Record<HollandType, number> = {
      R: 0,
      I: 0,
      A: 0,
      S: 0,
      E: 0,
      C: 0,
    };

    questions.forEach((question, index) => {
      const answer = answers[index];

      if (!answer) return;

      scores[question.type] += answer;
    });

    return scores;
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

    const scores = calculateScores();

    const sorted = (
      Object.entries(scores) as [HollandType, number][]
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([type]) => type);

    setResult(sorted);

    await saveResult(sorted, scores);
  }

  async function saveResult(
    resultTypes: HollandType[],
    scores: Record<HollandType, number>
  ) {
    setSaving(true);
    setSaved(false);

    const payload = {
      type: "assessment",
      name: name.trim(),
      phone: phone.trim(),
      testType: "Holland",
      result: resultTypes.join(""),
      description: JSON.stringify({
        scores,
        answers,
        resultTypes,
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
      console.error("Holland save error:", error);

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

        {/* عنوان */}
        <div className="text-center">
          <span className="inline-block rounded-full bg-amber-50 px-5 py-2 text-sm font-bold text-amber-700">
            آزمون خودشناسی
          </span>

          <h1 className="mt-5 text-3xl font-black text-slate-900 md:text-5xl">
            آزمون هالند
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
            این آزمون به شما کمک می‌کند علایق شغلی و تحصیلی خود را
            بهتر بشناسید. برای هر سؤال گزینه‌ای را انتخاب کنید که
            بیشتر با شما مطابقت دارد.
          </p>
        </div>

        {/* اطلاعات کاربر */}
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
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
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
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-right outline-none transition focus:border-amber-500"
                />
              </div>

            </div>
          </div>
        )}

        {/* پیشرفت */}
        <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm">

          <div className="mb-3 flex items-center justify-between">

            <span className="text-sm font-bold text-slate-700">
              میزان تکمیل آزمون
            </span>

            <span className="text-sm font-bold text-amber-600">
              {answeredCount} از {questions.length}
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-100">

            <div
              className="h-full rounded-full bg-amber-500 transition-all"
              style={{
                width: `${(answeredCount / questions.length) * 100}%`,
              }}
            />

          </div>
        </div>

        {/* سوالات */}
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
                      className={`rounded-xl border-2 px-3 py-4 text-sm font-bold transition ${
                        answers[index] === option.value
                          ? "border-amber-500 bg-amber-500 text-white shadow-md"
                          : "border-slate-200 bg-white text-slate-700 hover:border-amber-400 hover:bg-amber-50"
                      }`}
                    >
                      {option.label}
                    </button>

                  ))}

                </div>

                {answers[index] && (
                  <div className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-center text-sm font-bold text-amber-700">
                    امتیاز انتخاب شما:{" "}
                    <span className="font-black">
                      {answers[index]}
                    </span>
                  </div>
                )}

              </div>

            ))}

          </div>
        )}

        {/* دکمه نتیجه */}
        {!result && (
          <div className="mt-8 text-center">

            <button
              type="button"
              onClick={calculateResult}
              disabled={saving}
              className="rounded-2xl bg-slate-900 px-10 py-4 font-black text-white shadow-lg transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "در حال ثبت نتیجه..."
                : "مشاهده نتیجه آزمون"}
            </button>

          </div>
        )}

        {/* نتیجه */}
        {result && (
          <section className="mt-10 rounded-3xl bg-slate-900 p-8 text-center text-white">

            <span className="text-sm font-bold text-amber-400">
              نتیجه آزمون هالند
            </span>

            <h2 className="mt-4 text-3xl font-black">
              تیپ‌های غالب شما
            </h2>

            <div className="mt-8 flex flex-wrap justify-center gap-4">

              {result.map((type) => (

                <div
                  key={type}
                  className="rounded-2xl bg-white px-7 py-5 text-slate-900 shadow-lg"
                >

                  <div className="text-3xl font-black text-amber-600">
                    {type}
                  </div>

                  <div className="mt-2 text-lg font-black">
                    {hollandNames[type]}
                  </div>

                  <p className="mt-3 max-w-xs text-sm leading-7 text-slate-600">
                    {hollandDescriptions[type]}
                  </p>

                </div>

              ))}

            </div>

            <p className="mx-auto mt-8 max-w-2xl leading-8 text-slate-300">
              نتیجه این آزمون بر اساس پاسخ‌های شما در شش حوزه
              اصلی هالند محاسبه شده است. برای انتخاب رشته و تصمیم
              تحصیلی بهتر، نتیجه آزمون را در کنار شرایط درسی،
              توانمندی‌ها و اهداف شخصی خود بررسی کنید.
            </p>

            {/* وضعیت ذخیره */}
            <div className="mt-6">

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
              این آزمون یک ارزیابی اولیه از علایق شماست و نباید
              به‌تنهایی مبنای انتخاب رشته یا تصمیم‌های مهم تحصیلی
              و شغلی قرار گیرد.
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