import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwqdva3YX0BihDGOj_g0JRLUj_UmzKObvAKU1iIk5YGn0LbEF3XkI1yAfsTDlIpfnAWGg/exec";

// ======================================================
// GET — دریافت لیست رزروها (فقط برای پنل ادمین)
// ======================================================

export async function GET() {
  try {
    const url = `${GOOGLE_SCRIPT_URL}?action=getReservations&_=${Date.now()}`;

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
    console.error("GET /api/admin/reservations error:", error);

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
// POST — تغییر وضعیت (پیگیری شد / حذف)
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
          message: "شناسه رزرو مشخص نشده است.",
        },
        { status: 400 }
      );
    }

    // نگاشت action به مقادیر Apps Script
    const actionMap: Record<string, string> = {
      contacted: "markContacted",
      pending: "markPending",
      delete: "delete",
    };

    const scriptAction = actionMap[body.action] || body.action;

    const payload = {
      type: "reservationAction",
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
    console.error("POST /api/admin/reservations error:", error);

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
