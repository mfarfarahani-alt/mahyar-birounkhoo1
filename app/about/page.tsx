import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Briefcase,
  Sparkles,
  Users,
  Quote,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

export const metadata = {
  title: "درباره من | مهیار بیرون‌خو",
  description:
    "مشاور تحصیلی و شغلی، مدرس مهارت‌های آموزشی، با بیش از ۷ سال سابقه در مدارس مطرح تهران.",
};

const education = [
  "کارشناسی راهنمایی و مشاوره — دانشگاه شهید چمران",
  "مدرک تخصصی زبان انگلیسی",
  "مشاور رسمی آموزش و پرورش کل کشور",
];

const experiences = [
  {
    title: "مشاور تحصیلی و شغلی",
    place: "مدارس مطرح تهران",
    bullets: [
      "ارائه مشاوره تحصیلی به بیش از ۲۰۰۰ دانش‌آموز در سال، در مقاطع متوسطه اول و دوم.",
      "برگزاری کارگاه‌های مدیریت اضطراب امتحان، مهارت‌های مطالعه و برنامه‌ریزی درسی.",
      "هدایت تحصیلی دانش‌آموزان برای انتخاب رشته مناسب بر اساس استعداد، رغبت و بازار کار.",
      "پیگیری مستمر وضعیت تحصیلی دانش‌آموزان و ارتباط با اولیا و دبیران برای بهبود عملکرد.",
    ],
  },
  {
    title: "مدرس مهارت‌های زبان و مطالعه",
    place: "آموزشگاه‌ها و مدارس تهران",
    bullets: [
      "تدریس زبان عمومی و تخصصی با بهره‌گیری از مدرک تخصصی زبان.",
      "برگزاری کلاس‌های تقویت مهارت‌های مطالعه و یادگیری برای دانش‌آموزان.",
      "طراحی و اجرای دوره‌های آمادگی برای آزمون‌های ورودی مدارس و کنکور.",
    ],
  },
];

const skillGroups = [
  {
    title: "مشاوره و روان‌شناسی",
    icon: Users,
    items: [
      "هدایت تحصیلی",
      "مشاوره فردی و گروهی",
      "شناسایی استعدادها و توانمندی‌های آموزشی",
      "برنامه‌ریزی درسی و مدیریت زمان",
    ],
  },
  {
    title: "آموزشی و ارتباطی",
    icon: Sparkles,
    items: [
      "تدریس زبان و مهارت‌های مطالعه",
      "ارتباط مؤثر با نوجوانان، والدین و کادر آموزشی",
      "سخنرانی و تسهیل‌گری",
    ],
  },
  {
    title: "فنی و نرم‌افزاری",
    icon: CheckCircle2,
    items: [
      "نرم‌افزارهای مشاوره تحصیلی",
      "کار با سامانه‌های آموزش و پرورش",
    ],
  },
];

const workshops = [
  "برگزاری کارگاه «انتخاب رشته و آینده شغلی» برای دانش‌آموزان پایه نهم و دوازدهم.",
  "طراحی بسته جامع برنامه‌ریزی تحصیلی برای دانش‌آموزان کنکوری.",
  "همکاری با مدارس و مراکز معتبر در زمینه ارتقای مهارت‌های تحصیلی دانش‌آموزان.",
];

