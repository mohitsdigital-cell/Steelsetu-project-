import type { MetadataRoute } from "next";

const BASE = "https://steelsetu.com";

const ROUTES: { path: string; freq: "daily" | "weekly" | "monthly" | "yearly"; pri: number }[] = [
  { path: "", freq: "daily", pri: 1.0 },
  { path: "/products", freq: "weekly", pri: 0.9 },
  { path: "/brands", freq: "weekly", pri: 0.9 },
  { path: "/suppliers", freq: "weekly", pri: 0.9 },
  { path: "/rates", freq: "daily", pri: 0.9 },
  { path: "/calculators", freq: "monthly", pri: 0.9 },
  { path: "/bill-maker", freq: "monthly", pri: 0.9 },
  { path: "/rfq", freq: "monthly", pri: 0.8 },
  { path: "/blog", freq: "weekly", pri: 0.8 },
  { path: "/knowledge", freq: "weekly", pri: 0.8 },
  { path: "/community", freq: "daily", pri: 0.8 },
  { path: "/community/questions", freq: "daily", pri: 0.7 },
  { path: "/community/polls", freq: "weekly", pri: 0.6 },
  { path: "/community/events", freq: "weekly", pri: 0.6 },
  { path: "/about", freq: "monthly", pri: 0.6 },
  { path: "/contact", freq: "monthly", pri: 0.6 },
  { path: "/trust", freq: "monthly", pri: 0.6 },
  { path: "/community-guidelines", freq: "yearly", pri: 0.3 },
  { path: "/review-policy", freq: "yearly", pri: 0.3 },
  { path: "/disclaimer", freq: "yearly", pri: 0.3 },
  { path: "/privacy", freq: "yearly", pri: 0.3 },
  { path: "/terms", freq: "yearly", pri: 0.3 },
  { path: "/grievance", freq: "yearly", pri: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((r) => ({
    url: BASE + r.path,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.pri,
  }));
}

