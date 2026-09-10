import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwqdva3YX0BihDGOj_g0JRLUj_UmzKObvAKU1iIk5YGn0LbEF3XkI1yAfsTDlIpfnAWGg/exec";

export async function GET() {
  try {
    const response = await fetch(
      `${GOOGLE_SCRIPT_URL}?action=getAllReviews&_=${Date.now()}`,
      { cache: "no-store", redirect: "follow" }
    );
    const text = await response.text();
    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/admin/reviews error:", error);
    return NextResponse.json(
      { success: false, message: "دریافت نظرات با مشکل مواجه شد." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body?.action || !body?.id) {
      return NextResponse.json(
        { success: false, message: "عملیات یا شناسه نظر مشخص نشده است." },
        { status: 400 }
      );
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        type: "reviewAction",
        action: body.action,
        id: body.id,
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
    console.error("POST /api/admin/reviews error:", error);
    return NextResponse.json(
      { success: false, message: "عملیات نظر با خطا مواجه شد." },
      { status: 500 }
    );
  }
}
