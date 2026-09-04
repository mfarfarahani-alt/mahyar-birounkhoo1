import Link from "next/link";

export default function AssessmentsPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 px-5 py-16"
    >
      <div className="mx-auto max-w-6xl">

        {/* عنوان صفحه */}
        <div className="text-center">
          <span className="inline-block rounded-full bg-amber-50 px-5 py-2 text-sm font-bold text-amber-700">
            آزمون‌های خودشناسی
          </span>

          <h1 className="mt-6 text-3xl font-black text-slate-900 md:text-5xl">
            خودت را بهتر بشناس، مسیرت را بهتر انتخاب کن
          </h1>

          <p className="mx-auto mt-5 max-w-3xl leading-8 text-slate-600">
            با انجام آزمون‌های خودشناسی می‌توانید شناخت بهتری از
            شخصیت، علایق، توانمندی‌ها و مسیر مناسب تحصیلی و شغلی
            خود به دست آورید.
          </p>
        </div>

        {/* کارت آزمون‌ها */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">

          {/* =========================
              آزمون هالند
          ========================== */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 text-right shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-2xl">
              🎓
            </div>

            <h2 className="mt-6 text-2xl font-black text-slate-900">
              آزمون هالند
            </h2>

            <p className="mt-4 min-h-28 leading-7 text-slate-600">
              با آزمون هالند می‌توانید علایق شغلی و تحصیلی خود را
              بهتر بشناسید و زمینه‌های مناسب برای ادامه مسیر
              تحصیلی و شغلی خود را بررسی کنید.
            </p>

            <Link
              href="/assessments/holland"
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-amber-500"
            >
              شروع آزمون هالند
            </Link>
          </div>

          {/* =========================
              آزمون MBTI
          ========================== */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 text-right shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-2xl">
              🧠
            </div>

            <h2 className="mt-6 text-2xl font-black text-slate-900">
              آزمون MBTI
            </h2>

            <p className="mt-4 min-h-28 leading-7 text-slate-600">
              شناخت ویژگی‌های شخصیتی، نحوه تصمیم‌گیری، سبک ارتباط
              با دیگران و ترجیحات رفتاری شما.
            </p>

            <Link
              href="/assessments/mbti"
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-blue-600"
            >
              شروع آزمون MBTI
            </Link>
          </div>

          {/* =========================
              آزمون استرانگ
          ========================== */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 text-right shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-2xl">
              🏆
            </div>

            <h2 className="mt-6 text-2xl font-black text-slate-900">
              آزمون استرانگ
            </h2>

            <p className="mt-4 min-h-28 leading-7 text-slate-600">
              بررسی علایق شغلی و شناخت زمینه‌ها و مسیرهای شغلی
              متناسب با علایق و ترجیحات فردی شما.
            </p>

            <Link
              href="/assessments/strong"
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-emerald-600"
            >
              شروع آزمون استرانگ
            </Link>
          </div>
        </div>

        {/* توضیح پایین صفحه */}
        <div className="mt-12 rounded-3xl bg-slate-900 p-8 text-center text-white">
          <h2 className="text-2xl font-black">
            نتیجه آزمون‌ها
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">
            نتیجه آزمون‌ها پس از تکمیل برای شما نمایش داده می‌شود
            و در مراحل بعدی، نتیجه آزمون در سیستم نیز ثبت خواهد شد
            تا در جلسات مشاوره قابل بررسی باشد.
          </p>
        </div>

        {/* رزرو مشاوره */}
        <div className="mt-8 text-center">
          <Link
            href="/#reservation"
            className="inline-flex rounded-xl bg-amber-500 px-8 py-4 font-black text-white transition hover:bg-amber-600"
          >
            دریافت مشاوره و رزرو جلسه
          </Link>
        </div>

      </div>
    </main>
  );
}