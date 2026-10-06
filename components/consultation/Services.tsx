import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowLeft } from "lucide-react";

const packages = [
  { image: "/images/packages/e.png", title: "پکیج مشاوره ۱" },
  { image: "/images/packages/h.png", title: "پکیج مشاوره ۲" },
  { image: "/images/packages/plus.png", title: "پکیج مشاوره ۳" },
  { image: "/images/packages/cip.png", title: "پکیج مشاوره ۴" },
  { image: "/images/packages/v.png", title: "پکیج مشاوره ۵" },
];

// ترتیب نمایش بر اساس مبلغ، از بیشترین به کمترین.
// کافی است مقدار price هر پکیج با مبلغ واقعی همان پوستر جایگزین شود.

export default function Services() {
  return (
    <section id="services" dir="rtl" className="site-section-light px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-kicker">مسیر موفقیت</span>
          <h2 className="mt-5 text-3xl font-black text-[#0b1f3a] md:text-4xl">
            پکیج‌های مشاوره مهیار بیرون‌خو
          </h2>
          <p className="mt-4 font-bold text-[#c99a2e]">خدمات مشاوره</p>
          <p className="mt-3 leading-8 text-slate-600">
            پکیج مناسب خود را انتخاب کنید و برای دریافت مشاوره و رزرو وقت اقدام کنید.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {packages.map((item, index) => (
            <Link
              key={item.image}
              href="#reservation"
              aria-label={`مشاهده و رزرو ${item.title}`}
              className="package-poster group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-2.5 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-amber-400/60 hover:shadow-amber-500/10"
            >
              {/* نسبت ابعاد واقعی پوسترها (~2:3) تا متن روی تصویر خوانا بماند و از کادر خارج نشود */}
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-slate-50">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={index < 2}
                  sizes="(max-width: 639px) 92vw, (max-width: 1279px) 46vw, 30vw"
                  className="object-contain object-center p-1.5 transition duration-500 group-hover:scale-[1.015]"
                />
              </div>

              <div className="mt-auto flex items-center justify-between gap-2 px-2 py-3.5">
                <span className="truncate text-sm font-black text-[#0b1f3a] sm:text-base">
                  {item.title}
                </span>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#c99a2e] px-3 py-1.5 text-xs font-black text-white transition group-hover:bg-[#b88920]">
                  مشاهده و رزرو
                  <ArrowLeft size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4">
          <Link
            href="#reservation"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0b1f3a] px-7 py-4 font-black text-white shadow-lg shadow-amber-500/20 transition hover:bg-[#15365d]"
          >
            رزرو مشاوره
            <ArrowLeft size={18} />
          </Link>

          <a
            href="tel:+989380851505"
            dir="ltr"
            className="inline-flex items-center gap-2 rounded-xl border border-[#0b1f3a]/20 bg-white px-6 py-3 font-bold text-[#0b1f3a] transition hover:bg-[#0b1f3a] hover:text-white"
          >
            <Phone size={18} />
            09380851505
          </a>
        </div>
      </div>
    </section>
  );
}
