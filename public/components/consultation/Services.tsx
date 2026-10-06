import Link from "next/link";
import {
  Target,
  BookOpen,
  BarChart3,
  RefreshCw,
  Trophy,
  GraduationCap,
  Phone,
} from "lucide-react";

const services = [
  {
    icon: Target,
    title: "برنامه‌ریزی شخصی کنکور",
    description:
      "طراحی برنامه مطالعاتی متناسب با شرایط، سطح درسی و هدف هر دانش‌آموز.",
  },
  {
    icon: BookOpen,
    title: "برنامه‌ریزی مطالعاتی",
    description:
      "تنظیم مسیر مطالعه برای دروس مختلف با اولویت‌بندی و زمان‌بندی اصولی.",
  },
  {
    icon: BarChart3,
    title: "تحلیل آزمون",
    description:
      "بررسی دقیق عملکرد در آزمون‌ها و شناسایی نقاط قوت و ضعف برای پیشرفت.",
  },
  {
    icon: RefreshCw,
    title: "پیگیری و کنترل برنامه",
    description:
      "پیگیری مستمر اجرای برنامه و اصلاح مسیر بر اساس عملکرد واقعی دانش‌آموز.",
  },
  {
    icon: Trophy,
    title: "هدف‌گذاری رتبه",
    description:
      "تعیین هدف واقع‌بینانه و طراحی مسیر مطالعاتی برای رسیدن به رتبه موردنظر.",
  },
  {
    icon: GraduationCap,
    title: "مشاوره انتخاب رشته",
    description:
      "بررسی شرایط، علایق و نتایج کنکور برای انتخاب رشته‌ای آگاهانه و مناسب.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-gradient-to-b from-slate-50 to-white px-5 py-20"
      dir="rtl"
    >
      <div className="mx-auto max-w-6xl">
        {/* عنوان */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700">
            خدمات مشاوره
          </span>

          <h2 className="mt-5 text-3xl font-black text-slate-900 md:text-4xl">
            خدمات مشاوره مهیار بیرون‌خو
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            برای رسیدن به یک نتیجه بهتر، فقط مطالعه کردن کافی نیست.
            مسیر درست، برنامه‌ریزی اصولی و پیگیری مستمر می‌تواند تفاوت
            بزرگی در نتیجه شما ایجاد کند.
          </p>
        </div>

        {/* کارت‌های خدمات */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-slate-200/70 bg-white p-7 text-right shadow-md shadow-slate-200/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-amber-500/10 hover:border-amber-200/50"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/80 text-amber-600 shadow-inner transition-all duration-300 group-hover:from-amber-500 group-hover:to-amber-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-amber-500/30">
                  <Icon size={27} />
                </div>

                <h3 className="mt-6 text-xl font-black text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-4 min-h-20 leading-7 text-slate-600">
                  {service.description}
                </p>

                {/* همه دریافت‌های مشاوره → فرم رزرو */}
                <Link
                  href="#reservation"
                  className="mt-6 inline-flex items-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  دریافت مشاوره
                </Link>
              </div>
            );
          })}
        </div>

        {/* دکمه اصلی رزرو */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4">
          <Link
            href="#reservation"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-7 py-4 font-bold text-white shadow-lg shadow-amber-500/20 transition hover:bg-amber-600"
          >
            رزرو مشاوره
          </Link>

          {/* نمایش شماره مهیار */}
          <a
            href="tel:+989380851505"
            dir="ltr"
            className="inline-flex items-center gap-2 font-bold text-slate-800 transition hover:text-amber-600"
          >
            <Phone size={18} />
            09380851505
          </a>
        </div>
      </div>
    </section>
  );
}