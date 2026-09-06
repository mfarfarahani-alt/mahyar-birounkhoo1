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

const SITE_URL = "https://www.mahyar-bironkhu.ir";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
  authors: [{ name: "مهیار بیرون‌خو", url: SITE_URL }],
  creator: "مهیار بیرون‌خو",
  publisher: "مهیار بیرون‌خو",
  category: "Education",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "مشاوره کنکور و برنامه‌ریزی تحصیلی | مهیار بیرون‌خو",
    description:
      "برنامه‌ریزی شخصی، تحلیل آزمون و مسیر مشخص برای موفقیت در کنکور. رتبه برتر فرهنگیان با مشاوره تخصصی مهیار بیرون‌خو.",
    siteName: "مهیار بیرون‌خو",
    locale: "fa_IR",
    type: "website",
    url: SITE_URL,
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "مهیار بیرون‌خو - مشاور تحصیلی و کنکور",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "مشاوره کنکور و برنامه‌ریزی تحصیلی | مهیار بیرون‌خو",
    description:
      "برنامه‌ریزی شخصی، تحلیل آزمون و مسیر مشخص برای موفقیت در کنکور با مشاوره تخصصی مهیار بیرون‌خو.",
    images: ["/images/og-cover.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: true,
  },
};

// ============================================================
// داده‌ساختاریافته (JSON-LD) برای موتورهای جستجو و هوش مصنوعی
// ============================================================

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: "مهیار بیرون‌خو - مشاوره کنکور و هدایت تحصیلی",
      url: SITE_URL,
      image: `${SITE_URL}/images/og-cover.jpg`,
      logo: `${SITE_URL}/images/logo.png`,
      telephone: "+989380851505",
      priceRange: "$$",
      areaServed: "IR",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IR",
        addressLocality: "تهران",
      },
      sameAs: [
        "https://t.me/HerooAcademy",
        "https://www.instagram.com/heroo_academyy",
        "https://ble.ir/HerooAcademy",
      ],
      founder: {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
      },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "مهیار بیرون‌خو",
      alternateName: "Mahyar Bironkhu",
      url: SITE_URL,
      image: `${SITE_URL}/images/mahyar-hero.jpg`,
      jobTitle: "مشاور تحصیلی و کنکور",
      description:
        "مشاور تحصیلی و کنکور با بیش از ۷ سال سابقه فعالیت در مدارس مطرح تهران، متخصص برنامه‌ریزی درسی، هدایت تحصیلی و انتخاب رشته.",
      worksFor: {
        "@id": `${SITE_URL}/#business`,
      },
      sameAs: [
        "https://t.me/HerooAcademy",
        "https://www.instagram.com/heroo_academyy",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "مهیار بیرون‌خو",
      description:
        "مشاوره تخصصی کنکور، برنامه‌ریزی تحصیلی، هدایت تحصیلی و انتخاب رشته با مهیار بیرون‌خو.",
      inLanguage: "fa-IR",
      publisher: {
        "@id": `${SITE_URL}/#business`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
