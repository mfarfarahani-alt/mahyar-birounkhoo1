import { NextResponse } from "next/server";


// ============================================================
// Google Apps Script
// ============================================================

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwqdva3YX0BihDGOj_g0JRLUj_UmzKObvAKU1iIk5YGn0LbEF3XkI1yAfsTDlIpfnAWGg/exec";


// ============================================================
// نوع خبر
// ============================================================

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


// ============================================================
// نرمال‌سازی خبر
// ============================================================

function normalizeNewsItem(
  item: NewsItem
): NewsItem {

  const id = String(
    item.id ||
      item.rowNumber ||
      ""
  ).trim();


  return {
    ...item,

    id,

    rowNumber:
      item.rowNumber
        ? Number(item.rowNumber)
        : undefined,

    title:
      String(
        item.title || ""
      ).trim(),

    summary:
      String(
        item.summary || ""
      ).trim(),

    content:
      String(
        item.content || ""
      ).trim(),

    source:
      String(
        item.source || ""
      ).trim(),

    category:
      String(
        item.category || ""
      ).trim(),

    date:
      String(
        item.date || ""
      ).trim(),

    slug:
      String(
        item.slug || ""
      ).trim(),

    status:
      String(
        item.status || ""
      )
        .trim()
        .toLowerCase(),

    image:
      String(
        item.image || ""
      ).trim(),

    sourceUrl:
      String(
        item.sourceUrl || ""
      ).trim(),
  };
}


// ============================================================
// GET
// ============================================================

export async function GET() {

  try {

    // --------------------------------------------------------
    // آدرس واقعی Google Apps Script
    // --------------------------------------------------------

    const url =
      `${GOOGLE_SCRIPT_URL}?action=getNews&_=${Date.now()}`;


    console.log(
      "Fetching news from Google Apps Script..."
    );


    // --------------------------------------------------------
    // دریافت اطلاعات
    // --------------------------------------------------------

    const response =
      await fetch(
        url,
        {
          method: "GET",

          cache: "no-store",

          redirect: "follow",

          headers: {
            Accept:
              "application/json",
          },
        }
      );


    // --------------------------------------------------------
    // بررسی HTTP
    // --------------------------------------------------------

    if (!response.ok) {

      console.error(
        "Google Apps Script HTTP error:",
        response.status
      );


      return NextResponse.json(
        {
          success: false,

          message:
            `خطا در ارتباط با Google Apps Script. وضعیت: ${response.status}`,

          news: [],
        },
        {
          status: 502,
        }
      );
    }


    // --------------------------------------------------------
    // دریافت متن
    // --------------------------------------------------------

    const text =
      await response.text();


    if (!text) {

      console.error(
        "Google Apps Script returned empty response."
      );


      return NextResponse.json(
        {
          success: false,

          message:
            "پاسخ Google Apps Script خالی است.",

          news: [],
        },
        {
          status: 502,
        }
      );
    }


    // --------------------------------------------------------
    // JSON
    // --------------------------------------------------------

    let data: any;


    try {

      data =
        JSON.parse(text);

    } catch (error) {

      console.error(
        "Invalid Google Apps Script JSON:",
        text
      );


      return NextResponse.json(
        {
          success: false,

          message:
            "پاسخ Google Apps Script معتبر نیست.",

          news: [],
        },
        {
          status: 502,
        }
      );
    }


    // --------------------------------------------------------
    // خطای Google Apps Script
    // --------------------------------------------------------

    if (
      data?.success === false
    ) {

      return NextResponse.json(
        {
          success: false,

          message:
            data?.message ||
            "دریافت اخبار با خطا مواجه شد.",

          news: [],
        },
        {
          status: 500,
        }
      );
    }


    // --------------------------------------------------------
    // استخراج اخبار
    // --------------------------------------------------------

    const rawNews: NewsItem[] =
      Array.isArray(data)
        ? data
        : Array.isArray(data?.news)
          ? data.news
          : Array.isArray(data?.data)
            ? data.data
            : [];


    // --------------------------------------------------------
    // نرمال‌سازی
    // --------------------------------------------------------

    const news =
      rawNews
        .map(
          normalizeNewsItem
        )
        .filter(
          (
            item
          ) =>
            item.id &&
            item.title
        );


    // --------------------------------------------------------
    // فقط اخبار تأیید شده
    // --------------------------------------------------------

    const approvedNews =
      news.filter(
        (
          item
        ) =>
          item.status ===
          "approved"
      );


    // --------------------------------------------------------
    // مرتب‌سازی جدیدترین خبر
    // --------------------------------------------------------

    approvedNews.sort(
      (
        a,
        b
      ) => {

        const dateA =
          a.date
            ? new Date(
                a.date.replace(
                  /\//g,
                  "-"
                )
              ).getTime()
            : 0;


        const dateB =
          b.date
            ? new Date(
                b.date.replace(
                  /\//g,
                  "-"
                )
              ).getTime()
            : 0;


        if (
          Number.isNaN(
            dateA
          ) ||
          Number.isNaN(
            dateB
          )
        ) {

          return 0;
        }


        return dateB - dateA;
      }
    );


    // --------------------------------------------------------
    // پاسخ
    // --------------------------------------------------------

    return NextResponse.json(
      {
        success: true,

        news:
          approvedNews,
      },
      {
        status: 200,

        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",

          Pragma:
            "no-cache",

          Expires:
            "0",
        },
      }
    );


  } catch (error) {

    console.error(
      "GET /api/news error:",
      error
    );


    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "خطا در دریافت اخبار.",

        news: [],
      },
      {
        status: 500,
      }
    );
  }
}