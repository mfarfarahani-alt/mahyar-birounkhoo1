"use client";

import { useEffect, useState } from "react";
import {
  GraduationCap,
  Palette,
  BookOpen,
  PenTool,
  Ruler,
} from "lucide-react";

// ============================================================
// تبدیل عدد به فارسی
// ============================================================

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

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

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

// ============================================================
// آزمون‌های کنکور ۱۴۰۶ (تاریخ‌های میلادی معادل تاریخ جلالی)
// ============================================================

type ExamItem = {
  key: string;
  title: string;
  dateLabel: string;
  targetDate: string;
  icon: typeof GraduationCap;
  ringColor: string;
  glowColor: string;
};

const exams: ExamItem[] = [
  {
    key: "farhangian",
    title: "آزمون اختصاصی فرهنگیان",
    dateLabel: "صبح جمعه ۱۴۰۶/۰۲/۱۷",
    targetDate: "2027-05-07T08:00:00",
    icon: GraduationCap,
    ringColor: "#8b5cf6",
    glowColor: "rgba(139,92,246,0.18)",
  },
  {
    key: "honar",
    title: "زبان و هنر",
    dateLabel: "بعدازظهر پنجشنبه ۱۴۰۶/۰۴/۱۰",
    targetDate: "2027-07-01T14:00:00",
    icon: Palette,
    ringColor: "#f43f5e",
    glowColor: "rgba(244,63,94,0.18)",
  },
  {
    key: "ensani",
    title: "علوم انسانی",
    dateLabel: "صبح جمعه ۱۴۰۶/۰۴/۱۱",
    targetDate: "2027-07-02T08:00:00",
    icon: BookOpen,
    ringColor: "#10b981",
    glowColor: "rgba(16,185,129,0.18)",
  },
  {
    key: "tajrobi",
    title: "علوم تجربی",
    dateLabel: "صبح پنجشنبه ۱۴۰۶/۰۴/۱۰",
    targetDate: "2027-07-01T08:00:00",
    icon: PenTool,
    ringColor: "#f59e0b",
    glowColor: "rgba(245,158,11,0.18)",
  },
  {
    key: "riazi",
    title: "علوم ریاضی و فنی",
    dateLabel: "صبح جمعه ۱۴۰۶/۰۴/۱۱",
    targetDate: "2027-07-02T08:00:00",
    icon: Ruler,
    ringColor: "#3b82f6",
    glowColor: "rgba(59,130,246,0.18)",
  },
];

// یک سال کامل به عنوان مبنای رسم دایره پیشرفت
const FULL_CYCLE_DAYS = 365;

// ============================================================
// دایره شمارش روزهای باقی‌مانده
// ============================================================

function DayRing({
  days,
  color,
}: {
  days: number;
  color: string;
}) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  const progress = Math.min(days / FULL_CYCLE_DAYS, 1);
  const offset = circumference * (1 - progress);

  return (
    <div className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full -rotate-90"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="rgba(148, 163, 184, 0.18)"
          strokeWidth="7"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>

      <div className="absolute flex flex-col items-center">
        <span
          className="text-2xl font-black tabular-nums sm:text-3xl"
          style={{ color }}
        >
          {toPersianDigits(days)}
        </span>
        <span className="mt-0.5 text-[11px] font-bold text-slate-400">
          روز مانده
        </span>
      </div>
    </div>
  );
}

// ============================================================
// کارت هر آزمون
// ============================================================

function ExamCard({ exam }: { exam: ExamItem }) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft(exam.targetDate));

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(exam.targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [exam.targetDate]);

  const Icon = exam.icon;

  return (
    <div
      className="flex flex-col items-center rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-6 text-center backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
      style={{ boxShadow: `0 0 0 1px transparent, 0 20px 40px -20px ${exam.glowColor}` }}
    >
      <DayRing days={mounted ? timeLeft.days : 0} color={exam.ringColor} />

      <div className="mt-4 flex items-center gap-1.5 text-sm font-black text-white sm:text-base">
        <Icon size={16} style={{ color: exam.ringColor }} />
        {exam.title}
      </div>

      <div className="mt-2 text-[11px] leading-6 text-slate-400 sm:text-xs">
        {exam.dateLabel}
      </div>

      <div
        dir="rtl"
        className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-bold text-slate-300 sm:text-xs"
      >
        <span>
          {mounted ? toPersianDigits(timeLeft.hours) : "۰۰"} ساعت
        </span>
        <span className="text-slate-600">·</span>
        <span>
          {mounted ? toPersianDigits(timeLeft.minutes) : "۰۰"} دقیقه
        </span>
        <span className="text-slate-600">·</span>
        <span>
          {mounted ? toPersianDigits(timeLeft.seconds) : "۰۰"} ثانیه
        </span>
      </div>
    </div>
  );
}

// ============================================================
// بخش اصلی: شمارش معکوس تا کنکور ۱۴۰۶
// ============================================================

type Props = {
  title?: string;
};

export default function ExamCountdown({
  title = "کنکور ۱۴۰۶",
}: Props) {
  return (
    <section
      id="konkur-countdown"
      dir="rtl"
      className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 px-5 py-16"
    >
      <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="inline-flex items-center gap-2 text-2xl font-black text-white sm:text-3xl">
            <span aria-hidden>⏳</span>
            تا {title} چقدر مونده؟
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-l from-amber-400 to-amber-600" />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {exams.map((exam) => (
            <ExamCard key={exam.key} exam={exam} />
          ))}
        </div>
      </div>
    </section>
  );
}
