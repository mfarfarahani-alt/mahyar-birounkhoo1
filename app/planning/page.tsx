import type { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardList,
  Target,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Phone,
  ArrowLeft,
  BookOpen,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "برنامه‌ریزی کنکور ۱۴۰۶ | برنامه شخصی و اصولی",
  description:
    "برنامه‌ریزی کنکور شخصی‌سازی‌شده با تحلیل سطح درسی، مدیریت زمان و پیگیری مستمر. مسیر مشخص برای رتبه برتر با مشاوره مهیار بیرون‌خو.",
  keywords: [
    "برنامه‌ریزی کنکور",
    "برنامه کنکور",
    "برنامه‌ریزی کنکور ۱۴۰۶",
    "مشاوره کنکور",
    "برنامه شخصی کنکور",
    "مهیار بیرون‌خو",
  ],
  openGraph: {
    title: "برنامه‌ریزی کنکور ۱۴۰۶ | برنامه شخصی و اصولی | مهیار بیرون‌خو",
    description:
      "برنامه‌ریزی کنکور شخصی‌سازی‌شده با تحلیل سطح درسی، مدیریت زمان و پیگیری مستمر.",
    locale: "fa_IR",
    type: "website",
    url: "https://www.mahyar-bironkhu.ir/planning",
  },
};

const steps = [
  {
    icon: ClipboardList,
    title: "سطح‌سنجی دقیق",
    text: "بررسی وضعیت فعلی دروس، نقاط قوت و ضعف و نتیجه آزمون‌های اخیر برای شروع از نقطه درست.",
  },
  {
    icon: Target,
    title: "هدف‌گذاری واقع‌بینانه",
    text: "تعیین هدف رشته و رتبه متناسب با زمان باقی‌مانده، پایه درسی و ظرفیت واقعی دانش‌آموز.",
  },
  {
    icon: BookOpen,
    title: "تقسیم هوشمند دروس",
    text: "چینش روزانه و هفتگی دروس عمومی و اختصاصی با تعادل بین یادگیری، تست و مرور.",
  },
  {
    icon: RefreshCw,
    title: "آزمون، تحلیل و اصلاح",
    text: "برنامه ثابت نمی‌ماند؛ با تحلیل آزمون و پیشرفت، مسیر به‌صورت مستمر اصلاح می‌شود.",
  },
];

const benefits = [
  "برنامه متناسب با سطح و شرایط شما",
  "تعادل بین مطالعه، تست و مرور",
  "مدیریت زمان تا روز کنکور",
  "کاهش اضطراب با مسیر مشخص",
  "پیگیری مستمر توسط مشاور",
];

export default function PlanningPage() {
  return (
    <main dir="rtl" className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0F172A] px-5 py-16 md:py-20">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-700/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-5 inline-block rounded-full border border-amber-400/35 bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-300">
            برنامه‌ریزی کنکور
          </span>
          <h1 className="text-3xl font-black leading-[1.6] text-white sm:text-4xl md:text-5xl">
            برنامه‌ریزی کنکور شخصی
            <br />
            <span className="text-amber-400">نه برنامه کپی‌شده</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            موفقیت در کنکور با برنامه عمومی و پراکنده سخت است. با برنامه‌ریزی
            اصولی، متناسب با سطح درسی و زمان شما، مسیر رتبه برتر روشن می‌شود.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/#reservation"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 font-bold text-white shadow-xl shadow-amber-500/20 transition hover:-translate-y-0.5 hover:bg-amber-600"
            >
              <Phone size={18} />
              رزرو مشاوره برنامه‌ریزی
            </a>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 font-bold text-white transition hover:border-amber-400/40 hover:bg-white/10"
            >
              درباره مشاور
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
            برنامه‌ریزی کنکور چیست و چرا مهم است؟
          </h2>
          <p className="mt-5 leading-8 text-slate-600">
            برنامه‌ریزی کنکور یعنی مشخص کردن مسیر مطالعه تا روز آزمون: چه درسی،
            چه مقدار، در چه زمانی و با چه روشی خوانده شود. بدون برنامه، زمان هدر
            می‌رود و اضطراب بیشتر می‌شود. با برنامه شخصی، هر روز می‌دانید چه
            کاری باید انجام دهید و پیشرفت قابل اندازه‌گیری دارید.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-white px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-bold text-amber-700">
              مسیر چهارمرحله‌ای
            </span>
            <h2 className="mt-4 text-2xl font-black text-slate-900 md:text-3xl">
              مراحل ساخت برنامه اصولی کنکور
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, index) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 text-right shadow-sm transition hover:-translate-y-1 hover:border-amber-200 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <item.icon size={22} />
                </div>
                <div className="mt-4 text-xs font-bold text-amber-600">
                  مرحله {index + 1}
                </div>
                <h3 className="mt-1 text-lg font-black text-slate-900">
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

      {/* Personal vs general */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
              تفاوت برنامه عمومی با برنامه شخصی
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              برنامه‌های آماده اینترنت یا برنامه رتبه برترها برای همان فرد طراحی
              شده‌اند. سطح پایه، ساعت آزاد روزانه، نقاط ضعف و حتی شرایط روحی شما
              متفاوت است. برنامه شخصی از وضعیت فعلی شما شروع می‌کند و قدم‌به‌قدم
              تا هدف پیش می‌رود.
            </p>
            <ul className="mt-6 space-y-3">
              {benefits.map((item) => (
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
              <Clock size={22} />
              <h3 className="text-lg font-black text-slate-900">
                در جلسه برنامه‌ریزی چه می‌گذرد؟
              </h3>
            </div>
            <ol className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
              <li>
                <strong className="text-slate-900">۱.</strong> بررسی کارنامه،
                آزمون‌ها و ساعت مطالعه فعلی
              </li>
              <li>
                <strong className="text-slate-900">۲.</strong> تعیین هدف رشته و
                بازه زمانی تا کنکور
              </li>
              <li>
                <strong className="text-slate-900">۳.</strong> طراحی برنامه هفتگی
                قابل اجرا
              </li>
              <li>
                <strong className="text-slate-900">۴.</strong> نحوه تحلیل آزمون و
                اصلاح برنامه
              </li>
              <li>
                <strong className="text-slate-900">۵.</strong> هماهنگی پیگیری‌های
                بعدی
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Mistakes */}
      <section className="bg-slate-900 px-5 py-16 text-white">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-center gap-2 text-amber-400">
            <AlertTriangle size={22} />
            <h2 className="text-2xl font-black md:text-3xl">
              اشتباهات رایج در برنامه‌ریزی کنکور
            </h2>
          </div>
          <ul className="mt-10 space-y-4">
            {[
              "کپی کردن برنامه رتبه برترها بدون توجه به سطح شخصی",
              "حجم مطالعه غیرواقعی که بعد از چند روز رها می‌شود",
              "نادیده گرفتن مرور و فقط پیش‌روی در دروس جدید",
              "نداشتن زمان برای استراحت و بازیابی انرژی",
              "عدم پیگیری هفتگی و اصلاح برنامه",
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

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-5 py-16 text-center">
        <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
          آماده‌اید برنامه شخصی خود را بسازید؟
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-600">
          با رزرو جلسه مشاوره، وضعیت فعلی‌تان بررسی می‌شود و یک برنامه اجرایی
          متناسب با هدف کنکور ۱۴۰۶ دریافت می‌کنید.
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
            href="/major-selection"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 font-bold text-slate-700 transition hover:border-amber-300 hover:text-amber-700"
          >
            صفحه انتخاب رشته
            <ArrowLeft size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
