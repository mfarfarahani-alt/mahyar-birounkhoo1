import { NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwqdva3YX0BihDGOj_g0JRLUj_UmzKObvAKU1iIk5YGn0LbEF3XkI1yAfsTDlIpfnAWGg/exec";

type NewsItem = {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  category: string;
  sourceUrl: string;
  status: string;
  image: string;
  date: string;
};

function makeSlug(title: string) {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, "")
    .replace(/-+/g, "-");
}

export async function GET(
  request: Request,
  context: {
    params: Promise<{ slug: string }>;
  }
) {
  try {
    const { slug } = await context.params;

    const response = await fetch(
      `${GOOGLE_SCRIPT_URL}?action=getNews&_=${Date.now()}`,
      {
        method: "GET",
        cache: "no-store",
        redirect: "follow",
      }
    );

    const text = await response.text();

    let data: any;

    try {
      data = JSON.parse(text);
    } catch {
      console.error(
        "Google Apps Script response:",
        text
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "پاسخ Google Apps Script معتبر نیست.",
        },
        { status: 500 }
      );
    }

    if (!data.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            data.message ||
            "دریافت اخبار با خطا مواجه شد.",
        },
        { status: 500 }
      );
    }

    const newsList: NewsItem[] = data.news || [];

    const news = newsList.find((item) => {
      const itemSlug = makeSlug(item.title);

      return (
        itemSlug === slug &&
        String(item.status)
          .trim()
          .toLowerCase() === "approved"
      );
    });

    if (!news) {
      return NextResponse.json(
        {
          success: false,
          message: "خبر مورد نظر پیدا نشد.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      news,
    });
  } catch (error) {
    console.error(
      "GET /api/news/[slug] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "خطا در دریافت خبر.",
      },
      { status: 500 }
    );
  }
}