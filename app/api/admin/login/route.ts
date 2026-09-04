import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const ADMIN_SESSION_TOKEN =
  process.env.ADMIN_SESSION_TOKEN || "mahyar-admin-session-v1";

const COOKIE_NAME = "admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(request: NextRequest) {
  try {
    if (!ADMIN_PASSWORD) {
      return NextResponse.json(
        {
          success: false,
          message:
            "رمز ادمین در سرور تنظیم نشده است. متغیر ADMIN_PASSWORD را در .env قرار دهید.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const password = String(body?.password || "");

    if (!password) {
      return NextResponse.json(
        {
          success: false,
          message: "رمز عبور را وارد کنید.",
        },
        { status: 400 }
      );
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        {
          success: false,
          message: "رمز عبور نادرست است.",
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "ورود موفقیت‌آمیز بود.",
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: ADMIN_SESSION_TOKEN,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: MAX_AGE,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ورود.",
      },
      { status: 500 }
    );
  }
}
