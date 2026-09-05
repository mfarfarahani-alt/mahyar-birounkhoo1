"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Download, BookOpen } from "lucide-react";

// ============================================================
// داده‌ی آرشیو سوالات و پاسخنامه‌ی کنکور
// نکته: مسیر فایل‌ها به‌صورت نمونه است. برای فعال شدن دانلود واقعی،
// فایل‌های PDF را در مسیر public/files/exam-archive/ قرار دهید.
// ============================================================

type FieldKey =
  | "all"
  | "tajrobi"
  | "riazi"
  | "ensani"
  | "zaban"
  | "honar"
  | "farhangian";

type ArchiveFile = {
  title: string;
  field: Exclude<FieldKey, "all">;
  href: string;
};

type ArchiveYear = {
  year: string;
  files: ArchiveFile[];
};

const fieldLabels: Record<FieldKey, string> = {
  all: "همه رشته‌ها",
  tajrobi: "تجربی",
  riazi: "ریاضی",
  ensani: "انسانی",
  zaban: "زبان",
  honar: "هنر",
  farhangian: "فرهنگیان",
};

const fieldOrder: FieldKey[] = [
  "farhangian",
  "honar",
  "zaban",
  "ensani",
  "riazi",
  "tajrobi",
  "all",
];

const archiveData: ArchiveYear[] = [
  {
    year: "۱۴۰۵",
    files: [
      { title: "دفترچه سوالات — شماره یک", field: "tajrobi", href: "/files/exam-archive/1405/tajrobi-1.pdf" },
      { title: "دفترچه سوالات — شماره دو", field: "tajrobi", href: "/files/exam-archive/1405/tajrobi-2.pdf" },
      { title: "پاسخنامه تشریحی", field: "tajrobi", href: "/files/exam-archive/1405/tajrobi-answers.pdf" },
      { title: "دفترچه سوالات — شماره یک", field: "riazi", href: "/files/exam-archive/1405/riazi-1.pdf" },
      { title: "پاسخنامه تشریحی", field: "riazi", href: "/files/exam-archive/1405/riazi-answers.pdf" },
      { title: "دفترچه سوالات", field: "ensani", href: "/files/exam-archive/1405/ensani-1.pdf" },
      { title: "دفترچه سوالات", field: "zaban", href: "/files/exam-archive/1405/zaban-1.pdf" },
      { title: "دفترچه سوالات", field: "honar", href: "/files/exam-archive/1405/honar-1.pdf" },
      { title: "دفترچه سوالات اختصاصی", field: "farhangian", href: "/files/exam-archive/1405/farhangian-1.pdf" },
    ],
  },
  {
    year: "۱۴۰۴",
    files: [
      { title: "دفترچه سوالات — شماره یک", field: "tajrobi", href: "/files/exam-archive/1404/tajrobi-1.pdf" },
      { title: "دفترچه سوالات — شماره دو", field: "tajrobi", href: "/files/exam-archive/1404/tajrobi-2.pdf" },
      { title: "پاسخنامه تشریحی", field: "tajrobi", href: "/files/exam-archive/1404/tajrobi-answers.pdf" },
      { title: "دفترچه سوالات", field: "riazi", href: "/files/exam-archive/1404/riazi-1.pdf" },
      { title: "پاسخنامه تشریحی", field: "riazi", href: "/files/exam-archive/1404/riazi-answers.pdf" },
      { title: "دفترچه سوالات", field: "ensani", href: "/files/exam-archive/1404/ensani-1.pdf" },
      { title: "دفترچه سوالات", field: "zaban", href: "/files/exam-archive/1404/zaban-1.pdf" },
      { title: "دفترچه سوالات", field: "honar", href: "/files/exam-archive/1404/honar-1.pdf" },
      { title: "دفترچه سوالات اختصاصی", field: "farhangian", href: "/files/exam-archive/1404/farhangian-1.pdf" },
    ],
  },
  {
    year: "۱۴۰۳",
    files: [
      { title: "دفترچه سوالات — شماره یک", field: "tajrobi", href: "/files/exam-archive/1403/tajrobi-1.pdf" },
      { title: "پاسخنامه تشریحی", field: "tajrobi", href: "/files/exam-archive/1403/tajrobi-answers.pdf" },
      { title: "دفترچه سوالات", field: "riazi", href: "/files/exam-archive/1403/riazi-1.pdf" },
      { title: "دفترچه سوالات", field: "ensani", href: "/files/exam-archive/1403/ensani-1.pdf" },
      { title: "دفترچه سوالات", field: "zaban", href: "/files/exam-archive/1403/zaban-1.pdf" },
      { title: "دفترچه سوالات", field: "honar", href: "/files/exam-archive/1403/honar-1.pdf" },
    ],
  },
];

