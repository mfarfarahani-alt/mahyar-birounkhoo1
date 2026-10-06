import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  CheckCircle2,
  ArrowLeft,
  GraduationCap,
  Video,
  MessageCircleQuestion,
} from "lucide-react";

const SITE_URL = "https://www.mahyar-bironkhu.ir";
const PAGE_URL = `${SITE_URL}/moshaver-konkur-shahre-rey`;

// ============================================================
// متادیتا صفحه
// ============================================================

export const metadata: Metadata = {
  title: "مشاور کنکور در شهرری | مهیار بیرون‌خو",
  description:
    "مشاوره تخصصی کنکور و برنامه‌ریزی تحصیلی برای دانش‌آموزان شهرری و جنوب تهران؛ به‌صورت تلفنی و آنلاین، با برنامه شخصی‌سازی‌شده و پیگیری مستمر.",
  keywords: [
    "مشاور کنکور شهرری",
    "مشاوره کنکور شهرری",
    "مشاور تحصیلی شهرری",
    "برنامه‌ریزی کنکور جنوب تهران",
    "مهیار بیرون‌خو",
  ],
  alternates: {
    canonical: "/moshaver-konkur-shahre-rey",
  },
  openGraph: {
    title: "مشاور کنکور در شهرری | مهیار بیرون‌خو",
    description:
      "مشاوره تخصصی کنکور و هدایت تحصیلی برای دانش‌آموزان شهرری؛ تلفنی، آنلاین و با برنامه شخصی‌سازی‌شده.",
    locale: "fa_IR",
    type: "website",
    url: PAGE_URL,
  },
};

// ============================================================
// سوالات متداول (نمایش در صفحه + Schema)
// ============================================================

