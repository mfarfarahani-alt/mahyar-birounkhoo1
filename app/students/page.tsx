import TopRanks from "@/components/students/TopRanks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "افتخارات | مهیار بیرون‌خو",
  description:
    "نمونه نتایج و افتخارات پذیرفته‌شدگان با حفظ حریم خصوصی دانش‌آموزان",
};

export default function StudentsPage() {
  return (
    <main dir="rtl">
      <TopRanks />
    </main>
  );
}
