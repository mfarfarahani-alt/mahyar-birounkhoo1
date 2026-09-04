"use client";

import { useState } from "react";
import Link from "next/link";

type Dimension = "EI" | "SN" | "TF" | "JP";

type Question = {
  text: string;
  dimension: Dimension;
  first: string;
  second: string;
  firstLabel: string;
  secondLabel: string;
};

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwqdva3YX0BihDGOj_g0JRLUj_UmzKObvAKU1iIk5YGn0LbEF3XkI1yAfsTDlIpfnAWGg/exec";

const questions: Question[] = [
  {
    text: "در یک جمع جدید معمولاً خودم شروع به صحبت با دیگران می‌کنم.",
    dimension: "EI",
    first: "E",
    second: "I",
    firstLabel: "برون‌گرایی — این ویژگی بیشتر شبیه من است",
    secondLabel: "درون‌گرایی — این ویژگی بیشتر شبیه من است",
  },
  {
    text: "بعد از یک روز شلوغ، ترجیح می‌دهم زمانی را به تنهایی بگذرانم.",
    dimension: "EI",
    first: "I",
    second: "E",
    firstLabel: "درون‌گرایی — این ویژگی بیشتر شبیه من است",
    secondLabel: "برون‌گرایی — این ویژگی بیشتر شبیه من است",
  },
  {
    text: "از آشنایی با افراد جدید انرژی می‌گیرم.",
    dimension: "EI",
    first: "E",
    second: "I",
    firstLabel: "برون‌گرایی — این ویژگی بیشتر شبیه من است",
    secondLabel: "درون‌گرایی — این ویژگی بیشتر شبیه من است",
  },
  {
    text: "قبل از صحبت کردن، معمولاً افکارم را در ذهنم مرتب می‌کنم.",
    dimension: "EI",
    first: "I",
    second: "E",
    firstLabel: "درون‌گرایی — این ویژگی بیشتر شبیه من است",
    secondLabel: "برون‌گرایی — این ویژگی بیشتر شبیه من است",
  },

  {
    text: "بیشتر به واقعیت‌ها و اطلاعات قابل مشاهده توجه می‌کنم.",
    dimension: "SN",
    first: "S",
    second: "N",
    firstLabel: "حسی — توجه به واقعیت‌ها و جزئیات",
    secondLabel: "شهودی — توجه به ایده‌ها و احتمالات",
  },
  {
    text: "معمولاً به ایده‌ها و احتمالات آینده فکر می‌کنم.",
    dimension: "SN",
    first: "N",
    second: "S",
    firstLabel: "شهودی — توجه به ایده‌ها و احتمالات",
    secondLabel: "حسی — توجه به واقعیت‌ها و جزئیات",
  },
  {
    text: "هنگام یادگیری، مثال‌های واقعی برایم بسیار مفید هستند.",
    dimension: "SN",
    first: "S",
    second: "N",
    firstLabel: "حسی — یادگیری با مثال‌های واقعی",
    secondLabel: "شهودی — یادگیری با ایده‌ها و مفاهیم",
  },
  {
    text: "از تصور کردن راه‌های جدید برای انجام یک کار لذت می‌برم.",
    dimension: "SN",
    first: "N",
    second: "S",
    firstLabel: "شهودی — علاقه به راه‌های جدید و ایده‌ها",
    secondLabel: "حسی — علاقه به روش‌های عملی و مشخص",
  },

  {
    text: "هنگام تصمیم‌گیری بیشتر به منطق و دلایل توجه می‌کنم.",
    dimension: "TF",
    first: "T",
    second: "F",
    firstLabel: "منطقی — تصمیم‌گیری بر اساس منطق و شواهد",
    secondLabel: "احساسی — تصمیم‌گیری با توجه به ارزش‌ها و احساسات",
  },
  {
    text: "احساسات و شرایط افراد در تصمیم‌های من تأثیر زیادی دارد.",
    dimension: "TF",
    first: "F",
    second: "T",
    firstLabel: "احساسی — توجه به احساسات و شرایط افراد",
    secondLabel: "منطقی — توجه به منطق و دلایل",
  },
  {
    text: "در بحث‌ها ترجیح می‌دهم موضوع بر اساس منطق بررسی شود.",
    dimension: "TF",
    first: "T",
    second: "F",
    firstLabel: "منطقی — بررسی موضوع با استدلال",
    secondLabel: "احساسی — توجه به اثر موضوع بر افراد",
  },
  {
    text: "برایم مهم است که تصمیم من باعث ناراحتی دیگران نشود.",
    dimension: "TF",
    first: "F",
    second: "T",
    firstLabel: "احساسی — توجه به احساسات دیگران",
    secondLabel: "منطقی — اولویت دادن به منطق تصمیم",
  },

  {
    text: "دوست دارم برنامه روزانه مشخصی داشته باشم.",
    dimension: "JP",
    first: "J",
    second: "P",
    firstLabel: "قضاوت‌گر — علاقه به برنامه و ساختار مشخص",
    secondLabel: "ادراکی — علاقه به انعطاف و آزادی عمل",
  },
  {
    text: "ترجیح می‌دهم برنامه‌ها را در صورت نیاز تغییر دهم.",
    dimension: "JP",
    first: "P",
    second: "J",
    firstLabel: "ادراکی — علاقه به انعطاف و تغییر",
    secondLabel: "قضاوت‌گر — علاقه به برنامه و ساختار",
  },
  {
    text: "وقتی کاری را شروع می‌کنم، دوست دارم آن را طبق برنامه تمام کنم.",
    dimension: "JP",
    first: "J",
    second: "P",
    firstLabel: "قضاوت‌گر — پایبندی به برنامه و تکمیل کار",
    secondLabel: "ادراکی — انعطاف در روند انجام کار",
  },
  {
    text: "انعطاف داشتن برایم مهم‌تر از داشتن یک برنامه کاملاً ثابت است.",
    dimension: "JP",
    first: "P",
    second: "J",
    firstLabel: "ادراکی — انعطاف و آزادی در برنامه",
    secondLabel: "قضاوت‌گر — نظم و برنامه‌ریزی مشخص",
  },
];