const faqs = [
  {
    question: "آیا مشاوره کنکور برای دانش‌آموزان ساکن شهرری هم انجام می‌شود؟",
    answer:
      "بله. مشاوره به‌صورت تلفنی و آنلاین برای دانش‌آموزان سراسر تهران، از جمله شهرری و مناطق جنوبی شهر، ارائه می‌شود؛ بدون نیاز به رفت‌وآمد و در ساعات هماهنگ‌شده با خود دانش‌آموز.",
  },
  {
    question: "مشاوره کنکور در شهرری چه پایه‌هایی را شامل می‌شود؟",
    answer:
      "دانش‌آموزان پایه دهم، یازدهم، دوازدهم و همچنین فارغ‌التحصیلانی که دوباره در آزمون کنکور شرکت می‌کنند، می‌توانند از خدمات مشاوره و برنامه‌ریزی استفاده کنند.",
  },
  {
    question: "جلسات مشاوره برای ساکنین شهرری به چه صورت برگزار می‌شود؟",
    answer:
      "بسته به شرایط شما، مشاوره می‌تواند تلفنی، آنلاین (تصویری) یا در موارد هماهنگ‌شده به‌صورت حضوری برگزار شود. نوع مشاوره در فرم رزرو قابل انتخاب است.",
  },
  {
    question: "برای شروع باید چه کاری انجام دهم؟",
    answer:
      "کافی است فرم رزرو مشاوره را در صفحه اصلی سایت تکمیل کنید و شهر و پایه تحصیلی خود را وارد کنید، یا مستقیم با شماره ۰۹۳۸۰۸۵۱۵۰۵ تماس بگیرید.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

// ============================================================
// محتوای صفحه
// ============================================================

const reasons = [
  "برنامه‌ریزی درسی شخصی‌سازی‌شده متناسب با شرایط دانش‌آموزان شهرری و جنوب تهران",
  "بیش از ۷ سال سابقه مشاوره تحصیلی در مدارس مطرح تهران",
  "امکان برگزاری کامل جلسات به‌صورت تلفنی و آنلاین، بدون نیاز به رفت‌وآمد",
  "تحلیل مستمر آزمون‌ها و اصلاح مسیر مطالعه بر اساس نتایج واقعی",
  "هدایت تحصیلی و مشاوره انتخاب رشته بر اساس علاقه، استعداد و بازار کار",
];

export default function ShahreReyPage() {
  return (
    <main dir="rtl" className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ================================================
          هدر صفحه
      ================================================ */}
      <section className="border-b border-slate-100 bg-slate-950 px-5 py-16 text-white md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-5 py-2 text-sm font-bold text-amber-400">
            <MapPin size={16} />
            مشاوره کنکور برای دانش‌آموزان شهرری
          </span>

          <h1 className="mt-6 text-3xl font-black leading-[1.7] tracking-tight sm:text-4xl md:text-5xl">
            مشاور کنکور در شهرری
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
            مشاوره تخصصی کنکور و برنامه‌ریزی تحصیلی مهیار بیرون‌خو، به‌صورت
            تلفنی و آنلاین، در دسترس دانش‌آموزان شهرری و جنوب تهران است؛ با
            برنامه شخصی‌سازی‌شده، تحلیل آزمون و پیگیری مستمر تا رسیدن به هدف
            کنکور.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/#reservation"
              className="site-gold-button inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-black shadow-md shadow-amber-500/15 transition"
            >
              <Phone size={16} />
              رزرو مشاوره
            </a>
            <a
              href="tel:+989380851505"
              dir="ltr"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-black text-white transition hover:border-amber-400 hover:text-amber-400"
            >
              0938 085 1505
            </a>
          </div>
        </div>
      </section>

      {/* ================================================
          چرا مشاوره آنلاین/تلفنی برای شهرری
      ================================================ */}
      <section className="px-5 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
              چرا مشاوره تلفنی و آنلاین برای دانش‌آموزان شهرری؟
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              فاصله تا مرکز شهر نباید مانع دریافت مشاوره تخصصی کنکور باشد. با
              برگزاری جلسات به‌صورت تلفنی یا آنلاین، دانش‌آموزان شهرری هم به
              همان کیفیت مشاوره‌ای دسترسی دارند که در مدارس مطرح تهران ارائه
              می‌شود.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div
                key={reason}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-amber-500"
                />
                <p className="text-sm leading-7 text-slate-700">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          نحوه برگزاری مشاوره
      ================================================ */}
      <section className="border-t border-slate-100 bg-slate-50 px-5 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <Video size={22} className="text-amber-500" />
              <h3 className="mt-4 text-lg font-black text-slate-950">
                مشاوره آنلاین
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                جلسات تصویری از طریق پیام‌رسان‌های موجود در سایت، در زمان
                هماهنگ‌شده.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <Phone size={22} className="text-amber-500" />
              <h3 className="mt-4 text-lg font-black text-slate-950">
                مشاوره تلفنی
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                گفت‌وگوی مستقیم تلفنی برای بررسی وضعیت درسی و برنامه‌ریزی،
                بدون نیاز به رفت‌وآمد.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <GraduationCap size={22} className="text-amber-500" />
              <h3 className="mt-4 text-lg font-black text-slate-950">
                برنامه‌ریزی شخصی
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                برنامه درسی متناسب با سطح، پایه و شرایط هر دانش‌آموز، همراه با
                تحلیل آزمون‌ها.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/planning"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition hover:border-amber-300 hover:bg-amber-50"
            >
              مشاهده خدمت برنامه‌ریزی کنکور
              <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================
          سوالات متداول
      ================================================ */}
      <section className="px-5 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-xs font-bold text-amber-700">
              <MessageCircleQuestion size={15} />
              سوالات متداول
            </span>
            <h2 className="mt-4 text-2xl font-black text-slate-950 md:text-3xl">
              سوالات پرتکرار داوطلبان شهرری
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <h3 className="text-base font-black text-slate-950">
                  {item.question}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          CTA پایانی
      ================================================ */}
      <section className="border-t border-slate-100 bg-slate-950 px-5 py-16 text-center text-white md:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-black md:text-3xl">
            رزرو مشاوره کنکور برای دانش‌آموزان شهرری
          </h2>
          <p className="mt-4 leading-8 text-slate-300">
            فرم رزرو را تکمیل کنید و شهر «شهرری» را در فرم وارد کنید تا وقت
            مشاوره متناسب با شرایط شما هماهنگ شود.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/#reservation"
              className="site-gold-button inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-black shadow-md shadow-amber-500/15 transition"
            >
              <Phone size={16} />
              رزرو مشاوره
            </a>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-7 py-3.5 text-sm font-black text-white transition hover:border-amber-400 hover:text-amber-400"
            >
              آشنایی با مهیار بیرون‌خو
              <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
