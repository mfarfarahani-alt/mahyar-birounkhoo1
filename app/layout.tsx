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
    default: "مهیار بیرون‌خو | مشاور تحصیلی و کنکور",
    template: "%s | مهیار بیرون‌خو",
  },
  description:
    "مشاوره تخصصی کنکور و هدایت تحصیلی توسط مهیار بیرون‌خو؛ برنامه‌ریزی شخصی، تحلیل آزمون، رتبه‌های برتر فرهنگیان و رزرو آنلاین مشاوره.",
  keywords: [
    "مشاوره کنکور",
    "مهیار بیرون‌خو",
    "برنامه‌ریزی کنکور",
    "رتبه برتر",
    "فرهنگیان",
    "هدایت تحصیلی",
  ],
  openGraph: {
    title: "مهیار بیرون‌خو | مشاور تحصیلی و کنکور",
    description:
      "برنامه‌ریزی شخصی، تحلیل آزمون و مسیر مشخص برای موفقیت در کنکور",
    locale: "fa_IR",
    type: "website",
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