export default function AboutPage() {
  return (
    <div className="bg-white">

      {/* ================================================
          هدر صفحه
         ================================================ */}

      <section className="border-b border-slate-100 bg-gradient-to-b from-amber-50/60 to-white px-5 py-12 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">

          <div className="relative mx-auto w-full max-w-xs lg:sticky lg:top-24">
            <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full bg-amber-400/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 p-3 shadow-2xl">
              <Image
                src="/images/mahyar-office.jpg"
                alt="مهیار بیرون‌خو - مشاور تحصیلی و شغلی"
                width={700}
                height={860}
                className="aspect-[4/5] h-auto w-full rounded-[1.5rem] object-cover"
              />
            </div>
          </div>

          <div className="text-right">
            <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700">
              درباره من
            </span>

            <h1 className="mt-5 text-3xl font-black leading-[1.5] text-slate-900 sm:text-4xl">
              مهیار بیرون‌خو
            </h1>

            <p className="mt-2 text-lg font-bold text-amber-600">
              مشاور تحصیلی و شغلی | مدرس مهارت‌های آموزشی
            </p>

            <p className="mt-6 leading-9 text-slate-600">
              مشاور تحصیلی با بیش از ۷ سال سابقه در مدارس مطرح تهران،
              دارای مدرک تخصصی زبان و مشاور رسمی آموزش و پرورش. متخصص
              در هدایت تحصیلی، برنامه‌ریزی درسی، مدیریت اضطراب امتحان
              و انتخاب رشته، و تحلیل‌گر آزمون‌های روان‌شناختی؛ با
              رویکردی مبتنی بر شناخت توانمندی‌ها و علایق دانش‌آموزان،
              مسیر موفقیت تحصیلی و شغلی آن‌ها را هموار می‌کنم.
            </p>

            <div className="mt-8">
              <Link
                href="/#reservation"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-4 font-bold text-white shadow-md shadow-amber-500/20 transition hover:bg-amber-600"
              >
                رزرو مشاوره
                <ArrowLeft size={18} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ================================================
          تحصیلات و مدارک تخصصی
         ================================================ */}

      <section className="px-5 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <GraduationCap size={24} />
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              تحصیلات و مدارک تخصصی
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {education.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <CheckCircle2
                  className="mt-1 shrink-0 text-amber-500"
                  size={20}
                />
                <p className="leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================
          سوابق حرفه‌ای
         ================================================ */}

      <section className="bg-slate-50 px-5 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <Briefcase size={24} />
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              سوابق حرفه‌ای
            </h2>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={exp.title}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    {exp.title}
                  </h3>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                    {exp.place}
                  </span>
                </div>

                <ul className="mt-5 space-y-3">
                  {exp.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-sm leading-7 text-slate-600 sm:text-base"
                    >
                      <CheckCircle2
                        className="mt-1 shrink-0 text-amber-500"
                        size={17}
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================
          مهارت‌های کلیدی
         ================================================ */}

      <section className="px-5 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <Sparkles size={24} />
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              مهارت‌های کلیدی
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {skillGroups.map((group) => {
              const Icon = group.icon;

              return (
                <div
                  key={group.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-2 text-amber-600">
                    <Icon size={19} />
                    <h3 className="font-bold text-slate-900">
                      {group.title}
                    </h3>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm leading-7 text-slate-600"
                      >
                        · {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================================================
          پروژه‌ها و کارگاه‌ها
         ================================================ */}

      <section className="bg-slate-50 px-5 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <h2 className="mb-8 text-2xl font-black text-slate-900">
            پروژه‌ها و کارگاه‌های برگزارشده
          </h2>

          <div className="space-y-4">
            {workshops.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5"
              >
                <CheckCircle2
                  className="mt-1 shrink-0 text-amber-500"
                  size={19}
                />
                <p className="leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================
          نقل‌قول
         ================================================ */}

      <section className="px-5 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl bg-slate-900 p-10 text-center sm:p-14">
          <Quote className="mx-auto mb-6 text-amber-400" size={32} />

          <p className="text-lg font-medium leading-10 text-slate-100 sm:text-xl">
            «من مهیار بیرون‌خو، مشاور تحصیلی و شغلی با سابقه همکاری در
            مدارس مطرح تهران و دارنده مدرک تخصصی زبان و مجوز رسمی از
            آموزش و پرورش هستم. باور من این است که هر دانش‌آموز
            مسیر منحصربه‌فردی برای موفقیت دارد و نقش مشاور، کشف و
            هموار کردن آن مسیر است.»
          </p>

          <div className="mt-8">
            <Link
              href="/#reservation"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-4 font-bold text-white transition hover:bg-amber-600"
            >
              شروع مسیر با مهیار بیرون‌خو
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
