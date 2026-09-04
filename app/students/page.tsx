import TopRanks from "@/components/students/TopRanks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "رتبه‌های برتر | مهیار بیرون‌خو",
  description:
    "نمونه نتایج و رتبه‌های برتر پذیرفته‌شدگان آزمون فرهنگیان با حفظ حریم خصوصی دانش‌آموزان",
};

export default function StudentsPage() {
  return (
    <main dir="rtl">
      <TopRanks />
    </main>
  );
}
