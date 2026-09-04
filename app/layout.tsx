import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdminShortcut from "@/components/common/AdminShortcut";
import SocialLinks from "@/components/common/SocialLinks";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "مشاوره کنکور و برنامه‌ریزی تحصیلی | مهیار بیرون‌خو",
    template: "%s | مهیار بیرون‌خو",
  },
  description:
    "مشاوره تخصصی کنکور با برنامه‌ریزی شخصی، تحلیل آزمون و پیگیری مستمر. بیش از ۷ سال سابقه در مدارس مطرح تهران و رتبه برتر فرهنگیان. رزرو آنلاین مشاوره با مهیار بیرون‌خو.",
  keywords: [
    "مشاوره کنکور",
    "مشاور کنکور",
    "مهیار بیرون‌خو",
    "برنامه‌ریزی کنکور",
    "هدایت تحصیلی",
    "انتخاب رشته کنکور",
    "رتبه برتر فرهنگیان",
    "مشاور تحصیلی",
  ],
  openGraph: {
    title: "مشاوره کنکور و برنامه‌ریزی تحصیلی | مهیار بیرون‌خو",
    description:
      "برنامه‌ریزی شخصی، تحلیل آزمون و مسیر مشخص برای موفقیت در کنکور. رتبه برتر فرهنگیان با مشاوره تخصصی مهیار بیرون‌خو.",
    locale: "fa_IR",
    type: "website",
    url: "https://www.mahyar-bironkhu.ir",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        <Header />
        {children}
        <Footer />
        <AdminShortcut />
        <SocialLinks />
      </body>
    </html>
  );
}
