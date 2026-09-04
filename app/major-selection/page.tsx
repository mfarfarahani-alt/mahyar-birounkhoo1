import type { Metadata } from "next";
import Link from "next/link";
import {
  Compass,
  Brain,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  AlertTriangle,
  Phone,
  ArrowLeft,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "انتخاب رشته کنکور | هدایت تحصیلی اصولی",
  description:
    "انتخاب رشته کنکور بر اساس علاقه، استعداد و بازار کار. هدایت تحصیلی تخصصی با آزمون‌های خودشناسی و مشاوره مهیار بیرون‌خو.",
  keywords: [
    "انتخاب رشته کنکور",
    "هدایت تحصیلی",
    "انتخاب رشته",
    "مشاوره انتخاب رشته",
    "آزمون هالند",
    "آزمون MBTI",
    "مهیار بیرون‌خو",
  ],
  openGraph: {
    title: "انتخاب رشته کنکور | هدایت تحصیلی اصولی | مهیار بیرون‌خو",
    description:
      "انتخاب رشته کنکور بر اساس علاقه، استعداد و بازار کار با آزمون‌های خودشناسی و مشاوره تخصصی.",
    locale: "fa_IR",
    type: "website",
    url: "https://www.mahyar-bironkhu.ir/major-selection",
  },
};

const criteria = [
  {
    icon: HeartIcon,
    title: "علاقه واقعی",
    text: "رشته‌ای که با آن ارتباط دارید پایدارتر است و انگیزه مطالعه و ادامه مسیر را حفظ می‌کند.",
  },
  {
    icon: Brain,
    title: "استعداد و توانمندی",
    text: "نقاط قوت درسی و مهارت‌های فردی مشخص می‌کنند در کدام مسیر احتمال موفقیت بالاتر است.",
  },
  {
    icon: Target,
    title: "رتبه و واقعیت کنکور",
    text: "انتخاب باید با بازه رتبه قابل دستیابی هماهنگ باشد تا تصمیم‌گیری منطقی بماند.",
  },
  {
    icon: Briefcase,
    title: "بازار کار و آینده",
    text: "آگاهی از مسیر شغلی، ادامه تحصیل و شرایط واقعی هر رشته بخشی از انتخاب آگاهانه است.",
  },
];

