import type { Metadata } from "next";
import ExamArchiveClient from "./ExamArchiveClient";

export const metadata: Metadata = {
  title: "آرشیو سوالات و پاسخنامه کنکور",
  description:
    "دفترچه کامل سوالات و پاسخنامه‌ی تشریحی کنکور سراسری سال‌های اخیر به تفکیک رشته (تجربی، ریاضی، انسانی، زبان، هنر و فرهنگیان)، رایگان و آماده دانلود.",
  keywords: [
    "آرشیو سوالات کنکور",
    "دفترچه سوالات کنکور",
    "پاسخنامه کنکور",
    "دانلود سوالات کنکور",
    "کنکور سراسری",
    "مهیار بیرون‌خو",
  ],
  alternates: {
    canonical: "/exam-archive",
  },
  openGraph: {
    title: "آرشیو سوالات و پاسخنامه کنکور | مهیار بیرون‌خو",
    description:
      "دفترچه‌ی کامل سوالات و پاسخنامه‌ی کنکور سراسری سال‌های اخیر، رایگان و آماده دانلود.",
    url: "/exam-archive",
    type: "website",
  },
};

export default function ExamArchivePage() {
  return <ExamArchiveClient />;
}