const typeDescriptions: Record<string, string> = {
  ISTJ:
    "منظم، مسئولیت‌پذیر و دقیق. معمولاً به ساختار، وظیفه و انجام صحیح کارها اهمیت زیادی می‌دهید.",
  ISFJ:
    "مسئول، حمایتگر و دقیق. معمولاً به نیازهای دیگران توجه زیادی دارید و در انجام وظایف قابل اعتماد هستید.",
  INFJ:
    "عمیق، هدفمند و همدل. معمولاً به معنا، رشد فردی و کمک به دیگران اهمیت می‌دهید.",
  INTJ:
    "تحلیلگر، مستقل و هدفمند. معمولاً از برنامه‌ریزی، حل مسئله و رسیدن به اهداف بلندمدت لذت می‌برید.",
  ISTP:
    "عمل‌گرا، منطقی و انعطاف‌پذیر. معمولاً در حل مسائل عملی عملکرد خوبی دارید.",
  ISFP:
    "آرام، انعطاف‌پذیر و حساس به زیبایی. معمولاً به تجربه‌های شخصی و ارزش‌های فردی اهمیت می‌دهید.",
  INFP:
    "ارزش‌محور، خلاق و همدل. معمولاً به معنا، ارزش‌های انسانی و کمک به دیگران علاقه‌مند هستید.",
  INTP:
    "تحلیلگر، کنجکاو و منطقی. معمولاً از کشف ایده‌ها و حل مسائل پیچیده لذت می‌برید.",
  ESTP:
    "پرانرژی، عمل‌گرا و سریع در تصمیم‌گیری. معمولاً از تجربه‌های جدید و حل مسائل در لحظه استقبال می‌کنید.",
  ESFP:
    "اجتماعی، پرانرژی و تجربه‌گرا. معمولاً از تعامل با دیگران و ایجاد فضای مثبت لذت می‌برید.",
  ENFP:
    "خلاق، پرانرژی و ایده‌پرداز. معمولاً از کشف فرصت‌های جدید و ارتباط با دیگران لذت می‌برید.",
  ENTP:
    "نوآور، کنجکاو و اهل چالش. معمولاً از بررسی ایده‌های مختلف و حل مسائل جدید لذت می‌برید.",
  ESTJ:
    "منظم، مسئول و نتیجه‌گرا. معمولاً در سازماندهی و مدیریت فعالیت‌ها توانمند هستید.",
  ESFJ:
    "اجتماعی، مسئول و حمایتگر. معمولاً به همکاری و ایجاد روابط مثبت اهمیت می‌دهید.",
  ENFJ:
    "اجتماعی، همدل و الهام‌بخش. معمولاً در ارتباط با دیگران و کمک به رشد آنها توانمند هستید.",
  ENTJ:
    "هدفمند، قاطع و سازمان‌دهنده. معمولاً از رهبری، برنامه‌ریزی و رسیدن به اهداف بزرگ لذت می‌برید.",
};

const dimensionNames: Record<string, string> = {
  E: "برون‌گرایی",
  I: "درون‌گرایی",
  S: "حسی",
  N: "شهودی",
  T: "منطقی",
  F: "احساسی",
  J: "قضاوت‌گر",
  P: "ادراکی",
};

