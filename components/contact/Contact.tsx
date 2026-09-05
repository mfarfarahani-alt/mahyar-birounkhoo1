"use client";

import { useState } from "react";
import { Phone, Copy, Check, Clock } from "lucide-react";
import { BaleIcon, TelegramIcon } from "@/components/common/SocialIcons";

const PHONE_DISPLAY = "۰۹۳۸۰۸۵۱۵۰۵";
const PHONE_RAW = "09380851505";
const PHONE_TEL = "+989380851505";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyPhone() {
    try {
      await navigator.clipboard.writeText(PHONE_RAW);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const input = document.createElement("input");
      input.value = PHONE_RAW;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <section
      id="contact"
      dir="rtl"
      className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 px-5 py-20 lg:px-8"
    >
      {/* soft glows */}
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-sm font-bold text-amber-300">
          <Phone size={15} />
          تماس با ما
        </span>

        <h2 className="mt-5 text-3xl font-black text-white md:text-4xl">
          مستقیم با{" "}
          <span className="bg-gradient-to-l from-amber-300 to-amber-500 bg-clip-text text-transparent">
            مهیار بیرون‌خو
          </span>{" "}
          در ارتباط باشید
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-slate-300 md:text-base">
          برای مشاوره تحصیلی و کنکور می‌توانید از طریق شماره زیر تماس بگیرید
          یا در پیام‌رسان‌ها پیام بگذارید.
        </p>

        {/* Phone card */}
        <div className="mx-auto mt-10 max-w-lg rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md sm:p-8">
          <div className="mb-2 text-xs font-bold tracking-wide text-slate-400">
            شماره تماس
          </div>

          <a
            href={`tel:${PHONE_TEL}`}
            className="group inline-flex items-center justify-center gap-3 transition"
            dir="ltr"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-900 shadow-lg shadow-amber-500/30 transition group-hover:scale-105">
              <Phone size={22} strokeWidth={2.5} />
            </span>
            <span className="text-3xl font-black tracking-wider text-white sm:text-4xl md:text-5xl">
              {PHONE_DISPLAY}
            </span>
          </a>

          <p className="mt-3 text-xs text-slate-400">
            با یک لمس روی شماره، تماس برقرار می‌شود
          </p>

          {/* actions */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-amber-500 to-amber-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-amber-500/25 transition hover:from-amber-600 hover:to-amber-700"
            >
              <Phone size={17} />
              تماس بگیرید
            </a>

            <button
              type="button"
              onClick={copyPhone}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"
            >
              {copied ? (
                <>
                  <Check size={17} className="text-emerald-400" />
                  کپی شد
                </>
              ) : (
                <>
                  <Copy size={17} />
                  کپی شماره
                </>
              )}
            </button>

            <a
              href="https://ble.ir/HerooAcademy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
            >
              <BaleIcon size={17} />
              بله
            </a>

            <a
              href="https://t.me/HerooAcademy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-500"
            >
              <TelegramIcon size={17} />
              تلگرام
            </a>
          </div>
        </div>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs text-slate-400">
          <Clock size={14} />
          پاسخ‌گویی در ساعات کاری
        </div>
      </div>
    </section>
  );
}
