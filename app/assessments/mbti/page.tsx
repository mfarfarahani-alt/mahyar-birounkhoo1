import type { Metadata } from "next";
import MBTIClient from "./MbtiClient";

export const metadata: Metadata = {
  title: "آزمون تیپ شخصیتی MBTI",
  description:
    "آزمون رایگان تیپ شخصیتی مایرز-بریگز (MBTI) برای خودشناسی بهتر و کمک به انتخاب مسیر تحصیلی و شغلی مناسب.",
  keywords: [
    "آزمون MBTI",
    "تست MBTI",
    "تیپ شخصیتی",
    "خودشناسی",
    "انتخاب رشته",
    "مهیار بیرون‌خو",
  ],
  alternates: {
    canonical: "/assessments/mbti",
  },
  openGraph: {
    title: "آزمون تیپ شخصیتی MBTI | مهیار بیرون‌خو",
    description:
      "آزمون رایگان MBTI برای خودشناسی بهتر و کمک به انتخاب مسیر تحصیلی مناسب.",
    url: "/assessments/mbti",
    type: "website",
  },
};

export default function MBTIPage() {
  return <MBTIClient />;
}