export default function MBTIPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const answeredCount = Object.keys(answers).length;

  function selectAnswer(index: number, value: string) {
    setAnswers((previous) => ({
      ...previous,
      [index]: value,
    }));

    setSaved(false);
  }

  function calculateScores() {
    const scores: Record<string, number> = {
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0,
    };

    questions.forEach((question, index) => {
      const answer = answers[index];

      if (answer) {
        scores[answer] += 1;
      }
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

    const personality =
      (scores.E >= scores.I ? "E" : "I") +
      (scores.S >= scores.N ? "S" : "N") +
      (scores.T >= scores.F ? "T" : "F") +
      (scores.J >= scores.P ? "J" : "P");

    setResult(personality);

    await saveResult(personality, scores);
  }

  async function saveResult(
    personality: string,
    scores: Record<string, number>
  ) {
    setSaving(true);
    setSaved(false);

    const payload = {
      type: "assessment",
      name: name.trim(),
      phone: phone.trim(),
      testType: "MBTI",
      result: personality,
      description: JSON.stringify({
        scores,
        answers,
      }),
    };

    try {
      /*
       * مهم:
       * Google Apps Script در doPost فعلی JSON دریافت می‌کند.
       * بنابراین اینجا نیز دقیقاً JSON ارسال می‌کنیم.
       */
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      /*
       * به دلیل no-cors امکان خواندن response گوگل وجود ندارد.
       * اگر fetch بدون خطای شبکه تمام شود، درخواست ارسال شده است.
       */
      setSaved(true);
    } catch (error) {
      console.error("MBTI save error:", error);

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
          <span className="inline-block rounded-full bg-blue-50 px-5 py-2 text-sm font-bold text-blue-700">
            آزمون خودشناسی
          </span>

          <h1 className="mt-5 text-3xl font-black text-slate-900 md:text-5xl">
            آزمون MBTI
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
            برای شروع آزمون، نام و شماره موبایل خود را وارد کنید.
            سپس در هر سؤال، گزینه‌ای را انتخاب کنید که بیشتر با
            شخصیت و رفتار شما مطابقت دارد.
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
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
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
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-right outline-none transition focus:border-blue-500"
                />
              </div>

            </div>
          </div>
        )}

        {/* نوار پیشرفت */}
        <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700">
              میزان تکمیل آزمون
            </span>

            <span className="text-sm font-bold text-blue-600">
              {answeredCount} از {questions.length}
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
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

                <div className="mt-6 grid gap-4 md:grid-cols-2">

                  {/* گزینه اول */}
                  <button
                    type="button"
                    onClick={() =>
                      selectAnswer(index, question.first)
                    }
                    className={`min-h-28 rounded-2xl border-2 p-5 text-right transition ${
                      answers[index] === question.first
                        ? "border-blue-600 bg-blue-600 text-white shadow-lg"
                        : "border-slate-200 bg-white text-slate-800 hover:border-blue-400 hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">

                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-black ${
                          answers[index] === question.first
                            ? "bg-white/20 text-white"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {question.first}
                      </span>

                      <span className="text-xs font-bold opacity-70">
                        انتخاب اول
                      </span>
                    </div>

                    <div className="mt-4 text-base font-black leading-7">
                      {question.firstLabel}
                    </div>
                  </button>

                  {/* گزینه دوم */}
                  <button
                    type="button"
                    onClick={() =>
                      selectAnswer(index, question.second)
                    }
                    className={`min-h-28 rounded-2xl border-2 p-5 text-right transition ${
                      answers[index] === question.second
                        ? "border-blue-600 bg-blue-600 text-white shadow-lg"
                        : "border-slate-200 bg-white text-slate-800 hover:border-blue-400 hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">

                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-black ${
                          answers[index] === question.second
                            ? "bg-white/20 text-white"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {question.second}
                      </span>

                      <span className="text-xs font-bold opacity-70">
                        انتخاب دوم
                      </span>
                    </div>

                    <div className="mt-4 text-base font-black leading-7">
                      {question.secondLabel}
                    </div>
                  </button>

                </div>

                {answers[index] && (
                  <div className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-center text-sm font-bold text-blue-700">
                    انتخاب شما:{" "}
                    <span className="font-black">
                      {answers[index]}
                    </span>{" "}
                    — {dimensionNames[answers[index]]}
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
              className="rounded-2xl bg-slate-900 px-10 py-4 font-black text-white shadow-lg transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
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

            <span className="text-sm font-bold text-blue-400">
              نتیجه آزمون MBTI
            </span>

            <h2 className="mt-4 text-5xl font-black tracking-widest">
              {result}
            </h2>

            <div className="mt-6 flex flex-wrap justify-center gap-3">

              {result.split("").map((letter, index) => (
                <div
                  key={`${letter}-${index}`}
                  className="rounded-xl bg-white/10 px-4 py-2"
                >
                  <span className="font-black text-blue-400">
                    {letter}
                  </span>

                  <span className="mr-2 text-sm text-slate-300">
                    {dimensionNames[letter]}
                  </span>
                </div>
              ))}

            </div>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              {typeDescriptions[result]}
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
              این نتیجه یک ارزیابی اولیه از ترجیحات شخصیتی شماست
              و نباید به‌تنهایی مبنای انتخاب رشته یا تصمیم‌های
              مهم تحصیلی و شغلی قرار گیرد.
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