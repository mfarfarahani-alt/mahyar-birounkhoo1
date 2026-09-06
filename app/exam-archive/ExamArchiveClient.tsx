"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Download, BookOpen, Loader2, FileWarning } from "lucide-react";

// ============================================================
// نوع داده آرشیو (از Google Sheet «آرشیو کنکور»)
// ستون‌ها: سال | رشته | نوع فایل | عنوان فایل | لینک فایل
// ============================================================

type ArchiveItem = {
  year: string;
  field: string;
  fileType: string;
  title: string;
  link: string;
};

const ALL_FIELDS_LABEL = "همه رشته‌ها";

// ترتیب ترجیحی نمایش رشته‌ها (اگر در داده موجود باشند)
const FIELD_ORDER = ["فرهنگیان", "هنر", "زبان", "انسانی", "ریاضی", "تجربی"];

// ============================================================
// دریافت آرشیو از API داخلی (که خودش از Google Apps Script می‌خواند)
// ============================================================

async function fetchArchive(): Promise<ArchiveItem[]> {
  try {
    const response = await fetch("/api/exam-archive", {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    const items: ArchiveItem[] = Array.isArray(data?.archive) ? data.archive : [];

    return items.filter((item) => item.year && item.title && item.link);
  } catch (error) {
    console.error("خطا در دریافت آرشیو سوالات:", error);
    return [];
  }
}

// ============================================================
// تبدیل ارقام فارسی به انگلیسی برای مرتب‌سازی صحیح سال‌ها
// ============================================================

function toEnglishDigits(value: string) {
  const persian = "۰۱۲۳۴۵۶۷۸۹";
  return value.replace(/[۰-۹]/g, (digit) => String(persian.indexOf(digit)));
}

function ArchiveAccordionItem({
  year,
  items,
  activeField,
}: {
  year: string;
  items: ArchiveItem[];
  activeField: string;
}) {
  const [open, setOpen] = useState(false);

  const visibleFiles =
    activeField === ALL_FIELDS_LABEL
      ? items
      : items.filter((item) => item.field === activeField);

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
        <span className="text-lg font-black text-blue-900">کنکور {year}</span>

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
          {visibleFiles.map((file, index) => (
            <div
              key={`${file.link}-${index}`}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3"
            >
              <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <span className="text-red-500">📄</span>
                {activeField === ALL_FIELDS_LABEL && file.field && (
                  <span className="text-slate-400">{file.field} —</span>
                )}
                {file.title}
                {file.fileType && (
                  <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                    {file.fileType}
                  </span>
                )}
              </div>

              <a
                href={file.link}
                target="_blank"
                rel="noopener noreferrer"
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

export default function ExamArchiveClient() {
  const [archive, setArchive] = useState<ArchiveItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeField, setActiveField] = useState(ALL_FIELDS_LABEL);

  useEffect(() => {
    let isMounted = true;

    fetchArchive().then((items) => {
      if (isMounted) {
        setArchive(items);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(archive.map((item) => item.year)));
    return uniqueYears.sort(
      (a, b) => Number(toEnglishDigits(b)) - Number(toEnglishDigits(a))
    );
  }, [archive]);

  const fieldTabs = useMemo(() => {
    const fieldsInData = Array.from(
      new Set(archive.map((item) => item.field).filter(Boolean))
    );

    const ordered = [
      ...FIELD_ORDER.filter((field) => fieldsInData.includes(field)),
      ...fieldsInData.filter((field) => !FIELD_ORDER.includes(field)),
    ];

    return [ALL_FIELDS_LABEL, ...ordered];
  }, [archive]);

  const totalFiles = useMemo(() => {
    if (activeField === ALL_FIELDS_LABEL) return archive.length;
    return archive.filter((item) => item.field === activeField).length;
  }, [archive, activeField]);

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

        {/* در حال بارگذاری */}
        {isLoading && (
          <div className="mt-16 flex flex-col items-center gap-3 text-slate-400">
            <Loader2 size={28} className="animate-spin" />
            در حال بارگذاری آرشیو...
          </div>
        )}

        {/* هنوز فایلی ثبت نشده */}
        {!isLoading && archive.length === 0 && (
          <div className="mt-16 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center text-slate-400">
            <FileWarning size={30} />
            آرشیو به‌زودی تکمیل می‌شود؛ لطفاً بعداً دوباره سر بزنید.
          </div>
        )}

        {!isLoading && archive.length > 0 && (
          <>
            {/* فیلتر رشته */}
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {fieldTabs.map((field) => (
                <button
                  key={field}
                  type="button"
                  onClick={() => setActiveField(field)}
                  className={`rounded-full border px-5 py-2 text-sm font-bold transition ${
                    activeField === field
                      ? "border-blue-900 bg-blue-900 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-blue-200"
                  }`}
                >
                  {field}
                </button>
              ))}
            </div>

            <div className="mt-2 text-center text-xs text-slate-400">
              مجموع فایل‌های موجود: {totalFiles}
            </div>

            {/* لیست سال‌ها */}
            <div className="mt-8 flex flex-col gap-4">
              {years.map((year) => (
                <ArchiveAccordionItem
                  key={year}
                  year={year}
                  items={archive.filter((item) => item.year === year)}
                  activeField={activeField}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
