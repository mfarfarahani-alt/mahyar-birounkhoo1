import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import {
  WhatsAppIcon,
  TelegramIcon,
  InstagramIcon,
  BaleIcon,
} from "@/components/common/SocialIcons";

const links = [
  { title: "خانه", href: "/" },
  { title: "درباره من", href: "/#about" },
  { title: "خدمات", href: "/#services" },
  { title: "آزمون‌ها", href: "/assessments" },
  { title: "اخبار", href: "/news" },
  { title: "رزرو مشاوره", href: "/#reservation" },
  { title: "تماس", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="site-footer" dir="rtl">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-amber-400/50 bg-[#111d36]">
                <Image
                  src="/images/logo.png"
                  alt="لوگوی مهیار بیرون‌خو"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-base font-black text-white">مهیار بیرون‌خو</span>
                  <span
                    dir="ltr"
                    style={{ fontFamily: "'Brush Script MT', 'Segoe Script', cursive" }}
                    className="text-sm italic tracking-wide text-amber-400/90"
                  >
                    Mahyar Bironkhu
                  </span>
                </div>
                <div className="mt-0.5 text-xs font-bold text-amber-400">
                  مشاور تحصیلی و کنکور
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              برنامه‌ریزی شخصی، تحلیل آزمون و همراهی مستمر تا رسیدن به هدف کنکور.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-black text-white">دسترسی سریع</h3>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {links.map((item) => (
                <li key={item.href + item.title}>
                  <Link
                    href={item.href}
                    className="text-sm font-bold text-slate-400 transition hover:text-amber-400"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-black text-white">تماس</h3>
            <a
              href="tel:+989380851505"
              dir="ltr"
              className="mt-4 inline-flex items-center gap-2 text-sm font-black text-amber-400 transition hover:text-amber-300"
            >
              <Phone size={16} />
              0938 085 1505
            </a>
            <p className="mt-3 text-xs leading-6 text-slate-500">
              پاسخ‌گویی در ساعات کاری — رزرو آنلاین در هر ساعت از شبانه‌روز
            </p>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-black text-white">شبکه‌های اجتماعی</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://wa.me/989380851505"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-300 transition hover:bg-emerald-500 hover:text-white"
                aria-label="واتساپ"
              >
                <WhatsAppIcon size={18} />
              </a>
              <a
                href="https://t.me/HerooAcademy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-300 transition hover:bg-sky-500 hover:text-white"
                aria-label="تلگرام"
              >
                <TelegramIcon size={18} />
              </a>
              <a
                href="https://www.instagram.com/heroo_academyy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-300 transition hover:bg-pink-500 hover:text-white"
                aria-label="اینستاگرام"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://ble.ir/HerooAcademy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-300 transition hover:bg-blue-600 hover:text-white"
                aria-label="بله"
              >
                <BaleIcon size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-right">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} مهیار بیرون‌خو — تمامی حقوق محفوظ است.
          </p>
          <p className="text-xs text-slate-600">مشاوره تخصصی کنکور و هدایت تحصیلی</p>
        </div>
      </div>
    </footer>
  );
}
