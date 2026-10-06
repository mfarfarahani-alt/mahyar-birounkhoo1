import { NextResponse } from "next/server";

// ============================================================
// Google Apps Script
// ============================================================

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwqdva3YX0BihDGOj_g0JRLUj_UmzKObvAKU1iIk5YGn0LbEF3XkI1yAfsTDlIpfnAWGg/exec";

// ============================================================
// نوع آیتم آرشیو
// ============================================================

type ArchiveItem = {
  year?: string;
  field?: string;
  fileType?: string;
  title?: string;
  link?: string;
};

// ============================================================
// نرمال‌سازی آیتم آرشیو
// ============================================================

function normalizeArchiveItem(item: ArchiveItem): ArchiveItem {
  return {
    year: String(item.year || "").trim(),
    field: String(item.field || "").trim(),
    fileType: String(item.fileType || "").trim(),
    title: String(item.title || "").trim(),
    link: String(item.link || "").trim(),
  };
}

// ============================================================
// GET
// ============================================================

export async function GET() {
  try {
    const url = `${GOOGLE_SCRIPT_URL}?action=getArchive&_=${Date.now()}`;

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      redirect: "follow",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error("Google Apps Script HTTP error:", response.status);

      return NextResponse.json(
        {
          success: false,
          message: `خطا در ارتباط با Google Apps Script. وضعیت: ${response.status}`,
          archive: [],
        },
        { status: 502 }
      );
    }

    const text = await response.text();

    if (!text) {
      return NextResponse.json(
        {
          success: false,
          message: "پاسخ Google Apps Script خالی است.",
          archive: [],
        },
        { status: 502 }
      );
    }

    let data: unknown;

    try {
      data = JSON.parse(text);
    } catch {
      console.error("Invalid Google Apps Script JSON:", text);

      return NextResponse.json(
        {
          success: false,
          message: "پاسخ Google Apps Script معتبر نیست.",
          archive: [],
        },
        { status: 502 }
      );
    }

    const parsed = data as { success?: boolean; message?: string; archive?: ArchiveItem[] };

    if (parsed?.success === false) {
      return NextResponse.json(
        {
          success: false,
          message: parsed?.message || "دریافت آرشیو با خطا مواجه شد.",
          archive: [],
        },
        { status: 500 }
      );
    }

    const rawArchive: ArchiveItem[] = Array.isArray(parsed?.archive)
      ? parsed.archive
      : [];

    const archive = rawArchive
      .map(normalizeArchiveItem)
      .filter((item) => item.year && item.title && item.link);

    return NextResponse.json(
      {
        success: true,
        archive,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error) {
    console.error("GET /api/exam-archive error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "خطا در دریافت آرشیو.",
        archive: [],
      },
      { status: 500 }
    );
  }
}
