"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";


// ============================================================
// تبدیل عدد انگلیسی به فارسی
// ============================================================

function toPersianNumber(value: number | string) {
  return String(value)
    .replace(/0/g, "۰")
    .replace(/1/g, "۱")
    .replace(/2/g, "۲")
    .replace(/3/g, "۳")
    .replace(/4/g, "۴")
    .replace(/5/g, "۵")
    .replace(/6/g, "۶")
    .replace(/7/g, "۷")
    .replace(/8/g, "۸")
    .replace(/9/g, "۹");
}


// ============================================================
// شمارنده
// ============================================================

function Counter({
  end,
  duration = 1400,
  prefix = "",
  suffix = "",
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;

      const progress = Math.min(
        elapsed / duration,
        1
      );

      // حرکت نرم‌تر در شروع و پایان
      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(
        easedProgress * end
      );

      setCount(currentValue);

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(animate);
      } else {
        setCount(end);
        setFinished(true);
      }
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(
        animationFrame
      );
    };
  }, [end, duration]);

  return (
    <motion.span
      animate={{
        scale: finished ? [1, 1.12, 1] : 1,
      }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className={`
        inline-block
        font-black
        tracking-tight
        transition-all
        duration-300
        ${
          finished
            ? "text-3xl text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.35)]"
            : "text-3xl text-white"
        }
      `}
    >
      {prefix}
      {toPersianNumber(count)}
      {suffix}
    </motion.span>
  );
}


// ============================================================
// Hero
// ============================================================

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0B1220]">

      {/* ======================================================
          Background Glow & Pattern
         ====================================================== */}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />

      <div className="absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-blue-600/25 blur-[100px]" />
      <div className="absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-amber-500/15 blur-[100px]" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />


      {/* ======================================================
          Main Container
         ====================================================== */}

      <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8">


        {/* ====================================================
            Text
           ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="text-right"
        >

          {/* Badge */}

          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 shadow-sm shadow-amber-500/10 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            مشاوره تخصصی تحصیلی و کنکور
          </span>


          {/* Title */}

          <h1 className="text-4xl font-black leading-[1.5] text-white sm:text-5xl lg:text-6xl">

            با برنامه‌ریزی اصولی

            <br />

            <span className="bg-gradient-to-l from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              رتبه برتر کنکور شوید
            </span>

          </h1>


          {/* Description */}

          <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
            مشاوره تخصصی کنکور توسط مهیار بیرون‌خو؛
            همراه با برنامه شخصی، تحلیل آزمون، پیگیری مستمر
            و مسیر مشخص برای رسیدن به بهترین نتیجه.
          </p>


          {/* ==================================================
              Buttons
             ================================================== */}

          <div className="mt-9 flex flex-wrap gap-4">

            <a
              href="#reservation"
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-l from-amber-500 to-amber-600
                px-6
                py-4
                font-bold
                text-white
                shadow-xl
                shadow-amber-500/30
                transition-all
                duration-300
                hover:-translate-y-1
                hover:from-amber-600
                hover:to-amber-700
                hover:shadow-2xl
                hover:shadow-amber-500/40
              "
            >
              <Phone size={19} />

              رزرو مشاوره
            </a>


            <Link
              href="#services"
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/25
                bg-white/5
                px-6
                py-4
                font-bold
                text-white
                backdrop-blur-sm
                transition-all
                duration-300
                hover:border-white/50
                hover:bg-white/10
                hover:-translate-y-0.5
              "
            >
              مشاهده خدمات

              <ArrowLeft size={18} />
            </Link>

          </div>


          {/* ==================================================
              Trust / Counters
             ================================================== */}

          <div
            className="
              mt-12
              grid
              grid-cols-3
              gap-3
              sm:gap-6
              max-w-xl
            "
            dir="rtl"
          >

            {/* =================================================
                Experience
               ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.5,
                duration: 0.5,
              }}
              className="
                group
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                px-3
                py-4
                text-center
                backdrop-blur-sm
                transition
                duration-300
                hover:-translate-y-1
                hover:border-amber-400/30
                hover:bg-white/[0.07]
              "
            >

              <div className="flex min-h-[42px] items-center justify-center">

                <Counter
                  end={10}
                  duration={1200}
                  prefix="+"
                />

              </div>

              <div className="mt-2 text-xs font-medium text-slate-400 sm:text-sm">
                سال تجربه
              </div>

            </motion.div>


            {/* =================================================
                Students
               ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.65,
                duration: 0.5,
              }}
              className="
                group
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                px-3
                py-4
                text-center
                backdrop-blur-sm
                transition
                duration-300
                hover:-translate-y-1
                hover:border-amber-400/30
                hover:bg-white/[0.07]
              "
            >

              <div className="flex min-h-[42px] items-center justify-center">

                <Counter
                  end={500}
                  duration={1600}
                  prefix="+"
                />

              </div>

              <div className="mt-2 text-xs font-medium text-slate-400 sm:text-sm">
                دانش‌آموز
              </div>

            </motion.div>


            {/* =================================================
                Support
               ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.8,
                duration: 0.5,
              }}
              className="
                group
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                px-3
                py-4
                text-center
                backdrop-blur-sm
                transition
                duration-300
                hover:-translate-y-1
                hover:border-amber-400/30
                hover:bg-white/[0.07]
              "
            >

              <div className="flex min-h-[42px] items-center justify-center">

                <Counter
                  end={24}
                  duration={1200}
                  suffix="/۷"
                />

              </div>

              <div className="mt-2 text-xs font-medium text-slate-400 sm:text-sm">
                پیگیری و پشتیبانی
              </div>

            </motion.div>

          </div>

        </motion.div>


        {/* ====================================================
            Brand Image
           ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className="relative mx-auto w-full max-w-[500px]"
        >

          {/* Glow */}

          <div className="absolute inset-0 rounded-full bg-amber-500/10 blur-3xl" />


          {/* Image Container */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-white/10
              bg-white/5
              p-4
              shadow-2xl
              backdrop-blur-sm
            "
          >

            <Image
              src="/images/logo.png"
              alt="مهیار بیرون‌خو - مشاور تحصیلی و کنکور"
              width={700}
              height={700}
              className="h-auto w-full rounded-2xl object-cover"
              priority
            />

          </div>

        </motion.div>

      </div>

    </section>
  );
}