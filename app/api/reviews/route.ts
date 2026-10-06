import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwqdva3YX0BihDGOj_g0JRLUj_UmzKObvAKU1iIk5YGn0LbEF3XkI1yAfsTDlIpfnAWGg/exec";

// GET — فقط نظرات تأییدشده برای نمایش در سایت
export async function GET() {
  try {
    const url = `${GOOGLE_SCRIPT_URL}?action=getReviews&_=${Date.now()}`;
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      redirect: "follow",
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { success: false, message: "پاسخ سرور قابل پردازش نیست." },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "خطا در دریافت نظرات",
      },
      { status: 500 }
    );
  }
}

// POST — ثبت نظر جدید (وضعیت پیش‌فرض: pending تا مدیر تأیید کند)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const review = String(body.review || "").trim();
    const service = String(body.service || "").trim();
    const rating = Math.min(5, Math.max(1, Math.round(Number(body.rating)) || 5));

    if (!name || !review) {
      return NextResponse.json(
        { success: false, message: "لطفاً نام و متن نظر را وارد کنید." },
        { status: 400 }
      );
    }

    if (name.length > 80 || review.length > 1000) {
      return NextResponse.json(
        { success: false, message: "طول نام یا متن نظر بیش از حد مجاز است." },
        { status: 400 }
      );
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        type: "review",
        name,
        rating,
        review,
        service,
      }),
      cache: "no-store",
      redirect: "follow",
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Google Apps Script review response:", text);
      return NextResponse.json(
        { success: false, message: "پاسخ Google Apps Script قابل پردازش نیست." },
        { status: 502 }
      );
    }

    return NextResponse.json(data, { status: data?.success === false ? 400 : 200 });
  } catch (error) {
    console.error("POST /api/reviews error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "ثبت نظر انجام نشد.",
      },
      { status: 500 }
    );
  }
}
