import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwqdva3YX0BihDGOj_g0JRLUj_UmzKObvAKU1iIk5YGn0LbEF3XkI1yAfsTDlIpfnAWGg/exec";

// ======================================================
// GET — دریافت لیست نتایج آزمون‌ها
// ======================================================

export async function GET() {
  try {
    const url = `${GOOGLE_SCRIPT_URL}?action=getAssessments&_=${Date.now()}`;

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

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/admin/assessments error:", error);

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
// POST — حذف نتیجه آزمون
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
          message: "شناسه آزمون مشخص نشده است.",
        },
        { status: 400 }
      );
    }

    const payload = {
      type: "assessmentAction",
      action: body.action,
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
    console.error("POST /api/admin/assessments error:", error);

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
