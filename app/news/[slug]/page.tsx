import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  CalendarDays,
  Newspaper,
} from "lucide-react";

type NewsItem = {
  id?: string;
  rowNumber?: number;
  title?: string;
  summary?: string;
  content?: string;
  source?: string;
  category?: string;
  date?: string;
  slug?: string;
  status?: string;
  image?: string;
  sourceUrl?: string;
};

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwqdva3YX0BihDGOj_g0JRLUj_UmzKObvAKU1iIk5YGn0LbEF3XkI1yAfsTDlIpfnAWGg/exec";


// ============================================================
// دریافت اخبار
// ============================================================

async function getNews(): Promise<NewsItem[]> {
  try {
    const response = await fetch(
      `${GOOGLE_SCRIPT_URL}?action=getNews&_=${Date.now()}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        "Google News API error:",
        response.status
      );

      return [];
    }

    const data = await response.json();

    const items: NewsItem[] =
      Array.isArray(data)
        ? data
        : Array.isArray(data?.news)
          ? data.news
          : Array.isArray(data?.data)
            ? data.data
            : [];

    return items
      .map((item: any) => ({
        id: String(
          item?.id ||
            item?.rowNumber ||
            ""
        ),

        rowNumber:
          item?.rowNumber
            ? Number(item.rowNumber)
            : undefined,

        title: String(
          item?.title || ""
        ).trim(),

        summary: String(
          item?.summary || ""
        ).trim(),

        content: String(
          item?.content || ""
        ).trim(),

        source: String(
          item?.source || ""
        ).trim(),

        category: String(
          item?.category || ""
        ).trim(),

        date: String(
          item?.date || ""
        ).trim(),

        slug: String(
          item?.slug || ""
        ).trim(),

        status: String(
          item?.status || ""
        )
          .trim()
          .toLowerCase(),

        image: String(
          item?.image || ""
        ).trim(),

        sourceUrl: String(
          item?.sourceUrl || ""
        ).trim(),
      }))
      .filter(
        (item) =>
          item.id &&
          item.title &&
          item.status === "approved"
      );

  } catch (error) {
    console.error(
      "خطا در دریافت اخبار:",
      error
    );

    return [];
  }
}


// ============================================================
// نرمال‌سازی متن برای مقایسه
// ============================================================

function normalizeText(
  value: string
) {
  return String(value || "")
    .trim()
    .replace(
      /ي/g,
      "ی"
    )
    .replace(
      /ك/g,
      "ک"
    )
    .replace(
      /\u200c/g,
      ""
    )
    .replace(
      /\s+/g,
      " "
    )
    .toLowerCase();
}


// ============================================================
// پیدا کردن خبر
// ============================================================

async function getNewsItem(
  slug: string
): Promise<NewsItem | null> {

  const news =
    await getNews();

  const decodedSlug =
    decodeURIComponent(
      slug || ""
    );

  const normalizedSlug =
    normalizeText(
      decodedSlug
    );

  const item =
    news.find(
      (newsItem) => {

        const itemSlug =
          normalizeText(
            newsItem.slug || ""
          );

        const itemId =
          normalizeText(
            newsItem.id || ""
          );

        return (
          itemSlug === normalizedSlug ||
          itemId === normalizedSlug
        );
      }
    );

  return item || null;
}


// ============================================================
// تاریخ
// ============================================================

function formatDate(
  value?: string
) {

  if (!value) {
    return "";
  }

  const raw =
    String(value)
      .trim();

  // تاریخ‌های Google Sheet
  // مثل:
  // 2026/08/17 00:00

  const match =
    raw.match(
      /^(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})(?:\s+(\d{1,2}):(\d{2}))?/
    );

  if (match) {

    const year =
      Number(match[1]);

    const month =
      Number(match[2]);

    const day =
      Number(match[3]);

    // برای جلوگیری از تبدیل اشتباه
    // تاریخ شمسی به میلادی توسط JS،
    // در اینجا خود مقدار را به صورت
    // شمسی نمایش می‌دهیم.

    const persianMonths = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];

    if (
      month >= 1 &&
      month <= 12
    ) {
      return `${day} ${persianMonths[month - 1]} ${year}`;
    }
  }

  return raw;
}


// ============================================================
// تبدیل متن خبر به پاراگراف
// ============================================================

function formatContent(
  content?: string
) {

  if (!content) {
    return [];
  }

  return content
    .split(/\n+/)
    .map(
      (paragraph) =>
        paragraph.trim()
    )
    .filter(Boolean);
}


// ============================================================
// تولید مسیر خبر
// ============================================================

function getNewsHref(
  item: NewsItem
) {

  const value =
    item.slug &&
    item.slug.trim()
      ? item.slug.trim()
      : item.id || "";

  return (
    "/news/" +
    encodeURIComponent(
      value
    )
  );
}


// ============================================================
// صفحه خبر
// ============================================================

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {

  const {
    slug,
  } = await params;

  const news =
    await getNewsItem(
      slug
    );


  // ==========================================================
  // خبر پیدا نشد
  // ==========================================================

  if (!news) {

    return (
      <main
        dir="rtl"
        className="min-h-screen bg-slate-50 px-5 py-20"
      >

        <div className="mx-auto max-w-4xl">

          <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-slate-500">

              <Newspaper
                size={38}
              />

            </div>

            <h1 className="mt-7 text-3xl font-black text-slate-900">
              خبر مورد نظر پیدا نشد
            </h1>

            <p className="mx-auto mt-4 max-w-xl leading-8 text-slate-500">
              این خبر ممکن است حذف شده باشد،
              هنوز تأیید نشده باشد یا آدرس
              آن تغییر کرده باشد.
            </p>

            <Link
              href="/news"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-bold text-white transition hover:bg-amber-500"
            >
              <ArrowRight
                size={18}
              />

              بازگشت به اخبار
            </Link>

          </div>

        </div>

      </main>
    );
  }


  const paragraphs =
    formatContent(
      news.content ||
      news.summary
    );


  // ==========================================================
  // صفحه اصلی خبر
  // ==========================================================

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50"
    >

      {/* ======================================================
          Container
         ====================================================== */}

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">


        {/* ====================================================
            Breadcrumb
           ==================================================== */}

        <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">

          <Link
            href="/"
            className="transition hover:text-amber-600"
          >
            خانه
          </Link>

          <span>
            /
          </span>

          <Link
            href="/news"
            className="transition hover:text-amber-600"
          >
            اخبار
          </Link>

          <span>
            /
          </span>

          <span className="max-w-[220px] truncate text-slate-400">
            {news.title}
          </span>

        </div>


        {/* ====================================================
            Article
           ==================================================== */}

        <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">


          {/* ==================================================
              News Image / Cover
             ================================================== */}

          <div className="relative overflow-hidden">

            {news.image ? (

              <div className="relative h-[260px] w-full sm:h-[320px] md:h-[360px]">

                <img
                  src={news.image}
                  alt={news.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              </div>

            ) : (

              <div className="relative flex h-[230px] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#172554] to-[#1E293B] sm:h-[270px] md:h-[300px]">

                {/* Glow */}

                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

                <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />


                {/* Icon */}

                <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-sm">

                  <Newspaper
                    size={48}
                    strokeWidth={1.5}
                    className="text-amber-400"
                  />

                </div>

              </div>

            )}

          </div>


          {/* ==================================================
              Article Header
             ================================================== */}

          <div className="px-6 py-8 sm:px-10 sm:py-10 md:px-14">


            {/* Category / Source */}

            <div className="flex flex-wrap items-center gap-3">

              {news.category && (

                <span className="rounded-xl bg-amber-50 px-4 py-2 text-sm font-black text-amber-700">

                  {news.category}

                </span>

              )}


              {news.source && (

                <span className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">

                  منبع:
                  {" "}
                  {news.source}

                </span>

              )}

            </div>


            {/* Title */}

            <h1 className="mt-7 text-3xl font-black leading-[1.8] text-slate-950 sm:text-4xl md:text-5xl">

              {news.title}

            </h1>


            {/* Date */}

            {news.date && (

              <div className="mt-5 flex items-center gap-2 text-sm font-medium text-slate-400">

                <CalendarDays
                  size={17}
                />

                <span>
                  {formatDate(
                    news.date
                  )}
                </span>

              </div>

            )}


            {/* Divider */}

            <div className="my-8 h-px bg-slate-100" />


            {/* Summary */}

            {news.summary && (

              <div className="rounded-2xl border border-amber-100 bg-amber-50/60 px-5 py-5">

                <p className="text-base font-bold leading-8 text-slate-700 sm:text-lg">

                  {news.summary}

                </p>

              </div>

            )}


            {/* =================================================
                Content
               ================================================= */}

            {paragraphs.length > 0 && (

              <div className="mt-9">

                <div className="space-y-6">

                  {paragraphs.map(
                    (
                      paragraph,
                      index
                    ) => (

                      <p
                        key={index}
                        className="text-base leading-[2.2] text-slate-700 sm:text-lg"
                      >
                        {paragraph}
                      </p>

                    )
                  )}

                </div>

              </div>

            )}


            {/* =================================================
                Source Link
               ================================================= */}

            {news.sourceUrl && (

              <div className="mt-10 border-t border-slate-100 pt-8">

                <a
                  href={news.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-amber-500"
                >

                  مشاهده منبع اصلی خبر

                  <ExternalLink
                    size={17}
                  />

                </a>

              </div>

            )}

          </div>

        </article>


        {/* ====================================================
            Back to News
           ==================================================== */}

        <div className="mt-8 flex justify-center">

          <Link
            href="/news"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 shadow-sm transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
          >

            <ArrowRight
              size={18}
            />

            بازگشت به صفحه اخبار

          </Link>

        </div>


        {/* ====================================================
            Related / CTA
           ==================================================== */}

        <div className="mt-8 rounded-[2rem] bg-[#0F172A] px-6 py-10 text-center text-white shadow-xl sm:px-10">

          <span className="text-sm font-bold text-amber-400">
            مشاوره تخصصی تحصیلی و کنکور
          </span>

          <h2 className="mt-3 text-2xl font-black sm:text-3xl">
            برای انتخاب مسیر تحصیلی مناسب
            همراه شما هستیم
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">
            اگر درباره این خبر یا مسیر تحصیلی
            خود نیاز به راهنمایی دارید،
            می‌توانید برای دریافت مشاوره
            اقدام کنید.
          </p>

          <Link
            href="/#reservation"
            className="mt-7 inline-flex rounded-xl bg-amber-500 px-7 py-3.5 font-black text-white transition hover:bg-amber-600"
          >
            رزرو مشاوره
          </Link>

        </div>

      </div>

    </main>
  );
}