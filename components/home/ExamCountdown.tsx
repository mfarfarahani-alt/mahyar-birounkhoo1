"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function toPersianDigits(value: number | string) {
  return String(value)
    .replace(/0/g, "۰")
    .replace(/1/g, "۱")
    .replace(/2/g, "۲")
    .replace(/3/g, "۳")
    .replace(/4/g, "۴")
    .replace(/5/g, "۵")
    .replace(/6/g, "۶")
    .replace(/7/g, "۷")
    .replace(/8/g, "۸")
    .replace(/9/g, "۹");
}

function getTimeLeft(targetDate: string): TimeLeft {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
}

type Props = {
  targetDate?: string;
  title?: string;
  kicker?: string;
};

export default function ExamCountdown({
  targetDate = "2026-07-09T08:00:00",
  title = "کنکور سراسری",
  kicker = "زمان باقی‌مانده تا آزمون",
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft(targetDate));

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { label: "روز", value: timeLeft.days },
    { label: "ساعت", value: timeLeft.hours },
    { label: "دقیقه", value: timeLeft.minutes },
    { label: "ثانیه", value: timeLeft.seconds },
  ];

  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 px-5 py-14"
    >
      <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-sm font-bold text-amber-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
          {kicker}
        </span>

        <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">{title}</h2>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-5 backdrop-blur-sm"
            >
              <div className="text-3xl font-black tabular-nums text-white sm:text-4xl">
                {mounted ? toPersianDigits(item.value) : "—"}
              </div>
              <div className="mt-2 text-xs font-bold text-slate-400 sm:text-sm">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}