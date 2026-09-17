"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Square, Volume2 } from "lucide-react";

type Props = {
  text: string;
  title?: string;
  /** مسیر فایل صوتی واقعی (پیشنهادی) */
  audioSrc?: string;
  compact?: boolean;
  playLabel?: string;
};

/**
 * پخش ویس مقاله
 * اولویت ۱: فایل MP3 واقعی (کیفیت فارسی عالی)
 * اولویت ۲: Web Speech (fallback)
 */
export default function ArticleAudioPlayer({
  text,
  title,
  audioSrc,
  compact = false,
  playLabel = "ویس مقاله",
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stoppedRef = useRef(true);

  useEffect(() => {
    return () => {
      stopAudio();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function stopAudio() {
    stoppedRef.current = true;
    if (audioRef.current) {
      try {
        audioRef.current.onended = null;
        audioRef.current.ontimeupdate = null;
        audioRef.current.onerror = null;
        audioRef.current.pause();
        audioRef.current.removeAttribute("src");
        audioRef.current.load();
      } catch {
        /* ignore */
      }
      audioRef.current = null;
    }
    try {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    } catch {
      /* ignore */
    }
  }

  function handlePlay() {
    setError("");
    setStatus("");

    // ادامه بعد از مکث
    if (isPaused && audioRef.current) {
      stoppedRef.current = false;
      audioRef.current
        .play()
        .then(() => {
          setIsPaused(false);
          setIsPlaying(true);
          setStatus("در حال پخش...");
        })
        .catch(() => {
          setError("پخش ادامه پیدا نکرد. دوباره بزنید.");
        });
      return;
    }

    // شروع از اول
    stopAudio();
    stoppedRef.current = false;

    if (audioSrc) {
      playMp3(audioSrc);
      return;
    }

    // fallback: speech
    playSpeechFallback();
  }

  function playMp3(src: string) {
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.volume = 1;
    audioRef.current = audio;

    audio.ontimeupdate = () => {
      if (!audio.duration || Number.isNaN(audio.duration)) return;
      setProgress(Math.round((audio.currentTime / audio.duration) * 100));
    };

    audio.onended = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setStatus("پخش تمام شد");
      setProgress(100);
    };

    audio.onerror = () => {
      console.warn("MP3 failed, fallback to speech");
      setError("");
      playSpeechFallback();
    };

    setIsPlaying(true);
    setIsPaused(false);
    setStatus("در حال پخش...");
    setProgress(0);

    audio
      .play()
      .then(() => {
        setStatus("در حال پخش...");
      })
      .catch((err) => {
        console.warn(err);
        setError(
          "مرورگر اجازه پخش نداد. یک‌بار دیگر کلیک کنید یا تب را Unmute کنید."
        );
        setIsPlaying(false);
      });
  }

  function playSpeechFallback() {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setError("فایل صوتی در دسترس نیست و مرورگر هم از گفتار پشتیبانی نمی‌کند.");
      setIsPlaying(false);
      return;
    }

    try {
      window.speechSynthesis.cancel();
    } catch {
      /* ignore */
    }

    const full = ((title ? title + ". " : "") + text).trim().slice(0, 1500);
    const u = new SpeechSynthesisUtterance(full);
    u.lang = "fa-IR";
    u.rate = 0.95;
    u.volume = 1;

    const voices = window.speechSynthesis.getVoices();
    const fa =
      voices.find((v) => v.lang.toLowerCase().startsWith("fa")) ||
      voices.find((v) => /persian|farsi|dilara|farid/i.test(v.name));
    if (fa) u.voice = fa;

    u.onstart = () => setStatus("در حال پخش (صدای سیستم)...");
    u.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setStatus("پخش تمام شد");
    };
    u.onerror = () => {
      setError(
        "صدای سیستم کار نکرد. مطمئن شوید فایل /audio/hamdeli-digital.mp3 در public قرار دارد."
      );
      setIsPlaying(false);
    };

    setIsPlaying(true);
    setIsPaused(false);
    window.speechSynthesis.speak(u);
  }

  function handlePause() {
    if (!isPlaying) return;
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPaused(true);
      setIsPlaying(false);
      setStatus("متوقف شده");
      return;
    }
    try {
      window.speechSynthesis.pause();
    } catch {
      /* ignore */
    }
    setIsPaused(true);
    setIsPlaying(false);
    setStatus("متوقف شده");
  }

  function handleStop() {
    stopAudio();
    setIsPlaying(false);
    setIsPaused(false);
    setStatus("");
    setProgress(0);
  }

  if (compact) {
    return (
      <div className="inline-flex flex-wrap items-center gap-1.5">
        {!isPlaying ? (
          <button
            type="button"
            onClick={handlePlay}
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/20 px-4 py-2 text-sm font-bold text-amber-400 transition hover:bg-amber-500/30"
          >
            <Play className="h-4 w-4" fill="currentColor" />
            {isPaused ? "ادامه" : playLabel}
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePause}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-600/80 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-500"
          >
            <Pause className="h-4 w-4" fill="currentColor" />
            مکث
          </button>
        )}

        {(isPlaying || isPaused) && (
          <button
            type="button"
            onClick={handleStop}
            className="inline-flex items-center justify-center rounded-lg border border-white/20 p-2 text-slate-300 transition hover:bg-white/10"
          >
            <Square className="h-3.5 w-3.5" fill="currentColor" />
          </button>
        )}

        {status && !error && (
          <span className="text-xs text-slate-400">{status}</span>
        )}
        {error && <span className="text-xs text-red-400">{error}</span>}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-amber-400/20 bg-gradient-to-l from-amber-500/10 to-transparent p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-amber-400">
          <Volume2 className="h-5 w-5" />
          <span className="text-sm font-bold">ویس مقاله</span>
        </div>

        <div className="flex items-center gap-2">
          {!isPlaying ? (
            <button
              type="button"
              onClick={handlePlay}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-[#0a1224] transition hover:bg-amber-400"
            >
              <Play className="h-4 w-4" fill="currentColor" />
              {isPaused ? "ادامه" : playLabel}
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePause}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-500"
            >
              <Pause className="h-4 w-4" fill="currentColor" />
              مکث
            </button>
          )}

          {(isPlaying || isPaused) && (
            <button
              type="button"
              onClick={handleStop}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/10"
            >
              <Square className="h-3.5 w-3.5" fill="currentColor" />
              توقف
            </button>
          )}
        </div>
      </div>

      {(isPlaying || isPaused || progress > 0) && (
        <div className="mt-3">
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-amber-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {status && !error && (
        <p className="mt-2 text-xs text-slate-400">{status}</p>
      )}
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
