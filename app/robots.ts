import type { MetadataRoute } from "next";

// ============================================================
// آدرس اصلی سایت (هماهنگ با app/sitemap.ts)
// ============================================================

const BASE_URL = "https://www.mahyar-bironkhu.ir";

// مسیرهایی که نباید ایندکس شوند (پنل مدیریت و API)
const DISALLOWED_PATHS = ["/admin", "/api"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // موتورهای جستجوی عمومی
        userAgent: "*",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      {
        // Google - محتوای سایت برای Google AI Overviews / Gemini هم قابل استفاده باشد
        userAgent: "Google-Extended",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      {
        // OpenAI - ChatGPT / GPTBot
        userAgent: "GPTBot",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      {
        // Anthropic - Claude
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      {
        userAgent: "Claude-User",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      {
        userAgent: "Claude-SearchBot",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      {
        // Perplexity
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      {
        userAgent: "Perplexity-User",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      {
        // Meta AI
        userAgent: "Meta-ExternalAgent",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      {
        // Apple Intelligence
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      {
        // Amazon (Alexa/Rufus)
        userAgent: "Amazonbot",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      {
        // Common Crawl (منبع آموزش بسیاری از مدل‌های زبانی)
        userAgent: "CCBot",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      {
        userAgent: "Bytespider",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
