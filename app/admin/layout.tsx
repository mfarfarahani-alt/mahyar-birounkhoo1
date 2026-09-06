import type { Metadata } from "next";

// ============================================================
// پنل مدیریت نباید در نتایج جستجو یا موتورهای هوش مصنوعی نمایه شود
// ============================================================

export const metadata: Metadata = {
  title: "پنل مدیریت",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
