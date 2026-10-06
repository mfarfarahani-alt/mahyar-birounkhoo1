const socialLinks = [
  {
    name: "واتساپ",
    href: "https://wa.me/989380851505",
    label: "W",
    className: "bg-green-500 hover:bg-green-600",
  },
  {
    name: "تلگرام",
    href: "https://t.me/YOUR_TELEGRAM",
    label: "T",
    className: "bg-sky-500 hover:bg-sky-600",
  },
  {
    name: "اینستاگرام",
    href: "https://www.instagram.com/heroo_academyy",
    label: "I",
    className: "bg-pink-500 hover:bg-pink-600",
  },
  {
    name: "بله",
    href: "https://ble.ir/YOUR_BALE",
    label: "B",
    className: "bg-blue-600 hover:bg-blue-700",
  },
];

export default function FloatingSocials() {
  return (
    <div
      dir="ltr"
      className="fixed left-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3"
    >
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          title={social.name}
          className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-black text-white shadow-lg transition duration-300 hover:scale-110 ${social.className}`}
        >
          {social.label}
        </a>
      ))}
    </div>
  );
}