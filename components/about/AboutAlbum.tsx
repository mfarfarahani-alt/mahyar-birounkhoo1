"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const albumImages = [
  "/images/about/album-1.jpg",
  "/images/about/album-2.jpg",
  "/images/about/album-3.jpg",
  "/images/about/album-4.jpg",
];

const AUTO_PLAY_INTERVAL = 2000;

export default function AboutAlbum() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % albumImages.length);
  }, []);

  const goPrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + albumImages.length) % albumImages.length);
  }, []);

  // ======================================================
  // تعویض خودکار تصاویر هر ۲ ثانیه در حالت ثابت
  // ======================================================

  useEffect(() => {
    timerRef.current = setInterval(() => {
      goNext();
    }, AUTO_PLAY_INTERVAL);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [goNext]);

  function restartAutoPlay() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      goNext();
    }, AUTO_PLAY_INTERVAL);
  }

  function handleNextClick() {
    goNext();
    restartAutoPlay();
  }

  function handlePrevClick() {
    goPrev();
    restartAutoPlay();
  }

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -left-5 -top-5 h-28 w-28 rounded-full bg-amber-400/20 blur-3xl" />

      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 p-3 shadow-2xl">
        <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
          {albumImages.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`آلبوم تصاویر مهیار بیرون‌خو - ${i + 1}`}
              fill
              sizes="(max-width: 768px) 90vw, 450px"
              className={`object-cover transition-opacity duration-700 ease-in-out ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
              priority={i === 0}
            />
          ))}
        </div>

        {/* دکمه‌های جابه‌جایی */}

        <button
          type="button"
          onClick={handlePrevClick}
          aria-label="تصویر قبلی"
          className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-slate-800 shadow-md backdrop-blur-sm transition hover:bg-white"
        >
          <ChevronRight size={19} />
        </button>

        <button
          type="button"
          onClick={handleNextClick}
          aria-label="تصویر بعدی"
          className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-slate-800 shadow-md backdrop-blur-sm transition hover:bg-white"
        >
          <ChevronLeft size={19} />
        </button>

        {/* نشانگر تصاویر */}

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
          {albumImages.map((src, i) => (
            <span
              key={src}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-amber-400" : "w-1.5 bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
