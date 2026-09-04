import HomeNews from "@/components/home/HomeNews";
import Hero from "@/components/home/Hero";
import About from "@/components/about/About";
import ExamCountdown from "@/components/home/ExamCountdown";
import Services from "@/components/consultation/Services";
import Reservation from "@/components/reservation/Reservation";
import Contact from "@/components/contact/Contact";
import Link from "next/link";

type NewsItem = {
  id: string;
  title: string;
  summary?: string;
  content?: string;
  source?: string;
  category?: string;
  date?: string;
  slug?: string;
  image?: string;
};

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwqdva3YX0BihDGOj_g0JRLUj_UmzKObvAKU1iIk5YGn0LbEF3XkI1yAfsTDlIpfnAWGg/exec";

async function getNews(): Promise<NewsItem[]> {
  try {
    const response = await fetch(
      GOOGLE_SCRIPT_URL +
        "?action=getNews&_=" +
        Date.now(),
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    const items = Array.isArray(data)
      ? data
      : Array.isArray(data?.news)
        ? data.news
        : Array.isArray(data?.data)
          ? data.data
          : [];

    return items
      .filter(
        (item: any) =>
          String(item?.status || "")
            .trim()
            .toLowerCase() === "approved"
      )
      .map((item: any) => ({
        id: String(
          item?.id ||
            item?.rowNumber ||
            ""
        ),
        title: String(
          item?.title || ""
        ),
        summary: String(
          item?.summary || ""
        ),
        content: String(
          item?.content || ""
        ),
        source: String(
          item?.source || ""
        ),
        category: String(
          item?.category || ""
        ),
        date: String(
          item?.date || ""
        ),
        slug: String(
          item?.slug || ""
        ),
        image: String(
          item?.image || ""
        ),
      }))
      .filter(
        (item: NewsItem) =>
          item.id && item.title
      );
  } catch (error) {
    console.error(
      "خطا در دریافت اخبار صفحه اصلی:",
      error
    );

    return [];
  }
}

function getNewsHref(item: NewsItem) {
  const value =
    item.slug && item.slug.trim()
      ? item.slug.trim()
      : item.id;

  return (
    "/news/" +
    encodeURIComponent(value)
  );
}

function formatDate(value?: string) {
  if (!value) {
    return "";
  }

  const normalized =
    value.replace(/\//g, "-");

  const date =
    new Date(normalized);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "fa-IR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  ).format(date);
}

export default async function Home() {
  const news = await getNews();

  const latestNews =
    news.slice(0, 3);

  return (
    <main dir="rtl">

      {/* =====================================================
          Hero
         ===================================================== */}

      <Hero />

      {/* =====================================================
          About
         ===================================================== */}

      <About />

      {/* =====================================================
          شمارش معکوس کنکور
         ===================================================== */}

      <ExamCountdown />

      {/* =====================================================
          Services
         ===================================================== */}

      <Services />

      {/* =====================================================
          اخبار
         ===================================================== */}

      <HomeNews />

      {/* =====================================================
          آزمون‌های خودشناسی
         ===================================================== */}

      <section
        id="assessments"
        className="bg-gradient-to-b from-slate-50 via-white to-slate-50 px-5 py-20"
      >
        <div className="mx-auto max-w-6xl">

          {/* عنوان */}

          <div className="mx-auto max-w-3xl text-center">

            <span className="inline-block rounded-full border border-amber-200 bg-amber-50 px-5 py-2 text-sm font-bold text-amber-700">
              آزمون‌های خودشناسی و هدایت تحصیلی
            </span>

            <h2 className="mt-5 text-3xl font-black text-slate-900 md:text-4xl">
              خودت را بهتر بشناس
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              با انجام آزمون‌های خودشناسی،
              علایق، ویژگی‌های شخصیتی و
              مسیرهای مناسب تحصیلی و شغلی
              خود را بهتر بشناسید.
            </p>

          </div>

          {/* کارت آزمون‌ها */}

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {/* =================================================
                Holland
               ================================================= */}

            <div className="rounded-3xl border border-slate-200/80 bg-white p-7 text-right shadow-md shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-amber-500/10 hover:border-amber-200/60">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
                🎯
              </div>

              <h3 className="mt-6 text-xl font-black text-slate-900">
                آزمون هالند
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                شناخت علایق شغلی و تحصیلی
                بر اساس الگوی RIASEC و
                بررسی زمینه‌های مناسب برای
                ادامه مسیر.
              </p>

              <Link
                href="/assessments?test=holland"
                className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
              >
                شروع آزمون
              </Link>

            </div>

            {/* =================================================
                MBTI
               ================================================= */}

            <div className="rounded-3xl border border-slate-200/80 bg-white p-7 text-right shadow-md shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-amber-500/10 hover:border-amber-200/60">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                🧠
              </div>

              <h3 className="mt-6 text-xl font-black text-slate-900">
                آزمون MBTI
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                آشنایی با ترجیحات شخصیتی و
                نحوه تصمیم‌گیری، ارتباط با
                دیگران و شیوه برخورد با مسائل.
              </p>

              <Link
                href="/assessments?test=mbti"
                className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
              >
                شروع آزمون
              </Link>

            </div>

            {/* =================================================
                Strong
               ================================================= */}

            <div className="rounded-3xl border border-slate-200/80 bg-white p-7 text-right shadow-md shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-amber-500/10 hover:border-amber-200/60">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-2xl">
                🏆
              </div>

              <h3 className="mt-6 text-xl font-black text-slate-900">
                آزمون علایق شغلی استرانگ
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                بررسی علایق حرفه‌ای و شغلی
                و کمک به شناخت زمینه‌های
                مناسب برای انتخاب رشته و
                مسیر آینده.
              </p>

              <Link
                href="/assessments?test=strong"
                className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
              >
                شروع آزمون
              </Link>

            </div>

          </div>

          {/* =================================================
              دکمه همه آزمون‌ها
             ================================================= */}

          <div className="mt-10 text-center">

            <Link
              href="/assessments"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-amber-500 to-amber-600 px-7 py-4 font-black text-white shadow-lg shadow-amber-500/25 transition-all duration-300 hover:from-amber-600 hover:to-amber-700 hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5"
            >
              مشاهده همه آزمون‌ها

              <span>
                ←
              </span>

            </Link>

          </div>

          {/* توضیح */}

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-7 text-slate-500">
            نتایج آزمون‌ها برای استفاده در
            فرایند مشاوره و بررسی‌های بعدی
            در Google Sheet ثبت می‌شوند.
          </p>

        </div>
      </section>

      {/* =====================================================
          تماس با ما
         ===================================================== */}

      <Contact />

      {/* =====================================================
          رزرو مشاوره
         ===================================================== */}

      <Reservation />

    </main>
  );
}