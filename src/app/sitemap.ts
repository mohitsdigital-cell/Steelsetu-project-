import type { MetadataRoute } from "next";
import { catalog } from "@/lib/catalog";
import { brands } from "@/lib/brands";
import { articles } from "@/lib/articles";

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
  const staticEntries = ROUTES.map((r) => ({
    url: BASE + r.path,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.pri,
  }));

  const productEntries = catalog.map((p) => ({
    url: `${BASE}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryEntries = catalog.map((c) => ({
    url: `${BASE}/categories/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const brandEntries = brands.map((b) => ({
    url: `${BASE}/brands/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articleEntries = articles.map((a) => ({
    url: `${BASE}/knowledge/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...productEntries, ...categoryEntries, ...brandEntries, ...articleEntries];
}
