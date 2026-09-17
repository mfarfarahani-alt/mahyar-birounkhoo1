"use client";

import Link from "next/link";
import ArticleAudioPlayer from "@/components/articles/ArticleAudioPlayer";

export type ArticleCardData = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  authors: string;
  category: string;
  readTime: string;
  audioText: string;
  audioSrc?: string;
};

export default function ArticleCard({ article }: { article: ArticleCardData }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#111d36]/80 p-6 shadow-lg transition hover:border-amber-400/40 hover:bg-[#152448]">
      <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-amber-400/90">
        <span className="rounded-full bg-amber-400/10 px-3 py-1 font-bold">
          {article.category}
        </span>
        <span>{article.date}</span>
        <span>•</span>
        <span>{article.readTime} مطالعه</span>
      </div>

      <h2 className="text-xl font-black leading-relaxed text-white sm:text-2xl">
        <Link
          href={`/articles/${article.slug}`}
          className="transition hover:text-amber-400"
        >
          {article.title}
        </Link>
      </h2>

      <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
        {article.summary}
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-400">{article.authors}</p>

        <div className="flex flex-wrap items-center gap-2">
          <ArticleAudioPlayer
            text={article.audioText}
            title={article.title}
            audioSrc={article.audioSrc}
            compact
            playLabel="ویس مقاله"
          />

          <Link
            href={`/articles/${article.slug}`}
            className="inline-flex items-center gap-1 rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-[#0a1224] transition hover:bg-amber-400"
          >
            مطالعه مقاله
            <span aria-hidden>←</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