function HeartIcon(props: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

const tests = [
  {
    title: "آزمون هالند",
    href: "/assessments?test=holland",
    desc: "شناخت علایق شغلی و تحصیلی بر اساس الگوی RIASEC",
    emoji: "🎯",
  },
  {
    title: "آزمون MBTI",
    href: "/assessments?test=mbti",
    desc: "آشنایی با ترجیحات شخصیتی و سبک تصمیم‌گیری",
    emoji: "🧠",
  },
  {
    title: "آزمون استرانگ",
    href: "/assessments?test=strong",
    desc: "بررسی علایق حرفه‌ای برای مسیر تحصیلی و شغلی",
    emoji: "🏆",
  },
];

export default function MajorSelectionPage() {
  return (
    <main dir="rtl" className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0F172A] px-5 py-16 md:py-20">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-700/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-5 inline-block rounded-full border border-amber-400/35 bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-300">
            هدایت تحصیلی و انتخاب رشته
          </span>
          <h1 className="text-3xl font-black leading-[1.6] text-white sm:text-4xl md:text-5xl">
            انتخاب رشته کنکور
            <br />
            <span className="text-amber-400">با شناخت، نه با حدس</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            انتخاب رشته یکی از مهم‌ترین تصمیم‌های مسیر تحصیلی است. با ترکیب علاقه،
            استعداد، رتبه و بازار کار، مسیری انتخاب می‌کنید که هم قابل دستیابی باشد
            و هم با شما سازگار.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/#reservation"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 font-bold text-white shadow-xl shadow-amber-500/20 transition hover:-translate-y-0.5 hover:bg-amber-600"
            >
              <Phone size={18} />
              رزرو مشاوره انتخاب رشته
            </a>
            <Link
              href="/assessments"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 font-bold text-white transition hover:border-amber-400/40 hover:bg-white/10"
            >
              آزمون‌های خودشناسی
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
            چرا انتخاب رشته درست مهم است؟
          </h2>
          <p className="mt-5 leading-8 text-slate-600">
            انتخاب عجولانه یا فقط بر اساس اسم رشته و فشار اطرافیان، اغلب به
            نارضایتی، افت انگیزه یا تغییر مسیر پرهزینه منجر می‌شود. هدایت تحصیلی
            اصولی کمک می‌کند قبل از تصمیم نهایی، خودتان و گزینه‌ها را بهتر بشناسید.
          </p>
        </div>
      </section>

      {/* Criteria */}
      <section className="bg-white px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-bold text-amber-700">
              معیارهای تصمیم‌گیری
            </span>
            <h2 className="mt-4 text-2xl font-black text-slate-900 md:text-3xl">
              چهار پایه انتخاب رشته آگاهانه
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {criteria.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 text-right shadow-sm transition hover:-translate-y-1 hover:border-amber-200 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <item.icon size={22} />
                </div>
                <h3 className="mt-4 text-lg font-black text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tests */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-bold text-amber-700">
            <Compass size={16} />
            خودشناسی
          </div>
          <h2 className="mt-4 text-2xl font-black text-slate-900 md:text-3xl">
            نقش آزمون‌های خودشناسی در انتخاب رشته
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            آزمون‌ها جای مشاور را نمی‌گیرند، اما تصویر شفاف‌تری از علایق و سبک
            شخصیتی می‌دهند و پایه‌ای علمی برای گفت‌وگوی هدایت تحصیلی می‌سازند.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {tests.map((test) => (
            <Link
              key={test.title}
              href={test.href}
              className="rounded-3xl border border-slate-200/80 bg-white p-7 text-right shadow-md shadow-slate-200/40 transition hover:-translate-y-1.5 hover:border-amber-200 hover:shadow-xl"
            >
              <div className="text-3xl">{test.emoji}</div>
              <h3 className="mt-4 text-xl font-black text-slate-900">
                {test.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{test.desc}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-amber-600">
                شروع آزمون
                <ArrowLeft size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Mistakes */}
      <section className="bg-slate-900 px-5 py-16 text-white">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-center gap-2 text-amber-400">
            <AlertTriangle size={22} />
            <h2 className="text-2xl font-black md:text-3xl">
              اشتباهات رایج در انتخاب رشته
            </h2>
          </div>
          <ul className="mt-10 space-y-4">
            {[
              "انتخاب فقط بر اساس اسم رشته یا پرستیژ اجتماعی",
              "نادیده گرفتن علاقه و فقط نگاه به بازار کار",
              "تکیه صرف به نظر اطرافیان بدون خودشناسی",
              "بی‌توجهی به رتبه واقعی و انتخاب‌های غیرقابل دسترس",
              "تصمیم لحظه‌آخری بدون جمع‌آوری اطلاعات کافی",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm leading-7 text-slate-200"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
              مسیر هدایت تحصیلی با مشاور
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              در جلسات انتخاب رشته، نتیجه آزمون‌ها، وضعیت درسی، اولویت‌های شخصی و
              گزینه‌های واقعی بررسی می‌شود تا به یک فهرست منطقی از رشته‌ها برسید؛
              نه یک تصمیم احساسی یا تحمیلی.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "تفسیر نتایج آزمون‌های خودشناسی",
                "بررسی تناسب رشته با رتبه و پایه درسی",
                "آشنایی با مسیر شغلی رشته‌های منتخب",
                "اولویت‌بندی گزینه‌ها برای فرم انتخاب رشته",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm font-medium text-slate-700"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-amber-500"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
            <div className="flex items-center gap-3 text-amber-600">
              <GraduationCap size={22} />
              <h3 className="text-lg font-black text-slate-900">
                از همین‌جا شروع کنید
              </h3>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              اگر هنوز آزمون نداده‌اید، با یکی از آزمون‌های خودشناسی شروع کنید.
              اگر آماده گفت‌وگوی تخصصی هستید، وقت مشاوره رزرو کنید.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/assessments"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-amber-300 hover:bg-amber-50"
              >
                مشاهده همه آزمون‌ها
              </Link>
              <a
                href="/#reservation"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-amber-600"
              >
                <Phone size={16} />
                رزرو مشاوره انتخاب رشته
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-100 bg-white px-5 py-16 text-center">
        <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
          انتخاب رشته را به شانس نسپارید
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-600">
          با خودشناسی و مشاوره تخصصی، تصمیمی بگیرید که هم با شما سازگار باشد و هم
          با واقعیت کنکور و آینده شغلی.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/#reservation"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 font-bold text-white transition hover:bg-amber-600"
          >
            <Phone size={18} />
            رزرو مشاوره
          </a>
          <Link
            href="/planning"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 font-bold text-slate-700 transition hover:border-amber-300 hover:text-amber-700"
          >
            صفحه برنامه‌ریزی کنکور
            <ArrowLeft size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
