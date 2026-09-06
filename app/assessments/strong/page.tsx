import type { Metadata } from "next";
import StrongClient from "./StrongClient";

export const metadata: Metadata = {
  title: "آزمون علایق شغلی استرانگ",
  description:
    "آزمون رایگان علایق شغلی و تحصیلی استرانگ برای شناخت بهتر زمینه‌های مورد علاقه و کمک به انتخاب رشته کنکور.",
  keywords: [
    "آزمون استرانگ",
    "تست علایق شغلی",
    "Strong Interest Inventory",
    "انتخاب رشته",
    "مهیار بیرون‌خو",
  ],
  alternates: {
    canonical: "/assessments/strong",
  },
  openGraph: {
    title: "آزمون علایق شغلی استرانگ | مهیار بیرون‌خو",
    description:
      "آزمون رایگان علایق شغلی و تحصیلی استرانگ برای کمک به انتخاب رشته کنکور.",
    url: "/assessments/strong",
    type: "website",
  },
};

export default function StrongPage() {
  return <StrongClient />;
}
