import type { Metadata } from "next";
import PercentageClient from "./PercentageClient";

export const metadata: Metadata = {
  title: "محاسبه درصد آزمون کنکور",
  description:
    "درصد پاسخگویی خود را در آزمون‌ها و تست‌های کنکور به‌صورت رایگان و آنلاین محاسبه کنید؛ با یا بدون احتساب نمره منفی.",
  keywords: [
    "محاسبه درصد کنکور",
    "درصدگیر آزمون",
    "محاسبه درصد تست",
    "نمره منفی کنکور",
    "مهیار بیرون‌خو",
  ],
  alternates: {
    canonical: "/percentage",
  },
  openGraph: {
    title: "محاسبه درصد آزمون کنکور | مهیار بیرون‌خو",
    description:
      "ابزار رایگان محاسبه درصد پاسخگویی در آزمون‌ها و تست‌های کنکور، با یا بدون نمره منفی.",
    url: "/percentage",
    type: "website",
  },
};

export default function PercentagePage() {
  return <PercentageClient />;
}
