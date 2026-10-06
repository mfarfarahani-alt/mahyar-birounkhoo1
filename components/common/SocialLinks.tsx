"use client";

import { Phone } from "lucide-react";
import { WhatsAppIcon, TelegramIcon, InstagramIcon, BaleIcon } from "./SocialIcons";

const links = [
  {
    title: "تماس تلفنی",
    href: "tel:+989380851505",
    icon: Phone,
    className: "bg-red-500 hover:bg-red-600",
  },
  {
    title: "واتساپ",
    href: "https://wa.me/989380851505",
    icon: WhatsAppIcon,
    className: "bg-green-500 hover:bg-green-600",
  },
  {
    title: "تلگرام",
    href: "https://t.me/HerooAcademy",
    icon: TelegramIcon,
    className: "bg-sky-500 hover:bg-sky-600",
  },
  {
    title: "اینستاگرام",
    href: "https://www.instagram.com/heroo_academyy",
    icon: InstagramIcon,
    className: "bg-pink-500 hover:bg-pink-600",
  },
  {
    title: "بله",
    href: "https://ble.ir/HerooAcademy",
    icon: BaleIcon,
    className: "bg-blue-600 hover:bg-blue-700",
  },
];

export default function SocialLinks() {
  return (
    <div
      dir="ltr"
      className="fixed bottom-6 left-4 z-[9999] flex flex-col items-center gap-3"
    >
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <a
            key={link.title}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={
              link.href.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
            aria-label={link.title}
            title={link.title}
            className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition hover:scale-110 ${link.className}`}
          >
            <Icon size={21} />
          </a>
        );
      })}
    </div>
  );
}
