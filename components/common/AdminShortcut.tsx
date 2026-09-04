"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function AdminShortcut() {
  const router = useRouter();
  const tapCount = useRef(0);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // ============================================================
    // دسکتاپ: کلید ترکیبی
    // توجه: Ctrl+Shift+A در کروم رزرو شده (جستجوی تب‌ها) و قبل
    // از رسیدن به جاوااسکریپت صفحه توسط خود مرورگر گرفته می‌شود؛
    // برای همین گاهی کار نمی‌کرد. ترکیب زیر توسط هیچ مرورگر
    // اصلی رزرو نشده است.
    // ============================================================

    function onKeyDown(event: KeyboardEvent) {
      const isModifier = event.ctrlKey || event.metaKey;
      const key = event.key?.toLowerCase();

      if (isModifier && event.altKey && event.shiftKey && key === "a") {
        event.preventDefault();
        router.push("/admin/login");
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  // ============================================================
  // موبایل و دسکتاپ: با ۶ ضربه‌ی سریع (کمتر از ۲.۵ ثانیه) روی
  // نقطه‌ی نامرئی گوشه‌ی پایین سمت چپ صفحه، به ورود ادمین می‌رود.
  // ============================================================

  function handleTap() {
    tapCount.current += 1;

    if (tapTimer.current) {
      clearTimeout(tapTimer.current);
    }

    if (tapCount.current >= 6) {
      tapCount.current = 0;
      router.push("/admin/login");
      return;
    }

    tapTimer.current = setTimeout(() => {
      tapCount.current = 0;
    }, 2500);
  }

  return (
    <button
      type="button"
      aria-hidden="true"
      tabIndex={-1}
      onClick={handleTap}
      className="fixed bottom-0 left-0 z-[999] h-10 w-10 opacity-0"
      style={{ WebkitTapHighlightColor: "transparent" }}
    />
  );
}