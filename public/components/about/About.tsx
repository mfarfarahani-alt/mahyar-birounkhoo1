import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, GraduationCap } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white px-5 py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* تصویر */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-amber-400/25 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-gradient-to-br from-slate-50 to-slate-100 p-3 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.15)]">
              <Image
                src="/images/mahyar-office.jpg"
                alt="مهیار بیرون‌خو - مشاور تحصیلی و کنکور"
                width={900}
                height={1200}
                className="h-auto w-full rounded-[1.5rem] object-cover"
              />
            </div>

            {/* کارت روی تصویر */}
            <div className="absolute -bottom-6 -left-4 rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-xl backdrop-blur-sm sm:-left-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-500/10 text-amber-600 shadow-inner">
                  <GraduationCap size={25} />
                </div>

                <div>
                  <div className="text-xl font-black text-slate-900">
                    مشاوره تخصصی
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    تحصیلی و کنکور
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* متن */}
          <div className="text-right">

            <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700">
              درباره مهیار بیرون‌خو
            </span>

            <h2 className="mt-5 text-3xl font-black leading-[1.6] text-slate-900 sm:text-4xl">
              مسیر موفقیت در کنکور،
              <span className="text-amber-500">
                {" "}
                با یک برنامه درست
              </span>
            </h2>

            <p className="mt-6 leading-9 text-slate-600">
              مهیار بیرون‌خو، مشاور تحصیلی و کنکور، با تمرکز بر
              برنامه‌ریزی شخصی‌سازی‌شده و پیگیری مستمر، در کنار
              دانش‌آموزان قرار می‌گیرد تا مسیر مطالعه و آمادگی برای
              کنکور را هدفمند و اصولی طی کنند.
            </p>

            <p className="mt-4 leading-9 text-slate-600">
              هدف ما فقط ارائه یک برنامه درسی نیست؛ بلکه ایجاد یک
              مسیر مشخص، قابل پیگیری و متناسب با شرایط هر دانش‌آموز است.
            </p>

            {/* ویژگی‌ها */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-1 shrink-0 text-amber-500"
                  size={21}
                />

                <div>
                  <h3 className="font-bold text-slate-900">
                    برنامه‌ریزی شخصی
                  </h3>

                  <p className="mt-1 text-sm leading-7 text-slate-500">
                    متناسب با سطح و شرایط هر دانش‌آموز
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-1 shrink-0 text-amber-500"
                  size={21}
                />

                <div>
                  <h3 className="font-bold text-slate-900">
                    پیگیری مستمر
                  </h3>

                  <p className="mt-1 text-sm leading-7 text-slate-500">
                    بررسی روند مطالعه و اصلاح مسیر
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-1 shrink-0 text-amber-500"
                  size={21}
                />

                <div>
                  <h3 className="font-bold text-slate-900">
                    تحلیل آزمون
                  </h3>

                  <p className="mt-1 text-sm leading-7 text-slate-500">
                    بررسی نقاط قوت و ضعف دانش‌آموز
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-1 shrink-0 text-amber-500"
                  size={21}
                />

                <div>
                  <h3 className="font-bold text-slate-900">
                    هدف‌گذاری
                  </h3>

                  <p className="mt-1 text-sm leading-7 text-slate-500">
                    حرکت مرحله‌به‌مرحله به سمت هدف
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-9">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-4 font-bold text-white transition hover:bg-slate-800"
              >
                آشنایی بیشتر
                <ArrowLeft size={18} />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}