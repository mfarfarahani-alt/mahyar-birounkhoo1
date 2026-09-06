import type { Metadata } from "next";
import HollandClient from "./HollandClient";

export const metadata: Metadata = {
  title: "آزمون هالند (RIASEC)",
  description:
    "آزمون رایگان تیپ شخصیتی شغلی هالند (RIASEC) برای شناخت علایق شغلی و کمک به انتخاب رشته تحصیلی و کنکور.",
  keywords: [
    "آزمون هالند",
    "تست هالند",
    "RIASEC",
    "آزمون شخصیت شناسی شغلی",
    "انتخاب رشته",
    "مهیار بیرون‌خو",
  ],
  alternates: {
    canonical: "/assessments/holland",
  },
  openGraph: {
    title: "آزمون هالند (RIASEC) | مهیار بیرون‌خو",
    description:
      "آزمون رایگان تیپ شخصیتی شغلی هالند برای کمک به انتخاب رشته تحصیلی.",
    url: "/assessments/holland",
    type: "website",
  },
};

export default function HollandPage() {
  return <HollandClient />;
}