function ArchiveAccordionItem({
  archiveYear,
  activeField,
}: {
  archiveYear: ArchiveYear;
  activeField: FieldKey;
}) {
  const [open, setOpen] = useState(false);

  const visibleFiles =
    activeField === "all"
      ? archiveYear.files
      : archiveYear.files.filter((file) => file.field === activeField);

  if (visibleFiles.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-6 py-5 text-right"
      >
        <span className="text-lg font-black text-blue-900">
          کنکور {archiveYear.year}
        </span>

        <span className="flex items-center gap-3 text-sm font-bold text-slate-500">
          {visibleFiles.length} فایل
          <ChevronDown
            size={18}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {open && (
        <div className="flex flex-col gap-3 border-t border-slate-100 px-6 py-5">
          {visibleFiles.map((file) => (
            <div
              key={file.href}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3"
            >
              <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <span className="text-red-500">📄</span>
                {activeField === "all" && (
                  <span className="text-slate-400">
                    {fieldLabels[file.field]} —
                  </span>
                )}
                {file.title}
              </div>

              <a
                href={file.href}
                download
                className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-black text-white transition hover:bg-amber-600"
              >
                <Download size={14} />
                دانلود
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ExamArchivePage() {
  const [activeField, setActiveField] = useState<FieldKey>("all");

  const totalFiles = useMemo(() => {
    return archiveData.reduce((sum, year) => {
      const count =
        activeField === "all"
          ? year.files.length
          : year.files.filter((f) => f.field === activeField).length;
      return sum + count;
    }, 0);
  }, [activeField]);

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 px-5 py-16">
      <div className="mx-auto max-w-4xl">

        {/* عنوان */}
        <div className="text-center">
          <span className="inline-block rounded-full bg-amber-50 px-5 py-2 text-sm font-bold text-amber-700">
            ابزار کنکور
          </span>

          <h1 className="mt-6 flex items-center justify-center gap-2 text-3xl font-black text-slate-900 md:text-5xl">
            <BookOpen size={30} className="text-blue-900" />
            آرشیو سوالات و پاسخنامه‌ی کنکور
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
            دفترچه‌ی کامل سوالات و پاسخنامه‌ی کنکور سراسری سال‌های اخیر،
            رایگان و آماده‌ی دانلود. رشته و سال مورد نظرت رو انتخاب کن.
          </p>
        </div>

        {/* فیلتر رشته */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {fieldOrder.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveField(key)}
              className={`rounded-full border px-5 py-2 text-sm font-bold transition ${
                activeField === key
                  ? "border-blue-900 bg-blue-900 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-200"
              }`}
            >
              {fieldLabels[key]}
            </button>
          ))}
        </div>

        <div className="mt-2 text-center text-xs text-slate-400">
          مجموع فایل‌های موجود: {totalFiles}
        </div>

        {/* لیست سال‌ها */}
        <div className="mt-8 flex flex-col gap-4">
          {archiveData.map((archiveYear) => (
            <ArchiveAccordionItem
              key={archiveYear.year}
              archiveYear={archiveYear}
              activeField={activeField}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
