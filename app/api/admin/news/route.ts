import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwqdva3YX0BihDGOj_g0JRLUj_UmzKObvAKU1iIk5YGn0LbEF3XkI1yAfsTDlIpfnAWGg/exec";

// ======================================================
// GET — دریافت اخبار
// ?all=1 → همه وضعیت‌ها (برای پنل ادمین)
// بدون all → فقط approved (برای سایت عمومی)
// ======================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "1";

    const action = all ? "getAllNews" : "getNews";
    const url = `${GOOGLE_SCRIPT_URL}?action=${action}&_=${Date.now()}`;

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
      console.error("Google Apps Script response:", text);

      return NextResponse.json(
        {
          success: false,
          message: "پاسخ Google Apps Script قابل پردازش نیست.",
        },
        { status: 500 }
      );
    }

    // اگر getAllNews در اسکریپت وجود نداشت، fallback به getNews
    if (
      data?.success === false &&
      all &&
      String(data?.message || "").includes("getAllNews")
    ) {
      const fallback = await fetch(
        `${GOOGLE_SCRIPT_URL}?action=getNews&_=${Date.now()}`,
        { method: "GET", cache: "no-store", redirect: "follow" }
      );
      const fallbackText = await fallback.text();
      try {
        data = JSON.parse(fallbackText);
      } catch {
        // keep original error
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/admin/news error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "خطا در ارتباط با Google Sheets",
      },
      { status: 500 }
    );
  }
}

// ======================================================
// POST — تأیید / رد / حذف خبر
// ======================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.action) {
      return NextResponse.json(
        {
          success: false,
          message: "عملیات مشخص نشده است.",
        },
        { status: 400 }
      );
    }

    if (!body.id) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه خبر مشخص نشده است.",
        },
        { status: 400 }
      );
    }

    // نگاشت action به مقادیر Apps Script
    const actionMap: Record<string, string> = {
      approve: "approve",
      reject: "reject",
      delete: "delete",
    };

    const scriptAction = actionMap[body.action] || body.action;

    const payload = {
      type: "newsAction",
      action: scriptAction,
      id: body.id,
    };

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      redirect: "follow",
    });

    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      console.error("Google Apps Script POST response:", text);

      return NextResponse.json(
        {
          success: false,
          message: "پاسخ Google Apps Script قابل پردازش نیست.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("POST /api/admin/news error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "خطا در ارتباط با Google Sheets",
      },
      { status: 500 }
    );
  }
}
