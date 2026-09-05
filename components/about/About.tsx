import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, GraduationCap } from "lucide-react";
import AboutAlbum from "./AboutAlbum";

export default function About() {
  return (
    <section
      id="about"
      className="site-section-light overflow-hidden px-5 py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* تصویر + آلبوم */}
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 sm:flex-row sm:items-start">

            <div className="relative w-full flex-1">
              <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-amber-400/20 blur-3xl" />

              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 p-3 shadow-2xl">
                <Image
                  src="/images/mahyar-office.jpg"
                  alt="مهیار بیرون‌خو - مشاور تحصیلی و کنکور"
                  fill
                  sizes="(max-width: 768px) 90vw, 450px"
                  className="rounded-[1.5rem] object-cover"
                />
              </div>

              {/* کارت روی تصویر */}
              <div className="absolute -bottom-6 -left-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:-left-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
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

            {/* آلبوم تصاویر کنار تصویر اصلی */}
            <div className="w-full flex-1 sm:mt-2">
              <AboutAlbum />
            </div>

          </div>

          {/* متن */}
          <div className="text-right">

            <span className="section-kicker">
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
              مشاور تحصیلی با بیش از ۷ سال سابقه در مدارس مطرح تهران،
              دارای مدرک تخصصی زبان و مشاور رسمی آموزش و پرورش.
              متخصص در هدایت تحصیلی، برنامه‌ریزی درسی، مدیریت اضطراب
              امتحان و انتخاب رشته.
            </p>

            <p className="mt-4 leading-9 text-slate-600">
              با رویکردی مبتنی بر شناخت توانمندی‌ها و علایق
              دانش‌آموزان، مسیر موفقیت تحصیلی و شغلی آن‌ها را هموار
              می‌کنم.
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
                href="/about"
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