import { MetadataRoute } from "next";

// ============================================================
// آدرس اصلی سایت
// ============================================================

const BASE_URL = "https://www.mahyar-bironkhu.ir";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwqdva3YX0BihDGOj_g0JRLUj_UmzKObvAKU1iIk5YGn0LbEF3XkI1yAfsTDlIpfnAWGg/exec";

type NewsItem = {
  id?: string;
  title?: string;
  slug?: string;
  status?: string;
  date?: string;
};

// ============================================================
// دریافت لیست اخبار تأییدشده برای افزودن به sitemap
// ============================================================

async function getNewsEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const response = await fetch(
      `${GOOGLE_SCRIPT_URL}?action=getNews&_=${Date.now()}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    const items: NewsItem[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.news)
        ? data.news
        : Array.isArray(data?.data)
          ? data.data
          : [];

    return items
      .filter(
        (item) =>
          String(item?.status || "")
            .trim()
            .toLowerCase() === "approved" &&
          (item?.id || item?.slug) &&
          item?.title
      )
      .map((item) => {
        const value =
          item.slug && item.slug.trim()
            ? item.slug.trim()
            : String(item.id);

        const lastModified = item.date
          ? new Date(item.date.replace(/\//g, "-"))
          : new Date();

        return {
          url: `${BASE_URL}/news/${encodeURIComponent(value)}`,
          lastModified: Number.isNaN(lastModified.getTime())
            ? new Date()
            : lastModified,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        };
      });
  } catch (error) {
    console.error("خطا در ساخت sitemap اخبار:", error);
    return [];
  }
}

// ============================================================
// sitemap
// ============================================================

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/planning`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/major-selection`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/assessments`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/assessments/holland`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/assessments/mbti`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/assessments/strong`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/percentage`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/exam-archive`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const newsRoutes = await getNewsEntries();

  return [...staticRoutes, ...newsRoutes];
}
