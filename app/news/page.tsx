import type { Metadata } from "next";
import NewsClient from "./NewsClient";

export const metadata: Metadata = {
  title: "اخبار کنکور و آموزش‌وپرورش",
  description:
    "آخرین اخبار، اطلاعیه‌ها و تغییرات مرتبط با کنکور سراسری، آزمون فرهنگیان و آموزش‌وپرورش ایران.",
  keywords: [
    "اخبار کنکور",
    "اخبار آموزش و پرورش",
    "اطلاعیه کنکور",
    "آزمون فرهنگیان",
    "مهیار بیرون‌خو",
  ],
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: "اخبار کنکور و آموزش‌وپرورش | مهیار بیرون‌خو",
    description:
      "آخرین اخبار و اطلاعیه‌های مرتبط با کنکور سراسری و آموزش‌وپرورش ایران.",
    url: "/news",
    type: "website",
  },
};

export default function NewsPage() {
  return <NewsClient />;
}
