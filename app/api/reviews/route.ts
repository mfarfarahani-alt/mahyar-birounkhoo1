import { NextResponse } from "next/server";

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
