import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * پروکسی ساده برای Google Translate TTS (فارسی)
 * استفاده: /api/tts?q=متن
 * محدودیت طول متن حدود ۱۰۰ کاراکتر است.
 */
export async function GET(req: NextRequest) {
  try {
    const q = (req.nextUrl.searchParams.get("q") || "").trim();
    if (!q) {
      return NextResponse.json({ error: "متن خالی است" }, { status: 400 });
    }
    if (q.length > 180) {
      return NextResponse.json(
        { error: "متن طولانی است (حداکثر ۱۸۰ کاراکتر)" },
        { status: 400 }
      );
    }

    const url =
      "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=fa&q=" +
      encodeURIComponent(q);

    const upstream = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        Accept: "audio/mpeg, audio/*;q=0.9, */*;q=0.8",
        "Accept-Language": "fa-IR,fa;q=0.9,en;q=0.8",
        Referer: "https://translate.google.com/",
      },
      cache: "no-store",
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: "خطا در دریافت صدا", status: upstream.status },
        { status: 502 }
      );
    }

    const buffer = await upstream.arrayBuffer();
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: "خطای سرور", detail: String(e) },
      { status: 500 }
    );
  }
}
