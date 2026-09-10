import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwqdva3YX0BihDGOj_g0JRLUj_UmzKObvAKU1iIk5YGn0LbEF3XkI1yAfsTDlIpfnAWGg/exec";

export async function GET() {
  try {
    const response = await fetch(
      `${GOOGLE_SCRIPT_URL}?action=getReviews&_=${Date.now()}`,
      { cache: "no-store", redirect: "follow" }
    );
    const text = await response.text();
    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/reviews error:", error);
    return NextResponse.json(
      { success: false, message: "دریافت نظرات با مشکل مواجه شد." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = String(body?.name || "").trim();
    const review = String(body?.review || "").trim();
    const service = String(body?.service || "").trim();
    const rating = Number(body?.rating);

    if (!name || !review) {
      return NextResponse.json(
        { success: false, message: "نام و متن نظر الزامی است." },
        { status: 400 }
      );
    }

    if (name.length > 80 || review.length > 1000 || service.length > 80) {
      return NextResponse.json(
        { success: false, message: "طول اطلاعات ارسالی بیش از حد مجاز است." },
        { status: 400 }
      );
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: "امتیاز باید بین ۱ تا ۵ باشد." },
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

    try {
      return NextResponse.json(JSON.parse(text));
    } catch {
      return NextResponse.json(
        { success: false, message: "پاسخ Google Apps Script قابل پردازش نیست." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("POST /api/reviews error:", error);
    return NextResponse.json(
      { success: false, message: "ثبت نظر با خطا مواجه شد." },
      { status: 500 }
    );
  }
}
